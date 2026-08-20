import { useEffect, useState } from 'react'
import { readCache, writeCache } from '../utils/contentCache'

/**
 * Stale-while-revalidate para o conteúdo público.
 *
 * Antes, cada seção da home montava vazia e só ganhava conteúdo depois de:
 * baixar e parsear o SDK do Firestore, inicializar o App Check, resolver o
 * token do reCAPTCHA e completar a query. Enquanto isso a seção ficava em
 * branco — é o "loading esperando o Hero" que se via na home.
 *
 * Agora o estado inicial já sai do localStorage, então numa visita repetida a
 * primeira renderização vem completa, sem rede nenhuma no caminho. A busca
 * acontece em paralelo e atualiza a tela apenas se algo mudou.
 *
 * @param key      identificador do conteúdo no cache
 * @param fetcher  função estável (definida no escopo do módulo) que busca os dados
 * @param fallback valor usado na primeira visita, quando não há cache
 */
export function useCachedContent(key, fetcher, fallback) {
  const [data, setData] = useState(() => readCache(key) ?? fallback)

  useEffect(() => {
    let mounted = true

    fetcher()
      .then((fresh) => {
        if (!mounted) return
        setData(fresh)
        writeCache(key, fresh)
      })
      .catch((err) => {
        // Com cache preenchido a falha é invisível: a tela segue com o valor anterior.
        console.error(`Erro ao carregar "${key}":`, err)
      })

    return () => {
      mounted = false
    }
  }, [key, fetcher])

  return data
}
