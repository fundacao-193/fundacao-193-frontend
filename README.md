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
- **Supabase 2.57.4** - Plataforma de backend (banco de dados)

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (geralmente vem com Node.js)

Para verificar se você tem o Node.js instalado:

```bash
node --version
npm --version
```

## Instalação

1. Clone o repositório (ou baixe os arquivos do projeto)

```bash
git clone [URL_DO_REPOSITORIO]
cd fundacao-193
```

2. Instale as dependências

```bash
npm install
```

## Como Executar

### Modo Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O site estará disponível em `http://localhost:5173`

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
│   │   │   ├── Accounts.tsx
│   │   │   ├── Edits.tsx
│   │   │   ├── Documents.tsx
│   │   │   └── LGPD.tsx
│   │   ├── Hero.tsx       # Seção hero/banner
│   │   ├── About.tsx      # Seção sobre
│   │   ├── Services.tsx   # Áreas de atuação
│   │   ├── Impact.tsx     # Números de impacto
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
   - Prestação de Contas
   - Editais
   - Documentos
   - LGPD

### Funcionalidades Interativas

- **Botões Flutuantes**: Acesso rápido a Instagram, WhatsApp e Rádio CBMDF
- **Menu Dropdown**: Navegação organizada por categorias
- **Formulário de Contato**: Para dúvidas e propostas
- **Design Responsivo**: Adaptado para desktop, tablet e mobile

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
- Telefone: (61) 3321-3000
- Endereço: SHS Quadra 6, Conjunto A, Bloco A, Sala 501 - Brasília-DF

## Equipe de Desenvolvimento

Desenvolvido com dedicação para apoiar quem salva vidas.

---

**Versão:** 1.0.0
**Última atualização:** Janeiro 2026
