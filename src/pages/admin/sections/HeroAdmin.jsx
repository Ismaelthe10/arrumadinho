import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'
import { db } from '../../../infra/firebase'
import styles from './HeroAdmin.module.css'

const DOC_REF_PATH = ['hero', 'carousel']

export default function HeroAdmin() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  useEffect(() => {
    async function loadImages() {
      try {
        const ref = doc(db, ...DOC_REF_PATH)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setImages(snap.data().images || [])
        } else {
          setImages([])
        }
      } catch (err) {
        setError('Erro ao carregar imagens: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
    loadImages()
  }, [])

  function handleFieldChange(index, field, value) {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [field]: value } : img))
    )
  }

  function handleAdd() {
    setImages((prev) => [
      ...prev,
      { src: '', alt: 'ambiente barbearia arrumadinho' },
    ])
  }

  function handleRemove(index) {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  function handleMove(index, direction) {
    setImages((prev) => {
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

    const hasEmptySrc = images.some((img) => !img.src.trim())
    if (hasEmptySrc) {
      setError('Todas as imagens precisam ter uma URL preenchida.')
      return
    }

    setSaving(true)
    try {
      const ref = doc(db, ...DOC_REF_PATH)
      await setDoc(ref, { images })
      setSuccessMsg('Carrossel atualizado com sucesso!')
    } catch (err) {
      setError('Erro ao salvar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Carrossel do Hero</h2>
      <p className={styles.hint}>
        Cole o link/caminho da imagem (ex: /hero/foto-1.jpg ou uma URL completa).
      </p>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      <div className={styles.list}>
        {images.map((img, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.itemFields}>
              <label className={styles.label}>
                URL da imagem
                <input
                  type="text"
                  value={img.src}
                  onChange={(e) => handleFieldChange(index, 'src', e.target.value)}
                  className={styles.input}
                  placeholder="/hero/foto-1.jpg"
                />
              </label>
              <label className={styles.label}>
                Texto alternativo (alt)
                <input
                  type="text"
                  value={img.alt}
                  onChange={(e) => handleFieldChange(index, 'alt', e.target.value)}
                  className={styles.input}
                />
              </label>
            </div>

            {img.src && (
              <img src={img.src} alt="" className={styles.preview} />
            )}

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
                disabled={index === images.length - 1}
                className={styles.iconButton}
                aria-label="Mover para baixo"
              >
                <ArrowDownIcon size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className={styles.iconButtonDanger}
                aria-label="Remover imagem"
              >
                <TrashIcon size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={handleAdd} className={styles.addButton}>
        <PlusIcon size={16} />
        Adicionar imagem
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