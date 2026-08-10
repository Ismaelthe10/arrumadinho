// Fonte única de verdade para os dados do negócio (NAP: Name, Address, Phone).
// Consistência entre site, JSON-LD e diretórios externos é sinal direto de SEO local —
// qualquer divergência aqui se propaga para o Google. Alterar em um lugar só.

export const SITE_URL = 'https://www.barbeariaarrumadinho.com.br'
export const BUSINESS_NAME = 'Barbearia Arrumadinho'

// @id do nó BarberShop declarado estaticamente no index.html. Outras páginas
// referenciam este id em vez de redeclarar o negócio inteiro.
export const BUSINESS_ID = `${SITE_URL}/#business`
export const CNPJ = '36.188.858/0001-79'
export const FOUNDING_DATE = '2017-08'
export const FOUNDER = 'Dirceu Aparecido Soltoski'
export const OWNER = 'Allan Tortato'

export const PHONE_E164 = '+5541998496829'
export const WHATSAPP_NUMBER = '5541998496829'

export const ADDRESS = {
  street: 'R. Huxley, 317',
  neighborhood: 'Guarani',
  city: 'Colombo',
  region: 'PR',
  postalCode: '83408-180',
  country: 'BR',
  full: 'R. Huxley, 317 - Guarani, Colombo - PR, 83408-180',
}
// Coordenadas do pin oficial da ficha no Google Maps (extraídas da URL do
// perfil). Números separados porque o schema.org exige latitude e longitude
// como propriedades distintas.
export const GEO = {
  latitude: -25.376884,
  longitude: -49.1911567,
}

// CID da ficha no Google Business Profile. A URL curta compartilhada pelo
// perfil (maps.app.goo.gl) carrega parâmetros de sessão que expiram, então
// guardamos a forma canônica por CID, que é estável.
export const GOOGLE_PLACE_CID = '1906991965719408713'
export const GOOGLE_MAPS_URL = `https://www.google.com/maps?cid=${GOOGLE_PLACE_CID}`

export const INSTAGRAM = 'https://www.instagram.com/barbeariaarrumadinho/'
export const SOCIAL_LINKS = [INSTAGRAM]

export const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS.full)}&output=embed`

// Aponta direto para a ficha, em vez de uma busca por nome + endereço, que
// dependia de o Google acertar o resultado.
export const GOOGLE_REVIEWS_LINK = GOOGLE_MAPS_URL

// Fonte: perfil oficial do Google Business (confirmar periodicamente, pode mudar)
export const RATING = 5.0
export const REVIEW_COUNT = 394

// `closed: true` marca o dia sem atendimento — o Footer usa para estilizar e
// o JSON-LD para emitir a OpeningHoursSpecification correspondente.
export const OPENING_HOURS = [
  { day: 'Domingo', schemaDay: 'Sunday', closed: true },
  { day: 'Segunda-feira', schemaDay: 'Monday', opens: '14:00', closes: '19:00' },
  { day: 'Terça-feira', schemaDay: 'Tuesday', opens: '09:00', closes: '19:00' },
  { day: 'Quarta-feira', schemaDay: 'Wednesday', opens: '09:00', closes: '19:00' },
  { day: 'Quinta-feira', schemaDay: 'Thursday', opens: '09:00', closes: '19:00' },
  { day: 'Sexta-feira', schemaDay: 'Friday', opens: '09:00', closes: '19:00' },
  { day: 'Sábado', schemaDay: 'Saturday', opens: '09:00', closes: '17:00' },
]

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const SCHEDULING_LINK = buildWhatsAppLink('Olá, gostaria de agendar um horário!')

export function buildInterestLink(kind, title) {
  return buildWhatsAppLink(`Olá! Tenho interesse no ${kind} "${title}"`)
}
