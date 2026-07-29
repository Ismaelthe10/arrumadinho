import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore'
import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'
import { db } from '../../../infra/firebase'
import styles from './ServicesAdmin.module.css'

const COLLECTION_NAME = 'mainServices'
const MAX_SERVICES = 3

export default function MainServicesAdmin() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
    setLoading(true)
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('order'))
      const snap = await getDocs(q)
      setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (err) {
      setError('Erro ao carregar serviços: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleFieldChange(index, field, value) {
    setServices((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    )
  }

  function handleAdd() {
    if (services.length >= MAX_SERVICES) {
      setError(`Só é permitido até ${MAX_SERVICES} serviços principais.`)
      return
    }
    setError(null)
    const tempId = `new-${Date.now()}`
    setServices((prev) => [
      ...prev,
      { id: tempId, title: '', description: '', image: '', order: prev.length },
    ])
  }

  // Salva só este card (cria ou atualiza)
  async function handleSaveOne(index) {
    setError(null)
    setSuccessMsg(null)
    const service = services[index]

    if (!service.title.trim() || !service.description.trim() || !service.image.trim()) {
      setError('Preencha título, descrição e imagem antes de salvar esse serviço.')
      return
    }

    setSavingId(service.id)
    try {
      const { id, ...data } = service
      if (id.startsWith('new-')) {
        const newDocRef = doc(collection(db, COLLECTION_NAME))
        await setDoc(newDocRef, data)
      } else {
        await setDoc(doc(db, COLLECTION_NAME, id), data)
      }
      setSuccessMsg(`"${service.title}" salvo com sucesso!`)
      await loadServices()
    } catch (err) {
      setError('Erro ao salvar: ' + err.message)
    } finally {
      setSavingId(null)
    }
  }

  // Remove imediatamente (não espera "salvar tudo")
  async function handleRemove(index) {
    const target = services[index]
    if (!target.id.startsWith('new-')) {
      const confirmed = window.confirm(`Remover o serviço "${target.title}"? Essa ação é imediata.`)
      if (!confirmed) return
      setSavingId(target.id)
      try {
        await deleteDoc(doc(db, COLLECTION_NAME, target.id))
        setSuccessMsg('Serviço removido.')
      } catch (err) {
        setError('Erro ao remover: ' + err.message)
        setSavingId(null)
        return
      }
      setSavingId(null)
    }
    setServices((prev) => prev.filter((_, i) => i !== index))
  }

  // Reordenar ainda precisa gravar os dois documentos afetados (troca de "order")
  async function handleMove(index, direction) {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= services.length) return

    const reordered = [...services]
    ;[reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]]
    const updated = reordered.map((s, i) => ({ ...s, order: i }))
    setServices(updated)

    // Persiste a nova ordem dos dois itens trocados
    try {
      const a = updated[index]
      const b = updated[newIndex]
      if (!a.id.startsWith('new-')) {
        const { id, ...data } = a
        await setDoc(doc(db, COLLECTION_NAME, id), data)
      }
      if (!b.id.startsWith('new-')) {
        const { id, ...data } = b
        await setDoc(doc(db, COLLECTION_NAME, id), data)
      }
    } catch (err) {
      setError('Erro ao salvar nova ordem: ' + err.message)
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Serviços principais (até {MAX_SERVICES})</h3>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      <div className={styles.list}>
        {services.map((service, index) => (
          <div key={service.id} className={styles.item}>
            <div className={styles.itemTop}>
              <div className={styles.itemFields}>
                <label className={styles.label}>
                  Título
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  Descrição
                  <textarea
                    value={service.description}
                    onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                    className={styles.textarea}
                    rows={2}
                  />
                </label>
                <label className={styles.label}>
                  URL da imagem
                  <input
                    type="text"
                    value={service.image}
                    onChange={(e) => handleFieldChange(index, 'image', e.target.value)}
                    className={styles.input}
                    placeholder="/services/foto-16.webp"
                  />
                </label>
              </div>

              {service.image && <img src={service.image} alt="" className={styles.preview} />}

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
                  disabled={index === services.length - 1}
                  className={styles.iconButton}
                  aria-label="Mover para baixo"
                >
                  <ArrowDownIcon size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className={styles.iconButtonDanger}
                  aria-label="Remover serviço"
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>

            <div className={styles.itemFooter}>
              <button
                type="button"
                onClick={() => handleSaveOne(index)}
                disabled={savingId === service.id}
                className={styles.saveButtonSmall}
              >
                {savingId === service.id ? 'Salvando...' : 'Salvar este serviço'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length < MAX_SERVICES && (
        <button type="button" onClick={handleAdd} className={styles.addButton}>
          <PlusIcon size={16} />
          Adicionar serviço principal
        </button>
      )}
    </section>
  )
}
