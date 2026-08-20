import { PlusIcon, TrashIcon } from '@primer/octicons-react'
import { useFirestoreArrayDoc } from '../../hooks/useFirestoreArrayDoc'
import styles from './ServicesAdmin.module.css'

export default function ExtraServicesAdmin() {
  const {
    items: extraServices, keys, loading, saving, error, successMsg,
    setItem, add, remove, save,
  } = useFirestoreArrayDoc(['services', 'extra'], 'extraServices', '')

  function handleSave() {
    save((list) => (list.some((s) => !s.trim()) ? 'Não deixe itens vazios na lista de outros serviços.' : null))
  }

  function handleRemove(index) {
    if (window.confirm('Remover este item da lista? A remoção só vale depois de clicar em "Salvar alterações".')) {
      remove(index)
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Outros serviços (lista simples)</h3>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      {extraServices.length === 0 ? (
        <p className={styles.emptyState}>Nenhum item cadastrado ainda.</p>
      ) : (
        <div className={styles.extraList}>
          {extraServices.map((item, index) => (
            <div key={keys[index]} className={styles.extraItem}>
              <input type="text" value={item} onChange={(e) => setItem(index, e.target.value)} className={styles.input} placeholder="Ex: Sobrancelha" />
              <button type="button" onClick={() => handleRemove(index)} className={styles.iconButtonDanger} aria-label="Remover item" title="Remover item">
                <TrashIcon size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button type="button" onClick={add} className={styles.addButton}>
        <PlusIcon size={16} />
        Adicionar item
      </button>

      <div className={styles.saveBar}>
        <button type="button" onClick={handleSave} disabled={saving} className={styles.saveButton}>
          {saving ? 'Salvando...' : 'Salvar lista de outros serviços'}
        </button>
      </div>
    </section>
  )
}