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
import styles from './ProductsAdmin.module.css'

const COLLECTION_NAME = 'products'

export default function ProductsAdmin() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('order'))
      const snap = await getDocs(q)
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (err) {
      setError('Erro ao carregar produtos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleFieldChange(index, field, value) {
    setProducts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    )
  }

  function handleAdd() {
    const tempId = `new-${Date.now()}`
    setProducts((prev) => [
      ...prev,
      { id: tempId, title: '', image: '', description: '', order: prev.length },
    ])
  }

  async function handleSaveOne(index) {
    setError(null)
    setSuccessMsg(null)
    const product = products[index]

    if (!product.title.trim() || !product.image.trim() || !product.description.trim()) {
      setError('Preencha título, imagem e descrição antes de salvar esse produto.')
      return
    }

    setSavingId(product.id)
    try {
      const { id, ...data } = product
      if (id.startsWith('new-')) {
        const newDocRef = doc(collection(db, COLLECTION_NAME))
        await setDoc(newDocRef, data)
      } else {
        await setDoc(doc(db, COLLECTION_NAME, id), data)
      }
      setSuccessMsg(`"${product.title}" salvo com sucesso!`)
      await loadProducts()
    } catch (err) {
      setError('Erro ao salvar: ' + err.message)
    } finally {
      setSavingId(null)
    }
  }

  async function handleRemove(index) {
    const target = products[index]
    if (!target.id.startsWith('new-')) {
      const confirmed = window.confirm(`Remover o produto "${target.title}"? Essa ação é imediata.`)
      if (!confirmed) return
      setSavingId(target.id)
      try {
        await deleteDoc(doc(db, COLLECTION_NAME, target.id))
        setSuccessMsg('Produto removido.')
      } catch (err) {
        setError('Erro ao remover: ' + err.message)
        setSavingId(null)
        return
      }
      setSavingId(null)
    }
    setProducts((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleMove(index, direction) {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= products.length) return

    const reordered = [...products]
    ;[reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]]
    const updated = reordered.map((p, i) => ({ ...p, order: i }))
    setProducts(updated)

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
    <div className={styles.container}>
      <h2 className={styles.title}>Produtos</h2>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      <div className={styles.list}>
        {products.map((product, index) => (
          <div key={product.id} className={styles.item}>
            <div className={styles.itemTop}>
              <div className={styles.itemFields}>
                <label className={styles.label}>
                  Título
                  <input
                    type="text"
                    value={product.title}
                    onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  Descrição
                  <textarea
                    value={product.description}
                    onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                    className={styles.textarea}
                    rows={2}
                  />
                </label>
                <label className={styles.label}>
                  URL da imagem
                  <input
                    type="text"
                    value={product.image}
                    onChange={(e) => handleFieldChange(index, 'image', e.target.value)}
                    className={styles.input}
                    placeholder="/products/product-1.png"
                  />
                </label>
              </div>

              {product.image && <img src={product.image} alt="" className={styles.preview} />}

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
                  disabled={index === products.length - 1}
                  className={styles.iconButton}
                  aria-label="Mover para baixo"
                >
                  <ArrowDownIcon size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className={styles.iconButtonDanger}
                  aria-label="Remover produto"
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>

            <div className={styles.itemFooter}>
              <button
                type="button"
                onClick={() => handleSaveOne(index)}
                disabled={savingId === product.id}
                className={styles.saveButtonSmall}
              >
                {savingId === product.id ? 'Salvando...' : 'Salvar este produto'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={handleAdd} className={styles.addButton}>
        <PlusIcon size={16} />
        Adicionar produto
      </button>
    </div>
  )
}
