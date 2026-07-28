import { StarFillIcon } from '@primer/octicons-react'
import styles from './GoogleReviews.module.css'

const ADDRESS = 'R. Huxley, 317 - Guarani, Colombo - PR, 83408-180'
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`

const reviews = [
  { name: 'Larissa Lins', time: '5 dias atrás', text: 'Atendimento maravilhoso dos barbeiros, e um excelente café. Sou cliente desde 2020 e não troco!' },
  { name: 'Fernanda Santos', time: '5 dias atrás', text: 'Super educados, ótimo trabalho e atendimento excelente!' },
  { name: 'Jessica Da Silva Maciel', time: '5 dias atrás', text: 'Muito bom, recomendo' },
  { name: 'Gustavo Rocha', time: 'uma semana atrás', text: 'Muito bom!' },
  { name: 'Maxwell Ricardo', time: '1 mês atrás', text: 'Bom atendimento. Corte excelente. Rapaziada super gente boa.' },
  { name: 'Gabriel Ienke da Silva', time: '2 meses atrás', text: 'Barbearia sempre com uma energia boa, barbeiros todos profissionais… super recomendo!' },
  { name: 'Coel Coel', time: '2 meses atrás', text: 'Ótimo atendimento' },
  { name: 'Ilson Machado', time: '2 meses atrás', text: 'Ótima, excelentes profissionais' },
  { name: 'Bruno da Silva Oliveira', time: '3 meses atrás', text: 'Barbearia bem organizada. Linda demais.' },
  { name: 'Danieli Domingues', time: '3 meses atrás', text: 'Excelentes profissionais!' },
  { name: 'Wagner da Luz Abrantes Pereira', time: '4 meses atrás', text: 'Corte de cabelo top, super recomendo, atendimento excelente' },
  { name: 'David Alves', time: '4 meses atrás', text: 'Barbeiro atencioso, corta com carinho e traz uma experiência incrível — acompanho desde o início e recomendo a todos que queiram um bom corte e relaxar.' },
  { name: 'Gabriel Kaiser', time: '4 meses atrás', text: 'Profissionais ótimos e atendimento top! Piazada nota 10' },
  { name: 'Ge Rosa Oficial', time: '4 meses atrás', text: 'A melhor de Colombo 🙌' },
  { name: 'Vagner De Abreu', time: '5 meses atrás', text: 'Recomendo, atendimento 10 fora os cortes' },
  { name: 'Daniel Cardoso', time: '5 meses atrás', text: 'Corto com o Allan desde quando ele tinha 14 anos, sempre foi um profissional atencioso e sempre recomendo ele.' },
  { name: 'Luis Felipe Depetris', time: '5 meses atrás', text: 'Meu barbeiro' },
  { name: 'Tiago Diniz Polli', time: '5 meses atrás', text: 'Ambiente descontraído e de alta qualidade!' },
  { name: 'Marcos Winter Santos', time: '5 meses atrás', text: 'Lugar excepcional, frequento toda semana desde 2017. Ótimos profissionais, ambiente tranquilo e climatizado.' },
  { name: 'Matheus Henrique', time: '5 meses atrás', text: 'Excelente barbearia e ótimo atendimento, esses caras são feras! São excelentes profissionais, obrigado por serem sempre os melhores. Parabéns pela excelente barbearia, rapaziada. Sem dúvidas os melhores sempre — corto com eles desde 2018.' },
  { name: 'Caio Machado', time: '5 meses atrás', text: 'Quando cheguei fui super bem atendido, recomendo muito. Lugar de qualidade e muito agradável, recomendo muito!' },
  { name: 'Leonardo Oliveira', time: '5 meses atrás', text: 'Top, Allan é o melhor barbeiro que já conheci' },
  { name: 'João Victor dos Santos da Silva', time: '5 meses atrás', text: 'A barbearia é perfeita, barbeiros excelentes, ambiente acolhedor e a equipe é super profissional, sempre pronta para deixar cada cliente com um visual impecável. É o lugar perfeito para relaxar e sair renovado.' },
  { name: 'Gustavo Kluck', time: '6 meses atrás', text: 'Atendimento de 1º, super recomendo' },
  { name: 'Lucas Almeida', time: '6 meses atrás', text: 'Corto o cabelo aqui faz anos, melhor barbearia de Colombo 🔥' },
  { name: 'Lucas Giovani de Oliveira', time: '6 meses atrás', text: 'Melhor barbearia da região.' },
  { name: 'Rafel Andrade', time: '6 meses atrás', text: 'Melhor barbearia de Colombo, sempre fui bem atendido' },
  { name: 'Breninho', time: '6 meses atrás', text: 'Os caras são muito bons no que fazem, corto já faz 8 anos' },
  { name: 'Lucas Oliveira da Costa', time: '6 meses atrás', text: 'Sempre fui bem atendido com ótimos profissionais, super recomendo, ambiente saudável… Melhor barbearia de Colombo e região.' },
  { name: 'Isaque Monteiro', time: '7 meses atrás', text: 'Tudo no lugar, ambiente arrumadinho e um clima que passa profissionalismo desde a entrada. Aqui dá pra ver que o capricho começa no espaço e termina no corte. 👌💈' },
  { name: 'Vitor Vieira', time: '7 meses atrás', text: 'É minha primeira vez indo, barbeiro educado e carismático, lugar aconchegante e um talento absurdo' },
  { name: 'Eduarda Vieira', time: '7 meses atrás', text: 'Atendimento excelente, profissionais muito educados e atenciosos. O corte ficou perfeito, caprichado nos detalhes. Ambiente limpo, organizado e com uma vibe muito boa. O serviço foi rápido e dentro do horário marcado. Super recomendo, ótima experiência e com certeza voltarei!' },
  { name: 'Cintia Barros', time: '7 meses atrás', text: 'Um excelente atendimento, sempre fui super bem recebida e atendida! Ótimos profissionais! E ótimos valores.' },
  { name: 'Rafael Cristiano', time: '7 meses atrás', text: 'Top, a piazada manja dos barbershop, indico 100%.' },
  { name: 'Edson Rocha', time: '8 meses atrás', text: 'Melhor barbearia do Paraná. Atendimento extrovertido e com profissionais muito qualificados' },
  { name: 'Giovane Lourival Glogenski', time: '8 meses atrás', text: 'Sou cliente há muito tempo, o barbeiro Alan é muito técnico e experiente, faz 7 anos que corto cabelo com ele, melhor de Colombo' },
  { name: 'Leonardo Oliveira', time: '8 meses atrás', text: 'Muito bom, ótimo atendimento' },
  { name: 'Ângelo', time: '8 meses atrás', text: 'Barbearia ótima, todos os barbeiros são habilidosos e atenciosos, ótimo atendimento' },
  { name: 'Gessica Pinheiro', time: '8 meses atrás', text: 'O atendimento do início ao fim é excelente. O ambiente é super agradável, tomei café, levei meu filho e fomos muito bem tratados por todos ali. O rapaz que cortou o cabelo dele é muito profissional e fez o corte exatamente como ele queria.' },
  { name: 'Bernardo', time: '8 meses atrás', text: 'Top demais' },
  { name: 'Filipe Boldrim', time: '8 meses atrás', text: 'Corto há mais de 8 anos com eles, sem dúvidas os melhores da região. Topzera!!' },
  { name: 'João Pedro', time: '8 meses atrás', text: 'Barbearia de qualidade, ótimo atendimento, ambiente moderno e sofisticado.' },
  { name: 'Murilo Almeida', time: '8 meses atrás', text: 'Atendimento excelente. Recomendo muito. Melhor barbearia de Colombo!!' },
  { name: 'Gabriel Kaiser', time: '8 meses atrás', text: 'Atendimento nota 10 e profissionais excelentes!' },
  { name: 'Luiz Eduardo', time: '8 meses atrás', text: 'Melhor barbearia de Colombo!!' },
  { name: 'Luiz Henrique da Silva', time: '8 meses atrás', text: 'Serviço top e de qualidade. Recomendo 🚀🚀' },
  { name: 'Robson Plaza', time: '8 meses atrás', text: 'Piazada gente boa, corte bom, recomendo.' },
]

function Stars() {
  return (
    <div className={styles.stars} aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarFillIcon key={i} size={14} />
      ))}
    </div>
  )
}

export default function GoogleReviews() {
  return (
    <section id="avaliacoes" className={`section-light ${styles.section}`}>
       <div className={styles.pattern} />
      <div className={styles.container}>
        <h2 className={styles.title}>Onde Estamos & O Que Dizem de Nós</h2>

        <div className={styles.grid}>
          <div className={styles.mapWrapper}>
            <iframe
              src={MAP_EMBED_SRC}
              title="Localização da barbearia no Google Maps"
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review.name} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewName}>{review.name}</span>
                  <span className={styles.reviewTime}>{review.time}</span>
                </div>
                <Stars />
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

