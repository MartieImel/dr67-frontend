# dr67-frontend

Frontend para Danganronpa — Turma 67.

## Estrutura do Projeto

```
src/
  App.jsx                          # Raiz da aplicação (roteamento de views)
  main.jsx                         # Entry point React
  constants/
    theme.js                       # Cores, badges e constantes visuais
    chars.js                       # CHARS[16], CHAR_PROMPTS, LOCKED_MEMORIES, LOCK_CODES, PERSIST_KEYS
    rules.js                       # CHAPTERS — conteúdo do manual de regras
  lib/
    styles.js                      # Injeção de CSS global e animações
    server.js                      # Camada de persistência (serverFetch, SSE, cache)
    utils.js                       # derive(), compressImage()
  hooks/
    usePersist.js                  # Hook com correção de closure bug (useRef)
    useViewport.js                 # Hook de responsividade
  components/
    ui/index.jsx                   # Badge, Btn, StatBar, Card, SectionTitle, Divider
    transitions/
      BootScreen.jsx               # Animação de inicialização
      index.jsx                    # CharTransitionScreen, MasterTransitionScreen
    screens/
      LoginScreen.jsx              # Seleção de personagem + senha
      RulesScreen.jsx              # Manual de regras com dice roller
      CharacterScreen/
        index.jsx                  # Header, status bars, abas — orquestra os tabs
        TabFicha.jsx               # Ficha completa, laços, memória bloqueada
        TabPistas.jsx              # Balas de Verdade / pistas coletadas
        TabTribunal.jsx            # Preparação para o tribunal
        TabNotas.jsx               # Notas livres da sessão
      MasterScreen/
        index.jsx                  # Header, status global, abas + modal de personagem
        TabTurma.jsx               # Tabela da turma com status
        TabSegredos.jsx            # Segredos e arcos narrativos
        TabCrimes.jsx              # Planejamento de crimes/casos
        TabMonokuma.jsx            # Controle de Esperança/Desespero, motivos
        TabReferencia.jsx          # Tabelas de referência rápida + dice roller
```

## Correções Aplicadas

1. **Closure bug em `usePersist`** — O `set` callback capturava `v` de forma obsoleta.
   Corrigido com `useRef` para rastrear o valor atual sem dependências no callback.

2. **Crash na troca de abas** — Cada aba agora é um componente separado.
   O padrão `{tab === "x" && <TabX key="x" />}` força remount completo na troca,
   isolando o estado e evitando stale state entre abas.

3. **Re-renders em cascata** — O monolito `danganronpa-site.jsx` (~2400 linhas)
   foi dividido em 26 módulos. Mudanças de estado agora afetam apenas o componente pai mínimo.

4. **SERVER_LOAD_PROMISE sem retry** — A promise agora é limpa em caso de erro,
   permitindo novas tentativas automáticas.

## Como usar

```bash
npm install
npm run dev
```

Build e deploy:
```bash
npm run build
npm run deploy   # GitHub Pages
```

Backend: https://dng67-server.onrender.com
