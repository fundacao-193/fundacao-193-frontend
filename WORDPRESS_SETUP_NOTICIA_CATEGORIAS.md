# Configuração de Categorias para Notícias - WordPress Headless

## 📋 Overview

As notícias na API nova vão ter categorias usando **Custom Taxonomy** do WordPress, permitindo múltiplas categorias por notícia.

**Taxonomy:** `noticia_category`  
**CPT:** `noticia`

---

## 🔧 Passo 1: Registrar a Taxonomy no WordPress

Adicione ao arquivo `functions.php` do tema:

```php
<?php
/**
 * Registra Custom Taxonomy para Categorias de Notícias
 * Fundação 193 - WordPress Headless
 */

add_action('init', 'fundacao193_register_noticia_taxonomy');

function fundacao193_register_noticia_taxonomy() {
    
    register_taxonomy('noticia_category', 'noticia', [
        'labels' => [
            'name'              => 'Categorias de Notícias',
            'singular_name'     => 'Categoria de Notícia',
            'menu_name'         => 'Categorias',
            'add_new_item'      => 'Adicionar Nova Categoria',
            'edit_item'         => 'Editar Categoria',
            'new_item_name'     => 'Nova Categoria',
            'parent_item_name'  => 'Categoria Pai',
            'search_items'      => 'Buscar Categorias',
            'not_found'         => 'Nenhuma categoria encontrada',
        ],
        'hierarchical'        => true,      // Like categories (not tags)
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,      // CRITICAL: REST API
        'rest_base'           => 'noticia_category',
        'rest_controller_class' => 'WP_REST_Terms_Controller',
        'rewrite'             => ['slug' => 'noticia-categoria'],
        'show_in_nav_menus'   => true,
    ]);
}
```

---

## 📝 Passo 2: Criar as Categorias Padrão

Adicione também ao `functions.php` (executar uma vez):

```php
add_action('wp_loaded', 'fundacao193_insert_default_noticia_categories');

function fundacao193_insert_default_noticia_categories() {
    // Só executar se não existir
    if (get_transient('noticia_categories_inserted')) {
        return;
    }

    $categories = [
        [
            'name' => 'Blog',
            'slug' => 'blog',
            'color' => '#3B82F6', // blue
        ],
        [
            'name' => 'Datas Comemorativas',
            'slug' => 'datas-comemorativas',
            'color' => '#A855F7', // purple
        ],
        [
            'name' => 'Educação Financeira',
            'slug' => 'educacao-financeira',
            'color' => '#10B981', // green
        ],
        [
            'name' => 'Incêndio',
            'slug' => 'incendio',
            'color' => '#EF4444', // red
        ],
        [
            'name' => 'Meio Ambiente',
            'slug' => 'meio-ambiente',
            'color' => '#059669', // emerald
        ],
        [
            'name' => 'História',
            'slug' => 'historia',
            'color' => '#B45309', // amber
        ],
        [
            'name' => 'Diversos',
            'slug' => 'diversos',
            'color' => '#6B7280', // gray
        ],
    ];

    foreach ($categories as $cat) {
        $existing = get_term_by('slug', $cat['slug'], 'noticia_category');
        if (!$existing) {
            wp_insert_term($cat['name'], 'noticia_category', [
                'slug' => $cat['slug'],
            ]);
        }
    }

    // Marcar como inserido (não repetir)
    set_transient('noticia_categories_inserted', true);
}
```

---

## 🔍 Passo 3: Testar o Endpoint REST API

Após configurar tudo, teste:

```bash
# Listar todas as categorias
GET https://seu-wordpress.com/wp-json/wp/v2/noticia_category

# Retorno esperado:
[
  {
    "id": 14,
    "name": "Blog",
    "slug": "blog",
    "count": 25
  },
  {
    "id": 17,
    "name": "Datas Comemorativas",
    "slug": "datas-comemorativas",
    "count": 8
  },
  ...
]
```

---

## 📰 Passo 4: Atualizar Notícias com Categorias

Cada notícia deve estar associada a uma ou mais categorias:

```bash
# Listar notícias com categorias
GET https://seu-wordpress.com/wp-json/wp/v2/noticia?_embed=wp:term

# Retorno esperado:
[
  {
    "id": 123,
    "title": {"rendered": "Título..."},
    "date": "2024-01-15T10:00:00",
    "_embedded": {
      "wp:term": [
        [
          {
            "id": 14,
            "name": "Blog",
            "slug": "blog",
            "taxonomy": "noticia_category"
          }
        ]
      ]
    }
  }
]
```

---

## 🎨 Passo 5: (Opcional) Adicionar Campo ACF para Cor

Se quiser cores customizáveis por categoria:

**Criar Campo ACF:**
- **Nome:** `noticia_cat_color`
- **Tipo:** Color Picker
- **Onde:** Mostrar se "Taxonomy term" for "noticia_category"

Assim cada categoria pode ter sua própria cor no admin.

---

## ✅ Checklist WordPress

- [ ] Adicionar código ao `functions.php`
- [ ] Acessar **Painel > Definições > Links Permanentes** e salvar
- [ ] Verificar menu lateral - deve aparecer "Notícias > Categorias"
- [ ] Criar as 7 categorias padrão
- [ ] Testar endpoint REST: `/wp-json/wp/v2/noticia_category`
- [ ] Associar notícias existentes às categorias
- [ ] Testar endpoint com `_embed`: `/wp-json/wp/v2/noticia?_embed=wp:term`

---

## 📊 Dados na REST API

Após configurar, a API retornará algo assim:

```json
{
  "id": 123,
  "title": {"rendered": "Notícia sobre Segurança..."},
  "date": "2024-01-15T10:00:00",
  "_embedded": {
    "wp:term": [
      [
        {
          "id": 14,
          "name": "Blog",
          "slug": "blog",
          "taxonomy": "noticia_category",
          "count": 25
        },
        {
          "id": 15,
          "name": "Incêndio",
          "slug": "incendio",
          "taxonomy": "noticia_category",
          "count": 42
        }
      ]
    ]
  }
}
```

---

## 🚀 Pronto!

Com isso configurado, o frontend conseguirá:
1. ✅ Buscar todas as categorias
2. ✅ Buscar notícias com suas categorias
3. ✅ Filtrar por categoria
4. ✅ Contar quantas notícias tem em cada categoria

Agora o frontend está pronto para consumir! 👇
