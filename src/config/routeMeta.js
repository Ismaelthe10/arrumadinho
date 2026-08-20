import { SITE_URL } from './site.js'

/**
 * Fonte única dos metadados de cada rota pública.
 *
 * Consumido em dois lugares que precisam concordar:
 *   1. <Seo> em tempo de execução, para a navegação client-side;
 *   2. o pré-render no build, que grava os mesmos valores no HTML estático.
 *
 * O segundo existe porque scrapers de link — WhatsApp, Facebook, Instagram,
 * LinkedIn — não executam JavaScript. Para eles, só vale o que já vem no HTML.
 */
export const ROUTE_META = {
  home: {
    path: '/',
    title: 'Barbearia em Colombo - PR | Barbearia Arrumadinho',
    description:
      'Barbearia em Colombo/PR desde 2017. Corte de cabelo, barba e colorimetria no bairro Guarani, com profissionais experientes. Agende pelo WhatsApp.',
  },
  courses: {
    path: '/cursos',
    title: 'Curso de Barbeiro em Colombo e Curitiba - PR | Barbearia Arrumadinho',
    description:
      'Cursos profissionais de barbeiro em Colombo/PR, atendendo toda a região de Curitiba: do iniciante ao avançado, com prática intensiva e certificação.',
  },
  about: {
    path: '/sobre',
    title: 'Nossa História | Barbearia Arrumadinho — Colombo/PR',
    description:
      'A história da Barbearia Arrumadinho, em Colombo/PR: fundada em 2017 por Dirceu Soltoski e conduzida desde 2024 por Allan Tortato.',
  },
  privacy: {
    path: '/politica-de-privacidade',
    title: 'Política de Privacidade | Barbearia Arrumadinho',
    description:
      'Como a Barbearia Arrumadinho coleta, utiliza e protege os dados pessoais dos visitantes deste site, conforme a LGPD.',
  },
  terms: {
    path: '/termos-de-uso',
    title: 'Termos de Uso | Barbearia Arrumadinho',
    description:
      'Termos e condições de uso do site da Barbearia Arrumadinho, barbearia e escola de barbeiros em Colombo/PR.',
  },
}

// Sem `path`: não é uma URL, é a resposta para qualquer URL desconhecida.
export const NOT_FOUND_META = {
  title: 'Página não encontrada | Barbearia Arrumadinho',
  description: 'A página que você procura não existe ou foi movida.',
  noindex: true,
}

export const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`
