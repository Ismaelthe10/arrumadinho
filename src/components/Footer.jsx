import { LocationIcon, ClockIcon } from '@primer/octicons-react'
import WhatsAppIcon from './icons/WhatsAppIcon.jsx'
import InstagramIcon from './icons/InstagramIcon.jsx'
import styles from './Footer.module.css'

import {
  ADDRESS,
  BUSINESS_NAME,
  INSTAGRAM,
  OPENING_HOURS,
  SCHEDULING_LINK,
} from '../config/site'

const navLinks = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Produtos', href: '/#produtos' },
  { label: 'Nosso espaço', href: '/#espaco' },
  { label: 'Cursos', href: '/cursos' },
]

const legalLinks = [
  { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
  { label: 'Termos de Uso', href: '/termos-de-uso' },
]

export default function Footer() {
  return (
    <footer className="section-dark">
      <div className={styles.container}>
        <img src="/logo.svg" alt="" aria-hidden="true" className={styles.watermark} />

        <div className={styles.grid}>
          {/* Navegação */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Navegação</h3>
            <ul className={styles.linkList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>{link.label}</a>
                </li>
              ))}
            </ul>
            <div className={styles.social}>
              <a href={SCHEDULING_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.socialIcon}>
                <WhatsAppIcon size={20} />
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contato</h3>
            <div className={styles.contactItem}>
              <LocationIcon size={16} />
              <span>{ADDRESS.full}</span>
            </div>
            <a href={SCHEDULING_LINK} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              <WhatsAppIcon size={16} />
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          {/* Horário */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>
              <ClockIcon size={16} /> Horário de Funcionamento
            </h3>
            <ul className={styles.hoursList}>
              {OPENING_HOURS.map((item) => (
                <li key={item.day} className={styles.hoursItem}>
                  <span>{item.day}</span>
                  <span className={item.closed ? styles.closed : ''}>
                    {item.closed ? 'Fechado' : `${item.opens}/${item.closes}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {BUSINESS_NAME}. Todos os direitos reservados.
          </p>
          <div className={styles.legalLinks}>
            {legalLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.legalLink}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

