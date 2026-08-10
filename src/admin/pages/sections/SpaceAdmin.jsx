import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'
import { useFirestoreArrayDoc } from '../../hooks/useFirestoreArrayDoc'
import ImageUploadField from '../../components/ImageUploadField'
import styles from './SpaceAdmin.module.css'

export default function SpaceAdmin() {
  const {
    items: photos, loading, saving, error, successMsg,
    setItem, add, remove, move, save,
  } = useFirestoreArrayDoc(['space', 'gallery'], 'photos', '')

  function handleSave() {
    save((list) => (list.some((p) => !p.trim()) ? 'Todas as fotos precisam ter uma URL preenchida.' : null))
  }

  function handleRemove(index) {
    if (window.confirm('A ação irá remover a foto imediatamente. Deseja continuar?')) {
      remove(index)
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Nosso Espaço</h2>
      <p className={styles.hint}>As fotos abaixo aparecem na home nessa mesma ordem. Use as setas para reordenar.</p>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      {photos.length === 0 ? (
        <p className={styles.emptyState}>Nenhuma foto adicionada ainda. Clique em "Adicionar foto" para começar.</p>
      ) : (
        <div className={styles.list}>
          {photos.map((photo, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemBadge}>Foto {index + 1}</span>

                <div className={styles.itemActions}>
                  <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className={styles.iconButton} aria-label="Mover para cima" title="Mover para cima">
                    <ArrowUpIcon size={16} />
                  </button>
                  <button type="button" onClick={() => move(index, 1)} disabled={index === photos.length - 1} className={styles.iconButton} aria-label="Mover para baixo" title="Mover para baixo">
                    <ArrowDownIcon size={16} />
                  </button>
                  <button type="button" onClick={() => handleRemove(index)} className={styles.iconButtonDanger} aria-label="Remover foto" title="Remover foto">
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>

              <ImageUploadField
                value={photo}
                onChange={(url) => setItem(index, url)}
                tag="space"
              />
            </div>
          ))}
        </div>
      )}

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
