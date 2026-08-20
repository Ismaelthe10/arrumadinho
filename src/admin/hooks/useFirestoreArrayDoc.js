import { useCallback, useEffect, useId, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../infra/firebase'
import { useUnsavedChanges } from '../context/useUnsavedChanges'

export function useFirestoreArrayDoc(pathSegments, fieldName, defaultItem) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [dirty, setDirty] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const ref = doc(db, ...pathSegments)
      const snap = await getDoc(ref)
      setItems(snap.exists() ? snap.data()[fieldName] || [] : [])
      setDirty(false)
    } catch (err) {
      setError('Erro ao carregar: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [pathSegments.join('/'), fieldName])

  useEffect(() => { load() }, [load])

  // Publica o estado sujo no provider, que centraliza o aviso de saída — tanto
  // ao fechar a aba quanto ao trocar de seção pela sidebar.
  const dirtyId = useId()
  const { setDirtySource } = useUnsavedChanges()

  useEffect(() => {
    setDirtySource(dirtyId, dirty)
    return () => setDirtySource(dirtyId, false)
  }, [dirtyId, dirty, setDirtySource])

  function setItem(index, value) {
    setItems((prev) => prev.map((it, i) => (i === index ? value : it)))
    setDirty(true)
  }

  function updateField(index, field, value) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it)))
    setDirty(true)
  }

  function add() {
    setItems((prev) => [...prev, typeof defaultItem === 'function' ? defaultItem() : defaultItem])
    setDirty(true)
  }

  function remove(index) {
    setItems((prev) => prev.filter((_, i) => i !== index))
    setDirty(true)
  }

  function move(index, direction) {
    setItems((prev) => {
      const newIndex = index + direction
      if (newIndex < 0 || newIndex >= prev.length) return prev
      const copy = [...prev]
      ;[copy[index], copy[newIndex]] = [copy[newIndex], copy[index]]
      return copy
    })
    setDirty(true)
  }

  async function save(validate) {
    setError(null); setSuccessMsg(null)
    const validationError = validate?.(items)
    if (validationError) return setError(validationError)

    setSaving(true)
    try {
      const ref = doc(db, ...pathSegments)
      await setDoc(ref, { [fieldName]: items })
      setSuccessMsg('Salvo com sucesso!')
      setDirty(false)
    } catch (err) {
      setError('Erro ao salvar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return { items, loading, saving, error, successMsg, dirty, setItem, updateField, add, remove, move, save }
}