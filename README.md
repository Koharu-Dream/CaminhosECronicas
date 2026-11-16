# Caminhos e Crônicas

Ferramenta web de apoio a Mestres de D&D 2014: gerador de eventos, NPCs,
campanhas e acompanhamento de viagem.

> **📱 Versão mobile (complemento):** este repositório também contém, na
> pasta [`mobile/`](./mobile), a adaptação do projeto em **React Native +
> Expo + Supabase**, feita para a disciplina de Desenvolvimento de
> Aplicações Mobile (Prof. Marcos Roberto de Moraes, FATEC Mogi Mirim).
> Inclui avisos do Mestre em tempo real (material MOBILE_009). A versão web
> original (Next.js) continua na raiz. Instruções em
> [`mobile/README.md`](./mobile/README.md).

- **Aplicação web:** https://caminhos-e-cronicas.vercel.app
- **Repositório:** https://github.com/Koharu-Dream/CaminhosECronicas

## Funcionalidades

- **Campanhas e dashboard:** lista de campanhas e painel com local, dia,
  hora, clima e distância restante.
- **Tracker de viagem:** cálculo de distância, dias e rações; mudança de
  ritmo, terreno e clima durante a viagem; histórico (timeline).
- **Gerador de eventos:** sorteio com filtros de ambiente, categoria e
  dificuldade, e reroll com histórico de tentativas.
- **NPCs:** cards com cadastro e remoção de NPCs.

## Tecnologias

Next.js (Pages Router), React, JavaScript, CSS Modules e Flexbox.
Deploy na Vercel.

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Página inicial |
| `/campaigns` | Lista de campanhas |
| `/campaigns/[id]` | Dashboard da campanha |
| `/travel` | Tracker de viagem |
| `/events` | Gerador de eventos |
| `/npcs` | Lista e cadastro de NPCs |

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Estrutura

- `src/components`: componentes reutilizáveis (Card, EventCard, NPCCard...)
- `src/data`: dados em JSON (eventos, NPCs, campanhas, regras de viagem)
- `src/pages`: rotas da aplicação
- `src/styles`: estilos globais
- `docs`: briefing e planejamento do projeto
- `mobile`: versão mobile (React Native + Expo + Supabase), com README próprio

## Limitações da versão web

Os dados criados pelo usuário (NPCs e viagem) ficam apenas na memória do
navegador e se perdem ao recarregar a página. A persistência com Supabase
foi implementada na versão mobile (pasta [`mobile/`](./mobile)).

## Autor

Caio Vitor Morais