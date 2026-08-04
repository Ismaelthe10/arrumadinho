export function optimizeCloudinaryUrl(url, width) {
  if (!url || !url.includes('res.cloudinary.com')) return url
 
  const transformations = ['f_auto', 'q_auto']
  if (width) transformations.push(`w_${width}`)
 
  return url.replace('/upload/', `/upload/${transformations.join(',')}/`)
}