# Google Business Profile — checklist

Para a busca "barbearia" e variações, o Google responde com o *local pack* (mapa
+ 3 negócios). Essa escolha vem majoritariamente do perfil, não do site. Este é
o item de maior impacto do projeto, e é o único que não se resolve em código.

Os valores abaixo são os que estão em [`src/config/site.js`](../src/config/site.js).
Use exatamente estes — divergência de NAP (nome, endereço, telefone) entre site
e perfil é uma das causas mais comuns de local pack fraco.

## 1. Identificação

| Campo | Valor |
|---|---|
| Nome | `Barbearia Arrumadinho` |
| Endereço | `R. Huxley, 317 - Guarani, Colombo - PR, 83408-180` |
| Telefone | `+55 41 99849-6829` |
| Site | `https://www.barbeariaarrumadinho.com.br` |

⚠️ O nome deve ser só `Barbearia Arrumadinho`. Não acrescente cidade nem
serviços ("Barbearia Arrumadinho — Barbearia em Colombo") — é violação das
diretrizes do Google e motivo de suspensão do perfil.

## 2. Categorias — o item de maior alavancagem

- **Principal:** `Barbearia`
- **Secundária:** `Escola de barbeiro` (ou `Escola profissionalizante`)

Sem a secundária, os cursos simplesmente não aparecem no Maps para quem busca
formação na região de Curitiba. É a diferença entre atender só o bairro e
atender toda a região metropolitana no negócio de maior ticket.

Considere também `Salão de beleza` como terceira, por causa de colorimetria,
luzes e hidratação.

## 3. Horário de funcionamento

| Dia | Horário |
|---|---|
| Domingo | Fechado |
| Segunda-feira | 14:00 – 19:00 |
| Terça a sexta | 09:00 – 19:00 |
| Sábado | 09:00 – 17:00 |

Mantenha sincronizado com o rodapé do site. Se mudar, altere em
`src/config/site.js` — o site inteiro e o JSON-LD leem de lá.

## 4. Descrição (máx. 750 caracteres)

Sugestão, ~540 caracteres:

> A Barbearia Arrumadinho atende em Colombo, no Paraná, desde agosto de 2017, no
> bairro Guarani — a poucos minutos da divisa com Curitiba. Trabalhamos com corte
> de cabelo masculino, barba na navalha, colorimetria, luzes e platinado, além de
> sobrancelha, pezinho, selagem e hidratação. Também vendemos produtos
> profissionais para cabelo e barba. Além do atendimento, formamos novos
> barbeiros: nossos cursos vão do iniciante ao aperfeiçoamento de quem já atua no
> mercado, com prática intensiva, mentoria e certificação.

Não inclua URL, telefone nem promoção na descrição — o Google rejeita.

## 5. Serviços

Cadastre **todos**, um a um, com descrição curta. Serviço cadastrado é termo
pelo qual o perfil pode ser encontrado; serviço não cadastrado não existe.

Principais: Corte de Cabelo · Barba · Colorimetria

Demais: Cabelo + Barba · Meia barba · Cavanhaque · Sobrancelha · Pezinho ·
Depilação de nariz e ouvido · Selagem · Hidratação · Luzes/Platinado

Cursos (se a categoria secundária for criada): Curso para Iniciantes · Curso
Extensivo para Barbeiros (40h) · Curso de Aperfeiçoamento Prático (8h)

## 6. Fotos

Meta inicial: 20+. Ordem de importância:

1. Fachada (é o que confirma ao cliente que chegou no lugar certo)
2. Interior / ambiente
3. Trabalhos prontos — antes e depois de corte, barba e colorimetria
4. Equipe
5. Logo e foto de capa

Fotos tiradas no local, com o celular, superam banco de imagens. Suba algumas
por mês em vez de todas de uma vez — atividade recente conta.

## 7. Avaliações — o segundo fator mais forte

394 avaliações com nota 5,0 é uma base excelente. O que pesa daqui em diante é a
**constância**, não o total acumulado.

- Peça ao final do atendimento, com QR code no espelho ou link no WhatsApp
- **Responda todas**, inclusive as boas. Resposta é sinal de perfil ativo
- Meta realista: 8–15 novas por mês, de forma constante
- Nunca compre avaliação nem incentive com desconto — é motivo de penalidade

## 8. Depois de criar o perfil

- [ ] Ativar mensagens, se for atender por lá (senão, deixe desligado — perfil
      com mensagem sem resposta é pior que sem mensagem)
- [ ] Preencher a seção de Perguntas e Respostas com as mesmas perguntas do FAQ
      do site (`src/content/faq.js`) — você mesmo pode publicar e responder
- [ ] Publicar um post por semana (novidade, promoção, turma de curso abrindo)
- [ ] **Enviar a URL do perfil no Google Maps para incluir no JSON-LD do site**
      (`sameAs` e `hasMap` em `index.html`). É isso que amarra explicitamente o
      site à ficha do Google — hoje essa ligação não existe

## 9. Consistência de NAP em outros diretórios

Mesmo nome, endereço e telefone, caractere por caractere:

Apple Business Connect · Bing Places · Waze · Foursquare · GuiaMais ·
Telelistas · Instagram (bio com link para o site, não só WhatsApp)
