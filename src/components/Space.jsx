import styles from './Space.module.css'

const spacePhotos = [
  '/space/place-1.webp',
  '/space/place-2.jpg',
  '/space/place-3.jpg',
  '/space/place-4.webp',
  '/space/place-5.webp',
  '/space/place-6.jpg',

]

export default function Space() {
  return (
    <section id="espaco" className="section-dark">
      <div className={styles.container}>
        <h2 className={styles.title}>Nosso Espaço</h2>

        <div className={styles.grid}>
          {spacePhotos.map((photo, index) => (
            <div key={photo} className={styles.photoWrapper}>
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

