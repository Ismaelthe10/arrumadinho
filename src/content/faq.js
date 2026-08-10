import { ADDRESS, OPENING_HOURS } from '../config/site'

// Todas as respostas abaixo derivam de dados que já existiam no site (endereço,
// horários, lista de serviços, carga horária e parcelamento dos cursos).
// Nada aqui foi inventado — ao acrescentar perguntas novas, mantenha o critério:
// só afirmar o que a barbearia realmente pratica.

const weekdayHours = OPENING_HOURS.find((d) => d.schemaDay === 'Tuesday')
const saturdayHours = OPENING_HOURS.find((d) => d.schemaDay === 'Saturday')
const mondayHours = OPENING_HOURS.find((d) => d.schemaDay === 'Monday')

export const HOME_FAQ = [
  {
    question: 'Onde fica a Barbearia Arrumadinho?',
    answer: `Ficamos na ${ADDRESS.full}. O bairro ${ADDRESS.neighborhood} fica próximo à divisa de Colombo com Curitiba, o que facilita o acesso para quem vem da região metropolitana. O mapa com a localização exata está nesta mesma página.`,
  },
  {
    question: 'Qual é o horário de funcionamento?',
    answer: `De terça a sexta atendemos das ${weekdayHours.opens} às ${weekdayHours.closes}. Na segunda-feira o atendimento começa mais tarde, das ${mondayHours.opens} às ${mondayHours.closes}. Aos sábados, das ${saturdayHours.opens} às ${saturdayHours.closes}. Não abrimos aos domingos.`,
  },
  {
    question: 'Como faço para agendar um horário?',
    answer:
      'O agendamento é feito pelo WhatsApp. É só clicar em qualquer botão de "Agendar horário" no site que a conversa abre direto com a barbearia, e a gente combina o melhor dia e horário.',
  },
  {
    question: 'Quais serviços vocês oferecem?',
    answer:
      'Os principais são corte de cabelo, barba e colorimetria. Além deles, atendemos cabelo + barba, meia barba, cavanhaque, sobrancelha, pezinho, depilação de nariz e ouvido, selagem, hidratação e luzes/platinado.',
  },
  {
    question: 'Vocês fazem colorimetria e luzes?',
    answer:
      'Sim. Trabalhamos com colorimetria e com luzes/platinado, usando técnicas de coloração pensadas para transformar o visual preservando a saúde do fio. Como o procedimento varia bastante de pessoa para pessoa, o ideal é conversar pelo WhatsApp antes para avaliarmos o seu caso.',
  },
  {
    question: 'Vocês vendem produtos para cabelo e barba?',
    answer:
      'Sim. Trabalhamos com uma linha selecionada de produtos profissionais — pomadas, óleo e balm para barba, shampoos, minoxidil, protetor térmico e leave-in, entre outros. A venda é feita na barbearia e também pelo WhatsApp.',
  },
  {
    question: 'A barbearia oferece curso de barbeiro?',
    answer:
      'Sim. Temos três formações: um curso para iniciantes, que leva do zero ao nível profissional; um curso extensivo de 40 horas para quem já atua na área; e um curso de aperfeiçoamento prático de 8 horas, em um único dia. Os detalhes estão na página de Cursos.',
  },
  {
    question: 'Há quanto tempo a barbearia existe?',
    answer:
      'Desde agosto de 2017. A Arrumadinho foi fundada por Dirceu Aparecido Soltoski e, desde maio de 2024, tem Allan Tortato como proprietário — ele começou na barbearia como funcionário em 2018.',
  },
]

export const COURSES_FAQ = [
  {
    question: 'Preciso ter experiência para fazer o curso?',
    answer:
      'Não. O curso para iniciantes foi montado justamente para quem quer entrar na profissão e vai aprender do zero, com acompanhamento prático e metodologia estruturada. Quem já atua na área tem duas opções mais avançadas: o extensivo e o de aperfeiçoamento prático.',
  },
  {
    question: 'Os cursos emitem certificado?',
    answer:
      'Sim. Ao concluir a formação você recebe um certificado que valida o que foi aprendido e pode ser apresentado no mercado.',
  },
  {
    question: 'Qual é a carga horária de cada curso?',
    answer:
      'O curso de aperfeiçoamento prático tem 8 horas, concentradas em um único dia. O extensivo para barbeiros tem 40 horas, distribuídas em cerca de 17 dias. O curso para iniciantes é o mais completo, indo do nível zero ao profissional.',
  },
  {
    question: 'Em que dias e horários acontecem as aulas?',
    answer:
      'O curso extensivo e o de iniciantes acontecem de segunda a quinta-feira, das 8h30 às 22h30. O de aperfeiçoamento prático é realizado em um dia único, com 8 horas de duração.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer:
      'É possível parcelar em até 3x sem juros. Para saber valores e condições atualizadas, fale com a gente pelo WhatsApp.',
  },
  {
    question: 'As aulas são práticas ou teóricas?',
    answer:
      'A formação é focada na prática. Cada aula trabalha técnicas reais com modelos, e os instrutores acompanham o desenvolvimento de cada aluno de perto ao longo do curso.',
  },
  {
    question: 'Onde os cursos são realizados?',
    answer: `Na própria barbearia, na ${ADDRESS.full}. Isso significa aprender dentro de um ambiente profissional em funcionamento, e não em uma sala de aula montada só para o curso.`,
  },
  {
    question: 'Como garanto minha vaga?',
    answer:
      'As turmas são limitadas. O primeiro passo é falar com a gente pelo WhatsApp para confirmar a disponibilidade da próxima turma e reservar sua vaga.',
  },
]

export function buildFaqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}
