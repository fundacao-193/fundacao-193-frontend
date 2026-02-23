# Implementação de Funcionalidade de Documentos

## 📋 Análise do Projeto

### Páginas Afetadas
1. **Prestação de Contas** (`Accounts.tsx`) - Documentos organizados por **Ano**
2. **Editais** (`Edits.tsx`) - Documentos organizados por **Ano**
3. **Documentos** (`Documents.tsx`) - Documentos organizados por **Categoria**

### Estrutura Atual
- **Dados:** Arrays estáticos hardcoded (placeholders)
- **Layout:** Consistent across pages (cards com Download button)
- **CMS:** WordPress Headless com Custom Post Types + ACF
- **API Pattern:** Generic `fetchAPI<T>()` + typed functions

---

## 🎯 Proposta de Solução

### 1. WordPress: Criar Custom Post Types

Criar **3 novos CPTs** no WordPress theme:

#### A) **CPT: `documento`** (Página Documentos)
```php
// functions.php do tema WordPress
register_post_type('documento', [
  'labels' => [
    'name' => 'Documentos',
    'singular_name' => 'Documento'
  ],
  'public' => true,
  'show_in_rest' => true, // CRITICAL for REST API
  'supports' => ['title'],
  'menu_icon' => 'dashicons-media-document',
  'rest_base' => 'documento'
]);
```

**Campos ACF:**
- `doc_file` (File) - arquivo PDF/DOC
- `doc_category` (Select) - Documentos Institucionais | Relatórios de Gestão | Termos de Referência | Normas e Procedimentos
- `doc_size` (Text) - tamanho do arquivo (auto-calculado)
- `doc_year` (Text) - ano de publicação
- `doc_order` (Number) - ordem de exibição

---

#### B) **CPT: `edital`** (Página Editais)
```php
register_post_type('edital', [
  'labels' => [
    'name' => 'Editais',
    'singular_name' => 'Edital'
  ],
  'public' => true,
  'show_in_rest' => true,
  'supports' => ['title', 'editor'],
  'menu_icon' => 'dashicons-clipboard',
  'rest_base' => 'edital'
]);
```

**Campos ACF:**
- `edital_description` (Textarea) - descrição do edital
- `edital_file` (File) - arquivo PDF do edital
- `edital_year` (Number) - ano (para agrupamento)
- `edital_publish_date` (Date Picker) - data de publicação
- `edital_status` (Select) - Aberto | Encerrado
- `edital_is_featured` (True/False) - destaque na página

---

#### C) **CPT: `prestacao_conta`** (Página Prestação de Contas)
```php
register_post_type('prestacao_conta', [
  'labels' => [
    'name' => 'Prestação de Contas',
    'singular_name' => 'Prestação de Conta'
  ],
  'public' => true,
  'show_in_rest' => true,
  'supports' => ['title'],
  'menu_icon' => 'dashicons-chart-bar',
  'rest_base' => 'prestacao-conta'
]);
```

**Campos ACF:**
- `pc_file` (File) - arquivo do relatório
- `pc_year` (Number) - ano fiscal
- `pc_type` (Select) - Relatório Financeiro Anual | Balanço Patrimonial | Demonstrativo de Resultado | Relatório de Auditoria
- `pc_size` (Text) - tamanho do arquivo
- `pc_order` (Number) - ordem dentro do ano

---

### 2. Frontend: TypeScript Types

Criar tipos para os novos CPTs em `src/types/`:

**`src/types/documents.ts`**
```typescript
export interface Document {
  id: number;
  title: {
    rendered: string;
  };
  acf?: {
    doc_file?: {
      url: string;
      filename: string;
      filesize: number;
    };
    doc_category?: 'Documentos Institucionais' | 'Relatórios de Gestão' | 'Termos de Referência' | 'Normas e Procedimentos';
    doc_size?: string;
    doc_year?: string;
    doc_order?: number;
  };
}

export type DocumentCategory = 'Documentos Institucionais' | 'Relatórios de Gestão' | 'Termos de Referência' | 'Normas e Procedimentos';
```

**`src/types/edits.ts`**
```typescript
export interface Edit {
  id: number;
  title: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  acf?: {
    edital_description?: string;
    edital_file?: {
      url: string;
      filename: string;
      filesize: number;
    };
    edital_year?: number;
    edital_publish_date?: string;
    edital_status?: 'Aberto' | 'Encerrado';
    edital_is_featured?: boolean;
  };
}
```

**`src/types/accounts.ts`**
```typescript
export interface Account {
  id: number;
  title: {
    rendered: string;
  };
  acf?: {
    pc_file?: {
      url: string;
      filename: string;
      filesize: number;
    };
    pc_year?: number;
    pc_type?: string;
    pc_size?: string;
    pc_order?: number;
  };
}
```

---

### 3. API Services

Adicionar funções em `src/services/api.ts`:

```typescript
// Adicionar imports
import type { Document } from '../types/documents';
import type { Edit } from '../types/edits';
import type { Account } from '../types/accounts';

// Fetch functions
export function fetchDocumentos() {
  if (isLegacyEnabled) {
    // Legacy mode retorna array vazio (não existia antes)
    return Promise.resolve([]);
  }
  return fetchAPI<Document[]>('documento?acf_format=standard');
}

export function fetchEditais() {
  if (isLegacyEnabled) {
    return Promise.resolve([]);
  }
  return fetchAPI<Edit[]>('edital?acf_format=standard');
}

export function fetchPrestacaoContas() {
  if (isLegacyEnabled) {
    return Promise.resolve([]);
  }
  return fetchAPI<Account[]>('prestacao-conta?acf_format=standard');
}
```

---

### 4. Componentes Frontend

Atualizar os componentes para consumir a API (código comentado por padrão):

#### **Documents.tsx** - Exemplo Implementação

```typescript
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, FileText, Download, Folder, Loader } from 'lucide-react';
// NOVO: import da API e tipos
// import { fetchDocumentos } from '../services/api';
// import type { Document, DocumentCategory } from '../types/documents';

export default function Documents() {
  // NOVO: State para dados da API
  // const [documents, setDocuments] = useState<Document[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const hasFetched = useRef(false);

  // NOVO: Fetch dos documentos
  // useEffect(() => {
  //   if (hasFetched.current) return;
  //   hasFetched.current = true;
  //   
  //   async function loadDocuments() {
  //     try {
  //       const data = await fetchDocumentos();
  //       setDocuments(data);
  //     } catch (err) {
  //       setError('Erro ao carregar documentos');
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadDocuments();
  // }, []);

  // NOVO: Agrupar documentos por categoria
  // const groupedByCategory = documents.reduce((acc, doc) => {
  //   const category = doc.acf?.doc_category || 'Outros';
  //   if (!acc[category]) acc[category] = [];
  //   acc[category].push(doc);
  //   return acc;
  // }, {} as Record<DocumentCategory | 'Outros', Document[]>);

  // NOVO: Ordenar dentro de cada categoria
  // Object.values(groupedByCategory).forEach(docs => {
  //   docs.sort((a, b) => (a.acf?.doc_order || 0) - (b.acf?.doc_order || 0));
  // });

  // PLACEHOLDER ATUAL (manter até ativar API)
  const documentCategories = [
    {
      name: 'Documentos Institucionais',
      icon: Folder,
      files: [
        { name: 'Estatuto Social', size: '1.2 MB', date: '2023' },
        // ... resto dos placeholders
      ],
    },
    // ...
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <button
          onClick={() => window.location.hash = ''}
          className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Documentos</h1>
        <p className="text-xl text-neutral-600 mb-16">
          Acesso a documentos, manuais, normas e procedimentos da Fundação 193.
        </p>

        {/* NOVO: Loading/Error States (comentado) */}
        {/* {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader className="animate-spin text-primary" size={32} />
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              Tentar Novamente
            </button>
          </div>
        )} */}

        {/* PLACEHOLDER (atual) - trocar por dados da API quando pronto */}
        <div className="space-y-12">
          {documentCategories.map((category) => {
            const Icon = category.icon;
            return (
              <section key={category.name}>
                <div className="flex items-center gap-3 mb-6">
                  <Icon size={28} className="text-icon-fg" />
                  <h2 className="text-2xl font-bold text-neutral-900">{category.name}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.files.map((file) => (
                    <div
                      key={file.name}
                      className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-icon-fg" />
                        <div>
                          <p className="font-semibold text-neutral-900">{file.name}</p>
                          <p className="text-xs text-neutral-500">{file.size} • {file.date}</p>
                        </div>
                      </div>
                      <a
                        href="#"
                        aria-disabled="true"
                        tabIndex={-1}
                        onClick={(e) => e.preventDefault()}
                        title="Disponível em breve"
                        className="text-neutral-400 opacity-60 cursor-not-allowed"
                      >
                        <Download size={20} />
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* NOVO: Renderizar documentos da API (comentado) */}
        {/* {!loading && !error && (
          <div className="space-y-12">
            {Object.entries(groupedByCategory).map(([category, docs]) => (
              <section key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <Folder size={28} className="text-icon-fg" />
                  <h2 className="text-2xl font-bold text-neutral-900">{category}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {docs.map((doc) => {
                    const file = doc.acf?.doc_file;
                    const fileSize = file?.filesize 
                      ? `${(file.filesize / 1024 / 1024).toFixed(1)} MB` 
                      : doc.acf?.doc_size || 'N/A';
                    
                    return (
                      <div
                        key={doc.id}
                        className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-icon-fg" />
                          <div>
                            <p className="font-semibold text-neutral-900">
                              {doc.title.rendered}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {fileSize} • {doc.acf?.doc_year || 'N/A'}
                            </p>
                          </div>
                        </div>
                        {file?.url ? (
                          <a
                            href={file.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-hover transition-colors"
                            aria-label={`Baixar ${doc.title.rendered}`}
                          >
                            <Download size={20} />
                          </a>
                        ) : (
                          <span className="text-neutral-400 opacity-60">
                            <Download size={20} />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}
```

#### **Edits.tsx** - Lógica Similar

```typescript
// Agrupar por ano:
// const groupedByYear = editais.reduce((acc, edit) => {
//   const year = edit.acf?.edital_year || new Date().getFullYear();
//   if (!acc[year]) acc[year] = [];
//   acc[year].push(edit);
//   return acc;
// }, {} as Record<number, Edit[]>);
```

#### **Accounts.tsx** - Lógica Similar

```typescript
// Agrupar por ano e tipo:
// const groupedByYear = contas.reduce((acc, conta) => {
//   const year = conta.acf?.pc_year || new Date().getFullYear();
//   if (!acc[year]) acc[year] = [];
//   acc[year].push(conta);
//   return acc;
// }, {} as Record<number, Account[]>);
```

---

## 📦 Helper Function: Formatação de Tamanho

Criar utility em `src/utils/format.ts`:

```typescript
/**
 * Formata bytes para formato legível (KB, MB, GB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Extrai extensão do arquivo
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toUpperCase() || '';
}
```

---

## 🔄 Workflow de Implementação

### Fase 1: WordPress Backend (Por Administrador WP)
1. ✅ Criar os 3 Custom Post Types no `functions.php` do tema
2. ✅ Criar grupos ACF para cada CPT
3. ✅ Configurar campos ACF (especialmente File Upload)
4. ✅ Testar endpoints REST API:
   - `GET /wp-json/wp/v2/documento`
   - `GET /wp-json/wp/v2/edital`
   - `GET /wp-json/wp/v2/prestacao-conta`
5. ✅ Popular com dados de teste

### Fase 2: Frontend (Você)
1. ✅ Criar arquivos de types (`documents.ts`, `edits.ts`, `accounts.ts`)
2. ✅ Adicionar funções de fetch em `api.ts`
3. ✅ Criar utility `format.ts`
4. ✅ Atualizar componentes (código comentado)
5. ✅ Testar em ambiente local com WordPress local

### Fase 3: Deploy
1. ✅ Deploy WordPress com novos CPTs + ACF configs
2. ✅ Verificar API endpoints em produção
3. ✅ **Descomentar código nos componentes**
4. ✅ Deploy frontend atualizado
5. ✅ Testar funcionalidade completa

---

## ⚠️ Considerações Importantes

### Segurança de Upload
- **Permitir apenas PDFs e DOCs** no WordPress
- Configurar limite de tamanho (ex: 10MB)
- Sanitizar nomes de arquivos

### Performance
- Considerar **paginação** se houver muitos documentos
- Implementar **busca/filtros** se necessário
- Cache de API (já implementado: `CACHE_TTL_MS`)

### SEO
- Usar `title.rendered` descritivo
- Adicionar `meta description` se necessário

### Acessibilidade
- Labels descritivos em botões de download
- `aria-label` apropriados
- Keyboard navigation

### Mobile
- Layout responsivo (já OK com Tailwind)
- Touch targets adequados (botões > 44px)

---

## 📝 Checklist de Validação

**Antes de Ativar em Produção:**

- [ ] Endpoints REST API retornam dados corretos
- [ ] Campos ACF aparecem no JSON (`?acf_format=standard`)
- [ ] URLs de download funcionam (CORS configurado)
- [ ] Documentos abrem em nova aba
- [ ] Loading states funcionam
- [ ] Error states com retry funcionam
- [ ] Placeholders desaparecem quando API ativa
- [ ] Layout consistente nas 3 páginas
- [ ] Categorização funciona corretamente
- [ ] Ordenação está correta (ano DESC, order ASC)

---

## 🎨 Exemplo de Dados WordPress

**Documento de Teste:**
```json
{
  "id": 123,
  "title": {
    "rendered": "Estatuto Social"
  },
  "acf": {
    "doc_file": {
      "url": "https://fundacao193.org.br/wp-content/uploads/2024/estatuto.pdf",
      "filename": "estatuto.pdf",
      "filesize": 1258291
    },
    "doc_category": "Documentos Institucionais",
    "doc_year": "2023",
    "doc_order": 1
  }
}
```

---

## 🚀 Próximos Passos

1. **Agora:** Revisar esta proposta
2. **Coordenar com time WP:** Criar CPTs e ACF fields
3. **Desenvolvimento:** Implementar código comentado
4. **Teste local:** WordPress local + frontend
5. **Deploy coordenado:** Backend first, depois frontend

---

## 💡 Melhorias Futuras

- **Busca de documentos** (integrar com SearchBar existente)
- **Filtros avançados** (por ano, categoria, tipo)
- **Visualização de preview** (thumbnails de PDF)
- **Histórico de versões** (manter versões antigas)
- **Notificações** (novos documentos publicados)
- **Download em lote** (ZIP de múltiplos arquivos)

