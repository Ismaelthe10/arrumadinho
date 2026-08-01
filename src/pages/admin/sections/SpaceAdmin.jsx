import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'
import { useFirestoreArrayDoc } from '../../../hooks/useFirestoreArrayDoc'
import ImageUploadField from '../../../components/ImageUploadField'
import styles from './SpaceAdmin.module.css'

export default function SpaceAdmin() {
  const {
    items: photos, loading, saving, error, successMsg,
    setItem, add, remove, move, save,
  } = useFirestoreArrayDoc(['space', 'gallery'], 'photos', '')

  function handleSave() {
    save((list) => (list.some((p) => !p.trim()) ? 'Todas as fotos precisam ter uma URL preenchida.' : null))
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Nosso Espaço</h2>
      <p className={styles.hint}></p>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      <div className={styles.list}>
        {photos.map((photo, index) => (
          <div key={index} className={styles.item}>
            <ImageUploadField
              value={photo}
              onChange={(url) => setItem(index, url)}
              tag="space"
            />

            <div className={styles.itemActions}>
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className={styles.iconButton} aria-label="Mover para cima">
                <ArrowUpIcon size={16} />
              </button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === photos.length - 1} className={styles.iconButton} aria-label="Mover para baixo">
                <ArrowDownIcon size={16} />
              </button>
              <button type="button" onClick={() => remove(index)} className={styles.iconButtonDanger} aria-label="Remover foto">
                <TrashIcon size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={add} className={styles.addButton}>
        <PlusIcon size={16} />
        Adicionar foto
      </button>

      <div className={styles.saveBar}>
        <button type="button" onClick={handleSave} disabled={saving} className={styles.saveButton}>
          {saving ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </div>
    </div>
  )
}
