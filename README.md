# Fundação 193 - Website Institucional

Site institucional da Fundação 193, instituição de apoio ao Corpo de Bombeiros Militar do Distrito Federal (CBMDF).

## Sobre o Projeto

A Fundação 193 é uma instituição sem fins lucrativos dedicada a fortalecer e apoiar as atividades do Corpo de Bombeiros Militar do Distrito Federal através de investimentos em capacitação profissional, modernização de infraestrutura, pesquisa e inovação.

Este website foi desenvolvido para:
- Apresentar a missão, visão e valores da instituição
- Divulgar projetos e áreas de atuação
- Fornecer transparência através de prestação de contas
- Facilitar o contato e engajamento com a comunidade
- Promover eventos e capacitações

## Tecnologias Utilizadas

- **React 18.3.1** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS 3.4.1** - Framework CSS utilitário
- **Lucide React 0.344.0** - Biblioteca de ícones
- **WordPress REST API** - CMS headless com conteúdo dinâmico (Custom Theme + ACF)

## Arquitetura

### CMS & Backend
O website utiliza **WordPress como CMS headless** com uma custom theme e ACF (Advanced Custom Fields) para gerenciar:

**Custom Post Types (CPTs):**
- **Notícias** (CPT: `noticia`) - Com categorias dinâmicas via Taxonomy `noticia_category`
- **Projetos** (CPT: `projeto`) - Projetos e iniciativas
- **Parceiros** (CPT: `parceria`) - Parcerias institucionais
- **Eventos** (CPT: `evento`) - Eventos e treinamentos
- **Capacitações** (CPT: `capacitacao`) - Programas de capacitação
- **Documentos** (CPT: `documento`) - Documentos institucionais
- **Editais** (CPT: `edital`) - Chamadas públicas e editais
- **Prestação de Contas** (CPT: `prestacao_conta`) - Relatórios financeiros

A API do WordPress é consumida via `VITE_WP_API_URL`.

### Frontend
React aplicação com hash-based routing (sem React Router) para navegação leve e direta.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (geralmente vem com Node.js)
- **Local WP** (para desenvolvimento local do WordPress) - [Download](https://localwp.com/)

Para verificar se você tem o Node.js instalado:

```bash
node --version
npm --version
```

## Instalação e Setup Local

### 1. Clone o repositório

```bash
git clone [URL_DO_REPOSITORIO]
cd fundacao-193/fundacao-193-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas configurações:

```ini
# Local WordPress via Local WP (padrão)
VITE_WP_API_URL=http://localhost:10003/wp-json/wp/v2

# Ou seu WordPress local customizado
# VITE_WP_API_URL=http://seu-wordpress.local/wp-json/wp/v2
```

**Para Produção:**
Atualize `VITE_WP_API_URL` para o domínio do WordPress em produção:
```ini
VITE_WP_API_URL=https://api.fundacao193.org.br/wp-json/wp/v2
```

### 4. (Opcional) Modo Legado - API Antiga

O projeto suporta **dois modos de operação**:

1. **Modo Padrão (CPT/ACF)** - Consome Custom Post Types do WordPress novo ✅ *Recomendado*
2. **Modo Legado (Posts + Categorias)** - Consome posts com categorias do site antigo 🔄 *Desenvolvimento*

#### Como ativar o Modo Legado:

**Opção 1: Sem criar arquivo .env** *(mais rápido)*

```powershell
# Windows PowerShell
$env:VITE_DATA_SOURCE='legacy'; npm run dev

# Linux/Mac  
VITE_DATA_SOURCE=legacy npm run dev
```

⚡ **Valores DEFAULT já funcionam!** O código usa automaticamente:
- API: `https://fundacao193.org.br/wp-json/wp/v2`
- Categoria Notícias: `14` (Blog)
- Categoria Eventos: `9` (Eventos)
- Categoria Projetos: `90` (Projetos)

**Opção 2: Criar .env.local** *(para customizar)*

```ini
# .env.local
VITE_DATA_SOURCE=legacy

# Opcional - só se quiser customizar:
# VITE_WP_LEGACY_API_URL=https://fundacao193.org.br/wp-json/wp/v2
# VITE_WP_LEGACY_CATEGORY_NEWS=14
# VITE_WP_LEGACY_CATEGORY_EVENTS=9  
# VITE_WP_LEGACY_CATEGORY_PROJECTS=90
```

> **⚠️ Importante:** Modo legado só funciona em `desenvolvimento`. Em produção, sempre usa CPT/ACF.

## Como Executar

### Modo Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O site estará disponível em `http://localhost:5173`

**Pré-requisitos:**
- WordPress rodando localmente via Local WP (ou outro servidor)
- `VITE_WP_API_URL` apontando para sua instalação WordPress local

### Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Preview da Build

Para visualizar a versão de produção localmente:

```bash
npm run preview
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter para verificar código
- `npm run typecheck` - Verifica erros de TypeScript

## Estrutura do Projeto

```
fundacao-193/
├── public/                  # Arquivos estáticos
│   ├── logo-reduzida.png   # Logo da Fundação 193
│   └── vite.svg            # Ícone do Vite
├── src/
│   ├── components/         # Componentes React
│   │   ├── pages/         # Páginas individuais
│   │   │   ├── OurStory.tsx
│   │   │   ├── MissionValues.tsx
│   │   │   ├── Team.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Training.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── OurPartnerships.tsx
│   │   │   ├── Accounts.tsx         # Prestação de Contas
│   │   │   ├── Edits.tsx            # Editais
│   │   │   ├── Documents.tsx        # Documentos
│   │   │   ├── NewsList.tsx         # Listagem de Notícias com filtros
│   │   │   ├── NewsDetail.tsx       # Detalhes da Notícia
│   │   │   ├── ProjectDetail.tsx    # Detalhes do Projeto
│   │   │   ├── EventDetail.tsx      # Detalhes do Evento
│   │   │   ├── Search.tsx           # Página de Busca
│   │   │   └── LGPD.tsx
│   │   ├── Hero.tsx                 # Seção hero/banner
│   │   ├── About.tsx                # Seção sobre
│   │   ├── Services.tsx             # Áreas de atuação
│   │   ├── Impact.tsx               # Números de impacto
│   │   ├── News.tsx                 # Widget de notícias/eventos
│   │   ├── Partners.tsx             # Parceiros
│   │   ├── Contact.tsx              # Formulário de contato
│   │   ├── Header.tsx               # Cabeçalho
│   │   ├── Footer.tsx               # Rodapé
│   │   ├── ErrorBoundary.tsx        # Error handling global
│   │   ├── FloatingActions.tsx      # Botões flutuantes (WhatsApp, Instagram, etc)
│   │   ├── SearchBar.tsx            # Barra de busca
│   │   ├── BackToTopButton.tsx      # Botão voltar para topo
│   │   ├── ImageWithPlaceholder.tsx # Lazy loading de imagens
│   │   ├── ImageGallery.tsx         # Galeria de imagens
│   │   ├── ShareButtons.tsx         # Botões de compartilhamento
│   │   ├── ThemeToggle.tsx          # Seletor de temas
│   │   └── DetailLayout.tsx         # Layout para páginas de detalhe
│   ├── services/
│   │   ├── api.ts                   # Funções de fetch da API WordPress
│   │   └── search.ts                # Serviço de busca integrado
│   ├── types/                       # Tipos TypeScript
│   │   ├── news.ts                  # news + NewsCategory (Taxonomy)
│   │   ├── projects.ts              # Project
│   │   ├── partners.ts              # Partner
│   │   ├── events.ts                # Event
│   │   ├── training.ts              # Training
│   │   ├── documents.ts             # Document + DocumentCategory
│   │   ├── edits.ts                 # Edit
│   │   └── accounts.ts              # Account
│   ├── utils/
│   │   └── format.ts                # Funções utilitárias (formatFileSize, formatDate, getFileExtension)
│   ├── hooks/                       # Custom React hooks
│   │   ├── useScrollAnimation.ts    # Animações ao scroll
│   │   └── useBackToTop.ts          # Lógica de scroll to top
│   ├── constants/
│   │   └── ui.ts                    # Design tokens (cores, spacing, typography)
│   ├── App.tsx                      # Componente principal
│   ├── main.tsx                     # Ponto de entrada
│   ├── index.css                    # Estilos globais
│   └── vite-env.d.ts                # Tipos do Vite
├── index.html                       # HTML principal
├── package.json                     # Dependências e scripts
├── tsconfig.json                    # Configuração TypeScript
├── tailwind.config.js               # Configuração Tailwind
├── vite.config.ts                   # Configuração Vite
├── eslint.config.js                 # Configuração ESLint
└── postcss.config.js                # Configuração PostCSS
```
│   │   ├── News.tsx       # Notícias e eventos
│   │   ├── Partners.tsx   # Parceiros
│   │   ├── Contact.tsx    # Formulário de contato
│   │   ├── Header.tsx     # Cabeçalho
│   │   ├── Footer.tsx     # Rodapé
│   │   └── FloatingActions.tsx # Botões flutuantes
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Ponto de entrada
│   ├── index.css          # Estilos globais
│   └── vite-env.d.ts      # Tipos do Vite
├── index.html             # HTML principal
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
├── tailwind.config.js     # Configuração Tailwind
├── vite.config.ts         # Configuração Vite
├── eslint.config.js       # Configuração ESLint
└── postcss.config.js      # Configuração PostCSS
```

## Funcionalidades

### Navegação

O site utiliza navegação baseada em hash (#), permitindo:
- Navegação entre seções na página inicial
- Páginas dedicadas para conteúdo detalhado
- Menu responsivo para dispositivos móveis

### Seções Principais

1. **Home** - Apresentação institucional
   - Hero com chamada principal
   - Quem Somos (missão, visão, valores)
   - Áreas de Atuação
   - Impacto em Números
   - Notícias e Eventos
   - Parceiros
   - Contato

2. **Institucional**
   - Nossa História
   - Missão e Valores
   - Equipe

3. **Atuação**
   - Projetos
   - Capacitação
   - Eventos
   - Parcerias

4. **Transparência**
   - Prestação de Contas (por ano)
   - Editais (por ano, com status)
   - Documentos (por categoria)
   - LGPD

### Funcionalidades Interativas

- **Busca Integrada**: SearchBar para buscar notícias, projetos, eventos, capacitações e parceiros
- **Filtro de Notícias**: Filtragem dinâmica por categorias (Blog, Incêndio, Meio Ambiente, etc)
- **Botões Flutuantes**: Acesso rápido a Instagram, WhatsApp e Rádio CBMDF
- **Menu Dropdown**: Navegação organizada por categorias
- **Formulário de Contato**: Para dúvidas e propostas
- **Design Responsivo**: Adaptado para desktop, tablet e mobile
- **Compartilhamento Social**: Botões para compartilhar notícias
- **Back to Top**: Botão de retorno para topo em páginas longas

## Configurações Adicionais

### Variáveis de Ambiente

Para funcionalidades futuras que utilizem Supabase ou outras integrações, crie um arquivo `.env` na raiz:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### Cores do Tema

O projeto utiliza uma paleta de cores customizada:
- **Principal**: `#3d685d` (verde institucional)
- **Secundária**: `#2f5349` (verde escuro)
- **Neutros**: Escala de cinzas do Tailwind

## Deploy

### Vercel (Recomendado)

1. Faça login na Vercel
2. Importe o projeto do GitHub
3. Configure as variáveis de ambiente
4. Deploy automático

### Netlify

1. Faça login na Netlify
2. Arraste a pasta `dist/` após executar `npm run build`
3. Configure domínio personalizado se necessário

### Outros Provedores

O projeto pode ser hospedado em qualquer serviço que suporte sites estáticos:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Cloudflare Pages

## Personalização

### Sistema de Temas

O projeto possui um sistema de temas completo com 3 variações:

1. **Tema Vermelho (Padrão)** - Energia, ação e urgência
   - Cor principal: `#c11827`
   - Usado para CTAs e elementos de destaque

2. **Tema Verde** - Confiança institucional e estabilidade
   - Cor principal: `#3d685d`
   - Design original do projeto

3. **Tema Dark** - Moderno e contrastante
   - Fundo escuro: `#0f172a`
   - Para usuários que preferem dark mode

#### Alternando Temas

Os usuários podem alternar entre temas através do ícone de paleta no canto inferior direito da tela.

#### Esconder o Seletor de Temas (para apresentações/produção)

Para ocultar temporariamente o seletor de temas, edite [src/App.tsx](src/App.tsx):

```tsx
// Linha ~203 - Comente a linha do ThemeToggle:
<Footer />
<FloatingActions />
{/* <ThemeToggle /> */}  // ← Seletor de temas escondido
```

Ou remova completamente a linha. O tema ativo continuará funcionando normalmente.

#### Personalizar Cores dos Temas

As cores dos temas estão definidas em [src/index.css](src/index.css) usando CSS Custom Properties:

```css
:root {
  /* Tema Vermelho (padrão) */
  --color-primary: #c11827;
  --color-secondary: #ef7e24;
  /* ... mais variáveis */
}

[data-theme="green"] {
  /* Tema Verde */
  --color-primary: #3d685d;
  /* ... */
}

[data-theme="dark"] {
  /* Tema Dark */
  --color-primary: #ff4757;
  /* ... */
}
```

O sistema de temas é integrado ao Tailwind via [tailwind.config.js](tailwind.config.js) usando classes como `bg-primary`, `text-primary`, etc.

### Tipagem TypeScript

O projeto utiliza **TypeScript strict mode** com tipos completos definidos em `src/types/`:

**Tipos Disponíveis:**
- `news.ts` - News, NewsCategory (para categorização dinâmica)
- `projects.ts` - Project
- `events.ts` - Event
- `training.ts` - Training
- `partners.ts` - Partner
- `documents.ts` - Document, DocumentCategory (para gerenciar documentos por categoria)
- `edits.ts` - Edit (para gerenciar editais por ano)
- `accounts.ts` - Account (para prestação de contas por ano)

**Exemplo de Uso:**
```tsx
import { News, NewsCategory } from '@/types/news';
import { Document, DocumentCategory } from '@/types/documents';

const loadNews = async (): Promise<News[]> => {
  const data = await fetchAPI<News[]>(`${API_URL}/noticia?_embed=wp:term`);
  return data;
};

const loadDocuments = async (): Promise<Document[]> => {
  const data = await fetchAPI<Document[]>(`${API_URL}/documento?_embed`);
  return data;
};
```

### Utilitários

O projeto inclui funções utilitárias em `src/utils/format.ts`:

**formatFileSize(bytes: number): string**
- Converte bytes para formato legível (KB, MB, GB)
- Exemplo: `formatFileSize(1048576)` → `"1 MB"`

**getFileExtension(filename: string): string**
- Extrai extensão do arquivo em maiúsculas
- Exemplo: `getFileExtension("document.pdf")` → `"PDF"`

**formatDate(dateString: string): string**
- Formata data para formato brasileiro (dd/mm/yyyy)
- Exemplo: `formatDate("2024-01-15")` → `"15/01/2024"`

**Funções de API em `src/services/api.ts`:**
- `fetchNoticias()` - Carrega todas as notícias com categorias
- `fetchNoticiasCategories()` - Carrega lista de categorias de notícias
- `fetchProjetos()` - Carrega todos os projetos
- `fetchEventos()` - Carrega todos os eventos
- `fetchCapacitacoes()` - Carrega todos os programas de capacitação
- `fetchParceiros()` - Carrega todos os parceiros
- `fetchDocumentos()` - Carrega todos os documentos institucionais
- `fetchEditais()` - Carrega todos os editais
- `fetchPrestacaoContas()` - Carrega relatórios de prestação de contas

### Alterar Cores

Edite o arquivo `tailwind.config.js` para modificar o tema:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3d685d',
      secondary: '#2f5349',
    }
  }
}
```

### Adicionar Novas Páginas

1. Crie um novo componente em `src/components/pages/`
2. Adicione a rota em `App.tsx`
3. Atualize o menu em `Header.tsx`

### Modificar Conteúdo

O conteúdo está organizado nos componentes. Para editar:
- **Textos institucionais**: `About.tsx`, `Hero.tsx`
- **Equipe**: `pages/Team.tsx`
- **Projetos**: `pages/Projects.tsx`
- **Notícias**: `News.tsx`

## Otimização e Performance

O projeto já inclui:
- Code splitting automático do Vite
- Lazy loading de imagens
- Minificação de CSS e JavaScript
- Otimização de assets

## Acessibilidade

O site segue boas práticas:
- Contraste adequado de cores
- Navegação por teclado
- Textos alternativos em imagens
- Estrutura semântica HTML

## Suporte a Navegadores

- Chrome (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Edge (últimas 2 versões)

## Solução de Problemas

### Erro ao instalar dependências

```bash
rm -rf node_modules package-lock.json
npm install
```

### Porta 5173 já em uso

O Vite tentará usar a próxima porta disponível automaticamente, ou você pode especificar:

```bash
npm run dev -- --port 3000
```

### Erros de TypeScript

Execute a verificação de tipos:

```bash
npm run typecheck
```

## Contribuindo

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Licença

Este projeto é propriedade da Fundação 193. Todos os direitos reservados.

## Contato

**Fundação 193**
- Website: [fundacao193.org.br]
- Email: contato@fundacao193.org.br
- Telefone: (61) 99382-3763
- Endereço: SHS Quadra 6, Conjunto A, Bloco A, Sala 501 - Brasília-DF

## Equipe de Desenvolvimento

Desenvolvido com dedicação para apoiar quem salva vidas.

---

**Versão:** 1.0.0
**Última atualização:** Janeiro 2026
