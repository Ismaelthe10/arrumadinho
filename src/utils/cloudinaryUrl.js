// Larguras candidatas oferecidas ao navegador. Cobrem de celular 1x a desktop
// retina; o Cloudinary gera cada variante sob demanda e a mantém em cache.
const DEFAULT_WIDTHS = [320, 480, 640, 800, 1000, 1200]

export function optimizeCloudinaryUrl(url, width) {
  if (!url || !url.includes('res.cloudinary.com')) return url

  const transformations = ['f_auto', 'q_auto']
  if (width) transformations.push(`w_${width}`)

  return url.replace('/upload/', `/upload/${transformations.join(',')}/`)
}

/**
 * Monta o srcset para uma imagem do Cloudinary.
 *
 * Sem isto, todo dispositivo baixa a mesma largura fixa — o Hero servia w_1200
 * (121 kB) até para um celular de 390 px, que precisa de w_800 no máximo. Com
 * srcset + sizes o navegador escolhe a variante certa antes de baixar.
 *
 * Retorna undefined para URLs que não são do Cloudinary, para que o atributo
 * simplesmente não seja emitido e o src continue valendo.
 */
export function cloudinarySrcSet(url, widths = DEFAULT_WIDTHS) {
  if (!url || !url.includes('res.cloudinary.com')) return undefined

  return widths.map((w) => `${optimizeCloudinaryUrl(url, w)} ${w}w`).join(', ')
}
