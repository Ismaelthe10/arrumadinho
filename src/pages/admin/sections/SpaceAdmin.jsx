import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'
import { db } from '../../../infra/firebase'
import styles from './SpaceAdmin.module.css'

const DOC_REF_PATH = ['space', 'gallery']

export default function SpaceAdmin() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  useEffect(() => {
    async function loadPhotos() {
      try {
        const ref = doc(db, ...DOC_REF_PATH)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setPhotos(snap.data().photos || [])
        } else {
          setPhotos([])
        }
      } catch (err) {
        setError('Erro ao carregar fotos: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
    loadPhotos()
  }, [])

  function handleChange(index, value) {
    setPhotos((prev) => prev.map((p, i) => (i === index ? value : p)))
  }

  function handleAdd() {
    setPhotos((prev) => [...prev, ''])
  }

  function handleRemove(index) {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  function handleMove(index, direction) {
    setPhotos((prev) => {
      const newIndex = index + direction
      if (newIndex < 0 || newIndex >= prev.length) return prev
      const copy = [...prev]
      ;[copy[index], copy[newIndex]] = [copy[newIndex], copy[index]]
      return copy
    })
  }

  async function handleSave() {
    setError(null)
    setSuccessMsg(null)

    const hasEmpty = photos.some((p) => !p.trim())
    if (hasEmpty) {
      setError('Todas as fotos precisam ter uma URL preenchida.')
      return
    }

    setSaving(true)
    try {
      const ref = doc(db, ...DOC_REF_PATH)
      await setDoc(ref, { photos })
      setSuccessMsg('Galeria atualizada com sucesso!')
    } catch (err) {
      setError('Erro ao salvar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Nosso Espaço</h2>
      <p className={styles.hint}>
        Cole o link/caminho de cada foto do ambiente (ex: /space/place-1.webp).
      </p>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      <div className={styles.list}>
        {photos.map((photo, index) => (
          <div key={index} className={styles.item}>
            <input
              type="text"
              value={photo}
              onChange={(e) => handleChange(index, e.target.value)}
              className={styles.input}
              placeholder="/space/place-1.webp"
            />

            {photo && <img src={photo} alt="" className={styles.preview} />}

            <div className={styles.itemActions}>
              <button
                type="button"
                onClick={() => handleMove(index, -1)}
                disabled={index === 0}
                className={styles.iconButton}
                aria-label="Mover para cima"
              >
                <ArrowUpIcon size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleMove(index, 1)}
                disabled={index === photos.length - 1}
                className={styles.iconButton}
                aria-label="Mover para baixo"
              >
                <ArrowDownIcon size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className={styles.iconButtonDanger}
                aria-label="Remover foto"
              >
                <TrashIcon size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={handleAdd} className={styles.addButton}>
        <PlusIcon size={16} />
        Adicionar foto
      </button>

      <div className={styles.saveBar}>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={styles.saveButton}
        >
          {saving ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </div>
    </div>
  )
}