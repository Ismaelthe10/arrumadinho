import { NavLink } from 'react-router-dom'
import { dashboardNav } from './dashboardNav.js'
import styles from './Sidebar.module.css'

export default function Sidebar({ onNavigate }) {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.list}>
        {dashboardNav.map((item) => (
          <li key={item.key}>
            {item.disabled ? (
              <span className={styles.itemDisabled}>
                {item.label}
                <span className={styles.badge}>em breve</span>
              </span>
            ) : (
              <NavLink
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  isActive ? `${styles.item} ${styles.itemActive}` : styles.item
                }
              >
                {item.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}