import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'
import { useFirestoreList } from '../../../hooks/useFirestoreList'
import ImageUploadField from '../../../components/ImageUploadField'
import styles from './ServicesAdmin.module.css'

const MAX_SERVICES = 3

export default function MainServicesAdmin() {
  const {
    items: services, loading, savingId, error, successMsg,
    add, updateField, saveOne, remove, move,
  } = useFirestoreList(
    'mainServices',
    (order) => ({ title: '', description: '', image: '', order }),
    { maxItems: MAX_SERVICES }
  )

  function validateService(service) {
    if (!service.title.trim() || !service.description.trim() || !service.image.trim()) {
      return 'Preencha título, descrição e imagem antes de salvar esse serviço.'
    }
    return null
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
                  <input type="text" value={service.title} onChange={(e) => updateField(index, 'title', e.target.value)} className={styles.input} />
                </label>
                <label className={styles.label}>
                  Descrição
                  <textarea value={service.description} onChange={(e) => updateField(index, 'description', e.target.value)} className={styles.textarea} rows={2} />
                </label>
                <ImageUploadField
                  label="URL da imagem"
                  value={service.image}
                  onChange={(url) => updateField(index, 'image', url)}
                  tag="services"
                />
              </div>

              <div className={styles.itemActions}>
                <button type="button" onClick={() => move(index, -1)} disabled={index === 0 || savingId !== null} className={styles.iconButton} aria-label="Mover para cima">
                  <ArrowUpIcon size={16} />
                </button>
                <button type="button" onClick={() => move(index, 1)} disabled={index === services.length - 1 || savingId !== null} className={styles.iconButton} aria-label="Mover para baixo">
                  <ArrowDownIcon size={16} />
                </button>
                <button type="button" onClick={() => remove(index)} className={styles.iconButtonDanger} aria-label="Remover serviço">
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>

            <div className={styles.itemFooter}>
              <button type="button" onClick={() => saveOne(index, validateService)} disabled={savingId === service.id} className={styles.saveButtonSmall}>
                {savingId === service.id ? 'Salvando...' : 'Salvar este serviço'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length < MAX_SERVICES && (
        <button type="button" onClick={add} className={styles.addButton}>
          <PlusIcon size={16} />
          Adicionar serviço principal
        </button>
      )}
    </section>
  )
}
