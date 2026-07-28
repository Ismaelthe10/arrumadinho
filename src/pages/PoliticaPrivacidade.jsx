import styles from './LegalPage.module.css'

export default function PoliticaPrivacidade() {
  return (
    <section className="section-dark">
      <div className={styles.container}>
        <h1 className={styles.title}>Política de Privacidade</h1>
        <p className={styles.updated}>Última atualização: julho de 2026</p>

        <div className={styles.content}>
          <p>
            A Barbearia Arrumadinho valoriza a privacidade e a proteção dos
            dados pessoais de todos que visitam este site ou utilizam nossos
            serviços. Esta Política de Privacidade explica quais informações
            coletamos, como as utilizamos e quais são os seus direitos, em
            conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº
            13.709/2018).
          </p>

          <h2>1. Quais dados coletamos</h2>
          <p>
            Podemos coletar informações fornecidas voluntariamente por você,
            como nome, telefone e mensagens, quando entra em contato conosco
            pelo WhatsApp, formulários ou redes sociais. Também podemos
            coletar dados de navegação básicos (como páginas visitadas) para
            fins estatísticos e de melhoria do site.
          </p>

          <h2>2. Como usamos seus dados</h2>
          <p>
            Utilizamos as informações coletadas para responder dúvidas,
            agendar horários, divulgar serviços e produtos, e melhorar a
            experiência de navegação no site. Não vendemos nem compartilhamos
            seus dados pessoais com terceiros para fins comerciais.
          </p>

          <h2>3. Compartilhamento de informações</h2>
          <p>
            Seus dados podem ser compartilhados com prestadores de serviço
            que nos auxiliam na operação do site (como hospedagem e
            ferramentas de comunicação), sempre respeitando o mesmo nível de
            proteção previsto nesta política.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Este site pode utilizar cookies e tecnologias similares para
            melhorar sua experiência de navegação. Você pode desativar os
            cookies nas configurações do seu navegador, embora isso possa
            afetar algumas funcionalidades do site.
          </p>

          <h2>5. Seus direitos</h2>
          <p>
            De acordo com a LGPD, você tem o direito de solicitar acesso,
            correção, exclusão ou portabilidade dos seus dados pessoais, bem
            como revogar consentimentos previamente concedidos. Para exercer
            esses direitos, entre em contato conosco pelos canais informados
            abaixo.
          </p>

          <h2>6. Segurança dos dados</h2>
          <p>
            Adotamos medidas razoáveis para proteger seus dados contra
            acessos não autorizados, perda, alteração ou divulgação indevida.
          </p>

          <h2>7. Alterações nesta política</h2>
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente.
            Recomendamos que você a revise de tempos em tempos para se manter
            informado sobre como protegemos suas informações.
          </p>

          <h2>8. Contato</h2>
          <p>
            Em caso de dúvidas sobre esta Política de Privacidade, entre em
            contato conosco pelo WhatsApp ou visite nosso endereço: R.
            Huxley, 317 - Guarani, Colombo - PR, 83408-180.
          </p>
        </div>
      </div>
    </section>
  )
}

