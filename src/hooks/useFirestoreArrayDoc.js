import { useCallback, useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../infra/firebase'

export function useFirestoreArrayDoc(pathSegments, fieldName, defaultItem) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const ref = doc(db, ...pathSegments)
      const snap = await getDoc(ref)
      setItems(snap.exists() ? snap.data()[fieldName] || [] : [])
    } catch (err) {
      setError('Erro ao carregar: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [pathSegments.join('/'), fieldName])

  useEffect(() => { load() }, [load])

  function setItem(index, value) {
    setItems((prev) => prev.map((it, i) => (i === index ? value : it)))
  }

  function updateField(index, field, value) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it)))
  }

  function add() {
    setItems((prev) => [...prev, typeof defaultItem === 'function' ? defaultItem() : defaultItem])
  }

  function remove(index) {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  function move(index, direction) {
    setItems((prev) => {
      const newIndex = index + direction
      if (newIndex < 0 || newIndex >= prev.length) return prev
      const copy = [...prev]
      ;[copy[index], copy[newIndex]] = [copy[newIndex], copy[index]]
      return copy
    })
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
    } catch (err) {
      setError('Erro ao salvar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return { items, loading, saving, error, successMsg, setItem, updateField, add, remove, move, save }
}