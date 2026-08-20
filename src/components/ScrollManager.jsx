import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Com <a href>, o navegador reposicionava a rolagem sozinho a cada clique: topo
 * ao trocar de página, âncora quando havia hash. A navegação client-side não faz
 * nada disso — então o comportamento precisa ser reproduzido aqui, senão ir de
 * /cursos para /sobre manteria a rolagem no meio da página.
 *
 * Sem behavior: 'smooth' de propósito. O CSS do site não define scroll-behavior,
 * então o salto instantâneo é exatamente o que já acontecia antes.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    // Em voltar/avançar, quem manda é a restauração de rolagem do navegador.
    if (navigationType === 'POP') return

    if (hash) {
      // As seções da home são renderizadas mesmo sem dados, então o alvo já existe.
      document.querySelector(hash)?.scrollIntoView()
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, hash, navigationType])

  return null
}
