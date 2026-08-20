import { useCallback, useEffect, useId, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../infra/firebase'
import { useUnsavedChanges } from '../context/useUnsavedChanges'

// Identidade apenas de renderização. Os itens persistidos não têm id — o site
// público lê `photos` como array de strings e `images` como array de {src,alt} —
// então a chave de lista não pode sair do dado sem quebrar esse contrato. Ela
// vive aqui, e `values` e `keys` compartilham um único objeto de estado para
// que não exista caminho em que saiam de sincronia.
const newKey = () => crypto.randomUUID()

export function useFirestoreArrayDoc(pathSegments, fieldName, defaultItem) {
  const [{ values: items, keys }, setList] = useState({ values: [], keys: [] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [dirty, setDirty] = useState(false)

  // O caminho vira string para servir de dependência estável: um array literal
  // (['hero', 'carousel']) tem identidade nova a cada render.
  const path = pathSegments.join('/')

  // Cadeia de promessa em vez de async/await: assim todo setState acontece
  // dentro de callback, e não no corpo síncrono de um efeito.
  //
  // Não há setLoading(true) aqui — `loading` já nasce true, e recarregar após
  // salvar não deve piscar a tela de volta para "Carregando...".
  const load = useCallback(() => {
    return getDoc(doc(db, ...path.split('/')))
      .then((snap) => {
        const loaded = snap.exists() ? snap.data()[fieldName] || [] : []
        setList({ values: loaded, keys: loaded.map(newKey) })
        setDirty(false)
      })
      .catch((err) => setError('Erro ao carregar: ' + err.message))
      .finally(() => setLoading(false))
  }, [path, fieldName])

  useEffect(() => { load() }, [load])

  // Publica o estado sujo no provider, que centraliza o aviso de saída — tanto
  // ao fechar a aba quanto ao trocar de seção pela sidebar.
  const dirtyId = useId()
  const { setDirtySource } = useUnsavedChanges()

  useEffect(() => {
    setDirtySource(dirtyId, dirty)
    return () => setDirtySource(dirtyId, false)
  }, [dirtyId, dirty, setDirtySource])

  // Edições preservam a chave: é o mesmo item, com outro conteúdo.
  function setItem(index, value) {
    setList((prev) => ({
      ...prev,
      values: prev.values.map((it, i) => (i === index ? value : it)),
    }))
    setDirty(true)
  }

  function updateField(index, field, value) {
    setList((prev) => ({
      ...prev,
      values: prev.values.map((it, i) => (i === index ? { ...it, [field]: value } : it)),
    }))
    setDirty(true)
  }

  function add() {
    setList((prev) => ({
      values: [...prev.values, typeof defaultItem === 'function' ? defaultItem() : defaultItem],
      keys: [...prev.keys, newKey()],
    }))
    setDirty(true)
  }

  function remove(index) {
    setList((prev) => ({
      values: prev.values.filter((_, i) => i !== index),
      keys: prev.keys.filter((_, i) => i !== index),
    }))
    setDirty(true)
  }

  function move(index, direction) {
    setList((prev) => {
      const newIndex = index + direction
      if (newIndex < 0 || newIndex >= prev.values.length) return prev

      const values = [...prev.values]
      const keys = [...prev.keys]
      ;[values[index], values[newIndex]] = [values[newIndex], values[index]]
      ;[keys[index], keys[newIndex]] = [keys[newIndex], keys[index]]
      return { values, keys }
    })
    setDirty(true)
  }

  async function save(validate) {
    setError(null); setSuccessMsg(null)
    const validationError = validate?.(items)
    if (validationError) return setError(validationError)

    setSaving(true)
    try {
      const ref = doc(db, ...path.split('/'))
      await setDoc(ref, { [fieldName]: items })
      setSuccessMsg('Salvo com sucesso!')
      setDirty(false)
    } catch (err) {
      setError('Erro ao salvar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return { items, keys, loading, saving, error, successMsg, dirty, setItem, updateField, add, remove, move, save }
}