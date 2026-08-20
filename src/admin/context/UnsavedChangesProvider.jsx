import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { UnsavedChangesContext } from './unsavedChangesContext.js'

/**
 * Rastreia se existe edição pendente em qualquer lugar do painel.
 *
 * É um conjunto de fontes, e não um booleano, porque uma seção pode montar mais
 * de um hook de dados: ServicesAdmin usa useFirestoreList para os serviços
 * principais e useFirestoreArrayDoc para os extras, ao mesmo tempo. Com um
 * booleano, o hook limpo apagaria o aviso do hook sujo.
 */
export function UnsavedChangesProvider({ children }) {
  const [dirtyCount, setDirtyCount] = useState(0)
  const sourcesRef = useRef(new Set())

  const setDirtySource = useCallback((id, isDirty) => {
    const sources = sourcesRef.current
    if (isDirty === sources.has(id)) return

    if (isDirty) sources.add(id)
    else sources.delete(id)

    setDirtyCount(sources.size)
  }, [])

  // Cobre fechar e recarregar a aba. A troca de seção é navegação client-side e
  // não dispara este evento — quem cuida dela é o useNavigationGuard.
  useEffect(() => {
    if (dirtyCount === 0) return

    function handleBeforeUnload(e) {
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [dirtyCount])

  const value = useMemo(
    () => ({ hasUnsavedChanges: dirtyCount > 0, setDirtySource }),
    [dirtyCount, setDirtySource],
  )

  return (
    <UnsavedChangesContext.Provider value={value}>
      {children}
    </UnsavedChangesContext.Provider>
  )
}
