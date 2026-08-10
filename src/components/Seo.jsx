import { useEffect } from 'react'
import { SITE_URL } from '../config/site'

const DEFAULT_IMAGE = '/og-image.jpg'

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Metadados por rota. Numa SPA o <head> é compartilhado entre as páginas, então
 * cada rota precisa sobrescrever title, description, canonical e as tags de
 * preview social — caso contrário herda as da página visitada anteriormente.
 *
 * @param {string} path caminho da rota (ex.: '/cursos') → canonical e og:url
 * @param {string} image caminho ou URL da imagem de preview
 */
export default function Seo({ title, description, path, image, jsonLd, noindex = false }) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
    document.documentElement.lang = 'pt-BR'

    if (title) {
      document.title = title
      upsertMeta('property', 'og:title', title)
      upsertMeta('name', 'twitter:title', title)
    }

    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
      upsertMeta('name', 'twitter:description', description)
    }

    if (path) {
      const url = `${SITE_URL}${path}`
      upsertCanonical(url)
      upsertMeta('property', 'og:url', url)
    }

    const imageUrl = new URL(image || DEFAULT_IMAGE, SITE_URL).href
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('name', 'twitter:image', imageUrl)

    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    let scriptTag
    if (jsonLdString) {
      scriptTag = document.createElement('script')
      scriptTag.type = 'application/ld+json'
      scriptTag.text = jsonLdString
      document.head.appendChild(scriptTag)
    }

    return () => {
      if (scriptTag) document.head.removeChild(scriptTag)
    }
  }, [title, description, path, image, jsonLdString, noindex])

  return null
}
