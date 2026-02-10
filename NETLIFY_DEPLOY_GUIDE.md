# 🚀 Guia de Deploy no Netlify - Fundação 193 Frontend

## ✅ Problemas Corrigidos

### 1. Variáveis de Ambiente não Configuradas
**Problema:** API retornando `/undefined/noticia` e `/undefined/evento`  
**Causa:** `VITE_WP_API_URL` não estava configurado no Netlify  
**Solução:** Configurar variáveis de ambiente no painel do Netlify

### 2. Imagens não Carregando (404)
**Problema:** Logs com `brasimpex.png`, `egestor.png`, etc. não encontrados  
**Causa:** Imagens estavam em `/src/assets/images/` (caminho de desenvolvimento)  
**Solução:** Imagens movidas para `/public/images/` e código atualizado

---

## 📋 Passo a Passo para Deploy

### 1️⃣ Commit e Push das Correções

```bash
# Adicionar arquivos modificados
git add netlify.toml src/components/Partners.tsx public/images/

# Commit das correções
git commit -m "fix: corrigir deploy Netlify - mover imagens para public e adicionar netlify.toml"

# Enviar para o repositório
git push origin main
```

### 2️⃣ Configurar Variáveis de Ambiente no Netlify

1. **Acesse o painel do Netlify:** https://app.netlify.com
2. **Selecione seu site:** `tangerine-gecko-31c833` (ou o nome do seu site)
3. **Vá em:** `Site settings` > `Build & deploy` > `Environment variables`
4. **Clique em:** `Add a variable` ou `Edit variables`

#### **Variáveis OBRIGATÓRIAS:**

| Key | Value | Descrição |
|-----|-------|-----------|
| `VITE_WP_API_URL` | `https://fundacao193.org.br/wp-json/wp/v2` | URL da API WordPress |

#### **Variáveis OPCIONAIS (se usar modo legado):**

| Key | Value | Descrição |
|-----|-------|-----------|
| `VITE_DATA_SOURCE` | `legacy` | Ativa modo legado (posts + categorias) |
| `VITE_WP_LEGACY_API_URL` | `https://fundacao193.org.br/wp-json/wp/v2` | URL da API WordPress legada |
| `VITE_WP_LEGACY_CATEGORY_NEWS` | `14` | ID da categoria de notícias |
| `VITE_WP_LEGACY_CATEGORY_PROJECTS` | `90` | ID da categoria de projetos |
| `VITE_WP_LEGACY_CATEGORY_EVENTS` | `9` | ID da categoria de eventos |

> **💡 Nota:** Se você não configurar as variáveis opcionais, o sistema usará os valores padrão já configurados no código.

### 3️⃣ Forçar Rebuild no Netlify

Depois de configurar as variáveis de ambiente:

1. **Vá em:** `Deploys`
2. **Clique em:** `Trigger deploy` > `Deploy site`

Ou simplesmente faça um novo push no repositório.

---

## 🔍 Verificar se Funcionou

### Após o deploy, verifique:

1. **Open Console do navegador** (F12)
2. **Acesse:** https://tangerine-gecko-31c833.netlify.app
3. **Verifique se:**
   - ✅ Não há erros de `404` para `/undefined/noticia` ou `/undefined/evento`
   - ✅ Imagens dos parceiros estão carregando (egestor.png, brasimpex.png, etc.)
   - ✅ Notícias e eventos estão aparecendo

### Comandos úteis para debug:

```bash
# Ver logs do Netlify CLI (se instalado)
netlify logs

# Build local para testar antes de fazer deploy
npm run build
npm run preview
```

---

## 🛠️ Estrutura de Arquivos Importantes

```
fundacao-193-frontend/
├── netlify.toml              # ✅ NOVO - Configurações do Netlify
├── public/
│   └── images/               # ✅ MOVIDO - Imagens dos parceiros
│       ├── egestor.png
│       ├── brasimpex.png
│       ├── hospitalsantamaria.png
│       └── ...
├── src/
│   ├── components/
│   │   └── Partners.tsx      # ✅ CORRIGIDO - Caminho das imagens
│   └── services/
│       └── api.ts            # Usa VITE_WP_API_URL
└── .env.example              # Referência de variáveis
```

---

## ⚙️ Configurações do netlify.toml

O arquivo `netlify.toml` criado contém:

- ✅ **Build command:** `npm run build`
- ✅ **Publish directory:** `dist`
- ✅ **Node.js version:** 18 (compatível com Vite 5)
- ✅ **SPA redirects:** Todas as rotas apontam para `index.html` (hash routing)
- ✅ **Security headers:** X-Frame-Options, X-XSS-Protection, etc.
- ✅ **Cache headers:** Assets com cache de 1 ano, HTML sem cache

---

## 🔄 Modo Legado vs CPT/ACF

### **Modo Legado (Site Antigo)** - Para usar temporariamente
Configure no Netlify:
```
VITE_DATA_SOURCE=legacy
VITE_WP_API_URL=https://fundacao193.org.br/wp-json/wp/v2
```

### **Modo CPT/ACF (Novo WordPress)** - Estrutura final
Configure no Netlify:
```
VITE_WP_API_URL=https://api.fundacao193.org.br/wp-json/wp/v2
```
(Não defina `VITE_DATA_SOURCE`)

---

## 🆘 Troubleshooting

### Problema: Ainda vejo `/undefined/` nas URLs
**Solução:** Verifique se as variáveis de ambiente foram salvas no Netlify e force um rebuild

### Problema: Imagens ainda não carregam
**Solução:** Certifique-se de que fez commit e push da pasta `public/images/`

### Problema: Site em branco após deploy
**Solução:** Verifique os logs do Netlify (`Deploys` > último deploy > `Deploy log`)

### Problema: Erro de CORS ao acessar API
**Solução:** Verifique se o WordPress permite requisições do domínio Netlify

---

## 📝 Checklist Final

- [ ] ✅ Variável `VITE_WP_API_URL` configurada no Netlify
- [ ] ✅ Commit e push de `netlify.toml`, `Partners.tsx` e `public/images/`
- [ ] ✅ Rebuild do site no Netlify
- [ ] ✅ Verificar console do navegador sem erros 404
- [ ] ✅ Testar navegação entre páginas
- [ ] ✅ Verificar imagens dos parceiros carregando

---

## 🎯 URLs Importantes

- **Site produção:** https://tangerine-gecko-31c833.netlify.app
- **Painel Netlify:** https://app.netlify.com
- **API WordPress:** https://fundacao193.org.br/wp-json/wp/v2
- **Repositório:** (seu repositório Git)

---

## 📞 Suporte

Se ainda tiver problemas após seguir este guia:
1. Verifique os logs do console do navegador (F12)
2. Verifique os logs de deploy no Netlify
3. Teste o build localmente com `npm run build && npm run preview`
