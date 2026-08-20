import Seo from '../components/Seo'
import { ROUTE_META } from '../config/routeMeta'
import styles from './LegalPage.module.css'

export default function PoliticaPrivacidade() {
  return (
    <section className="section-dark">
      <Seo {...ROUTE_META.privacy} />
      <div className={styles.container}>
        <h1 className={styles.title}>Política de Privacidade</h1>
        <p className={styles.updated}>Última atualização: agosto de 2026</p>

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
            Para operar este site, utilizamos os seguintes serviços de
            terceiros, que podem processar dados técnicos de navegação:
          </p>
          <ul>
            <li>
              <strong>Google Firebase</strong> (Google LLC) — autenticação e
              armazenamento das informações exibidas no site;
            </li>
            <li>
              <strong>Cloudinary</strong> — hospedagem e entrega das imagens
              exibidas no site;
            </li>
            <li>
              <strong>Google Maps</strong> — exibição do mapa com nossa
              localização;
            </li>
            <li>
              <strong>Google reCAPTCHA</strong> — proteção contra acessos
              automatizados e uso indevido do site;
            </li>
            <li>
              <strong>Vercel</strong> — hospedagem e entrega do site.
            </li>
          </ul>
          <p>
            Esses serviços têm suas próprias políticas de privacidade,
            independentes desta. Não vendemos nem compartilhamos seus dados
            pessoais com terceiros para fins comerciais ou publicitários.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Este site não utiliza cookies de publicidade ou rastreamento
            próprios. Alguns dos serviços listados no item 3 — em especial o
            Google Maps e o Google reCAPTCHA — podem definir cookies do
            próprio Google, necessários para seu funcionamento (exibir o
            mapa e proteger o site contra abuso automatizado). Você pode
            gerenciar cookies nas configurações do seu navegador, embora
            isso possa afetar a exibição do mapa ou o funcionamento de
            alguns recursos do site.
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
