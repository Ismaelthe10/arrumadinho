import { useEffect } from 'react'

/**
 * Atualiza title/description da página conforme a rota.
 * Sem dependência externa (react-helmet etc.) — só document.title e a
 * tag <meta name="description"> que já existe no index.html.
 *
 * Uso, dentro de cada page:
 *   <Seo
 *     title="Cursos de Barbeiro | Barbearia Arrumadinho"
 *     description="Cursos profissionais de barbeiro em Colombo/PR..."
 *   />
 *
 * Limitação importante: isso só ajuda o Google (que executa JS antes de
 * indexar) e quem navega DENTRO do site. Crawlers de redes sociais
 * (WhatsApp, Facebook) geralmente NÃO executam JS — pra eles, o título/
 * descrição/imagem que aparecem ao colar um link SEMPRE vêm do
 * index.html estático, não deste componente. Por isso o index.html tem
 * as tags genéricas do negócio como um todo (funciona bem pra Home).
 */
export default function Seo({ title, description, jsonLd }) {
  useEffect(() => {
    if (title) {
      document.title = title
    }

    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }

    let scriptTag
    if (jsonLd) {
      scriptTag = document.createElement('script')
      scriptTag.type = 'application/ld+json'
      scriptTag.text = JSON.stringify(jsonLd)
      document.head.appendChild(scriptTag)
    }

    // Limpeza: ao sair da página, remove o JSON-LD específico dela
    // (title/description ficam até a próxima página trocar de novo,
    // sem problema, já que sempre há um valor válido)
    return () => {
      if (scriptTag) document.head.removeChild(scriptTag)
    }
  }, [title, description, jsonLd])

  return null
}
