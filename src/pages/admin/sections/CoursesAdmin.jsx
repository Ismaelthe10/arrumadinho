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
import styles from './CoursesAdmin.module.css'

const COLLECTION_NAME = 'courses'
const ITEMS_COUNT = 3

function emptyCourse(order) {
  return {
    id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: '',
    meta: '',
    description: '',
    listTitle: '',
    items: Array(ITEMS_COUNT).fill(''),
    order,
  }
}

export default function CoursesAdmin() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  useEffect(() => {
    loadCourses()
  }, [])

  async function loadCourses() {
    setLoading(true)
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('order'))
      const snap = await getDocs(q)
      setCourses(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (err) {
      setError('Erro ao carregar cursos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleFieldChange(index, field, value) {
    setCourses((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    )
  }

  function handleItemChange(courseIndex, itemIndex, value) {
    setCourses((prev) =>
      prev.map((c, i) => {
        if (i !== courseIndex) return c
        const newItems = [...c.items]
        newItems[itemIndex] = value
        return { ...c, items: newItems }
      })
    )
  }

  function handleAdd() {
    setCourses((prev) => [...prev, emptyCourse(prev.length)])
  }

  async function handleSaveOne(index) {
    setError(null)
    setSuccessMsg(null)
    const course = courses[index]

    if (!course.title.trim() || !course.meta.trim() || !course.description.trim() || !course.listTitle.trim()) {
      setError('Preencha título, meta, descrição e título da lista antes de salvar.')
      return
    }
    if (course.items.length !== ITEMS_COUNT || course.items.some((item) => !item.trim())) {
      setError(`Preencha os ${ITEMS_COUNT} itens da lista antes de salvar.`)
      return
    }

    setSavingId(course.id)
    try {
      const { id, ...data } = course
      if (id.startsWith('new-')) {
        const newDocRef = doc(collection(db, COLLECTION_NAME))
        await setDoc(newDocRef, data)
      } else {
        await setDoc(doc(db, COLLECTION_NAME, id), data)
      }
      setSuccessMsg(`"${course.title}" salvo com sucesso!`)
      await loadCourses()
    } catch (err) {
      setError('Erro ao salvar: ' + err.message)
    } finally {
      setSavingId(null)
    }
  }

  async function handleRemove(index) {
    const target = courses[index]
    if (!target.id.startsWith('new-')) {
      const confirmed = window.confirm(`Remover o curso "${target.title}"? Essa ação é imediata.`)
      if (!confirmed) return
      setSavingId(target.id)
      try {
        await deleteDoc(doc(db, COLLECTION_NAME, target.id))
        setSuccessMsg('Curso removido.')
      } catch (err) {
        setError('Erro ao remover: ' + err.message)
        setSavingId(null)
        return
      }
      setSavingId(null)
    }
    setCourses((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleMove(index, direction) {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= courses.length) return

    const reordered = [...courses]
    ;[reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]]
    const updated = reordered.map((c, i) => ({ ...c, order: i }))
    setCourses(updated)

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
      <h2 className={styles.title}>Cursos</h2>

      {error && <div className={styles.errorBox}>{error}</div>}
      {successMsg && <div className={styles.successBox}>{successMsg}</div>}

      <div className={styles.list}>
        {courses.map((course, index) => (
          <div key={course.id} className={styles.item}>
            <div className={styles.itemTop}>
              <div className={styles.itemFields}>
                <label className={styles.label}>
                  Título
                  <input
                    type="text"
                    value={course.title}
                    onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                    className={styles.input}
                  />
                </label>

                <label className={styles.label}>
                  Meta (ex: "Duração: 1 Dia • 8 Horas")
                  <input
                    type="text"
                    value={course.meta}
                    onChange={(e) => handleFieldChange(index, 'meta', e.target.value)}
                    className={styles.input}
                  />
                </label>

                <label className={styles.label}>
                  Descrição
                  <textarea
                    value={course.description}
                    onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                    className={styles.textarea}
                    rows={2}
                  />
                </label>

                <label className={styles.label}>
                  Título da lista (ex: "O que você aprenderá")
                  <input
                    type="text"
                    value={course.listTitle}
                    onChange={(e) => handleFieldChange(index, 'listTitle', e.target.value)}
                    className={styles.input}
                  />
                </label>

                <div className={styles.itemsBlock}>
                  <span className={styles.itemsLabel}>Itens da lista (sempre 3)</span>
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
                  disabled={index === courses.length - 1}
                  className={styles.iconButton}
                  aria-label="Mover para baixo"
                >
                  <ArrowDownIcon size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className={styles.iconButtonDanger}
                  aria-label="Remover curso"
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>

            <div className={styles.itemFooter}>
              <button
                type="button"
                onClick={() => handleSaveOne(index)}
                disabled={savingId === course.id}
                className={styles.saveButtonSmall}
              >
                {savingId === course.id ? 'Salvando...' : 'Salvar este curso'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={handleAdd} className={styles.addButton}>
        <PlusIcon size={16} />
        Adicionar curso
      </button>
    </div>
  )
}
