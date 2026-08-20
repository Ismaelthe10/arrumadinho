// Um importador por rota preguiçosa, compartilhado entre dois consumidores:
// App.jsx, que os transforma em componentes lazy, e a navegação, que os dispara
// antes do clique. Os import() continuam literais, então o bundler segue
// enxergando cada rota como um chunk próprio.
const importers = {
  '/cursos': () => import('../pages/Courses.jsx'),
  '/sobre': () => import('../pages/About.jsx'),
  '/politica-de-privacidade': () => import('../pages/PoliticaPrivacidade.jsx'),
  '/termos-de-uso': () => import('../pages/TermosDeUso.jsx'),
}

export const routeImporters = importers

const started = new Set()

/**
 * Começa a baixar o chunk assim que o visitante demonstra intenção de navegar,
 * e não no clique. Sem isto, o clique ainda esperava um round-trip com o
 * Suspense mostrando header e footer sozinhos.
 *
 * Rotas sem entrada aqui (âncoras como /#servicos) simplesmente não fazem nada.
 */
export function prefetchRoute(path) {
  const load = importers[path]
  if (!load || started.has(path)) return

  started.add(path)
  // Se a rede falhar, libera para nova tentativa no próximo hover.
  load().catch(() => started.delete(path))
}

/**
 * Handlers de intenção prontos para espalhar num <Link>. Cobre mouse (hover),
 * teclado (foco) e toque — no celular o touchstart chega alguns décimos de
 * segundo antes do clique, o suficiente para um chunk de poucos kB.
 */
export function prefetchProps(path) {
  const trigger = () => prefetchRoute(path)
  return { onMouseEnter: trigger, onFocus: trigger, onTouchStart: trigger }
}
