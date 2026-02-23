# 🔍 Guia Completo - Funcionalidade de Busca

## Visão Geral

A funcionalidade de busca foi implementada com foco em **UX/UI modern** e **suporte a ambas as APIs** (nova CPT/ACF e legacy posts+categorias).

## 📱 UI/UX Design

### Responsividade

#### Desktop (Breakpoint `lg:`)
- **Barra de busca inline no Header** (entre navegação e botão Colabore)
- Campo de 320px de largura com ícone de lupa
- **Dropdown em tempo real** com resultados (máx 20 resultados)
- Resultado destacado com badge de tipo colorida
- Exibição de excerpt (resumo) em até 100 caracteres

#### Mobile (breakpoint < `lg:`)
- **Ícone de lupa** no Header (ao lado do botão Menu)
- Abre **drawer/modal fullwidth** ao clicar
- Input de busca autofocado com X para limpar
- Resultados em lista scrollável
- Botão "Cancelar" para fechar

### Página de Resultados
- Acessível via hash route: `#busca/seu-termo`
- URL-encoded para suportar espaços e caracteres especiais
- Mostra número total de resultados encontrados
- Cards com imagem (se disponível), título, excerpt e tipo
- Botão "Voltar" para retornar à home
- Mensagem amigável se nenhum resultado foi encontrado

## 🔧 Arquitetura Técnica

### Arquivos Criados

#### 1. **src/services/search.ts** (167 linhas)
Serviço de busca universal que gerencia:

```typescript
export interface SearchResultItem {
  id: number;
  title: string;
  excerpt?: string;
  type: 'noticia' | 'projeto' | 'evento' | 'capacitacao' | 'parceiro';
  link?: string;
  image?: string;
}

export interface SearchResults {
  query: string;
  results: SearchResultItem[];
  total: number;
}

export async function searchAll(query: string): Promise<SearchResults>
export function getTypeLabel(type: SearchResultItem['type']): string
```

**Funcionalidades:**
- ✅ Busca simultânea em 5 tipos de conteúdo
- ✅ Suporte a API nova (CPT) e API legacy (posts + categorias)
- ✅ Cache em memória (5 minutos TTL)
- ✅ Debounce automático (300ms)
- ✅ Ordenação por relevância (títulos com match exato primeiro)
- ✅ Limite de 20 resultados por busca

**Como funciona:**

```
API NOVA (CPT):
┌─────────────────────────────────┐
│ searchAll("termo")              │
└────────┬────────────────────────┘
         │ Promise.allSettled() paralelo
         ├─ POST /noticia?search=termo
         ├─ POST /projeto?search=termo
         ├─ POST /evento?search=termo
         ├─ POST /capacitacao?search=termo
         └─ POST /parceiro?search=termo

API LEGACY (posts + categorias):
┌─────────────────────────────────┐
│ searchAll("termo")              │
└────────┬────────────────────────┘
         │ Para cada categoria (news, projects, events)
         ├─ GET /posts?search=termo&categories=14
         ├─ GET /posts?search=termo&categories=90
         └─ GET /posts?search=termo&categories=9
```

#### 2. **src/components/SearchBar.tsx** (212 linhas)
Componente responsivo de entrada de busca

**Props:**
```typescript
interface SearchBarProps {
  isMobile?: boolean;        // true = drawer, false = inline
  onResultClick?: () => void; // callback ao clicar resultado
}
```

**Features:**
- ✅ Versão desktop inline com dropdown
- ✅ Versão mobile com drawer fullscreen
- ✅ Debounce de 300ms evita requests excessivas
- ✅ Animações suaves (fade-in dropdown)
- ✅ Botão X para limpar busca
- ✅ Loader circular durante busca
- ✅ Clique fora fecha dropdown
- ✅ Navegação por hash automática ao clicar resultado

#### 3. **src/components/pages/Search.tsx** (173 linhas)
Página de resultados full-page

**Features:**
- ✅ Exibição de N resultados encontrados
- ✅ Badges coloridas por tipo (notícia, projeto, etc)
- ✅ Suporte a imagens (featured_image)
- ✅ Layout responsivo com grid
- ✅ Estado de carregamento com spinner
- ✅ Mensagem de erro amigável
- ✅ Botão "Voltar" para home

### Integração no App

#### App.tsx (roteamento)
```typescript
if (currentPage.startsWith('busca/')) {
  const query = decodeURIComponent(currentPage.replace('busca/', ''));
  return <SearchPage query={query} />;
}

// No useEffect de título:
if (currentPage.startsWith('busca/')) {
  const query = decodeURIComponent(currentPage.replace('busca/', ''));
  document.title = `Busca: "${query}" - Fundação 193`;
}
```

#### Header.tsx (integração)
```tsx
// Desktop
<SearchBar isMobile={false} />

// Mobile
<SearchBar isMobile={true} onResultClick={() => setIsMenuOpen(false)} />
```

## 🎨 Design System

### Cores por Tipo
```typescript
noticia:     #3b82f6 (blue)
projeto:     #10b981 (green)
evento:      #f59e0b (amber)
capacitacao: #8b5cf6 (purple)
parceiro:    #ec4899 (pink)
```

### Tipografia
- Título: lg, font-bold, text-neutral-900
- Excerpt: text-sm/base, text-neutral-600, é clipped em 100 caracteres

### Espaçamento
- Card padding: p-6
- Gap entre resultados: space-y-4
- Border radius: rounded-lg

## 🚀 Como Usar

### Para o Desenvolvedor

#### 1. Teste a busca no Header
```bash
npm run dev  # localhost:5174
```

Desktop: Digite na SearchBar no Header
Mobile: Clique ícone de lupa → modal aparece

#### 2. Navegação por hash
```
Home → Digite "notícia"
Dropdown mostra resultados
Clique em um resultado → hash muda para #busca/noticia
Página de resultados renderiza
```

#### 3. Modificar/Estender a busca

##### Adicionar novo tipo de conteúdo
```typescript
// search.ts - adicione em searchNewAPI:
['tipo-novo', query, 'tipo-novo']

// Atualize o tipo SearchResultItem:
type: 'noticia' | 'projeto' | 'evento' | 'capacitacao' | 'parceiro' | 'tipo-novo'

// Adicione cor em Search.tsx getTypeColor():
case 'tipo-novo': return '#seu-codigo-hex'
```

##### Modificar debounce
```typescript
// SearchBar.tsx linha ~31
debounceRef.current = setTimeout(async () => {
  // Mude 300 para outro valor (em ms)
}, 300);
```

##### Aumentar limite de resultados
```typescript
// search.ts - linha ~195
results: results.slice(0, 20), // Mude 20 para outro número
```

### Para o Cliente/Usuário

#### Desktop
1. **Digite na barra de busca** no topo do site (ao lado da navegação)
2. **Veja resultados em tempo real** (aparece automaticamente enquanto digita)
3. **Clique em qualquer resultado** para ver a página completa

#### Mobile
1. **Toque no ícone de lupa** no topo
2. **Digital o termo** que deseja buscar
3. **Escolha um resultado** da lista
4. Toque "Cancelar" para fechar

#### Página de Resultados
- **Veja todos os resultados** em uma página dedicada
- **Cada card mostra**: tipo (badge colorida), título, resumo e imagem
- **Clique em qualquer card** para abrir o conteúdo completo
- **"Voltar"** para retornar à página anterior

## 🔄 Fluxo de Busca Completo

```
Usuário digita "incêndio" na SearchBar
          ↓
Debounce aguarda 300ms (se usuário parar de digitar)
          ↓
searchAll("incêndio") é chamado
          ↓
┌─────────────────────────────────┐
│ Busca em paralelo (5 rotas)    │
├─────────────────────────────────┤
│ ✓ GET /noticia?search=incêndio │
│ ✓ GET /projeto?search=incêndio │
│ ✓ GET /evento?search=incêndio  │
│ ✓ GET /capacitacao?search=... │
│ ✓ GET /parceiro?search=...    │
└─────────────────────────────────┘
          ↓
Resultados combinados e ordenados
          ↓
Dropdown renderiza com resultados (máx 20)
          ↓
Usuário clica em "Treinamento de Combate a Incêndios"
          ↓
Hash muda para: #busca/treinamento
          ↓
App renderiza <SearchPage query="incêndio" />
          ↓
Página mostra todos os resultados com cards maiores
```

## 🔐 Segurança & Performance

### Query Encoding
```typescript
// Hash safe
#busca/covid-19           → ok
#busca/api de dados       → url-encoded: #busca/api%20de%20dados
#busca/c++ programming    → url-encoded: #busca/c%2B%2B%20programming

// Descriptors (App.tsx)
decodeURIComponent(currentPage.replace('busca/', ''))
```

### Cache Strategy
```typescript
searchCache.set(`${query.toLowerCase()}`, {
  timestamp: Date.now(),
  results: searchResults,
  // Expira em 5 minutos (CACHE_TTL = 5 * 60 * 1000)
});
```

### Rate Limiting
- Debounce de 300ms previne requests excessivas enquanto digita
- Cache de 5 minutos para mesma query
- Máximo 20 resultados exibidos por tipo

## 🐛 Troubleshooting

### Busca não retorna resultados
- **Verificar**: API_URL está correcta em `.env.local`?
- **Verificar**: Os posts existem na API? (teste em Postman)
- **Verificar**: Categoria correta em `.env.local` para modo legacy?

### Dropdown não aparece no Desktop
- Verificar se `SearchBar isMobile={false}` está no Header
- Verificar CSS: `absolute top-full left-0 right-0 mt-2`

### Modal não abre no Mobile
- Verificar se `SearchBar isMobile={true}` está no Header mobile
- Verificar se state `isSearching` muda corretamente

### Imagens não exibem
- **API nova**: Verificar se ACF field `featured_image` retorna URL
- **API legacy**: Verificar se `_embedded[wp:featuredmedia]` tem `source_url`

## 📊 API Endpoints Suportados

### API Nova (CPT)
```
GET /wp-json/wp/v2/noticia?search=termo&per_page=10
GET /wp-json/wp/v2/projeto?search=termo&per_page=10
GET /wp-json/wp/v2/evento?search=termo&per_page=10
GET /wp-json/wp/v2/capacitacao?search=termo&per_page=10
GET /wp-json/wp/v2/parceiro?search=termo&per_page=10
```

### API Legacy
```
GET /wp-json/wp/v2/posts?search=termo&categories=14&per_page=10&_embed=1
(categories: 14=noticias, 90=projetos, 9=eventos)
```

## 📝 Próximas Melhorias (Roadmap)

- [ ] Adicionar filtros por tipo (só notícias, só eventos, etc)
- [ ] Busca avançada com operadores (AND, OR, NOT)
- [ ] Destacar termo buscado nos resultados
- [ ] Analytics: rastrear termos mais buscados
- [ ] Sugestões/autocompletar baseado em histórico
- [ ] Busca global em conteúdo estático (pages)
- [ ] Testes unitários com Vitest

## 🎯 Checklist de Testes

- [ ] Desktop: Digitar e ver dropdown com resultados
- [ ] Desktop: Clicar resultado e navegar para página
- [ ] Desktop: Clicar X para limpar busca
- [ ] Desktop: Busca vazia mostra mensagem
- [ ] Mobile: Ícone de lupa abre modal
- [ ] Mobile: Resultados aparecem ao digitar
- [ ] Mobile: Clique resultado fecha modal e navega
- [ ] Página de resultados: Renderiza com N resultados
- [ ] Página de resultados: Botão "Voltar" funciona
- [ ] Cache: Segunda busca idêntica é mais rápida
- [ ] Legacy mode: Busca funciona com `VITE_DATA_SOURCE=legacy`
- [ ] URL encoding: Termos com espaços funcionam (#busca/api de dados)

