# 🎨 Resumo Visual - Arquitetura de Busca

## 1️⃣ Fluxo de User Story

```
┌─────────────────────────────────────────────────────────┐
│ USUÁRIO DESKTOP                                         │
└─────────────────────────────────────────────────────────┘

[HOME PAGE]
    │
    ├─ Vê Header com barra de busca
    │  ┌──────────────────────────────┐
    │  │ 🔍 Buscar...            [X]  │  ← SearchBar Desktop
    │  └──────────────────────────────┘
    │
    └─ Digita "capacitação"
        │
        ├─ Debounce: aguarda 300ms
        │
        └─ API retorna resultados
            │
            ┌───────────────────────────────────────┐
            │ DROPDOWN COM RESULTADOS               │
            ├───────────────────────────────────────┤
            │                                       │
            │ [Capacitação] Treinamento de Fogo   │
            │ Aprenda técnicas de combate...       │
            │                                       │
            │ [Capacitação] Segurança Estrutural  │
            │ Proteção em ambientes...            │
            │                                       │
            │ Mostrando 2 de 8 resultados        │
            │                                       │
            └───────────────────────────────────────┘
            │
            └─ Clica em "Treinamento de Fogo"
                │
                ├─ Hash muda: #busca/capacitação
                │
                └─ Renderiza: <SearchPage query="capacitação" />
                    │
                    ┌──────────────────────────────────┐
                    │ PÁGINA DE RESULTADOS 8 Encontrados
                    ├──────────────────────────────────┤
                    │                                  │
                    │ [Capacitação]                   │
                    │ Treinamento de Fogo             │
                    │ Aprenda técnicas... [🖼️ imagem] │
                    │                                  │
                    │ [Capacitação]                   │
                    │ Segurança Estrutural            │
                    │ Proteção em ambientes... [img]  │
                    │                                  │
                    │ ... (6 mais)                    │
                    │                                  │
                    └──────────────────────────────────┘


┌─────────────────────────────────────────────────────────┐
│ USUÁRIO MOBILE                                          │
└─────────────────────────────────────────────────────────┘

[HOME PAGE]
    │
    ├─ Toque ícone de lupa
    │  ┌──────────────────────────┐
    │  │ 🔍 (ícone)               │
    │  └──────────────────────────┘
    │
    └─ Modal/Drawer abre do topo
        │
        ┌─────────────────────────────────┐
        │ [X Buscar...           Cancelar] │
        │                                 │
        │ (Digite aqui)                   │
        │                                 │
        ├─────────────────────────────────┤
        │ Resultados da busca             │
        │ [Tipo] Título                   │
        │ Resumo do conteúdo              │
        │                                 │
        │ [Tipo] Outro Resultado          │
        │ Resumo...                       │
        │                                 │
        └─────────────────────────────────┘
        │
        └─ Clica em resultado
            │
            ├─ Modal fecha automaticamente
            │
            └─ Navega para resultado (#busca/termo)
```

---

## 2️⃣ Arquitetura de Componentes

```
┌─────────────────────────────────────┐
│         APP.tsx (Router)            │
│  hash-based: #/home, #/busca/      │
└────────────┬────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌─────────────┐  ┌──────────────────┐
│   Header    │  │  SearchPage      │
│             │  │  (página inteira)│
│  SearchBar  │  │                  │
│  - desktop  │  │ #busca/termo     │
│  - mobile   │  └──────────────────┘
└─────────────┘

┌──────────────────────────────────────┐
│      SearchBar Component             │
├──────────────────────────────────────┤
│ Props:                               │
│  - isMobile: boolean                 │
│  - onResultClick: () => void         │
│                                      │
│ Desktop (isMobile=false):            │
│  ┌──────────────────────────┐        │
│  │ 🔍 Buscar...        [X]  │        │
│  └──────────────────────────┘        │
│  ┌──────────────────────────┐        │
│  │ Dropdown com Resultados  │        │
│  └──────────────────────────┘        │
│                                      │
│ Mobile (isMobile=true):              │
│  ┌──────────────────────────┐        │
│  │ 🔍      Buscar... Cancelar│       │
│  └──────────────────────────┘        │
│  │ Resultados...            │        │
│  │                          │        │
│  └──────────────────────────┘        │
└──────────────────────────────────────┘
```

---

## 3️⃣ Fluxo de Dados - Busca

```
┌──────────────────────────────────────────────┐
│ Usuário DIGITA "notícia" na SearchBar        │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│ SearchBar.tsx:                               │
│ - onChange = setQuery("notícia")             │
│ - Trigger useEffect com debounce(300ms)      │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│ searchAll("notícia") é chamado               │
│ src/services/search.ts                       │
└──────────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
   ┌────────┐  ┌────────┐  ┌────────┐
   │ API    │  │ Modo?  │  │ Cache? │
   │ novo?  │  │ legacy?│  │ hit?   │
   └────────┘  └────────┘  └────────┘
        │           │           │
        NO          YES         YES
        │           │           │
        ├─ Busca em 5 rotas CPT │ 
        │  (paralelo com        │ Retorna
        │   Promise.allSettled)  │ resultados
        │                        │ do cache
        │  GET /noticia?search=  │
        │  GET /projeto?search=  │ (0ms!)
        │  GET /evento?search=   │
        │  GET /capacitacao?     │
        │  GET /parceiro?search= │
        │                        │
        ├─ Busca em posts legacy│
        │  (3 categorias)       │
        │                       │
        │  GET /posts?search=.. │
        │      &categories=14   │
        │  GET /posts?search=.. │
        │      &categories=90   │
        │  GET /posts?search=.. │
        │      &categories=9    │
        │                │
        └────────┬───────┘
                 │
                 ▼
        ┌────────────────┐
        │ Resultados     │
        │ Combinados &   │
        │ Ordenados      │
        │ (20 max)       │
        └────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │ Cache(5min)    │
        │ armazena       │
        └────────────────┘
                 │
                 ▼
        ┌────────────────────────┐
        │ SearchResults retorna: │
        │ {                      │
        │   query: "notícia"     │
        │   results: [...],      │
        │   total: 42            │
        │ }                      │
        └────────────────────────┘
                 │
                 ▼
        ┌────────────────────────┐
        │ SearchBar renderiza    │
        │ DROPDOWN com resultados│
        │ - 20 itens max         │
        │ - Badges coloridas     │
        │ - Hover effects        │
        └────────────────────────┘
                 │
                 ▼
        ┌────────────────────────┐
        │ User clica resultado   │
        │ "Notícia: COVID-19"    │
        └────────────────────────┘
                 │
                 ▼
        ┌────────────────────────┐
        │ Navega para:           │
        │ #busca/covid-19        │
        │                        │
        │ (hash muda)            │
        └────────────────────────┘
                 │
                 ▼
        ┌────────────────────────┐
        │ App.tsx renderiza:     │
        │ <SearchPage            │
        │   query="covid-19"     │
        │ />                     │
        └────────────────────────┘
                 │
                 ▼
        ┌────────────────────────┐
        │ SearchPage chama       │
        │ searchAll("covid-19")  │
        │ novamente (ou usa      │
        │ cache de 5 minutos!)   │
        └────────────────────────┘
```

---

## 4️⃣ Estrutura de Tipos

```typescript
// src/services/search.ts

export interface SearchResultItem {
  id: number;                                         // ID do post
  title: string;                                      // Título
  excerpt?: string;                                   // Resumo (100 chars)
  type: 'noticia' | 'projeto' | 'evento' |           // Tipo de conteúdo
         'capacitacao' | 'parceiro';
  link?: string;                                      // Hash link: #noticia-123
  image?: string;                                     // URL da imagem
}

export interface SearchResults {
  query: string;                                      // Termo original
  results: SearchResultItem[];                        // Array de 0-20 items
  total: number;                                      // Total encontrado
}

// Função principal
export async function searchAll(query: string): Promise<SearchResults>

// Utilitário
export function getTypeLabel(type): string            // "Notícia", "Projeto", etc
```

---

## 5️⃣ Design System Cores

```
┌────────────────┬────────────┬──────────────────┐
│ Tipo           │ Cor        │ Badge            │
├────────────────┼────────────┼──────────────────┤
│ 📰 Notícia     │ #3b82f6    │ Azul             │
├────────────────┼────────────┼──────────────────┤
│ 📁 Projeto     │ #10b981    │ Verde            │
├────────────────┼────────────┼──────────────────┤
│ 📅 Evento      │ #f59e0b    │ Âmbar            │
├────────────────┼────────────┼──────────────────┤
│ 👨‍🎓 Capacitação │ #8b5cf6    │ Roxo             │
├────────────────┼────────────┼──────────────────┤
│ 🤝 Parceiro    │ #ec4899    │ Rosa             │
└────────────────┴────────────┴──────────────────┘
```

---

## 6️⃣ Responsividade Breakpoints

```
┌─────────────────────────────────────────────────┐
│ MOBILE (< 1024px = lg:)                        │
├─────────────────────────────────────────────────┤
│                                                 │
│  Header:                                        │
│  [Logo] [🔍] [☰]  ← SearchBar é ícone         │
│                                                 │
│  Clica 🔍 → drawer fullwidth abre               │
│  ┌─────────────────────────────────────┐       │
│  │ [X] Buscar...          [Cancelar]   │       │
│  ├─────────────────────────────────────┤       │
│  │ [Resultado 1] [Resultado 2] ...    │       │
│  └─────────────────────────────────────┘       │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ TABLET (1024px ≤ x < 1280px)                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  Header:                                        │
│  [Logo] [Navegação] [SearchBar] [Colabore]    │
│                                                 │
│  SearchBar width: 280px                         │
│  Dropdown: 100% da SearchBar width              │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ DESKTOP (> 1280px)                              │
├─────────────────────────────────────────────────┤
│                                                 │
│  Header:                                        │
│  [Logo] [Nav] [SearchBar(320px)] [Botão]       │
│                                                 │
│  Dropdown com sombra: shadow-lg                 │
│  Z-index: z-50 (acima de tudo)                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 7️⃣ Página de Resultados

```
┌────────────────────────────────────────────────────┐
│                   #busca/termo                     │
├────────────────────────────────────────────────────┤
│                                                    │
│  [← Voltar]                                        │
│                                                    │
│  Resultados da busca                              │
│  Para: "termo"                                     │
│  8 resultados encontrados                          │
│                                                    │
│  ┌─────────────────────────────────────────────┐  │
│  │ [Notícia]                                   │  │
│  │ Título do Post                              │  │
│  │ Lorem ipsum dolor sit amet consectetur...  │  │
│  │                                 [Imagem]    │  │
│  └─────────────────────────────────────────────┘  │
│                                                    │
│  ┌─────────────────────────────────────────────┐  │
│  │ [Projeto]                                   │  │
│  │ Outro Resultado                             │  │
│  │ Descrição resumida do projeto...            │  │
│  │                                 [Imagem]    │  │
│  └─────────────────────────────────────────────┘  │
│                                                    │
│  ... (6 cards mais)                                │
│                                                    │
└────────────────────────────────────────────────────┘

RESPONSIVE GRID:
- Desktop: 2 colunas (grid-cols-2)
- Tablet:  2 colunas (md:grid-cols-1)
- Mobile:  1 coluna (default)
```

---

## 8️⃣ Performance Timeline

```
T=0ms:     User digita primeira letra "n"
           │
           ├─ Debounce inicia (contador 300ms)
           │
T=300ms:   User parou de digitar por 300ms
           │
           ├─ searchAll("n") executado
           ├─ Cache misses (primeira busca)
           │
T=305ms:   API requests iniciadas (5 rotas paralelas)
           │ GET /noticia?search=n
           │ GET /projeto?search=n
           │ GET /evento?search=n
           │ ...
           │
T=450ms:   Todas as respostas recebidas
           │
           ├─ Resultados combinados
           ├─ Cache armazenado
           ├─ Dropdown renderizado
           │
T=455ms:   User vê resultados ✓ (←455ms total)

SEGUNDA BUSCA (mesma query):
T=0ms:     User digita novamente "n"
           │
T=300ms:   searchAll("n") hit cache ✓
           │
T=301ms:   Resultados no dropdown ✓ (←1ms!)
```

---

## 9️⃣ Estado do Componente SearchBar

```
SearchBar State:
┌─────────────────┬──────────────┬──────────────────┐
│ Property        │ Tipo         │ Descrição        │
├─────────────────┼──────────────┼──────────────────┤
│ query           │ string       │ Termo digitado   │
│ isOpen          │ boolean      │ Dropdown visível?│
│ isSearching     │ boolean      │ Mobile aberto?   │
│ loading         │ boolean      │ Requisição?      │
│ results         │ SearchResults│ Resultados fetch │
│ debounceRef     │ Ref<timeout> │ Debounce timeout │
│ searchRef       │ Ref<div>     │ Detectar click   │
└─────────────────┴──────────────┴──────────────────┘

State Flow:
[idle]
  ↓ (usuário digita)
[typing] (typing = query.length > 0)
  ↓ (aguarda 300ms)
[searching] (loading = true)
  ↓ (API responde)
[loaded] (loading = false, results = {...})
  ↓ (usuário clica resultado)
[navigating] (hash muda)
  ↓ (newPage renderiza)
[idle] (query = "", results = null)
```

---

## 🔟 Checklist de Critério de Aceita

- [x] Busca funciona em desktop AND mobile
- [x] 5 tipos de conteúdo (notícia, projeto, evento, capacitação, parceiro)
- [x] Suporta API nova (CPT) AND API legacy (posts)
- [x] Debounce 300ms implementado
- [x] Cache 5 minutos implementado
- [x] Dropdown dinâmico no desktop
- [x] Drawer fullwidth no mobile
- [x] Página de resultados (#busca/termo)
- [x] URL encoding para espaços
- [x] Badges coloridas por tipo
- [x] Imagens quando disponível
- [x] TypeScript strict mode sem erros
- [x] Build otimizado (<500KB JS)
- [x] Acessibilidade (ARIA, teclado)
- [x] Performance < 500ms (com cache)

