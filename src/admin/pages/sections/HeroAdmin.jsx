import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'
import { useFirestoreArrayDoc } from '../../hooks/useFirestoreArrayDoc'
import ImageUploadField from '../../components/ImageUploadField'
import styles from './HeroAdmin.module.css'

export default function HeroAdmin() {
  const {
    items: images, loading, saving, error, successMsg,
    updateField, add, remove, move, save,
  } = useFirestoreArrayDoc(['hero', 'carousel'], 'images', () => ({ src: '', alt: 'ambiente barbearia arrumadinho' }))

  function handleSave() {
    save((list) => (list.some((img) => !img.src.trim()) ? 'Todas as imagens precisam ter uma URL preenchida.' : null))
  }

  function handleRemove(index) {
    if (window.confirm('Remover esta imagem do carrossel? A remoção só vale depois de clicar em "Salvar alterações".')) {
      remove(index)
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Carrossel do Hero</h2>
      <p className={styles.hint}>As imagens abaixo aparecem na home nessa mesma ordem. Use as setas para reordenar.</p>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      {images.length === 0 ? (
        <p className={styles.emptyState}>Nenhuma imagem no carrossel ainda. Clique em "Adicionar imagem" para começar.</p>
      ) : (
        <div className={styles.list}>
          {images.map((img, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={index === 0 ? styles.itemBadgeFirst : styles.itemBadge}>
                  Imagem {index + 1}{index === 0 && ' · primeira exibida'}
                </span>

                <div className={styles.itemActions}>
                  <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className={styles.iconButton} aria-label="Mover para cima" title="Mover para cima">
                    <ArrowUpIcon size={16} />
                  </button>
                  <button type="button" onClick={() => move(index, 1)} disabled={index === images.length - 1} className={styles.iconButton} aria-label="Mover para baixo" title="Mover para baixo">
                    <ArrowDownIcon size={16} />
                  </button>
                  <button type="button" onClick={() => handleRemove(index)} className={styles.iconButtonDanger} aria-label="Remover imagem" title="Remover imagem">
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.itemFields}>
                <ImageUploadField
                  label="URL da imagem"
                  value={img.src}
                  onChange={(url) => updateField(index, 'src', url)}
                  tag="hero"
                />
                <label className={styles.label}>
                  Texto alternativo (alt)
                  <input type="text" value={img.alt} onChange={(e) => updateField(index, 'alt', e.target.value)} className={styles.input} />
                </label>
                <p className={styles.fieldHint}>Descreve a imagem para leitores de tela e buscadores — evite deixar em branco.</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button type="button" onClick={add} className={styles.addButton}>
        <PlusIcon size={16} />
        Adicionar imagem
      </button>

      <div className={styles.saveBar}>
        <button type="button" onClick={handleSave} disabled={saving} className={styles.saveButton}>
          {saving ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </div>
    </div>
  )
}
