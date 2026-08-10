import { NavLink } from 'react-router-dom'
import { dashboardNav } from './dashboardNav.js'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.list}>
        {dashboardNav.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? `${styles.item} ${styles.itemActive}` : styles.item
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}