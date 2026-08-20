import { createContext } from 'react'

// Em módulo separado do AuthProvider: um arquivo que exporta componente não
// pode exportar mais nada, ou o Fast Refresh do Vite para de funcionar nele.
export const AuthContext = createContext(null)
