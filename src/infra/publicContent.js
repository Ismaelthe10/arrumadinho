import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

// Fetchers do conteúdo público, um por chave de cache.
//
// Ficam no escopo do módulo de propósito: useCachedContent recebe a função como
// dependência do efeito, então ela precisa ter identidade estável. Se fossem
// declaradas dentro dos componentes, uma nova função a cada render dispararia
// uma nova busca a cada render.

async function listOrdered(collectionName) {
  const snap = await getDocs(query(collection(db, collectionName), orderBy('order')))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

async function readArrayField(pathSegments, field) {
  const snap = await getDoc(doc(db, ...pathSegments))
  const value = snap.exists() ? snap.data()?.[field] : null
  return Array.isArray(value) ? value : []
}

export const fetchHeroImages = () => readArrayField(['hero', 'carousel'], 'images')
export const fetchSpacePhotos = () => readArrayField(['space', 'gallery'], 'photos')
export const fetchExtraServices = () => readArrayField(['services', 'extra'], 'extraServices')

export const fetchMainServices = () => listOrdered('mainServices')
export const fetchProducts = () => listOrdered('products')
export const fetchCourses = () => listOrdered('courses')
