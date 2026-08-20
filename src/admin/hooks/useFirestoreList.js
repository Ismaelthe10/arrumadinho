import { useCallback, useEffect, useId, useState } from 'react'
import {
  collection, getDocs, doc, setDoc, deleteDoc, query, orderBy,
} from 'firebase/firestore'
import { db } from '../../infra/firebase'
import { useUnsavedChanges } from '../context/useUnsavedChanges'

export function useFirestoreList(collectionName, makeEmptyItem, { maxItems } = {}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [dirty, setDirty] = useState(false)

  // Cadeia de promessa em vez de async/await: assim todo setState acontece
  // dentro de callback, e não no corpo síncrono de um efeito.
  //
  // Não há setLoading(true) aqui — `loading` já nasce true, e o reload após
  // saveOne não deve trocar a lista inteira por "Carregando...".
  const load = useCallback(() => {
    return getDocs(query(collection(db, collectionName), orderBy('order')))
      .then((snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        setDirty(false)
      })
      .catch((err) => setError('Erro ao carregar: ' + err.message))
      .finally(() => setLoading(false))
  }, [collectionName])

  useEffect(() => { load() }, [load])

  // Publica o estado sujo no provider, que centraliza o aviso de saída — tanto
  // ao fechar a aba quanto ao trocar de seção pela sidebar.
  const dirtyId = useId()
  const { setDirtySource } = useUnsavedChanges()

  useEffect(() => {
    setDirtySource(dirtyId, dirty)
    return () => setDirtySource(dirtyId, false)
  }, [dirtyId, dirty, setDirtySource])

  function updateField(index, field, value) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it)))
    setDirty(true)
  }

  function add() {
    if (maxItems && items.length >= maxItems) {
      setError(`Só é permitido até ${maxItems} itens.`)
      return
    }
    setError(null)
    setItems((prev) => [...prev, { id: `new-${crypto.randomUUID()}`, ...makeEmptyItem(prev.length) }])
    setDirty(true)
  }

  async function saveOne(index, validate) {
    setError(null); setSuccessMsg(null)
    const item = items[index]
    const validationError = validate?.(item)
    if (validationError) return setError(validationError)

    setSavingId(item.id)
    try {
      const { id, ...data } = item
      const ref = id.startsWith('new-') ? doc(collection(db, collectionName)) : doc(db, collectionName, id)
      await setDoc(ref, data)
      setSuccessMsg('Salvo com sucesso!')
      await load() // já reseta dirty pra false
    } catch (err) {
      setError('Erro ao salvar: ' + err.message)
    } finally {
      setSavingId(null)
    }
  }

  async function remove(index) {
    const target = items[index]
    if (!target.id.startsWith('new-')) {
      const confirmed = window.confirm(`Remover "${target.title}"? Essa ação é imediata.`)
      if (!confirmed) return
      setSavingId(target.id)
      try {
        await deleteDoc(doc(db, collectionName, target.id))
        setSuccessMsg('Item removido.')
      } catch (err) {
        setError('Erro ao remover: ' + err.message)
        setSavingId(null)
        return
      }
      setSavingId(null)
    }
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  // savingId = 'reordering' durante o move — bloqueia cliques repetidos (resolve item #5)
  async function move(index, direction) {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= items.length) return

    setSavingId('reordering')
    const reordered = [...items]
    ;[reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]]
    const updated = reordered.map((it, i) => ({ ...it, order: i }))
    setItems(updated)

    try {
      for (const it of [updated[index], updated[newIndex]]) {
        if (!it.id.startsWith('new-')) {
          const { id, ...data } = it
          await setDoc(doc(db, collectionName, id), data)
        }
      }
    } catch (err) {
      setError('Erro ao salvar nova ordem: ' + err.message)
    } finally {
      setSavingId(null)
    }
  }

  return { items, loading, savingId, error, successMsg, dirty, add, updateField, saveOne, remove, move }
}