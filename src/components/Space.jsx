import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../infra/firebase'
import styles from './Space.module.css'

export default function Space() {
  const [spacePhotos, setSpacePhotos] = useState([])

  useEffect(() => {
    let mounted = true

    async function loadPhotos() {
      try {
        const ref = doc(db, 'space', 'gallery')
        const snap = await getDoc(ref)

        if (!mounted) return

        const data = snap.exists() ? snap.data() : null
        setSpacePhotos(Array.isArray(data?.photos) ? data.photos : [])
      } catch (err) {
        console.error('Erro ao carregar fotos do espaço:', err)
      }
    }

    loadPhotos()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <section id="espaco" className="section-dark">
      <div className={styles.container}>
        <h2 className={styles.title}>Nosso Espaço</h2>

        <div className={styles.grid}>
          {spacePhotos.map((photo, index) => (
            <div key={`${photo}-${index}`} className={styles.photoWrapper}>
              <img
                src={photo}
                alt={`Ambiente da barbearia ${index + 1}`}
                className={styles.photo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
