import { useContext } from 'react'
import { UnsavedChangesContext } from './unsavedChangesContext.js'

const CONFIRM_MESSAGE =
  'Você tem alterações que ainda não foram salvas. Se sair agora, elas serão perdidas. Deseja sair mesmo assim?'

// Fora do provider nada quebra: o painel apenas volta a não avisar.
const INERT = { hasUnsavedChanges: false, setDirtySource: () => {} }

export function useUnsavedChanges() {
  return useContext(UnsavedChangesContext) ?? INERT
}

/**
 * Handler de clique para qualquer link ou botão que tire o usuário da seção
 * atual. Cancela a navegação se houver edição pendente e o usuário desistir.
 */
export function useNavigationGuard() {
  const { hasUnsavedChanges } = useUnsavedChanges()

  return function guard(event) {
    if (!hasUnsavedChanges) return true
    if (window.confirm(CONFIRM_MESSAGE)) return true

    event?.preventDefault()
    return false
  }
}
