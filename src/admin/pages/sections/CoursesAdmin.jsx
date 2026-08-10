import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'
import { useFirestoreList } from '../../hooks/useFirestoreList'
import styles from './CoursesAdmin.module.css'

const ITEMS_COUNT = 3

function emptyCourse(order) {
  return {
    title: '',
    meta: '',
    description: '',
    listTitle: '',
    items: Array(ITEMS_COUNT).fill(''),
    order,
  }
}

export default function CoursesAdmin() {
  const {
    items: courses, loading, savingId, error, successMsg,
    add, updateField, saveOne, remove, move,
  } = useFirestoreList('courses', emptyCourse)

  function handleItemChange(courseIndex, itemIndex, value) {
    const newItems = [...courses[courseIndex].items]
    newItems[itemIndex] = value
    updateField(courseIndex, 'items', newItems)
  }

  function validateCourse(course) {
    if (!course.title.trim() || !course.meta.trim() || !course.description.trim() || !course.listTitle.trim()) {
      return 'Preencha título, meta, descrição e título da lista antes de salvar.'
    }
    if (course.items.length !== ITEMS_COUNT || course.items.some((item) => !item.trim())) {
      return `Preencha os ${ITEMS_COUNT} itens da lista antes de salvar.`
    }
    return null
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cursos</h2>
      <p className={styles.hint}>Os cursos aparecem no site nessa mesma ordem. Use as setas para reordenar.</p>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      {courses.length === 0 ? (
        <p className={styles.emptyState}>Nenhum curso cadastrado ainda. Clique em "Adicionar curso" para começar.</p>
      ) : (
        <div className={styles.list}>
          {courses.map((course, index) => (
            <div key={course.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemBadge}>Curso {index + 1}</span>

                <div className={styles.itemActions}>
                  <button type="button" onClick={() => move(index, -1)} disabled={index === 0 || savingId !== null} className={styles.iconButton} aria-label="Mover para cima" title="Mover para cima">
                    <ArrowUpIcon size={16} />
                  </button>
                  <button type="button" onClick={() => move(index, 1)} disabled={index === courses.length - 1 || savingId !== null} className={styles.iconButton} aria-label="Mover para baixo" title="Mover para baixo">
                    <ArrowDownIcon size={16} />
                  </button>
                  <button type="button" onClick={() => remove(index)} className={styles.iconButtonDanger} aria-label="Remover curso" title="Remover curso">
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.itemFields}>
                <label className={styles.label}>
                  Título
                  <input type="text" value={course.title} onChange={(e) => updateField(index, 'title', e.target.value)} className={styles.input} />
                </label>

                <label className={styles.label}>
                  Meta (ex: "Qual o objetivo? Quem é o público-alvo?")
                  <input type="text" value={course.meta} onChange={(e) => updateField(index, 'meta', e.target.value)} className={styles.input} />
                </label>

                <label className={styles.label}>
                  Descrição
                  <textarea value={course.description} onChange={(e) => updateField(index, 'description', e.target.value)} className={styles.textarea} rows={2} />
                </label>

                <label className={styles.label}>
                  Título da lista (ex: "Informações do curso")
                  <input type="text" value={course.listTitle} onChange={(e) => updateField(index, 'listTitle', e.target.value)} className={styles.input} />
                </label>

                <div className={styles.itemsBlock}>
                  <span className={styles.itemsLabel}>Itens da lista (sempre {ITEMS_COUNT})</span>
                  {course.items.map((item, itemIndex) => (
                    <input
                      key={itemIndex}
                      type="text"
                      value={item}
                      onChange={(e) => handleItemChange(index, itemIndex, e.target.value)}
                      className={styles.input}
                      placeholder={`Item ${itemIndex + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.itemFooter}>
                <button type="button" onClick={() => saveOne(index, validateCourse)} disabled={savingId === course.id} className={styles.saveButtonSmall}>
                  {savingId === course.id ? 'Salvando...' : 'Salvar este curso'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button type="button" onClick={add} className={styles.addButton}>
        <PlusIcon size={16} />
        Adicionar curso
      </button>
    </div>
  )
}