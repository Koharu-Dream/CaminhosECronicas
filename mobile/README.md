
# Caminhos e Crônicas (Mobile)
 
App mobile de apoio ao Mestre de D&D 2014: acompanha a viagem do grupo, sorteia eventos, guarda NPCs e dispara avisos em tempo real para os jogadores. É o **complemento mobile** do projeto web [Caminhos e Crônicas](../README.md) (Next.js), feito em **React Native + Expo + Supabase**.
 
- **Disciplina:** Desenvolvimento de Aplicações Mobile, FATEC Mogi Mirim
- **Professor:** Marcos Roberto de Moraes (Maromo)
- **Autor:** Caio Vitor Morais
- **Material atendido:** MOBILE_009, Sistema de Notificações em Tempo Real
## Funcionalidades
 
- **Campanhas e dashboard:** lista de campanhas e painel com local, dia, hora, clima e distância restante.
- **Tracker de viagem (por campanha):** calcula distância percorrida, dias e rações; troca ritmo, terreno e clima durante o caminho, com motivo; mantém o histórico.
- **Gerador de eventos:** sorteio com filtros de ambiente, categoria e dificuldade, e _reroll_ com histórico de tentativas.
- **NPCs:** cadastro e remoção, salvos no Supabase e em cache no aparelho.
- **Avisos do Mestre (MOBILE_009):** o Mestre dispara um aviso e todos os aparelhos com o app aberto recebem na hora, sem atualizar a tela.
- **Funciona offline:** sem internet (ou sem Supabase configurado) o app continua funcionando e sincroniza depois.
## Avisos em tempo real (MOBILE_009)
 
| Requisito do material | Onde está |
|---|---|
| Tabela `notifications` (id, title, body, created_at) com Realtime | `supabase/schema.sql` |
| Política de leitura e escrita (RLS) | `supabase/schema.sql` |
| Conexão com o Supabase | `src/services/supabase.js` |
| Gerenciador de alertas (permissão e exibição) | `src/helper/notificationsHelper.js` |
| Escuta Realtime (WebSockets, evento `INSERT`) | `src/services/notificationService.js` |
| Estado global dos avisos | `src/context/NotificationsContext.js` |
| Tela do Mestre (enviar) e histórico | `app/(tabs)/avisos.js` |
 
Funcionamento: o Mestre escreve título e mensagem na aba **Avisos** e clica em **DISPARAR AVISO**. O app grava na tabela `notifications`; o Supabase Realtime avisa todos os aparelhos conectados, que exibem a notificação.
 
- **Celular (Expo Go):** notificação local do sistema, com permissão e som.
- **Web:** banner no topo da tela (o navegador não usa o Expo Notifications).
## Os 4 pilares da disciplina
 
| Pilar | Onde está no projeto |
|---|---|
| Componentes & Layout | `src/components`, props + `.map()` com `key`, Flexbox e `StyleSheet` |
| Gerenciamento de Estado | `useState`, `useReducer` + Context (`src/context`), hook próprio (`src/hooks/useNpcs.js`) |
| Navegação | Expo Router: abas (`app/(tabs)`) e pilha com rotas dinâmicas (`app/campaign/[id].js`, `app/travel/[id].js`) |
| APIs & Persistência | Supabase (`src/lib`, `src/services`) e AsyncStorage (`src/storage/local.js`) |
 
## Estrutura
 
```
app/                 rotas (Expo Router)
  _layout.js           provedores de estado + navegação em pilha
  (tabs)/              Início, Campanhas, Eventos, NPCs, Avisos
  campaign/[id].js     dashboard da campanha
  travel/[id].js       tracker de viagem da campanha
src/
  components/          componentes reutilizáveis
  context/             estado global (viagens e avisos)
  data/                JSON: campanhas, eventos, NPCs iniciais, regras de viagem
  helper/              notificações locais (Expo Notifications)
  hooks/               useNpcs
  lib/                 cliente do Supabase
  services/            NPCs, viagens e avisos (nuvem + cache offline)
  storage/             AsyncStorage
  utils/               regras puras de viagem e avisos
supabase/schema.sql  tabelas, políticas, Realtime e NPCs iniciais
```
 
## Como rodar
 
### Pré-requisitos
 
- [Node.js](https://nodejs.org) (versão par: 22.13 ou superior) e [Git](https://git-scm.com)
- App **Expo Go** no celular (opcional; também roda no navegador)
- Conta gratuita no [Supabase](https://supabase.com)
### 1. Clonar e instalar
 
```bash
git clone https://github.com/Koharu-Dream/CaminhosECronicas.git
cd CaminhosECronicas/mobile
npm install
```
 
### 2. Configurar o Supabase
 
1. Crie um projeto em [supabase.com](https://supabase.com).
2. Abra **SQL Editor > New query**, cole o conteúdo de `supabase/schema.sql` e clique em **Run**. Isso cria as tabelas `npcs`, `journeys` e `notifications` (com Realtime ligado) e insere 5 NPCs iniciais. É seguro rodar mais de uma vez.
3. Em **Project Settings > API Keys**, copie a **Project URL** e a chave pública (_publishable_ ou _anon_).
4. Copie `.env.example` para `.env` e preencha:
```
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publica
```
 
> **Nunca** use a chave `service_role`/`secret` no app. Sem o `.env`, o app roda em **modo local** (os dados e avisos ficam só no aparelho).
 
### 3. Rodar
 
```bash
npx expo start --clear
```
 
- **Navegador:** pressione `w` no terminal.
- **Celular:** escaneie o QR code com o Expo Go (celular e computador na mesma rede Wi-Fi).
### 4. Testar os avisos
 
1. Abra o app em **duas janelas do navegador** (ou navegador + celular).
2. Na aba **Avisos**, confira o status "🟢 Escutando avisos em tempo real".
3. Dispare um aviso em uma janela: ele aparece na outra na hora, mesmo em outra aba do app.
## Problemas comuns
 
| Sintoma | Solução |
|---|---|
| `Unable to resolve module ...` | Rode `npm install` e depois `npx expo start --clear` |
| "Modo local" mesmo com `.env` | Reinicie com `--clear`; confira os nomes `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_ANON_KEY` |
| `permission denied` / `row-level security` | Rode o `supabase/schema.sql` de novo |
| Status "Sem conexão em tempo real" | Em **Database > Replication**, confira se a tabela `notifications` está com Realtime ligado |
| Celular não conecta ao QR code | Mesma rede Wi-Fi, firewall liberado para redes privadas, ou `npx expo start --tunnel` (exige conta Expo) |
 
## Limitações
 
- Sem autenticação: o banco é compartilhado por quem tiver a chave pública.
- Expo Go: a versão da App Store no iPhone pode não abrir projetos de SDKs mais novos; nesse caso use o navegador. O push remoto não funciona no Expo Go Android (SDK 53+), mas a notificação local usada aqui funciona.
- Sincronização simples: na viagem vence a versão mais recente.
 
