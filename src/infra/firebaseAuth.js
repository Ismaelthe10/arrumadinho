import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { app } from './firebase'

// Separado de ./firebase porque só o painel administrativo autentica. Importar
// daqui a partir de código público traria o firebase/auth de volta ao bundle
// que todo visitante baixa.
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
