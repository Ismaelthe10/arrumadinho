import styles from './About.module.css'

export default function About() {
  return (
    <section className="section-light">
      <div className={styles.container}>
        <h1 className={styles.title}>Nossa História</h1>

        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <img
              src="/about/about-image.jpeg"
              alt="Fundador e equipe da Barbearia Arrumadinho"
              className={styles.image}
            />
          </div>

          <div className={styles.textBlock}>
            <p>
              A Barbearia Arrumadinho nasceu em agosto de 2017, fruto do sonho
              e da dedicação de <strong>Dirceu Aparecido Soltoski</strong>, seu fundador. Desde
              o início, a proposta era simples, porém poderosa: oferecer um
              ambiente organizado, acolhedor e um atendimento feito com
              respeito e capricho.
            </p>
            <p>
              O nome "Arrumadinho" surgiu de forma espontânea e especial. Na
              época, Dirceu e sua esposa buscavam um nome que representasse a
              essência do espaço. Sem muitas ideias, perceberam que a
              barbearia sempre se destacava pela organização e cuidado com
              cada detalhe. Foi assim que o nome Arrumadinho nasceu e ficou.
            </p>
            <p>
              Entre 2017 e 2018, Dirceu esteve à frente da barbearia,
              construindo as bases do negócio. Em 25 de outubro de 2018, um
              novo capítulo começou: Allan Tortato ingressou na barbearia como
              funcionário, iniciando uma parceria construída com trabalho,
              confiança e dedicação diária.
            </p>
            <p>
              Com o passar do tempo, a Barbearia Arrumadinho viveu fases de
              crescimento, aprendizado e renovação, contando com diversos
              profissionais que contribuíram para sua história. Em abril de
              2022, Dirceu tomou a decisão de se mudar para os Estados Unidos,
              deixando a barbearia sob a gerência de Allan Tortato, que
              assumiu a responsabilidade de conduzir o negócio.
            </p>
            <p>
              Já em maio de 2024, após anos de vivência, compromisso e amor
              pela profissão, Allan Tortato assume oficialmente a Barbearia
              Arrumadinho como proprietário.
            </p>
            <p>
              A Barbearia Arrumadinho é, acima de tudo, uma história de
              confiança, evolução e respeito às raízes. Um lugar onde
              passado, presente e futuro se encontram, mantendo o mesmo
              propósito desde o primeiro dia: cuidar das pessoas com
              excelência, estilo e personalidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

