import { Component } from 'react'
import styles from './SectionErrorBoundary.module.css'

/**
 * Contém uma exceção dentro da área de conteúdo do painel.
 *
 * Sem isto, qualquer erro em um editor derruba o painel inteiro em tela branca,
 * sem caminho de recuperação para quem não é técnico. Como a barreira fica
 * dentro do DashboardLayout, a sidebar e o cabeçalho continuam pintados: dá
 * para trocar de seção mesmo com a atual quebrada.
 *
 * Precisa ser classe — não existe equivalente em hook para componentDidCatch.
 * O DashboardLayout a remonta a cada rota (via prop key), o que zera o estado
 * de erro ao navegar para outra seção.
 */
export default class SectionErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Erro na seção do painel:', error, info)
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div className={styles.box} role="alert">
        <h2 className={styles.title}>Esta seção não pôde ser carregada</h2>
        <p className={styles.text}>
          Algo deu errado ao exibir este editor. As outras seções continuam
          funcionando — use o menu ao lado para seguir trabalhando.
        </p>
        <p className={styles.text}>
          Nenhuma alteração foi enviada. Se o erro se repetir, recarregue a
          página e tente de novo.
        </p>

        <button
          type="button"
          onClick={() => this.setState({ error: null })}
          className={styles.retry}
        >
          Tentar novamente
        </button>

        <details className={styles.details}>
          <summary>Detalhes técnicos</summary>
          <pre className={styles.pre}>{String(error?.message || error)}</pre>
        </details>
      </div>
    )
  }
}
