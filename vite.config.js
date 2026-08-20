import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

import { ROUTE_META, NOT_FOUND_META } from './src/config/routeMeta.js'
import { SITE_URL } from './src/config/site.js'

const escapeText = (v) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeAttr = (v) => escapeText(v).replace(/"/g, '&quot;')

/** Troca no HTML já construído as tags que variam por rota. */
function applyMeta(html, { title, description, canonical, robots }) {
  const t = escapeAttr(title)
  const d = escapeAttr(description)

  const out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta name="robots" content=")[^"]*(")/, `$1${robots}$2`)

  if (canonical) {
    const url = escapeAttr(canonical)
    return out
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  }

  // Sem canonical, as tags saem do HTML em vez de herdarem as da home: uma
  // página de erro apontando canonical para "/" declara ao Google que é uma
  // cópia da home — exatamente o oposto do pretendido.
  return out
    .replace(/\s*<link rel="canonical" href="[^"]*"[^>]*>/, '')
    .replace(/\s*<meta property="og:url" content="[^"]*"[^>]*>/, '')
}

function buildSitemap() {
  // Gerado das mesmas rotas do <Seo>, para não poder divergir delas.
  //
  // Sem <lastmod>, <changefreq> e <priority> de propósito: o Google ignora os
  // dois últimos, e só usa lastmod quando ele é comprovadamente exato. O build
  // não sabe quando o conteúdo de cada página mudou de verdade, e data
  // inventada faz o Google desconfiar do arquivo inteiro.
  const urls = Object.values(ROUTE_META)
    .map((route) => `  <url><loc>${SITE_URL}${route.path}</loc></url>`)
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n')
}

/**
 * Grava um HTML por rota, com as meta tags daquela rota já embutidas.
 *
 * Sem isto, toda rota era servida com o index.html da home. Scrapers de link —
 * WhatsApp, Facebook, Instagram, LinkedIn — não executam JavaScript, então o
 * <Seo> nunca rodava para eles: compartilhar /cursos exibia o título e a
 * descrição da home. O Google renderiza JS e via o conteúdo certo; as redes
 * sociais, não.
 *
 * De quebra, ter um arquivo real por rota deixa o 404.html assumir as URLs
 * desconhecidas com status 404 de verdade, no lugar do 200 que o rewrite
 * catch-all devolvia para qualquer coisa.
 */
function prerenderRouteMeta() {
  let outDir = 'dist'

  return {
    name: 'prerender-route-meta',
    apply: 'build',

    configResolved(config) {
      outDir = config.build.outDir
    },

    closeBundle() {
      const root = resolve(outDir)
      const template = readFileSync(join(root, 'index.html'), 'utf8')
      const written = []

      for (const route of Object.values(ROUTE_META)) {
        const html = applyMeta(template, {
          ...route,
          canonical: `${SITE_URL}${route.path}`,
          robots: 'index, follow',
        })

        // A home reescreve o próprio index.html; as demais ganham um diretório,
        // que o Vercel serve direto, sem passar pelos rewrites.
        const file = route.path === '/'
          ? join(root, 'index.html')
          : join(root, route.path.slice(1), 'index.html')

        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, html)
        written.push(route.path)
      }

      writeFileSync(join(root, '404.html'), applyMeta(template, {
        ...NOT_FOUND_META,
        robots: 'noindex, nofollow',
      }))

      writeFileSync(join(root, 'sitemap.xml'), buildSitemap())

      written.push('404', 'sitemap.xml')
      this.info?.(`gerado por rota: ${written.join(', ')}`)
    },
  }
}

export default defineConfig({
  plugins: [react(), prerenderRouteMeta()],
})
