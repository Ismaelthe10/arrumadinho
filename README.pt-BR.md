# Barbearia Arrumadinho

[English](README.md) · **Português**

Site institucional e CMS leve para uma barbearia e escola de barbeiros em Colombo, Paraná. Projeto freelance para um negócio real — o cliente edita todas as seções do site por uma área administrativa privada, sem depender de desenvolvedor e sem novo deploy.

🔗 **[www.barbeariaarrumadinho.com.br](https://www.barbeariaarrumadinho.com.br)**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firestore-12-FFCA28?logo=firebase&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)

---

## Por que existe

Negócio local costuma receber uma de duas coisas: um site estático que envelhece porque toda troca de texto exige um desenvolvedor, ou um CMS pesado que custa mais para hospedar do que o site vale.

Este projeto segue um terceiro caminho. O site público é uma SPA estática servida na borda, mas todo o conteúdo — imagens do carrossel, serviços, preços, produtos, cursos, galeria — vive no Firestore e é editado por uma área administrativa feita sob medida. Publicar uma alteração leva segundos e não encosta em código.

## Destaques

**Conteúdo é dado, não marcação.** Todas as seções públicas leem do Firestore. Adicionar um produto ou reordenar serviços é o envio de um formulário, não um pull request.

**O admin nunca chega ao público.** A aplicação administrativa inteira está atrás de um import dinâmico no nível da rota, e cada seção dentro dela é carregada sob demanda por cima disso — 27 kB gzip que quem nunca abre `/admin` jamais baixa. O Firebase Auth foi isolado em um módulo próprio pelo mesmo motivo: as páginas públicas só precisam do Firestore, então o SDK de autenticação fica fora do bundle delas.

**Visitas repetidas renderizam antes da rede responder.** O conteúdo público é cacheado em `localStorage` e servido como estado inicial do React, e revalidado em segundo plano — stale-while-revalidate. Antes, cada seção montava vazia e esperava uma cadeia estritamente serial: baixar e parsear o SDK do Firestore, inicializar o App Check, resolver o token do reCAPTCHA e só então consultar. Nada disso bloqueia mais o primeiro paint.

**Navegar custa um chunk de rota, não um carregamento de página.** Os links do header e do footer eram âncoras simples, então cada clique interno descartava a SPA e reexecutava React, Firebase, App Check e reCAPTCHA do zero. Agora passam pelo roteador, e o chunk de cada rota é pré-carregado no hover, no foco ou no toque — normalmente ele já chegou quando o clique acontece.

**Imagens dimensionadas por viewport.** Os uploads vão para o Cloudinary; as URLs de entrega carregam `f_auto,q_auto` mais um `srcset` de larguras candidatas e um `sizes` derivado das medidas reais de cada grid. Um celular de 390 px deixa de baixar a variante de 1200 px feita para desktop. A imagem de LCP é pré-carregada a partir do HTML, em vez de ser descoberta só depois que o bundle é parseado, e a segunda foto do carrossel é adiada até pouco antes de aparecer.

**Dados estruturados renderizados estaticamente.** O grafo JSON-LD do tipo `BarberShop` fica direto no `index.html`, em vez de ser injetado pelo React, para que rastreadores que não executam JavaScript também leiam endereço, horários, telefone e geolocalização do negócio. As demais páginas referenciam esse nó pelo `@id` em vez de redeclarar a empresa inteira.

**Fonte única de verdade para os dados do negócio.** Nome, endereço, telefone, horários e geolocalização são definidos uma única vez em `src/config/site.js` e consumidos pela interface, pelo JSON-LD e pelos links de WhatsApp. Consistência de NAP é sinal direto de SEO local, e divergência entre site e diretórios é uma das causas mais comuns de local pack fraco.

## Performance

Medido antes e depois, sobre o build de produção:

| | Antes | Depois | |
|---|---|---|---|
| Assets estáticos em `public/` | 35,8 MB | 1,1 MB | **-97%** |
| Hero no carregamento, celular 390 px DPR 2 | 316,9 kB | 130,3 kB | **-59%** |
| Hero no carregamento, celular 390 px DPR 1 | 316,9 kB | 67,8 kB | **-79%** |
| Navegação interna para `/cursos` | 244,5 kB | 7,2 kB | **-97%** |
| Bundle JS público, não comprimido | 1.161 kB | 789 kB | **-32%** |
| CSS público, não comprimido | 114 kB | 25 kB | **-78%** |
| Latência do Firestore antes do primeiro paint, visita repetida | 397-474 ms | 0 ms | |

As linhas de bundle são sem compressão; todos os outros tamanhos são gzip. Essa redução veio principalmente de descartar o `@primer/react` — importado em um único arquivo, com tokens de design que nenhum CSS do projeto usava — responsável por cerca de três quartos dela. Mover o admin e o `firebase/auth` para chunks sob demanda responde pelo quarto restante.

De onde vêm os números: os tamanhos são valores gzip do build de produção e das URLs reais de entrega do Cloudinary em cada largura candidata; as latências são round-trips medidos contra o endpoint REST do Firestore. São medidas de transferência e latência, não notas de Lighthouse.

Dois deles merecem contexto. A redução em `public/` foi peso morto, não compressão — 31 arquivos de imagem remanescentes da fase anterior ao Cloudinary, ainda publicados a cada build porque nada os havia removido. E o número de navegação descreve cache frio: com cache quente os assets grandes já estavam locais, mas continuavam sendo parseados e executados a cada clique interno, que é o custo que de fato pesa num celular intermediário.

## Stack

| Camada | Escolha |
|---|---|
| UI | React 19, React Router 7 |
| Build | Vite 8 |
| Estilo | CSS Modules, custom properties para tema |
| Dados | Cloud Firestore |
| Autenticação | Firebase Authentication (provedor Google) |
| Mídia | Cloudinary (upload unsigned pelo navegador) |
| Hospedagem | Vercel |
| Lint | ESLint 10 |

## Arquitetura

```
Visitante ─▶ Vercel (SPA estática)
               │
               ├──▶ Firestore ......... conteúdo (leitura para o público)
               └──▶ Cloudinary ........ imagens, transformadas na entrega

Dono ──────▶ /admin ──▶ login Google ──▶ Firestore (escrita)
                                   └──▶ Cloudinary (upload)
```

Não existe backend próprio. O site é composto de arquivos estáticos mais dois serviços gerenciados, o que mantém o custo de hospedagem praticamente zerado para este perfil de tráfego e elimina um servidor da superfície de manutenção.

## Como rodar

**Requisitos:** Node.js 20+ e npm.

```bash
git clone https://github.com/Ismaelthe10/arrumadinho.git
cd arrumadinho
npm install
# crie um arquivo .env na raiz do projeto — veja Variáveis de ambiente abaixo
# preencha o .env com suas próprias credenciais de Firebase e Cloudinary
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

Você vai precisar de um projeto Firebase próprio (com Firestore habilitado) e de uma conta Cloudinary com um upload preset unsigned. O repositório não inclui nenhuma credencial, propositalmente.

## Variáveis de ambiente

Crie um arquivo .env na raiz do projeto. Todas as variáveis são obrigatórias.

| Variável | Para que serve |
|---|---|
| `VITE_FIREBASE_API_KEY` | Config do app Web no Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Config do app Web no Firebase |
| `VITE_FIREBASE_PROJECT_ID` | Config do app Web no Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | Config do app Web no Firebase |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Config do app Web no Firebase |
| `VITE_FIREBASE_APP_ID` | Config do app Web no Firebase |
| `VITE_RECAPTCHA_SITE_KEY` | Site key do reCAPTCHA v3 usado pelo Firebase App Check |
| `VITE_CLOUDINARY_CLOUD_NAME` | Identificador da conta Cloudinary |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Nome do upload preset unsigned |

> **Um aviso para quem for manter isto depois.** Tudo que começa com `VITE_` é embutido no bundle JavaScript durante o build e, portanto, pode ser lido por qualquer visitante do site. Isso é esperado — são identificadores públicos de cliente, não segredos, e as plataformas foram desenhadas partindo dessa premissa. Mas significa que **nenhum segredo de verdade pode ser adicionado a este arquivo.** API secret, chave de service account ou token privado pertencem a um ambiente de servidor, nunca a uma variável `VITE_`.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento do Vite |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Roda o ESLint no projeto |

## Estrutura

```
src/
├── components/     Seções do site público (Hero, Services, Products, FAQ, …)
├── pages/          Rotas públicas (Home, Cursos, Sobre, páginas legais, 404)
├── admin/          Aplicação administrativa — carregada sob demanda, autocontida
│   ├── pages/      Um editor por seção do site
│   ├── hooks/      Edição de listas e documentos no Firestore, upload Cloudinary
│   ├── components/ Layout, navegação, campo de upload de imagem
│   └── context/    Estado de autenticação
├── hooks/          Cache stale-while-revalidate do conteúdo público
├── routes/         Importadores das rotas lazy, compartilhados com o prefetch
├── infra/          Inicialização do Firebase e os fetchers de conteúdo público
├── config/         Dados do negócio — fonte única de verdade
├── content/        Textos estáticos (FAQ)
├── utils/          URLs e srcset do Cloudinary, cache em localStorage
└── styles/         Tokens de tema

public/             Assets estáticos, favicons, sitemap, robots.txt
```

## Modelo de conteúdo

As seções públicas leem destas coleções do Firestore:

| Caminho | Conteúdo |
|---|---|
| `hero/carousel` | Imagens do carrossel da home |
| `mainServices` | Cards de serviços principais |
| `services/extra` | Lista de serviços adicionais |
| `products` | Catálogo de produtos |
| `courses` | Catálogo de cursos |
| `space/gallery` | Galeria de fotos do espaço |

## Área administrativa

O site conta com uma área administrativa privada, usada pelo proprietário para gerenciar o conteúdo acima. O acesso exige autenticação, e as permissões de escrita são validadas no servidor, não na interface. Os detalhes de configuração são mantidos fora deste repositório.

## Deploy

Hospedado na Vercel. O `vercel.json` reescreve todas as rotas para `index.html`, de modo que o roteamento client-side funcione em acesso direto e refresh. As variáveis de ambiente são configuradas no painel da Vercel; pushes na `main` disparam deploy automático.

## Licença

Trabalho comercial produzido para um cliente. O código-fonte está publicado para fins de portfólio e referência; não é licenciado para reuso ou redistribuição. Identidade visual, fotografia e conteúdo do negócio pertencem à Barbearia Arrumadinho.

---

Feito por [Ismael Monteiro](https://github.com/Ismaelthe10).
