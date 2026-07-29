import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { PlusIcon, TrashIcon } from '@primer/octicons-react'
import { db } from '../../../infra/firebase'
import styles from './ServicesAdmin.module.css'

const DOC_REF_PATH = ['services', 'extra']

export default function ExtraServicesAdmin() {
  const [extraServices, setExtraServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const ref = doc(db, ...DOC_REF_PATH)
        const snap = await getDoc(ref)
        setExtraServices(snap.exists() ? snap.data().extraServices || [] : [])
      } catch (err) {
        setError('Erro ao carregar lista: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  function handleChange(index, value) {
    setExtraServices((prev) => prev.map((item, i) => (i === index ? value : item)))
  }

  function handleAdd() {
    setExtraServices((prev) => [...prev, ''])
  }

  function handleRemove(index) {
    setExtraServices((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSave() {
    setError(null)
    setSuccessMsg(null)

    if (extraServices.some((s) => !s.trim())) {
      setError('Não deixe itens vazios na lista de outros serviços.')
      return
    }

    setSaving(true)
    try {
      const ref = doc(db, ...DOC_REF_PATH)
      await setDoc(ref, { extraServices })
      setSuccessMsg('Lista de outros serviços atualizada!')
    } catch (err) {
      setError('Erro ao salvar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Outros serviços (lista simples)</h3>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      <div className={styles.extraList}>
        {extraServices.map((item, index) => (
          <div key={index} className={styles.extraItem}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleChange(index, e.target.value)}
              className={styles.input}
              placeholder="Ex: Sobrancelha"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className={styles.iconButtonDanger}
              aria-label="Remover item"
            >
              <TrashIcon size={16} />
            </button>
          </div>
        ))}
      </div>

      <button type="button" onClick={handleAdd} className={styles.addButton}>
        <PlusIcon size={16} />
        Adicionar item
      </button>

      <div className={styles.saveBar}>
        <button type="button" onClick={handleSave} disabled={saving} className={styles.saveButton}>
          {saving ? 'Salvando...' : 'Salvar lista de outros serviços'}
        </button>
      </div>
    </section>
  )
}