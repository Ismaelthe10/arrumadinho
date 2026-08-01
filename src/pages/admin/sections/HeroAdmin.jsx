import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'
import { useFirestoreArrayDoc } from '../../../hooks/useFirestoreArrayDoc'
import ImageUploadField from '../../../components/ImageUploadField'
import styles from './HeroAdmin.module.css'

export default function HeroAdmin() {
  const {
    items: images, loading, saving, error, successMsg,
    updateField, add, remove, move, save,
  } = useFirestoreArrayDoc(['hero', 'carousel'], 'images', () => ({ src: '', alt: 'ambiente barbearia arrumadinho' }))

  function handleSave() {
    save((list) => (list.some((img) => !img.src.trim()) ? 'Todas as imagens precisam ter uma URL preenchida.' : null))
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Carrossel do Hero</h2>
      <p className={styles.hint}>...</p>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      <div className={styles.list}>
        {images.map((img, index) => (
          <div key={index} className={styles.item}>
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
            </div>

            <div className={styles.itemActions}>
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className={styles.iconButton} aria-label="Mover para cima">
                <ArrowUpIcon size={16} />
              </button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === images.length - 1} className={styles.iconButton} aria-label="Mover para baixo">
                <ArrowDownIcon size={16} />
              </button>
              <button type="button" onClick={() => remove(index)} className={styles.iconButtonDanger} aria-label="Remover imagem">
                <TrashIcon size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

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
