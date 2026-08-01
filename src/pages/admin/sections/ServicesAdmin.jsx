import MainServicesAdmin from './MainServicesAdmin'
import ExtraServicesAdmin from './ExtraServicesAdmin'
import styles from './ServicesAdmin.module.css'

export default function ServicesAdmin() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Serviços</h2>
      <MainServicesAdmin />
      <ExtraServicesAdmin />
    </div>
  )
}