import styles from './LegalPage.module.css'

export default function TermosDeUso() {
  return (
    <section className="section-dark">
      <div className={styles.container}>
        <h1 className={styles.title}>Termos de Uso</h1>
        <p className={styles.updated}>Última atualização: julho de 2026</p>

        <div className={styles.content}>
          <p>
            Bem-vindo ao site da Barbearia Arrumadinho. Ao acessar e utilizar
            este site, você concorda com os termos e condições descritos a
            seguir. Caso não concorde com algum destes termos, recomendamos
            que não utilize o site.
          </p>

          <h2>1. Sobre o site</h2>
          <p>
            Este site tem como objetivo apresentar os serviços, produtos e
            informações institucionais da Barbearia Arrumadinho, localizada
            em Colombo - PR, além de facilitar o contato e agendamento com
            nossos clientes.
          </p>

          <h2>2. Uso permitido</h2>
          <p>
            O conteúdo deste site pode ser acessado livremente para fins
            pessoais e informativos. É proibida a reprodução, distribuição ou
            uso comercial do conteúdo (textos, imagens e logotipos) sem
            autorização prévia da Barbearia Arrumadinho.
          </p>

          <h2>3. Agendamentos e contato</h2>
          <p>
            Os agendamentos realizados via WhatsApp ou outros canais de
            contato estão sujeitos à disponibilidade de horários da
            barbearia. Nos reservamos o direito de reagendar ou cancelar
            atendimentos em casos excepcionais, buscando sempre informar o
            cliente com antecedência.
          </p>

          <h2>4. Preços e informações</h2>
          <p>
            Os preços de serviços e produtos exibidos neste site são
            meramente informativos e podem sofrer alterações sem aviso
            prévio. Recomendamos confirmar valores atualizados diretamente
            com a barbearia antes do atendimento.
          </p>

          <h2>5. Links e conteúdos de terceiros</h2>
          <p>
            Este site pode conter links para redes sociais ou serviços de
            terceiros (como WhatsApp, Instagram e Google Maps). Não nos
            responsabilizamos pelo conteúdo ou práticas de privacidade desses
            serviços externos.
          </p>

          <h2>6. Limitação de responsabilidade</h2>
          <p>
            Fazemos o possível para manter as informações deste site
            precisas e atualizadas, mas não garantimos a ausência total de
            erros ou omissões. O uso das informações aqui contidas é de
            responsabilidade do usuário.
          </p>

          <h2>7. Alterações nos termos</h2>
          <p>
            Estes Termos de Uso podem ser atualizados periodicamente, sem
            aviso prévio. Recomendamos revisá-los ocasionalmente para se
            manter informado sobre eventuais mudanças.
          </p>

          <h2>8. Contato</h2>
          <p>
            Em caso de dúvidas sobre estes Termos de Uso, entre em contato
            conosco pelo WhatsApp ou visite nosso endereço: R. Huxley, 317 -
            Guarani, Colombo - PR, 83408-180.
          </p>
        </div>
      </div>
    </section>
  )
}

