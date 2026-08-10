import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'
import { useFirestoreList } from '../../hooks/useFirestoreList'
import ImageUploadField from '../../components/ImageUploadField'
import styles from './ProductsAdmin.module.css'

export default function ProductsAdmin() {
  const {
    items: products, loading, savingId, error, successMsg,
    add, updateField, saveOne, remove, move,
  } = useFirestoreList('products', (order) => ({ title: '', image: '', description: '', order }))

  function validateProduct(product) {
    if (!product.title.trim() || !product.image.trim() || !product.description.trim()) {
      return 'Preencha título, imagem e descrição antes de salvar esse produto.'
    }
    return null
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Produtos</h2>
      <p className={styles.hint}>Os produtos aparecem no site nessa mesma ordem. Use as setas para reordenar.</p>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      {products.length === 0 ? (
        <p className={styles.emptyState}>Nenhum produto cadastrado ainda. Clique em "Adicionar produto" para começar.</p>
      ) : (
        <div className={styles.list}>
          {products.map((product, index) => (
            <div key={product.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemBadge}>Produto {index + 1}</span>

                <div className={styles.itemActions}>
                  <button type="button" onClick={() => move(index, -1)} disabled={index === 0 || savingId !== null} className={styles.iconButton} aria-label="Mover para cima" title="Mover para cima">
                    <ArrowUpIcon size={16} />
                  </button>
                  <button type="button" onClick={() => move(index, 1)} disabled={index === products.length - 1 || savingId !== null} className={styles.iconButton} aria-label="Mover para baixo" title="Mover para baixo">
                    <ArrowDownIcon size={16} />
                  </button>
                  <button type="button" onClick={() => remove(index)} className={styles.iconButtonDanger} aria-label="Remover produto" title="Remover produto">
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.itemFields}>
                <label className={styles.label}>
                  Título
                  <input type="text" value={product.title} onChange={(e) => updateField(index, 'title', e.target.value)} className={styles.input} />
                </label>
                <label className={styles.label}>
                  Descrição
                  <textarea value={product.description} onChange={(e) => updateField(index, 'description', e.target.value)} className={styles.textarea} rows={2} />
                </label>
                <ImageUploadField
                  label="URL da imagem"
                  value={product.image}
                  onChange={(url) => updateField(index, 'image', url)}
                  tag="products"
                />
              </div>

              <div className={styles.itemFooter}>
                <button type="button" onClick={() => saveOne(index, validateProduct)} disabled={savingId === product.id} className={styles.saveButtonSmall}>
                  {savingId === product.id ? 'Salvando...' : 'Salvar este produto'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button type="button" onClick={add} className={styles.addButton}>
        <PlusIcon size={16} />
        Adicionar produto
      </button>
    </div>
  )
}
