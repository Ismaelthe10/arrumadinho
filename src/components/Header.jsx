import { useState } from 'react'
import { Link } from 'react-router-dom'
import { XIcon, ThreeBarsIcon } from '@primer/octicons-react'
import WhatsAppIcon from './icons/WhatsAppIcon.jsx'
import InstagramIcon from './icons/InstagramIcon.jsx'
import styles from './Header.module.css'
import { BUSINESS_NAME, INSTAGRAM, SCHEDULING_LINK } from '../config/site'

const navLinks = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Produtos', href: '/#produtos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Cursos', href: '/cursos' },
]


const socialLinks = [
  { label: 'WhatsApp', href: SCHEDULING_LINK, Icon: WhatsAppIcon },
  { label: 'Instagram', href: INSTAGRAM, Icon: InstagramIcon },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`section-dark ${styles.header}`}>
      <div className={styles.bar}>
        {/* Logo — esquerda */}
        <Link to="/" className={styles.logo}>
          <img src="/logo.svg" alt={BUSINESS_NAME} className={styles.logoImg} />
        </Link>

        {/* Navegação — centro, só desktop */}
        <nav className={styles.nav} aria-label="Menu principal">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Ícones sociais — direita, só desktop */}
        <div className={styles.social}>
          {socialLinks.map(({ label, href, Icon }) => (<a
            
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={styles.socialIcon}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Hambúrguer — só mobile */}
        <button
          className={styles.menuButton}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <XIcon size={26} /> : <ThreeBarsIcon size={26} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="Menu mobile">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className={styles.mobileLink} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}

          <div className={styles.mobileSocial}>
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileLink}
                onClick={closeMenu}
              >
                <Icon size={20} />
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
