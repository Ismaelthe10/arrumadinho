// Bump this prefix to invalidate every cached entry at once — necessário se
// algum dia o formato dos dados guardados mudar.
const PREFIX = 'arrumadinho:v1:'

/**
 * O conteúdo do site (serviços, produtos, fotos) é o mesmo para todo visitante
 * e muda raramente — só quando alguém edita pelo painel. Guardá-lo localmente
 * permite pintar a home na primeira renderização, sem esperar o Firestore.
 *
 * Toda leitura e escrita é defensiva: em aba anônima do Safari, com cota cheia
 * ou com storage bloqueado por política, o localStorage lança exceção. Nesses
 * casos o site apenas volta a se comportar como antes, buscando da rede.
 */
export function readCache(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function writeCache(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // storage indisponível ou cheio: seguir sem cache é degradação aceitável
  }
}
