# Guia: Alternar entre Dev (Legado) e Prod (CPT/ACF)

## TL;DR

- **Dev com site antigo?** → Cria `.env.local` com `VITE_DATA_SOURCE=legacy`
- **Dev com novo WordPress?** → Deixa `.env.local` vazio ou não criado (usa `VITE_WP_API_URL`)
- **Prod?** → Não importa o env, **sempre usa CPT/ACF** (legacy é ignorado automaticamente)

---

## Setup Passo a Passo

### 1️⃣ Para Desenvolver com o Site Antigo (Posts + Categorias)

Crie um arquivo **`.env.local`** na raiz do projeto:

```ini
# Ativa modo legado
VITE_DATA_SOURCE=legacy

# URL da API do site antigo
VITE_WP_LEGACY_API_URL=https://fundacao193.org.br/wp-json/wp/v2

# IDs das categorias (você encontra na dashboard do WordPress antigo)
VITE_WP_LEGACY_CATEGORY_NEWS=14
VITE_WP_LEGACY_CATEGORY_PROJECTS=15
VITE_WP_LEGACY_CATEGORY_EVENTS=16
VITE_WP_LEGACY_CATEGORY_PARTNERS=17
VITE_WP_LEGACY_CATEGORY_TRAINING=18

# Opcional: limite de itens por fetch
VITE_WP_LEGACY_PER_PAGE=50
```

Depois rode:
```bash
npm run dev
```

### 2️⃣ Para Desenvolver com o Novo WordPress (CPT/ACF)

Crie **`.env.local`** apontando para seu WordPress local:

```ini
VITE_WP_API_URL=http://localhost:10003/wp-json/wp/v2
```

Ou **delete `.env.local`** e use o `.env.example` como padrão (usa `VITE_WP_API_URL` sem alterações).

Depois rode:
```bash
npm run dev
```

### 3️⃣ Para Build de Produção

```bash
npm run build
```

Independentemente de qual `.env` você tenha usado, **produção ignora `legacy`** e usa apenas CPT/ACF.

---

## Como Encontrar os IDs das Categorias no WordPress Antigo

1. Faça login na dashboard do WordPress antigo
2. Vá para **Posts → Categorias**
3. Passe o mouse sobre cada categoria para ver o ID na URL (ex: `term.php?taxonomy=category&tag_ID=14`)
4. Preencha no `.env.local` com esses IDs

---

## O que Muda Entre Dev e Prod?

| Aspecto | Dev (Legado) | Dev (CPT/ACF) | Produção |
|--------|-------------|--------------|----------|
| Fonte de dados | Site antigo (posts) | WordPress novo (CPT) | WordPress novo (CPT) |
| Variável | `VITE_DATA_SOURCE=legacy` | Não definida | Ignorada |
| Componentes | **Mesmos** | **Mesmos** | **Mesmos** |
| APIs usadas | `fetchLegacyPostsByTag()` | `fetchAPI<T>()` | `fetchAPI<T>()` |

---

## Segurança: Por Que Legado é DEV-ONLY?

No código:

```typescript
const isLegacyEnabled = import.meta.env.DEV && DATA_SOURCE === 'legacy';

if (DATA_SOURCE === 'legacy' && !import.meta.env.DEV) {
  console.warn('[data] DATA_SOURCE=legacy ignorado em produção. Usando CPT/ACF.');
}
```

✅ Produção **nunca** usa legado, mesmo se alguém configurar errado
✅ Se legacy tentar ativar em prod, aparece um aviso no console
✅ CPT/ACF é sempre o fallback

---

## Checklist para Usar Legacy

- [ ] Arquivo `.env.local` criado na raiz
- [ ] `VITE_DATA_SOURCE=legacy` definido
- [ ] `VITE_WP_LEGACY_API_URL` apontando para o site antigo
- [ ] Categorias do site antigo mapeadas: `VITE_WP_LEGACY_CATEGORY_*`
- [ ] Dev rodando: `npm run dev`
- [ ] Console do navegador sem erros de 404

---

## Dúvidas Comuns

**P: Como saber se está usando legacy ou CPT?**  
R: Abra DevTools → Console. Se ver `DATA_SOURCE=legacy` e `isLegacyEnabled=true`, está em legado.

**P: Posso ter `.env.local` e `.env.production` ao mesmo tempo?**  
R: Sim. Vite usa `.env.local` em dev e `.env` ou `.env.production` em build.

**P: E se eu precisar testar CPT em prod?**  
R: Não é possível em produção por design. Crie um branch de staging com CPT e teste lá.

**P: Como voltar de legacy para CPT?**  
R: Delete `.env.local` ou comente a linha `VITE_DATA_SOURCE=legacy`. Reinicie `npm run dev`.
