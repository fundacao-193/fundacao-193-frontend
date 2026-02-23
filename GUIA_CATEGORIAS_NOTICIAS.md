# Como Usar Categorias de Notícias no Frontend

## 📝 Visão Geral

Quando o WordPress Headless estiver configurado com a Taxonomy `noticia_category`, o frontend conseguirá:

1. ✅ Buscar todas as categorias disponíveis
2. ✅ Buscar notícias com suas categorias
3. ✅ Filtrar notícias por categoria
4. ✅ Mostrar contagem de notícias por categoria

---

## 🔧 APIs Disponíveis

### Função 1: Buscar Categorias
```typescript
import { fetchNoticiasCategories } from '../services/api';

const categories = await fetchNoticiasCategories();
// Retorno:
// [
//   { id: 14, name: 'Blog', slug: 'blog', count: 25 },
//   { id: 17, name: 'Datas Comemorativas', slug: 'datas-comemorativas', count: 8 },
//   ...
// ]
```

### Função 2: Buscar Notícias com Categorias
```typescript
import { fetchNoticiasByCategories } from '../services/api';

const news = await fetchNoticiasByCategories(['14', '17', '16']);
// Retorno:
// [
//   {
//     id: 123,
//     title: { rendered: 'Notícia...' },
//     date: '2024-01-15T10:00:00',
//     category_ids: [14, 17],  // ← Categorias extraídas automaticamente
//     ...
//   }
// ]
```

---

## 🔌 Como Usar em NewsList.tsx (Versão com API)

Quando estiver pronto, o código em `NewsList.tsx` ficará assim:

```typescript
import { fetchNoticiasCategories, fetchNoticiasByCategories } from '../../services/api';
import type { NewsCategory } from '../../types/news';

export default function NewsList() {
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [items, setItems] = useState<(news & { category_ids: number[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const hasFetched = useRef(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Buscar categorias disponíveis
      const cats = await fetchNoticiasCategories();
      setCategories(cats);

      // 2. Buscar notícias com suas categorias
      const newsData = await fetchNoticiasByCategories([]);
      // OU passar IDs específicos:
      // const newsData = await fetchNoticiasByCategories(['14', '17', '16']);
      setItems(newsData);
    } catch (err) {
      console.error(err);
      setError('Não conseguimos carregar as notícias no momento. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    load();
  }, []);

  // Filtrar notícias por categoria selecionada
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items;
    return items.filter(item => item.category_ids.includes(selectedCategory));
  }, [items, selectedCategory]);

  // Contar quantas notícias por categoria
  const categoryCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    items.forEach((item) => {
      item.category_ids.forEach((catId) => {
        counts[catId] = (counts[catId] || 0) + 1;
      });
    });
    return counts;
  }, [items]);

  // Renderizar dropdown de categorias
  return (
    <div>
      {/* Dropdown */}
      <select 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value === 'all' ? 'all' : Number(e.target.value))}
      >
        <option value="all">
          Todas as Categorias ({items.length})
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name} ({categoryCounts[cat.id] || 0})
          </option>
        ))}
      </select>

      {/* Notícias filtradas */}
      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.title.rendered}</h3>
            <p>{item.excerpt.rendered}</p>
            {/* Mostrar categorias da notícia */}
            <div className="flex gap-2">
              {item.category_ids.map((catId) => {
                const cat = categories.find(c => c.id === catId);
                return (
                  <span key={catId} className="badge">
                    {cat?.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🎯 Mapeamento Atual (Legacy)

Por enquanto, o arquivo `NewsList.tsx` usa este mapeamento hardcoded:

```typescript
const CATEGORIES = {
  '14': { name: 'Blog', color: 'bg-blue-100 text-blue-800' },
  '17': { name: 'Datas Comemorativas', color: 'bg-purple-100 text-purple-800' },
  '16': { name: 'Educação Financeira', color: 'bg-green-100 text-green-800' },
  '15': { name: 'Incêndio', color: 'bg-red-100 text-red-800' },
  '8': { name: 'Meio Ambiente', color: 'bg-emerald-100 text-emerald-800' },
  '56': { name: 'História', color: 'bg-amber-100 text-amber-800' },
  '18': { name: 'Diversos', color: 'bg-gray-100 text-gray-800' },
} as const;
```

**Quando migrar para API nova:** Esse mapeamento pode ser removido e as categorias virão dinamicamente da API! 🎉

---

## 🚀 Quando Ativar?

Quando o WordPress estiver configurado com a Taxonomy:

1. ✅ Verificar se `/wp-json/wp/v2/noticia_category` retorna dados
2. ✅ Verificar se `/wp-json/wp/v2/noticia?_embed=wp:term` retorna categorias
3. ✅ Descomentar/atualizar código em `NewsList.tsx`
4. ✅ Remover mapeamento hardcoded `CATEGORIES`
5. ✅ Testar filtros
6. ✅ Fazer deploy

---

## 📊 Estrutura de Dados Completa

### Função `fetchNoticiasByCategories()` retorna:
```typescript
(news & { category_ids: number[] })[]

// Exemplo:
[
  {
    id: 1,
    date: "2024-01-15T10:00:00",
    title: { rendered: "Notícia 1" },
    excerpt: { rendered: "Resumo..." },
    content: { rendered: "<p>Conteúdo...</p>" },
    link: "https://...",
    noticia_category: [14, 17],  // IDs das categorias
    category_ids: [14, 17],      // ← Normalizados para fácil uso
    _embedded: {
      "wp:term": [
        [
          {
            id: 14,
            name: "Blog",
            slug: "blog",
            taxonomy: "noticia_category",
            count: 25
          },
          {
            id: 17,
            name: "Datas Comemorativas",
            slug: "datas-comemorativas",
            taxonomy: "noticia_category",
            count: 8
          }
        ]
      ]
    }
  },
  // ... mais notícias
]
```

---

## ✨ Vantagens desta Abordagem

✅ **Dinâmico:** Categorias vêm da API, não hardcoded  
✅ **Contagem automática:** `count` vem da API do WordPress  
✅ **Múltiplas categorias:** Uma notícia pode ter várias categorias  
✅ **Fácil manutenção:** Gerenciar no admin do WordPress, não no código  
✅ **Tipo-safe:** TypeScript completo  
✅ **Fallback para legacy:** Se ainda usar API antiga, funciona  

---

## 🔄 Checklist de Migração

- [ ] WordPress: Registrar Taxonomy `noticia_category`
- [ ] WordPress: Criar 7 categorias padrão
- [ ] WordPress: Associar notícias às categorias
- [ ] Frontend: Verificar tipos em `src/types/news.ts` ✅
- [ ] Frontend: Verificar APIs em `src/services/api.ts` ✅
- [ ] Frontend: Atualizar `NewsList.tsx`
- [ ] Frontend: Remover `CATEGORIES` hardcoded
- [ ] Frontend: Testar filtros
- [ ] Deploy coordenado

---

## 🎓 Exemplo Completo: Sistema de Filtro

```typescript
// 1. Buscar categorias
const categories = await fetchNoticiasCategories();
// [{ id: 14, name: 'Blog', ... }, { id: 17, name: 'Datas...' }, ...]

// 2. Buscar notícias
const allNews = await fetchNoticiasByCategories([]);
// [{ id: 1, category_ids: [14, 17], ... }, ...]

// 3. Filtrar
const selected = 14; // Blog
const filtered = allNews.filter(n => n.category_ids.includes(selected));
// [{ id: 1, ... }, { id: 3, ... }]

// 4. Contar
const count = filtered.length;
// 5 notícias no Blog

// 5. Renderizar com badges
{filtered.map(news => (
  <div>
    <h3>{news.title.rendered}</h3>
    {news.category_ids.map(catId => {
      const cat = categories.find(c => c.id === catId);
      return <span key={catId}>{cat?.name}</span>;
    })}
  </div>
))}
```

---

**Tudo pronto no backend! Basta WordPress estar configurado que o frontend consome automaticamente!** 🚀
