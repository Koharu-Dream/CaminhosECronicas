# Caminhos e Crônicas

Notas de planejamento do projeto.

## A ideia

Isso nasceu como trabalho da faculdade (Avaliação Prática 1), mas quero que continue útil depois da nota. É uma ferramenta para o mestre de D&D 2014 usar na preparação e durante a sessão: acompanhar a viagem do grupo, sortear eventos, consultar NPCs e lugares, guardar anotações da campanha. Precisa funcionar bem no celular, porque é ali que ela vai ser usada de verdade, com o mestre no meio da mesa.

Não pretendo implementar as regras do jogo. Nada de ficha de personagem, sistema de combate ou bestiário. A ferramenta é um apoio para o mestre, e só.

## O que o professor pede

Usar o que vimos em aula: Next.js com Pages Router (ou React com Vite), numa SPA que tenha:

- componentes reutilizáveis, cada um no seu arquivo, com `import` e `export default`;
- um componente base (o Card) que recebe props, alimentado por arrays de objetos em JSON e renderizado com `.map()` e `key`;
- pelo menos uma funcionalidade com `useState` disparada por `onClick`;
- no mínimo duas rotas, navegação sem recarregar a página e um botão de voltar reutilizável;
- CSS com Flexbox, funcionando em desktop, tablet e celular;
- repositório público no GitHub com `.gitignore` e README, deploy na Vercel e nenhum erro relevante no console.

A entrega são dois links (repositório e Vercel), pelo Teams, até 03/10 às 23h59. A nota se divide assim: componentização 2,0, props e `.map()` 2,0, estado e interatividade 2,0, roteamento 1,5, layout 1,5 e entrega 1,0.

Por isso a regra é simples: os itens da nota vêm antes de qualquer funcionalidade extra.

## Como o app deve funcionar

O fluxo que imagino numa sessão: escolho a campanha, vejo o resumo no dashboard, abro a viagem e vou mudando as condições conforme o grupo decide as coisas. Quando faz sentido, sorteio um evento e, se não servir, rolo de novo. No meio disso, consulto um NPC ou um lugar e sigo em frente.

### Campanhas e dashboard

Uma campanha tem nome, descrição, data de criação e o estado atual: local, dia, hora, clima e quanto falta para chegar. O dashboard é a tela central, mostra esse resumo e leva para as ferramentas. Não preciso de permissões nem de nada complexo por enquanto.

### Tracker de viagem

É a parte mais importante do projeto. Não quero uma calculadora, quero que a viagem seja um estado que muda enquanto a aventura acontece.

O mestre cria a viagem com origem, destino, distância, número de personagens, ritmo e terreno. O app calcula o que já foi percorrido, o que falta, quantos dias de viagem restam e quantas rações o grupo precisa. Depois, durante o caminho, dá para trocar terreno, ritmo e clima, e cada mudança entra num histórico com o motivo. Por exemplo:

```
Dia 3
Terreno: Estrada → Floresta
Motivo: o grupo decidiu pegar uma trilha alternativa
```

Para o cálculo, uso os ritmos das regras do jogo convertidos para km: lento 29 km/dia, normal 38 e rápido 48. Terreno difícil (floresta, montanha, pântano) corta a velocidade pela metade.

Ficaram para depois: horário dentro do dia, alterar a distância no meio do caminho, desvios de rota.

### Gerador de eventos

Um botão sorteia um evento. Cada evento tem título, descrição, categoria, ambiente e dificuldade. Dá para filtrar por ambiente, tema e dificuldade antes de sortear. Se o resultado não servir, rolo de novo, e as tentativas anteriores ficam listadas. Mais para frente esse histórico pode entrar no registro da campanha.

### NPCs, locais e tabelas

NPCs têm nome, raça, ocupação, local, personalidade e notas. Os locais seguem a mesma lógica, começando por uma base pequena de Forgotten Realms (Waterdeep, Neverwinter, Baldur's Gate, a Floresta de Ardeep...) que possa crescer depois.

Também quero tabelas de encontro por faixa de d100. Um exemplo, floresta de dia:

```
01-20  Animais
21-35  Viajantes
36-50  Monstros
51-65  Facções
66-80  Descoberta
81-00  Evento especial
```

### Conteúdo do próprio usuário

O mestre precisa poder criar seus próprios NPCs, eventos, locais, tabelas e notas, sem depender só dos JSONs que já vêm no projeto. Na primeira versão isso só existe para NPCs, e ainda não persiste.

## Dados e armazenamento

Na primeira versão, os dados fixos ficam em arquivos JSON dentro de `src/data`. Depois, o que o usuário criar vai para o Supabase (PostgreSQL). Para não amarrar o código a uma coisa só, a ideia é ter uma camada de armazenamento no meio, de forma que dê para trocar entre guardar no navegador (IndexedDB) e guardar online. Isso não entra na entrega da faculdade, só serve de norte para a estrutura não atrapalhar.

Um rascunho de como o banco poderia ficar:

```
users
└── campaigns
    ├── journeys
    │   ├── journey_segments
    │   ├── journey_changes
    │   └── journey_events
    ├── npcs
    ├── locations
    ├── campaign_events
    └── notes
```

Os eventos genéricos ficam numa tabela `events` à parte e são ligados às campanhas ou viagens. Não vou montar nada disso antes de precisar.

## O que fica de fora (por enquanto)

Ficha completa de personagem, combate, bestiário, mapas complexos, marketplace, parte social, pagamentos, integração com várias APIs, IA e aplicativo nativo. Tudo isso é tentador, mas não é o que vale nota e engordaria o projeto sem necessidade.

A regra para decidir qualquer coisa: funcionalidade, depois simplicidade, depois organização, depois aparência, e só no fim complexidade. Se uma tecnologia nova não resolver um problema real, ela não entra.

## Ordem de trabalho

1. Base do projeto, layout, componentes, rotas, dados em JSON, cards com `.map()`, props, `useState` e o gerador de eventos.
2. Campanhas, dashboard, NPCs e viagem.
3. Viagem dinâmica com histórico, filtros e reroll.
4. Locais e tabelas personalizadas.
5. Supabase: persistência, autenticação e CRUD.

Cada etapa só começa quando a anterior estiver funcionando.

## Como está hoje (30/09)

Já existem seis rotas (`/`, `/campaigns`, `/campaigns/[id]`, `/travel`, `/events` e `/npcs`), com Header, Footer e botão de voltar. O gerador de eventos tem filtros e reroll com histórico, dá para adicionar e remover NPCs, e o tracker de viagem calcula distância, dias e rações e registra as mudanças. O projeto está publicado na Vercel.

Falta: locais, tabelas de encontro, persistência dos dados criados pelo usuário e a viagem separada por campanha (hoje `/travel` e `/events` são globais).

## Visão futura

Se o projeto crescer depois da faculdade, algumas coisas que gostaria de ter: modo de sessão, linha do tempo completa da campanha, quests, facções, relações entre NPCs, mapas, geradores mais inteligentes, bestiário, itens e tesouros, e funcionar offline como PWA. Nada disso é obrigatório agora, mas a estrutura do código não deve impedir.
