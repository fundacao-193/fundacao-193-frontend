# 🧪 Testes Rápidos - Funcionalidade de Busca

## Setup para Testes

```bash
npm run dev    # Inicia em http://localhost:5174
```

## 📋 Test Cases

### TC-01: Busca Desktop - Digitação com Resultados
**Objetivo**: Verificar se dropdown aparece com resultados em tempo real

**Steps**:
1. Abrir site em **breakpoint desktop** (> 1024px = `lg:`)
2. Localizar **barra de busca no Header** (entre "Notícias" e botão "Colabore")
3. **Digitar** "notícia" (3 caracteres)
4. **Aguardar** 300ms (debounce)
   
**Expected**:
- ✅ Dropdown aparece abaixo da barra com 2-3 resultados
- ✅ Cada resultado mostra:
  - Título
  - Resumo (em cinza)
  - Badge "Notícia" (azul)
- ✅ Fundo levemente opaco atrás do dropdown
- ✅ Sem erros no console

---

### TC-02: Busca Desktop - Clique em Resultado
**Objetivo**: Navegar para página de resultados ao clicar

**Steps**:
1. Completar TC-01
2. **Clicar** em um dos resultados do dropdown

**Expected**:
- ✅ Hash muda para `#busca/notícia`
- ✅ Dropdown fecha automaticamente
- ✅ Página de resultados renderiza
- ✅ Mostra "N resultados encontrados"

---

### TC-03: Busca Desktop - Limpar com X
**Objetivo**: Verificar funcionalidade de limpar busca

**Steps**:
1. Digitar "projeto" na barra de busca
2. **Clicar no X** no lado direito do input

**Expected**:
- ✅ Campo fica vazio
- ✅ X desaparece
- ✅ Dropdown fecha
- ✅ Lupa reaparece

---

### TC-04: Busca Mobile - Abrir Modal
**Objetivo**: Verificar drawer de busca no mobile

**Steps**:
1. Redimensionar para mobile (< 1024px = breakpoint `lg:`)
2. Verificar que **barra desktop desapareceu**
3. **Clicar no ícone de lupa** (antes do Menu)

**Expected**:
- ✅ Modal escuro (overlay) aparece
- ✅ Drawer branco desliza do topo
- ✅ Input está **autofocado**
- ✅ Teclado virtual abre
- ✅ Botão "Cancelar" visível à direita

---

### TC-05: Busca Mobile - Resultados
**Objetivo**: Verificar dropdown responsivo no mobile

**Steps**:
1. Completar TC-04
2. **Digitar** "treinamento"
3. **Aguardar** 300ms

**Expected**:
- ✅ Resultados aparecem em lista abaixo do input
- ✅ Cada resultado:
  - Título em preto/bold
  - Resumo em cinza
  - Badge colorida com tipo
- ✅ Lista é scrollável se > 5 itens
- ✅ Loader circular aparece enquanto busca

---

### TC-06: Busca Mobile - Fechar Modal
**Objetivo**: Verificar fechamento e navegação

**Steps**:
1. Completar TC-04
2. **Clicar em "Cancelar"**

**Expected**:
- ✅ Modal desaparece com transição (fadeOut)
- ✅ Volta ao Header normal

---

### TC-07: Página de Resultados - Layout
**Objetivo**: Verificar renderização da página de resultados

**Steps**:
1. Navegar para `#busca/evento`
2. Aguardar carregamento

**Expected**:
- ✅ Título: "Resultados da busca"
- ✅ Subtitle: Para: "evento"
- ✅ Contador: "N resultado(s) encontrado(s)"
- ✅ Cards em layout responsivo:
  - Desktop: 2 colunas
  - Tablet: 1-2 colunas
  - Mobile: 1 coluna
- ✅ Botão "Voltar" no topo
- ✅ Cada card mostra:
  - Badge colorida (tipo)
  - Título
  - Resumo (clipped)
  - Imagem à direita (se houver)

---

### TC-08: Página de Resultados - Click Card
**Objetivo**: Navegar para detalhe do post

**Steps**:
1. Estar na página de resultados
2. **Clicar em um card**

**Expected**:
- ✅ Hash muda para `#noticia-123` (ou projeto/evento/etc)
- ✅ Página de detalhe renderiza
- ✅ Conteúdo completo é exibido

---

### TC-09: Página de Resultados - Voltar
**Objetivo**: Retornar à home

**Steps**:
1. Estar na página de resultados
2. **Clicar** no botão "Voltar"

**Expected**:
- ✅ Hash muda para vazio `#`
- ✅ Home renderiza com scroll suave
- ✅ ScrollTop = 0

---

### TC-10: Busca Vazia
**Objetivo**: Verificar comportamento com termo vazio

**Steps**:
1. Abrir barra de busca
2. **Não digitar nada** ou digitar apenas **1 caractere**

**Expected**:
- ✅ Dropdown não aparece
- ✅ Nenhuma request é feita (debounce/validação)
- ✅ Loader não fica em loop

---

### TC-11: Busca Sem Resultados
**Objetivo**: Verificar mensagem quando nada é encontrado

**Steps**:
1. Digitar termo que **não existe**: "xyzabc123999"
2. Aguardar

**Expected**:
- ✅ Dropdown aparece (vazio) OU mensagem "Nenhum resultado encontrado"
- ✅ Página de resultados mostra:
  - Ícone de mapa (MapPin)
  - Texto: 'Nenhum resultado encontrado para "xyzabc123999"'
  - Dica: "Tente usar outros termos..."

---

### TC-12: Cache - Segunda Busca Rápida
**Objetivo**: Verificar se cache funciona

**Steps**:
1. Abrir DevTools (F12) → Network tab
2. Buscar por "capacitacao"
3. Aguardar resultados
4. **Contar requests** (deve ser ~5: noticia, projeto, evento, capacitacao, parceiro)
5. Limpar busca com X
6. **Buscar novamente** "capacitacao"

**Expected**:
- ✅ Primeira busca: ~5 requests HTTP
- ✅ Segunda busca: **0 requests** (cache!)
- ✅ Resultados aparecem instantaneamente
- ✅ Network tab não mostra novas requisições

---

### TC-13: URL Encoding - Términos com Espaços
**Objetivo**: Verificar suporte a termos multi-palavra

**Steps**:
1. Digitar "combate a incêndio" (com espaços)
2. Verificar URL na barra de endereço

**Expected**:
- ✅ URL muda para `#busca/combate%20a%20incêndio`
- ✅ URL está corretamente encoded (espaços = %20)
- ✅ Recarregar a página funciona (decode funciona)
- ✅ Título da página: 'Busca: "combate a incêndio"'

---

### TC-14: Responsividade - Redimensionar Durante Busca
**Objetivo**: Verificar comportamento ao mudar breakpoint

**Steps**:
1. Abrir site em desktop
2. Abrir SearchBar
3. Digitar "notícia"
4. **Redimensionar para mobile** (< 1024px)
5. Verificar componente

**Expected**:
- ✅ SearchBar desktop desaparece
- ✅ SearchBar mobile (ícone) aparece
- ✅ Dropdown se adapta ao novo layout
- ✅ Sem crashes ou erros

---

### TC-15: Modo Legacy - Busca com API Antiga
**Objetivo**: Verificar compatibilidade com API legacy

**Requirement**: `.env.local` com `VITE_DATA_SOURCE=legacy`

**Steps**:
1. Parar servidor: `Ctrl+C`
2. Editar `.env.local`:
   ```ini
   VITE_DATA_SOURCE=legacy
   VITE_WP_LEGACY_API_URL=https://fundacao193.org.br/wp-json/wp/v2
   ```
3. `npm run dev`
4. Buscar por "blog" ou "projeto"

**Expected**:
- ✅ Modo legado ativado (visível no console ou env)
- ✅ Busca funciona com posts + categorias
- ✅ Resultados aparecem (se existirem)
- ✅ Sem erros de CORS ou 404

---

## 📊 Matriz de Testes Rápidos

| ID | Test Case | Desktop | Mobile | Expected |
|---|---|:-:|:-:|---|
| TC-01 | Dropdown com resultados | ✓ | - | Aparece dropdown |
| TC-02 | Clique resultado | ✓ | - | Nav para /busca |
| TC-03 | Limpar com X | ✓ | - | Campo vazio |
| TC-04 | Abrir modal mobile | - | ✓ | Drawer aparece |
| TC-05 | Resultados mobile | - | ✓ | Lista scrollável |
| TC-06 | Fechar modal | - | ✓ | Modal desaparece |
| TC-07 | Layout resultados | ✓ | ✓ | Cards responsivos |
| TC-08 | Click card | ✓ | ✓ | Nav para detalhe |
| TC-09 | Botão voltar | ✓ | ✓ | Volta home |
| TC-10 | Busca vazia | ✓ | ✓ | Sem dropdown |
| TC-11 | Sem resultados | ✓ | ✓ | Mensagem erro |
| TC-12 | Cache | ✓ | ✓ | 0 requests |
| TC-13 | URL encoding | ✓ | ✓ | %20 em espaços |
| TC-14 | Responsividade | ✓ | ✓ | Adapta layout |
| TC-15 | Legacy API | ✓ | ✓ | Busca funciona |

---

## 🎯 Resultado Esperado Final

- ✅ **Nenhum erro** no Console (F12)
- ✅ **0 warnings** de TypeScript
- ✅ **Build bem-sucedido** (`npm run build`)
- ✅ **Todos os 15 test cases** passando
- ✅ **Performance**: Busca responde em < 500ms (com debounce)
- ✅ **Acessibilidade**: 
  - Navegável com teclado (Tab, Enter, Esc)
  - SearchBar tem label acessível
  - Cores contrastam bem (AA+)

---

## 🐛 Se Algo Falhar

### Erro 404 na busca
```
❌ Falha: GET /noticia 404 Not Found
```
**Solução**: Verificar `VITE_WP_API_URL` em `.env.local`

### CORS error
```
❌ Access to XMLHttpRequest blocked by CORS policy
```
**Solução**: 
- Verificar se API já está rodando (se local)
- Verificar se domain tem CORS habilitado (se remoto)

### Dropdown não aparece no desktop
```
❌ SearchBar inline não renderiza
```
**Solução**: Verificar Header.tsx tem `<SearchBar isMobile={false} />`

### Modal não abre no mobile
```
❌ Ícone de lupa não responde ao clique
```
**Solução**: Verificar Header.tsx tem `<SearchBar isMobile={true} />`

### Cache não funciona
```
❌ Segunda busca faz requests novos
```
**Solução**: Verificar se TTL é > 0 em search.ts (CACHE_TTL = 5 * 60 * 1000)

---

## 📝 Seu Checklist Pessoal

Antes de liberar para produção:

- [ ] TC-01 a TC-15 todos passando
- [ ] Build sem erros
- [ ] TypeCheck sem erros
- [ ] ESLint sem erros
- [ ] Teste em navegador real (não só DevTools)
- [ ] Teste em 3+ dispositivos mobile
- [ ] Teste com API legítima (não mock)
- [ ] Teste com 100+ resultados
- [ ] Teste com caracteres especiais (ã, é, ç, etc)
- [ ] Performance: < 500ms para busca
- [ ] Acessibilidade: Navegável com teclado
- [ ] SEO: Meta tags atualizadas para buscas

