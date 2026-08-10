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
// Coordenadas do endereço, conforme o Google Maps. Números separados porque o
// schema.org exige latitude e longitude como propriedades distintas.
export const GEO = {
  latitude: -25.37684393350955,
  longitude: -49.19114916634053,
}

export const INSTAGRAM = 'https://www.instagram.com/barbeariaarrumadinho/'
export const SOCIAL_LINKS = [INSTAGRAM]

export const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS.full)}&output=embed`
export const GOOGLE_REVIEWS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BUSINESS_NAME} ${ADDRESS.full}`)}`

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
