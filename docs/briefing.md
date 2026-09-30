# DM COMPANION — Briefing do Projeto

## 1. Contexto do Projeto

Estou desenvolvendo um projeto acadêmico de desenvolvimento web chamado **DM Companion**, uma ferramenta para auxiliar Mestres de RPG durante a preparação e condução de aventuras de D&D 2014.

O projeto será desenvolvido inicialmente como trabalho acadêmico, mas quero estruturar o código de maneira organizada para que, futuramente, ele possa evoluir para um projeto pessoal mais completo chamado **DM OS**.

O DM Companion deve ser uma aplicação web responsiva, utilizável tanto em computador/navegador quanto em celular.

A proposta principal é criar uma ferramenta prática para o Mestre consultar e gerenciar:

- Viagens;
- Eventos;
- Encontros;
- NPCs;
- Localizações;
- Tabelas aleatórias;
- Dados de campanhas;
- Histórico da viagem;
- Informações personalizadas pelo usuário.

O projeto **NÃO** deve tentar implementar todas as regras de D&D. O foco é criar uma ferramenta de apoio ao Mestre.

## 2. Requisitos do Professor

O professor determinou que o projeto deve utilizar o ecossistema trabalhado durante o curso, com React + Vite ou Next.js via Pages Router.

A aplicação deve ser uma SPA reativa e demonstrar os seguintes conceitos:

### 2.1 Arquitetura de componentes modular

É obrigatório utilizar componentes reutilizáveis e organizados em diretórios próprios.

Exemplos:

- Header;
- Footer;
- Card;
- EventCard;
- NPCCard;
- LocationCard;
- BackButton;
- Botões;
- Componentes de formulário.

Deve existir uso correto de:

- import;
- export default;
- Componentização pai/filho.

Os componentes devem ser organizados de forma limpa e reutilizável.

## 3. Props e Renderização de Listas

O projeto deve possuir componentes que recebam informações por props.

Deve existir um componente base reutilizável, como:

- Card;
- EventCard;
- NPCCard;
- LocationCard.

Os dados devem vir de uma estrutura organizada, como arrays de objetos em arquivos JSON.

É obrigatório utilizar `.map()` para renderizar coleções.

Cada item renderizado com `.map()` deve possuir uma propriedade `key`, preferencialmente utilizando um ID único.

Exemplo conceitual:

```jsx
events.map(event => (
    <EventCard
        key={event.id}
        title={event.title}
        description={event.description}
    />
))
```

## 4. useState e Interatividade

O projeto deve utilizar `useState` para controlar funcionalidades interativas.

Deve existir interação através de `onClick`.

Algumas funcionalidades previstas:

- Gerar evento aleatório;
- Rerolar evento;
- Filtrar eventos;
- Alterar estado da viagem;
- Alterar ritmo;
- Alterar terreno;
- Alterar clima;
- Controlar formulários;
- Adicionar/remover NPCs;
- Abrir/fechar modais;
- Alterar quantidade de suprimentos.

## 5. Navegação SPA

A aplicação deve possuir pelo menos duas rotas distintas.

A navegação deve ocorrer sem recarregar a página.

Podemos utilizar:

- React Router;
- ou Pages Router do Next.js.

A aplicação deve possuir navegação intuitiva e um componente reutilizável de voltar.

Exemplo:

```
/
/campaigns
/campaigns/[id]
/campaigns/[id]/travel
/campaigns/[id]/events
/campaigns/[id]/npcs
/campaigns/[id]/locations
```

O número final de rotas pode ser simplificado caso necessário.

## 6. CSS e Flexbox

A aplicação deve utilizar CSS e Flexbox.

Deve ser responsiva.

O projeto precisa funcionar adequadamente em:

- Desktop;
- Notebook;
- Tablet;
- Celular.

A interface deve utilizar componentes visuais organizados, com espaçamento e hierarquia visual claros.

A prioridade é uma interface funcional e legível, não efeitos visuais complexos.

## 7. GitHub e Deploy

O projeto deve possuir:

- Repositório público no GitHub;
- `.gitignore` adequado para Node;
- `README.md` documentado;
- Aplicação publicada na Vercel;
- Aplicação funcional em produção;
- Nenhum erro relevante no console.

Os commits devem ser organizados e descritivos.

Exemplos:

```
feat: add campaign dashboard
feat: add event generator
feat: add travel calculator
feat: add npc cards
fix: fix event randomization
```

## 8. Entrega Acadêmica

O professor definiu como entregáveis:

- Link do repositório GitHub contendo o código-fonte e `README.md`;
- Link da aplicação publicada na Vercel.

A aplicação deve estar navegável e funcional.

## 9. Proposta do DM Companion

O DM Companion será um painel digital para auxiliar o Mestre durante uma campanha.

A aplicação deverá permitir:

### Dashboard

Mostrar um resumo da campanha.

Exemplo:

```
DM COMPANION

Campanha:
A Jornada do Norte

Local atual:
Floresta de Ardeep

Dia:
12

Hora:
18:40

Clima:
Chuva

Viagem:
38 km restantes

Próximo recurso:
Gerar evento
```

O dashboard deve servir como ponto central da aplicação.

## 10. Campanhas

O sistema deve possuir o conceito de campanha.

Uma campanha pode possuir:

- Nome;
- Descrição;
- Data de criação;
- Viagem atual;
- NPCs;
- Eventos;
- Localizações;
- Anotações.

Exemplo:

```
Campanha
├── Nome
├── Descrição
├── Viagens
├── Eventos
├── NPCs
├── Locais
└── Notas
```

Inicialmente os dados podem ser simples.

Não é necessário implementar um sistema complexo de permissões.

## 11. Tracker de Viagem

Esta é uma das principais funcionalidades do DM Companion.

A viagem não deve ser apenas uma calculadora simples.

Ela deve representar um estado que pode mudar durante a aventura.

O Mestre deve conseguir criar uma viagem informando:

- Origem;
- Destino;
- Distância;
- Ritmo;
- Terreno;
- Clima;
- Quantidade de personagens;
- Outras informações relevantes.

Exemplo:

```
Origem:
Neverwinter

Destino:
Waterdeep

Distância:
200 km

Ritmo:
Normal

Terreno:
Estrada

Clima:
Normal
```

O sistema deve calcular informações como:

- Distância percorrida;
- Distância restante;
- Tempo estimado;
- Dias de viagem;
- Consumo de suprimentos;
- Possíveis oportunidades de eventos.

## 12. Viagem Dinâmica

O diferencial do tracker deve ser permitir alterações durante a viagem.

Exemplos. O grupo:

- muda de estrada para floresta;
- muda o ritmo;
- altera a rota;
- aumenta ou reduz a distância;
- enfrenta chuva;
- encontra um obstáculo;
- decide parar;
- pega um desvio.

O Mestre deve conseguir registrar essas mudanças.

Exemplo:

```
Dia 3 — 14:30

Alteração:
Terreno

Anterior:
Estrada

Novo:
Floresta

Motivo:
Grupo decidiu pegar uma trilha alternativa.
```

A aplicação deve atualizar o estado atual da viagem.

Sempre que possível, as alterações devem ser registradas em uma timeline/histórico.

## 13. Timeline da Viagem

A viagem deve possuir um histórico.

Exemplo:

```
DIA 1
08:00
Saída de Neverwinter

18:00
Acampamento

DIA 2
08:00
Estrada

16:30
Chuva começou

DIA 3
14:30
Estrada → Floresta

18:40
Encontro gerado
```

Isso permite ao Mestre saber o que aconteceu durante a viagem.

## 14. Gerador de Eventos

O sistema deve possuir um gerador de eventos.

O Mestre pode clicar em **🎲 GERAR EVENTO** e receber um evento aleatório.

Exemplo:

```
EVENTO

Título:
Uma carroça abandonada

Categoria:
Descoberta

Descrição:
O grupo encontra uma carroça abandonada
às margens da estrada.
```

O evento pode possuir dados como:

- ID;
- Nome;
- Descrição;
- Categoria;
- Ambiente;
- Tema;
- Dificuldade;
- Peso/probabilidade;
- Tags.

## 15. Reroll de Eventos

O sistema deve permitir **🎲 ROLAR NOVAMENTE**.

O Mestre pode rejeitar um resultado e gerar outro.

O resultado anterior não precisa ser perdido imediatamente.

Idealmente:

```
Tentativa 1
Lobos na floresta
Rerolado

Tentativa 2
Viajante ferido
Rerolado

Tentativa 3
Acampamento abandonado
Aceito
```

Isso pode futuramente fazer parte do histórico da campanha.

## 16. Filtros de Eventos

Os eventos devem possuir filtros.

Exemplos:

**Ambiente**

- Floresta;
- Estrada;
- Montanha;
- Deserto;
- Cidade;
- Pântano;
- Costa;
- Caverna.

**Tema**

- Combate;
- Social;
- Mistério;
- Descoberta;
- Perigo;
- Clima;
- NPC;
- Tesouro.

**Dificuldade**

- Fácil;
- Média;
- Difícil;
- Mortal.

O usuário pode selecionar filtros e depois gerar um evento compatível.

## 17. NPCs

O sistema deve possuir uma seção de NPCs.

Um NPC pode possuir:

- Nome;
- Raça;
- Ocupação;
- Localização;
- Personalidade;
- Descrição;
- Notas;
- Tags;
- Relação com a campanha.

Exemplo:

```
Aldren

Raça:
Humano

Ocupação:
Mercador

Local:
Waterdeep

Personalidade:
Desconfiado, mas amigável.

Notas:
Pode possuir informações sobre os Zhentarim.
```

Deve ser possível futuramente criar NPCs personalizados.

## 18. Tabelas de NPCs e Encontros

O sistema deve permitir trabalhar com tabelas.

Exemplo:

```
Floresta — Dia

01-20
Animais

21-35
Viajantes

36-50
Monstros

51-65
Fações

66-80
Descoberta

81-100
Evento especial
```

O usuário poderá futuramente criar suas próprias tabelas.

## 19. Localizações

O sistema deve possuir uma seção de locais.

Exemplos:

- Waterdeep;
- Neverwinter;
- Baldur's Gate;
- Floresta de Ardeep;
- Estradas;
- Vilas;
- Ruínas;
- Masmorras.

Cada localização poderá possuir:

- Nome;
- Tipo;
- Região;
- Descrição;
- NPCs relacionados;
- Eventos relacionados;
- Notas.

O sistema deve ser estruturado para futuramente suportar uma base maior de localizações de Forgotten Realms.

## 20. Dados Próprios do Usuário

Uma característica importante do projeto é permitir conteúdo personalizado.

O usuário deve futuramente poder criar:

- \+ Novo NPC
- \+ Novo Evento
- \+ Nova Localização
- \+ Nova Tabela
- \+ Nova Nota

Os dados próprios não devem depender exclusivamente dos JSONs estáticos.

## 21. Armazenamento

O projeto deve ser preparado para persistência.

A arquitetura desejada é:

```
Frontend
Next.js / React
       ↓
Camada de armazenamento
       ↓
Supabase
       ↓
PostgreSQL
```

Para a primeira versão, dados estáticos podem ficar em:

```
data/
├── events.json
├── npcs.json
├── locations.json
└── encounter-tables.json
```

Posteriormente os dados criados pelo usuário podem ser armazenados no Supabase.

## 22. Futura Arquitetura de Armazenamento

O projeto deve, se possível, ser organizado para permitir no futuro:

```
Storage Adapter

├── Local
│   └── IndexedDB
│
└── Online
    └── Supabase
```

O usuário poderia futuramente escolher:

- 💻 Armazenar localmente
- ou ☁️ Armazenar online

Porém essa funcionalidade **NÃO** é obrigatória para a primeira entrega acadêmica.

Ela deve ser considerada uma possibilidade futura e não deve aumentar desnecessariamente o escopo inicial.

## 23. Estrutura de Pastas Sugerida

Uma estrutura inicial possível:

```
src/
│
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── BackButton.jsx
│   ├── Card.jsx
│   ├── EventCard.jsx
│   ├── NPCCard.jsx
│   ├── LocationCard.jsx
│   ├── TravelStatus.jsx
│   ├── Timeline.jsx
│   └── Button.jsx
│
├── pages/
│   ├── index.jsx
│   ├── campaigns/
│   └── ...
│
├── data/
│   ├── events.json
│   ├── npcs.json
│   ├── locations.json
│   └── encounter-tables.json
│
├── services/
│   └── ...
│
├── hooks/
│   └── ...
│
├── styles/
│   ├── globals.css
│   └── ...
│
└── ...
```

A estrutura pode ser adaptada conforme a implementação.

Não criar abstrações desnecessárias apenas para parecer mais profissional.

## 24. Possível Banco de Dados Futuro

Uma estrutura conceitual inicial:

```
users
│
└── campaigns
       │
       ├── journeys
       │      │
       │      ├── journey_segments
       │      ├── journey_changes
       │      └── journey_events
       │
       ├── npcs
       │
       ├── locations
       │
       ├── campaign_events
       │
       └── notes
```

Eventos genéricos podem existir separadamente (`events`) e serem associados às campanhas ou viagens.

Não implementar um banco extremamente complexo antes de existir necessidade real.

## 25. Stack de Tecnologia

Preferência:

- Next.js
- React
- JavaScript
- CSS
- Supabase
- PostgreSQL
- GitHub
- Vercel

O projeto deve priorizar tecnologias que foram trabalhadas durante o curso.

Se alguma tecnologia adicional for sugerida, explique primeiro por que ela é necessária e se existe uma alternativa mais simples.

## 26. Limitação Importante de Escopo

Não transformar o DM Companion inicialmente em um sistema completo de D&D.

**NÃO** priorizar inicialmente:

- ficha completa de personagem;
- sistema completo de combate;
- banco completo de monstros;
- marketplace;
- sistema social;
- mapas complexos;
- IA;
- integração com dezenas de APIs;
- sistema completo de regras;
- pagamentos;
- aplicativo mobile nativo.

O objetivo é ter uma aplicação funcional, bem estruturada e apresentável.

## 27. Prioridade de Desenvolvimento

**Prioridade 1:**

Projeto base → Layout → Componentes → Rotas → Dados JSON → Cards → `.map()` → Props → `useState` → Gerador de eventos

**Prioridade 2:**

Campanhas → Dashboard → NPCs → Locais → Viagem

**Prioridade 3:**

Viagem dinâmica → Timeline → Filtros → Reroll → Tabelas personalizadas

**Prioridade 4:**

Supabase → Persistência → Autenticação → CRUD

Funcionalidades adicionais somente depois que as anteriores estiverem funcionando.

## 28. Como a IA Deve Me Auxiliar

Sou iniciante em desenvolvimento.

Não quero simplesmente receber milhares de linhas de código que não consigo entender.

Quero que a IA me ajude de maneira incremental.

Sempre que possível:

- Explique o que estamos fazendo;
- Explique por que estamos fazendo;
- Mostre a estrutura dos arquivos;
- Gere código em partes pequenas;
- Explique onde colocar cada arquivo;
- Explique como testar;
- Se houver erro, ajude a identificar a causa;
- Evite alterar partes não relacionadas;
- Não crie dependências desnecessárias;
- Mantenha o projeto simples para um iniciante.

Se uma funcionalidade for muito complexa para o estágio atual, proponha uma versão simplificada.

## 29. Requisitos Acadêmicos Não Negociáveis

Antes de considerar o projeto concluído, verificar:

- [ ] React/Next.js utilizado corretamente
- [ ] Componentes separados
- [ ] Import/export
- [ ] Componentes reutilizáveis
- [ ] Props
- [ ] Arrays de objetos
- [ ] `.map()`
- [ ] `key`
- [ ] `useState`
- [ ] `onClick`
- [ ] Pelo menos duas rotas
- [ ] Navegação SPA
- [ ] Botão Voltar
- [ ] CSS
- [ ] Flexbox
- [ ] Responsividade
- [ ] GitHub público
- [ ] `.gitignore`
- [ ] `README.md`
- [ ] Deploy na Vercel
- [ ] Aplicação funcionando em produção
- [ ] Sem erros relevantes no console

## 30. Critérios de Avaliação do Professor

| Critério | Pontos |
|---|---|
| Componentização e Reuso | 2,0 |
| Uso de Props e `.map()` | 2,0 |
| Estado e Interatividade | 2,0 |
| Roteamento SPA | 1,5 |
| Layout e Estilização | 1,5 |
| Entrega e Publicação | 1,0 |
| **Total** | **10,0** |

Portanto, não sacrificar os requisitos avaliados em favor de funcionalidades avançadas.

## 31. Objetivo Final do DM Companion

O resultado deve parecer uma ferramenta real de apoio ao Mestre.

O fluxo principal desejado:

```
Entrar
  ↓
Selecionar campanha
  ↓
Dashboard
  ↓
Ver situação atual
  ↓
Abrir viagem
  ↓
Alterar condições conforme a aventura acontece
  ↓
Gerar evento
  ↓
Rerolar ou aceitar
  ↓
Registrar acontecimento
  ↓
Consultar NPC/local
  ↓
Continuar viagem
```

O sistema deve ser simples o suficiente para ser utilizado durante uma sessão de RPG.

## 32. Visão Futura — DM OS

O DM Companion deverá possuir uma arquitetura que permita futuramente evoluir para um projeto pessoal chamado **DM OS**.

Possíveis funcionalidades futuras:

- Session Mode;
- Timeline completa da campanha;
- Quests;
- Facções;
- Relacionamentos entre NPCs;
- Mapas;
- Geradores avançados;
- Gerador contextual;
- Bestiário;
- Itens;
- Tesouros;
- PWA;
- Offline;
- IndexedDB;
- Sincronização Local/Online;
- IA;
- Automação de eventos;
- Sistema avançado de campanhas.

Essas funcionalidades **NÃO** fazem parte do escopo obrigatório da primeira versão.

A arquitetura deve permitir evolução sem tornar o projeto inicial excessivamente complexo.

## 33. Regra Principal para o Desenvolvimento

Priorizar:

**funcionalidade > simplicidade > organização > aparência > complexidade**

Não adicionar tecnologia ou arquitetura apenas porque parece profissional.

Cada funcionalidade deve ter uma justificativa clara.

Quando houver mais de uma maneira de implementar algo, priorizar a solução que:

- seja compreensível para um iniciante;
- atenda aos requisitos do professor;
- seja fácil de testar;
- seja fácil de modificar;
- permita evolução futura.

## 34. Primeiro Passo

Não começar criando todas as funcionalidades.

Primeiro:

1. Definir a arquitetura inicial;
2. Definir as páginas;
3. Definir os componentes;
4. Definir os dados JSON;
5. Criar o projeto;
6. Criar o layout principal;
7. Implementar o primeiro fluxo funcional;
8. Testar;
9. Só então avançar para a próxima funcionalidade.

Quero que você atue como um mentor técnico e parceiro de desenvolvimento, ajudando a construir o DM Companion passo a passo e mantendo o escopo sob controle.
