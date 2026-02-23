# Guia de Deploy no Cloudflare Pages

## 📋 Pré-requisitos

1. **Git Repository**: Projeto deve estar versionado no GitHub (ou GitLab)
2. **Conta Cloudflare**: Necessário ter uma conta na [cloudflare.com](https://dash.cloudflare.com)
3. **Repositório Público**: O repositório precisa estar acessível pelo Cloudflare

## 🚀 Passo a Passo - Deploy Automático

### 1. Conectar Repositório ao Cloudflare

1. Acesse [https://dash.cloudflare.com](https://dash.cloudflare.com) e faça login
2. Clique em **"Pages"** no menu lateral
3. Clique em **"Create a project"** → **"Connect to Git"**
4. Escolha o provedor (GitHub, GitLab, etc)
5. Autorize o Cloudflare a acessar seus repositórios
6. Selecione o repositório `fundacao-193-frontend`
7. Configure:
   - **Branch**: `main` (ou sua branch principal)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**: Veja seção abaixo

### 2. Configurar Variáveis de Ambiente

Após selecionar o repositório, você terá uma tela de configuração. Adicione:

```
VITE_WP_API_URL = https://api.fundacao193.org.br/wp-json/wp/v2
```

**Para diferentes ambientes:**

- **Staging**: `https://staging-api.fundacao193.org.br/wp-json/wp/v2`
- **Produção**: `https://api.fundacao193.org.br/wp-json/wp/v2`

### 3. Deploy Inicial

1. Clique em **"Save and Deploy"**
2. Cloudflare criará uma build automática
3. Você receberá um link temporário: `seu-projeto.pages.dev`
4. A cada push para `main`, uma nova build acontece automaticamente

## 📊 Verificar Status do Deploy

1. Acesse o painel do Cloudflare Pages
2. Selecione seu projeto
3. Veja o histórico de deploys e logs de build

Se houver erro, clique no deploy com falha para ver os logs.

## 🔗 Domínio Personalizado (Opcional)

1. No painel do projeto → **Settings** → **Domains**
2. Clique em **"Add domain"**
3. Escolha entre:
   - **Cloudflare domain**: Subdomínio gratuito (ex: fundacao193.pages.dev)
   - **Custom domain**: Seu próprio domínio

### Para Domínio Personalizado com CNAME

Se você quer usar `fundacao193.org.br`:

1. No Cloudflare Pages, adicione o domínio
2. Cloudflare fornecerá o CNAME target
3. Em seu provedor de DNS, adicione o registro:
   ```
   Type: CNAME
   Name: fundacao193.org.br (ou subdomain)
   Target: seu-projeto.pages.dev
   ```
4. Aguarde propagação (até 24h)

## 🔐 Variáveis de Ambiente - Detalhes

### Variáveis Necessárias

```env
# OBRIGATÓRIA - WordPress API para conteúdo
VITE_WP_API_URL=https://api.fundacao193.org.br/wp-json/wp/v2

# OPCIONAL - Se usar legacy data source
# VITE_DATA_SOURCE=legacy
```

### Como Adicionar no Cloudflare

1. Projeto → **Settings** → **Environment variables**
2. Clique **"Add variable"**
3. Marque os ambientes onde aplicar (Production, Preview, etc)
4. Salve e redeploy

**Importante**: As variáveis prefixadas com `VITE_` são expostas ao frontend (browser).

## 🔄 Re-deploy Manual

Se precisar forçar um novo deploy:

1. Projeto → **Deployments**
2. Clique no deploy mais recente
3. **"Retry deployment"**

Ou faça um novo push para a branch configurada.

## 📦 Build Otimizado

O projeto está configurado para:

- ✅ Minificação de JavaScript/CSS
- ✅ Tree shaking (remove código morto)
- ✅ Code splitting automático
- ✅ Compressão de bundle
- ✅ Cache busting (arquivos com hash)

Build típico da aplicação:

```
dist/
├── index.html           (~15 KB)
├── assets/
│   ├── index-[hash].js  (~250 KB after gzip)
│   ├── react-vendor-[hash].js
│   ├── ui-vendor-[hash].js
│   └── index-[hash].css (~50 KB)
└── public/
    └── images/ ...
```

## 🧪 Simular Produção Localmente

Antes de fazer deploy:

```bash
# Build
npm run build

# Simular servidor de produção
npm run preview

# Abre em http://localhost:4173
```

## ⚡ Performance & Monitoramento

O Cloudflare oferece:

- **Analytics**: Requisições, banda usada, visitors
- **Core Web Vitals**: LCP, FID, CLS
- **Lighthouse scores**: Performance automático

Acesse em: Projeto → **Analytics** → **Web Analytics**

## 🔍 Troubleshooting

### Build Falhou

Verifique os logs de build:
1. Projeto → **Deployments** → Deployment com erro
2. Clique em **"Deployment details"**
3. Veja a seção **Build log**

Erros comuns:
- `Node version too old`: Cloudflare usa Node 18.x por padrão
- `VITE_WP_API_URL undefined`: Variável de ambiente não configurada
- `npm install falhou`: Verifique `package.json` e `package-lock.json`

### Página renderiza em branco

1. Abra DevTools (F12)
2. Verifique **Console** para erros
3. Verifique **Network** se `VITE_WP_API_URL` está acessível
4. Verifique CORS (o WordPress precisa permitir requests do domínio do Cloudflare)

### Assets não carregam

Se imagens/CSS não aparecem:
- Cloudflare está servindo com cache
- Limpe o cache: Projeto → **Caching** → **Purge Cache** → **Purge Everything**
- Aguarde 60 segundos

## 📞 Próximos Passos

1. **Git Push**: Faça commit e push para `main`
   ```bash
   git add .
   git commit -m "Deploy configuration for Cloudflare"
   git push origin main
   ```

2. **Monitor**: Acompanhe o deploy no dashboard Cloudflare

3. **Teste**: Acesse o link gerado e teste todas as funcionalidades

4. **Configure domínio**: Se tiver domínio, adicione nas configurações do Cloudflare

## 📚 Recursos Adicionais

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Troubleshooting Cloudflare Pages](https://developers.cloudflare.com/pages/support/troubleshooting/)
