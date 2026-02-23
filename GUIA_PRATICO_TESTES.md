# 🧪 GUIA PRÁTICO: Como Testar Compatibilidade com Ambas as APIs

Este guia é para a equipe técnica **validar se o projeto funciona** com:
1. ✅ API Antigas (WordPress antigo: posts + categorias)
2. ✅ API Nova (WordPress novo com CPTs + ACF)

---

## 🔧 PRÉ-REQUISITOS

Antes de começar os testes, você precisa de:

```
□ Node.js 18+ instalado
□ npm instalado
□ Git instalado
□ 2 instâncias WordPress (LOCAL ou REMOTE):
  □ WordPress ANTIGO: https://fundacao193.org.br
  □ WordPress NOVO: http://localhost:10003 (ou URL da staging)
□ VS Code ou editor favorito
□ Terminal (PowerShell no Windows)
□ DevTools do navegador (F12)
```

**Verificar o que você tem**:
```powershell
node --version        # Deve ser v18.x ou maior
npm --version         # Deve ser 9.x ou maior
git --version         # Deve ser 2.x ou maior
```

Se algum faltar, instale antes de continuar.

---

## 📂 SETUP INICIAL

### Passo 1: Clone e Instale

```powershell
# Navegue até a pasta do projeto
cd d:\DEV-Projetos\NCA\fundacao-193\fundacao-193-frontend

# Instale dependências (primeira vez only)
npm install

# Verifique erros
npm run typecheck
npm run lint
```

**Resultado esperado**:
```
> typecheck
✔ Sem erros TypeScript

> lint
✔ Sem erros ESLint
```

Se houver erros, corrija antes de continuar.

### Passo 2: Crie Arquivo `.env.local`

```powershell
# Windows: Criar arquivo vazio
New-Item -Path .env.local -ItemType File

# Linux/Mac: 
touch .env.local
```

**Conteúdo padrão para API NOVA**:
```ini
# Novo WordPress (CPT + ACF)
VITE_WP_API_URL=http://localhost:10003/wp-json/wp/v2
```

**Ou, para API ANTIGA**:
```ini
# Site antigo (posts + categorias)
VITE_DATA_SOURCE=legacy
VITE_WP_LEGACY_API_URL=https://fundacao193.org.br/wp-json/wp/v2
VITE_WP_LEGACY_CATEGORY_NEWS=14
VITE_WP_LEGACY_CATEGORY_PROJECTS=90
VITE_WP_LEGACY_CATEGORY_EVENTS=9
```

---

## 🟦 TESTE 1: API NOVA (WordPress com CPT + ACF)

### Objetivo
Verificar se o código funciona com novo WordPress que usa:
- Custom Post Types (CPT): noticia, projeto, evento, parceria, capacitacao
- Advanced Custom Fields (ACF) para metadados

### Antes de Começar
✅ Novo WordPress deve ter os 5 CPTs criados
✅ Cada CPT deve ter 3+ posts de teste
✅ API deve estar acessível

### Passo 1: Testar API Direto (Como GET)

**Abra o terminal e teste cada endpoint**:

```powershell
# Notícias (CPT: noticia)
curl http://localhost:10003/wp-json/wp/v2/noticia

# Projetos (CPT: projeto)
curl http://localhost:10003/wp-json/wp/v2/projeto

# Eventos (CPT: evento)  
curl http://localhost:10003/wp-json/wp/v2/evento

# Parceiros (CPT: parceria)
curl http://localhost:10003/wp-json/wp/v2/parceria

# Capacitações (CPT: capacitacao)
curl http://localhost:10003/wp-json/wp/v2/capacitacao
```

**Resultado esperado** (acima de cada):
```json
[
  {
    "id": 123,
    "title": { "rendered": "Título da Notícia" },
    "acf": { ... ACF fields ... }
  },
  ...
]
```

Se retornar **404** ou vazio:
- ❌ CPT não existe no novo WordPress
- ❌ CPT não está pubbllico (marque como público em WordPress)
- ❌ API REST não está habilitada (verificar permissões ACF)

### Passo 2: Iniciar Dev Server

```powershell
# Terminal 1: Inicie servidor de desenvolvimento
npm run dev

# Você deve ver:
# VITE v5.4.2  ready in X ms
# ➜  Local:   http://localhost:5174/
```

**Abra navegador em**: http://localhost:5174/

### Passo 3: Verificar LoadData na Página Inicial

1. Abra DevTools (**F12**)
2. Aba **Console**
3. Procure por:

```
[data] Validar requisições ao carregar página...
```

**Resultado esperado** (em verde/sem erros):
```
✅ CPT "noticia" encontrado
✅ CPT "projeto" encontrado
✅ CPT "evento" encontrado
✅ CPT "parceria" encontrado
✅ CPT "capacitacao" encontrado
```

Se algum aparecer em vermelho com ❌, o CPT está faltando.

### Passo 4: Verificar Cada Página

**Ir para cada página principal e confirmar dados são carregados**:

| Página | URL | O Que Deve Carregar |
|---|---|---|
| Homepage | http://localhost:5174/ | Cards de notícias + eventos |
| Notícias | http://localhost:5174/#noticias | Lista de notícias |
| Projetos | http://localhost:5174/#projetos | Lista de projetos |
| Eventos | http://localhost:5174/#eventos | Lista de eventos |
| Parceiros | http://localhost:5174/#parcerias | Logos em carrossel (via API) |
| Capacitações | http://localhost:5174/#capacitacao | Lista de treinamentos |

**Para cada página**:
1. ✅ Deve carregar (não erro 404)
2. ✅ Deve exibir loading spinner por < 3 segundos
3. ✅ Deve listar 3+ items
4. ✅ Imagens devem aparecer (ou placeholder)
5. ✅ Cliques em items devem ir pra detalhe

### Passo 5: Teste de Detalhe

Cada listagem leva a página de detalhe. Teste:

**Noticia detalhe**:
- URL: http://localhost:5174/#noticia/123 (mude 123 pro ID real)
- Deve exibir: Título, conteúdo completo, galeria de imagens
- Deve ter botão "Voltar"

**Projeto detalhe**:
- URL: http://localhost:5174/#projeto/456
- Deve exibir: Título, impacto, imagem, links etc

Faça o mesmo para Evento, Parceiro (se link de detalhe existir).

### Passo 6: Teste de Rede Lenta

DevTools > Network > Throttle

1. Mude de "No throttling" para "Slow 3G"
2. Recarre página (Ctrl+Shift+R)
3. Verifique:
   - ✅ Loading spinner aparece
   - ✅ Página não fica travada
   - ✅ Timeout não ocorre (< 10s)

### Passo 7: Teste Offline

1. Abra DevTools (**F12**)
2. Aba **Network**
3. Checkbox **"Offline"** (ou desconect internet)
4. Recarre página (Ctrl+Shift+R)
5. Deve ver:
   - ✅ Dados antigos em cache aparecem (por até 60s)
   - ✅ Ou erro "Não conseguimos carregar" com retry button
   - ✅ Sem crash/console errors

### ✅ Teste 1 Completo

Se passou em todos os passos:
```
✅ TEST 1 PASSED: API NOVA funciona 100%
```

Se falhou em algo, anote qual página/CPT e qual erro.

---

## 🔴 TESTE 2: API ANTIGA (site fundacao193.org.br)

### Objetivo
Verificar se código ainda funciona com site antigo durante **transição**.

⚠️ **IMPORTANTE**: Este teste só é válido durante a transição. Antes de o novo WordPress estar 100% pronto, você pode usar o site antigo como fallback.

### Passo 1: Reconfigurar .env.local

Edite `.env.local` e mude para modo legado:

```ini
# Ativar modo legado (site antigo)
VITE_DATA_SOURCE=legacy

# URLs do site antigo
VITE_WP_LEGACY_API_URL=https://fundacao193.org.br/wp-json/wp/v2

# IDs das categorias (já checados)
VITE_WP_LEGACY_CATEGORY_NEWS=14
VITE_WP_LEGACY_CATEGORY_PROJECTS=90
VITE_WP_LEGACY_CATEGORY_EVENTS=9
VITE_WP_LEGACY_CATEGORY_PARTNERS=
VITE_WP_LEGACY_CATEGORY_TRAINING=
```

### Passo 2: Reinicie Dev Server

```powershell
# Ctrl+C no terminal onde npm run dev está rodando

# Restart
npm run dev
```

### Passo 3: Limpar Cache do Navegador

Dev Tools (F12) > **Application** (ou **Storage**)

1. Encontre **local Storage**
2. Delete entrada "https://localhost:5174" 
3. Feche DevTools
4. Recarregue página (Ctrl+F5 — hard refresh)

### Passo 4: Verificar Dados do Site Antigo

DevTools **Console** deve exibir:

```
[legacy] Usando site antigo: https://fundacao193.org.br/wp-json/wp/v2
✅ Posts de notícias carregando: categoria 14
```

### Passo 5: Teste Mesmas Páginas

| Página | O Que Deve Carregar |
|---|---|
| Homepage | Cards de notícias + eventos (do site antigo) |
| Notícias | Notícias antigos (categoria 14) |
| Projetos | Projetos antigos (categoria 90) |
| Eventos | Eventos antigos (categoria 9) |
| Parceiros | Dados hardcoded (esperado — não existe CPT antigo) |

**Validação**:
- ✅ Deve carregar tudo sem erro
- ✅ Títulos devem ser os do site antigo
- ✅ Imagens devem vir do site antigo (fundacao193.org.br)

### ✅ Teste 2 Completo

Se passou em todos os passos:
```
✅ TEST 2 PASSED: API ANTIGA ainda funciona
```

---

## 🔀 TESTE 3: Switchover (Passar de API Antiga para Nova)

### Objetivo
Verificar transição suave entre APIs sem recarregar código (só .env.local).

### Passo 1: Comece com API Antiga

`.env.local`:
```ini
VITE_DATA_SOURCE=legacy
```

✅ Confirme que notícias carregam (do site antigo)

### Passo 2: Mude para API Nova

Edite `.env.local`:
```ini
# Remove ou comment VITE_DATA_SOURCE=legacy

# Set novo URL
VITE_WP_API_URL=http://localhost:10003/wp-json/wp/v2
```

### Passo 3: Reinicie Dev Server

```powershell
# Ctrl+C
npm run dev
```

### Passo 4: Recarregue Navegador (Hard Refresh)

```
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

### Passo 5: Verifique Que Agora Usa Novo WP

Console deve exibir:
```
✅ CPT "noticia" encontrado
✅ CPT "projeto" encontrado
... etc
```

E notícias devem ser do novo WordPress (IDs diferentes, títulos diferentes).

### ✅ Teste 3 Completo

Se dados mudaram de antigo para novo:
```
✅ TEST 3 PASSED: Switchover funciona
```

---

## 📊 TESTE 4: Performance

### Objetivo
Verificar que carregamento não é excessivamente lento.

### Passo 1: Limpe Cache

```powershell
# Ctrl+Shift+Delete (abre Clear Browsing Data)
# Selecione: "Cached images and files"
# Clique: Clear data
```

### Passo 2: Meça Tempo de Carregamento

1. DevTools (F12) > **Network**
2. Recarre página (Ctrl+R)
3. Veja coluna **"Time"** (no rodapé, `X requests | Y.ZZ s`)

**Resultado esperado**:
- Primeira carga (sem cache): < 8 segundos
- Carga comum (com cache): < 2 segundos
- Imagens: < 3 segundos

Se estiver lento:
- [ ] Verificar velocidade de internet (Slow 3G test)
- [ ] Verificar se WordPress está lento (curl API demorando)
- [ ] Verificar se há muitas imagens (otimizar)

### Passo 3: Performance Audits (Chrome)

1. DevTools > **Lighthouse** (ou **Performance**)
2. Clique **"Generate report"** (ou **"Record"**)
3. Aguarde conclusão

**Metas**:
- Performance: > 80
- Accessibility: > 85
- Best Practices: > 85
- SEO: > 90

Se baixo, relatorio fornece dicas de otimização.

### ✅ Teste 4 Completo

Se tempos estão aceitáveis:
```
✅ TEST 4 PASSED: Performance OK
```

---

## 📋 CHECKLIST FINAL

Imprima e marque conforme completar:

```
┌─────────────────────────────────────────────┐
│ TESTE 1: API NOVA (WordPress com CPT+ACF)  │
├─────────────────────────────────────────────┤
□ curl endpoints retornam JSON válido
□ Dev server inicia sem erro
□ Console mostra ✅ CPTs validados
□ Homepage carrega noticias + eventos
□ Página Notícias carrega dados
□ Página Projetos carrega dados
□ Página Eventos carrega dados
□ Página Parceiros carrega via API
□ Página Capacitações carrega dados
□ Detalhe notícia funciona
□ Detalhe projeto funciona
□ Teste Slow 3G: spinner aparece
□ Teste Offline: cache funciona

┌─────────────────────────────────────────────┐
│ TESTE 2: API ANTIGA (fundacao193.org.br)   │
├─────────────────────────────────────────────┤
□ VITE_DATA_SOURCE=legacy configurado
□ Dev server reiniciou
□ Cache do navegador foi limpo
□ Homepage carrega dados antigos
□ Notícias carregam (categoria 14)
□ Projetos carregam (categoria 90)
□ Eventos carregam (categoria 9)
□ Nenhum erro de API 404

┌─────────────────────────────────────────────┐
│ TESTE 3: SWITCHOVER (Antiga → Nova)        │
├─────────────────────────────────────────────┤
□ Começou com API antiga (dados visíveis)
□ Mudou VITE_DATA_SOURCE para novo
□ Reiniciou dev server
□ Recarregou navegador
□ Dados mudaram para novo WP (verificar IDs)

┌─────────────────────────────────────────────┐
│ TESTE 4: PERFORMANCE                       │
├─────────────────────────────────────────────┤
□ Primeira carga: < 8s
□ Carga comum: < 2s
□ Imagens: < 3s
□ Lighthouse Performance: > 80

└─────────────────────────────────────────────┘

TOTAL: _____ de 37 checklist items concluídos

RESULTADO FINAL:
□ ✅ APROVADO — Tudo funcionando
□ 🟡 APROVADO COM RESSALVAS — Alguns ajustes
□ ❌ REPROVADO — Problemas críticos encontrados
```

---

## 🐛 Troubleshooting

### erro: "404 Not Found" para CPT

**Causa**: CPT não existe no novo WordPress

**Solução**:
1. Abra painel WordPress (wp-admin)
2. Vá para Custom Post Types (plugin CPT UI)
3. Crie CPT com slug exato: noticia, projeto, etc
4. Marque como "Public" em "Show in REST API"

### Erro: "CORS - No 'Access-Control-Allow-Origin' header"

**Causa**: Novo WordPress não está habilitado para CORS

**Solução**:
```php
// wp-config.php, adicione:
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
```

Ou use plugin "CORS" no WordPress.

### Erro: "TypeError: Cannot read property 'rendered'"

**Causa**: Estrutura ACF diferente do esperado

**Solução**:
1. Verifique tipo em `src/types/noticia.ts` (ou outro)
2. Compare com resposta real da API (verificar em curl)
3. Atualize tipo para match com resposta real

### Dev server lento/travando

**Causa**: Projeto grande, Watch mode lendo muitos arquivos

**Solução**:
```powershell
# Reinicie Node
npm run dev

# Ou, feche outros abas/apps comendo RAM
```

### Mudei .env.local mas continua com dados antigos

**Causa**: Dev server não recarregou variables

**Solução**:
```powershell
# Ctrl+C para parar
# npm run dev para reiniciar
```

---

## ✨ PRÓXIMOS PASSOS

Se todos os 4 testes passaram:

1. ✅ [Descomenta Partners.tsx](FIXES_TECNICOS_RECOMENDADOS.md#solução-1)
2. ✅ Repete testes (deve passar em tudo de novo)
3. ✅ Faz `npm run build`
4. ✅ Testa build: `npm run preview`
5. ✅ Deploy em produção!

---

## 📞 Suporte

Se algo der errado ou tiver dúvida:

1. **Verificar console**: DevTools > Console (muitas pistas lá)
2. **Verificar Network**: DevTools > Network (URLs, status codes)
3. **Ler docs**: AVALIACAO_COMPATIBILIDADE_API.md (análise técnica)
4. **Ler fixes**: FIXES_TECNICOS_RECOMENDADOS.md (soluções propostas)

---

Bom teste! 🚀
