import { createContext } from 'react'

// O objeto de contexto vive num módulo só dele: um arquivo que exporta um
// componente não pode exportar mais nada, ou o Fast Refresh do Vite deixa de
// funcionar para esse arquivo.
export const UnsavedChangesContext = createContext(null)
