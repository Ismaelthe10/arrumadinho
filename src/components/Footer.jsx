import { LocationIcon, ClockIcon } from '@primer/octicons-react'
import WhatsAppIcon from './icons/WhatsAppIcon.jsx'
import InstagramIcon from './icons/InstagramIcon.jsx'
import styles from './Footer.module.css'

const ADDRESS = 'R. Huxley, 317 - Guarani, Colombo - PR, 83408-180'
const WHATSAPP_NUMBER = '554198496829'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`
const INSTAGRAM_LINK = 'https://www.instagram.com/barbeariaarrumadinho/'

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

const openingHours = [
  { day: 'Domingo', hours: 'Fechado' },
  { day: 'Segunda-feira', hours: '14:00/19:00' },
  { day: 'Terça-feira', hours: '09:00/19:00' },
  { day: 'Quarta-feira', hours: '09:00/19:00' },
  { day: 'Quinta-feira', hours: '09:00/19:00' },
  { day: 'Sexta-feira', hours: '09:00/19:00' },
  { day: 'Sábado', hours: '09:00/17:00' },
]

function Footer() {
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
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.socialIcon}>
                <WhatsAppIcon size={20} />
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contato</h3>
            <div className={styles.contactItem}>
              <LocationIcon size={16} />
              <span>{ADDRESS}</span>
            </div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
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
              {openingHours.map((item) => (
                <li key={item.day} className={styles.hoursItem}>
                  <span>{item.day}</span>
                  <span className={item.hours === 'Fechado' ? styles.closed : ''}>{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Barbearia Arrumadinho. Todos os direitos reservados.
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

export default Footer