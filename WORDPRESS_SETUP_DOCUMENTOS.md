# Configuração WordPress - Documentos, Editais e Prestação de Contas

## 📝 Guia para Administrador WordPress

Este documento descreve como configurar os **Custom Post Types (CPTs)** e **Advanced Custom Fields (ACF)** necessários para suportar as funcionalidades de documentos no site da Fundação 193.

---

## 🎯 Overview

**Três novos CPTs serão criados:**

1. **`documento`** - Para página "Documentos"
2. **`edital`** - Para página "Editais"
3. **`prestacao_conta`** - Para página "Prestação de Contas"

Todos os CPTs terão suporte a **REST API** para consumo pelo frontend headless.

---

## 📦 Instalação de Plugins Necessários

### 1. Advanced Custom Fields (ACF) PRO
- **Necessário:** Sim (ACF Free não tem suporte a File Upload)
- **Plugin:** Advanced Custom Fields PRO
- **Motivo:** File Upload fields para PDFs/DOCs

### 2. Custom Post Type UI (Opcional)
- **Necessário:** Não (pode criar via código)
- **Plugin:** Custom Post Type UI
- **Motivo:** Interface visual para gerenciar CPTs sem código

---

## 🔧 Passo 1: Criar Custom Post Types

Adicione o código abaixo ao arquivo `functions.php` do tema ativo:

```php
<?php
/**
 * Registro de Custom Post Types para Documentos, Editais e Prestação de Contas
 * Fundação 193 - WordPress Headless
 */

add_action('init', 'fundacao193_register_document_cpts');

function fundacao193_register_document_cpts() {
    
    // ========================================================================
    // CPT: DOCUMENTO (Página Documentos)
    // ========================================================================
    register_post_type('documento', [
        'labels' => [
            'name'               => 'Documentos',
            'singular_name'      => 'Documento',
            'menu_name'          => 'Documentos',
            'add_new'            => 'Adicionar Novo',
            'add_new_item'       => 'Adicionar Novo Documento',
            'edit_item'          => 'Editar Documento',
            'new_item'           => 'Novo Documento',
            'view_item'          => 'Ver Documento',
            'search_items'       => 'Buscar Documentos',
            'not_found'          => 'Nenhum documento encontrado',
            'not_found_in_trash' => 'Nenhum documento na lixeira',
        ],
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true, // CRITICAL: Habilita REST API
        'rest_base'           => 'documento',
        'menu_position'       => 20,
        'menu_icon'           => 'dashicons-media-document',
        'supports'            => ['title'],
        'has_archive'         => false,
        'rewrite'             => ['slug' => 'documento'],
    ]);

    // ========================================================================
    // CPT: EDITAL (Página Editais)
    // ========================================================================
    register_post_type('edital', [
        'labels' => [
            'name'               => 'Editais',
            'singular_name'      => 'Edital',
            'menu_name'          => 'Editais',
            'add_new'            => 'Adicionar Novo',
            'add_new_item'       => 'Adicionar Novo Edital',
            'edit_item'          => 'Editar Edital',
            'new_item'           => 'Novo Edital',
            'view_item'          => 'Ver Edital',
            'search_items'       => 'Buscar Editais',
            'not_found'          => 'Nenhum edital encontrado',
            'not_found_in_trash' => 'Nenhum edital na lixeira',
        ],
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,
        'rest_base'           => 'edital',
        'menu_position'       => 21,
        'menu_icon'           => 'dashicons-clipboard',
        'supports'            => ['title', 'editor'],
        'has_archive'         => false,
        'rewrite'             => ['slug' => 'edital'],
    ]);

    // ========================================================================
    // CPT: PRESTAÇÃO DE CONTAS (Página Prestação de Contas)
    // ========================================================================
    register_post_type('prestacao_conta', [
        'labels' => [
            'name'               => 'Prestação de Contas',
            'singular_name'      => 'Prestação de Conta',
            'menu_name'          => 'Prestação de Contas',
            'add_new'            => 'Adicionar Nova',
            'add_new_item'       => 'Adicionar Nova Prestação de Conta',
            'edit_item'          => 'Editar Prestação de Conta',
            'new_item'           => 'Nova Prestação de Conta',
            'view_item'          => 'Ver Prestação de Conta',
            'search_items'       => 'Buscar Prestações de Contas',
            'not_found'          => 'Nenhuma prestação de conta encontrada',
            'not_found_in_trash' => 'Nenhuma prestação de conta na lixeira',
        ],
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,
        'rest_base'           => 'prestacao-conta',
        'menu_position'       => 22,
        'menu_icon'           => 'dashicons-chart-bar',
        'supports'            => ['title'],
        'has_archive'         => false,
        'rewrite'             => ['slug' => 'prestacao-conta'],
    ]);
}

/**
 * Ajusta permissões CORS para permitir acesso REST API pelo frontend
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
});
```

**⚠️ Importante:** Após adicionar este código, acesse **Painel WordPress > Configurações > Links Permanentes** e clique em "Salvar Alterações" para atualizar as regras de reescrita.

---

## 🎨 Passo 2: Criar Campos ACF

### A) Grupo ACF: Documento

**Nome do Grupo:** `Documento - Campos Personalizados`  
**Local:** Mostrar se "Tipo de Post" for igual a "documento"

**Campos:**

1. **doc_file** (File Upload)
   - Label: "Arquivo do Documento"
   - Nome do Campo: `doc_file`
   - Tipo: File Upload
   - Return Format: **File Array**
   - Tipos de Arquivo Permitidos: `pdf,doc,docx`
   - Tamanho Máximo: `10MB`
   - Obrigatório: Sim

2. **doc_category** (Select)
   - Label: "Categoria"
   - Nome do Campo: `doc_category`
   - Tipo: Select
   - Opções:
     ```
     Documentos Institucionais : Documentos Institucionais
     Relatórios de Gestão : Relatórios de Gestão
     Termos de Referência : Termos de Referência
     Normas e Procedimentos : Normas e Procedimentos
     ```
   - Default: "Documentos Institucionais"
   - Obrigatório: Sim

3. **doc_year** (Text)
   - Label: "Ano de Publicação"
   - Nome do Campo: `doc_year`
   - Tipo: Text
   - Placeholder: "2024"
   - Obrigatório: Sim

4. **doc_size** (Text)
   - Label: "Tamanho do Arquivo (opcional)"
   - Nome do Campo: `doc_size`
   - Tipo: Text
   - Placeholder: "1.2 MB"
   - Instrução: "Preenchido automaticamente se deixado em branco"
   - Obrigatório: Não

5. **doc_order** (Number)
   - Label: "Ordem de Exibição"
   - Nome do Campo: `doc_order`
   - Tipo: Number
   - Default: 0
   - Min: 0
   - Instrução: "Número menor aparece primeiro"
   - Obrigatório: Não

---

### B) Grupo ACF: Edital

**Nome do Grupo:** `Edital - Campos Personalizados`  
**Local:** Mostrar se "Tipo de Post" for igual a "edital"

**Campos:**

1. **edital_description** (Textarea)
   - Label: "Descrição do Edital"
   - Nome do Campo: `edital_description`
   - Tipo: Textarea
   - Linhas: 3
   - Obrigatório: Sim

2. **edital_file** (File Upload)
   - Label: "Arquivo do Edital"
   - Nome do Campo: `edital_file`
   - Tipo: File Upload
   - Return Format: **File Array**
   - Tipos Permitidos: `pdf,doc,docx`
   - Tamanho Máximo: `15MB`
   - Obrigatório: Sim

3. **edital_year** (Number)
   - Label: "Ano do Edital"
   - Nome do Campo: `edital_year`
   - Tipo: Number
   - Default: 2024
   - Min: 2020
   - Max: 2030
   - Obrigatório: Sim

4. **edital_publish_date** (Date Picker)
   - Label: "Data de Publicação"
   - Nome do Campo: `edital_publish_date`
   - Tipo: Date Picker
   - Display Format: `d/m/Y`
   - Return Format: `Y-m-d`
   - Obrigatório: Sim

5. **edital_status** (Select)
   - Label: "Status do Edital"
   - Nome do Campo: `edital_status`
   - Tipo: Select
   - Opções:
     ```
     Aberto : Aberto
     Encerrado : Encerrado
     ```
   - Default: "Encerrado"
   - Obrigatório: Sim

6. **edital_is_featured** (True/False)
   - Label: "Destacar na Página?"
   - Nome do Campo: `edital_is_featured`
   - Tipo: True/False
   - Default: Off
   - Instrução: "Edital em destaque aparece no topo da página"
   - Obrigatório: Não

---

### C) Grupo ACF: Prestação de Contas

**Nome do Grupo:** `Prestação de Contas - Campos Personalizados`  
**Local:** Mostrar se "Tipo de Post" for igual a "prestacao_conta"

**Campos:**

1. **pc_file** (File Upload)
   - Label: "Arquivo do Relatório"
   - Nome do Campo: `pc_file`
   - Tipo: File Upload
   - Return Format: **File Array**
   - Tipos Permitidos: `pdf,xls,xlsx,doc,docx`
   - Tamanho Máximo: `20MB`
   - Obrigatório: Sim

2. **pc_year** (Number)
   - Label: "Ano Fiscal"
   - Nome do Campo: `pc_year`
   - Tipo: Number
   - Default: 2024
   - Min: 2015
   - Max: 2030
   - Obrigatório: Sim

3. **pc_type** (Select)
   - Label: "Tipo de Documento"
   - Nome do Campo: `pc_type`
   - Tipo: Select
   - Opções:
     ```
     Relatório Financeiro Anual : Relatório Financeiro Anual
     Balanço Patrimonial : Balanço Patrimonial
     Demonstrativo de Resultado : Demonstrativo de Resultado
     Relatório de Auditoria : Relatório de Auditoria Independente
     Outro : Outro
     ```
   - Obrigatório: Sim

4. **pc_size** (Text)
   - Label: "Tamanho do Arquivo (opcional)"
   - Nome do Campo: `pc_size`
   - Tipo: Text
   - Placeholder: "2.4 MB"
   - Obrigatório: Não

5. **pc_order** (Number)
   - Label: "Ordem de Exibição"
   - Nome do Campo: `pc_order`
   - Tipo: Number
   - Default: 0
   - Instrução: "Define ordem dentro do ano (menor = primeiro)"
   - Obrigatório: Não

---

## 🔐 Passo 3: Configurar Segurança de Upload

Adicione ao `functions.php` para restringir tipos de arquivo:

```php
/**
 * Valida uploads de arquivos nos CPTs de documentos
 */
add_filter('wp_handle_upload_prefilter', 'fundacao193_validate_document_uploads');

function fundacao193_validate_document_uploads($file) {
    // Apenas aplica validação em admin
    if (!is_admin()) {
        return $file;
    }

    $allowed_types = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    
    if (!in_array(strtolower($ext), $allowed_types)) {
        $file['error'] = 'Tipo de arquivo não permitido. Apenas PDF, DOC, DOCX, XLS e XLSX são aceitos.';
    }
    
    // Limite de tamanho: 20MB
    $max_size = 20 * 1024 * 1024; // 20MB em bytes
    if ($file['size'] > $max_size) {
        $file['error'] = 'Arquivo muito grande. Tamanho máximo: 20MB.';
    }
    
    return $file;
}
```

---

## ✅ Passo 4: Testar os Endpoints REST API

Após configurar tudo, teste os endpoints da API:

### 1. Documentos
```
GET https://seu-dominio.com/wp-json/wp/v2/documento?acf_format=standard
```

**Resposta esperada:**
```json
[
  {
    "id": 123,
    "title": {
      "rendered": "Estatuto Social"
    },
    "acf": {
      "doc_file": {
        "url": "https://seu-dominio.com/wp-content/uploads/2024/01/estatuto.pdf",
        "filename": "estatuto.pdf",
        "filesize": 1258291
      },
      "doc_category": "Documentos Institucionais",
      "doc_year": "2023",
      "doc_order": 1
    }
  }
]
```

### 2. Editais
```
GET https://seu-dominio.com/wp-json/wp/v2/edital?acf_format=standard
```

### 3. Prestação de Contas
```
GET https://seu-dominio.com/wp-json/wp/v2/prestacao-conta?acf_format=standard
```

---

## 📊 Passo 5: Popular com Dados de Teste

Crie pelo menos **2-3 registros de cada tipo** para testar:

### Exemplo: Documento
- **Título:** Estatuto Social
- **doc_file:** Upload de um PDF
- **doc_category:** Documentos Institucionais
- **doc_year:** 2023
- **doc_order:** 1

### Exemplo: Edital
- **Título:** Edital de Seleção de Projetos 2024
- **Conteúdo/Descrição:** Chamada pública para inovação
- **edital_file:** Upload PDF
- **edital_year:** 2024
- **edital_publish_date:** 15/01/2024
- **edital_status:** Aberto
- **edital_is_featured:** Sim

### Exemplo: Prestação de Contas
- **Título:** Relatório Financeiro Anual 2023
- **pc_file:** Upload PDF
- **pc_year:** 2023
- **pc_type:** Relatório Financeiro Anual
- **pc_order:** 1

---

## 🚨 Troubleshooting

### Problema: Campos ACF não aparecem na API
**Solução:** Certifique-se de adicionar `?acf_format=standard` na URL da API.

### Problema: Erro de CORS ao acessar API
**Solução:** Verifique se o código CORS foi adicionado no `functions.php`.

### Problema: Arquivo muito grande para upload
**Solução:** Aumente limites no `php.ini`:
```ini
upload_max_filesize = 20M
post_max_size = 20M
max_execution_time = 300
```

### Problema: URL do arquivo não aparece
**Solução:** Certifique-se que o campo File Upload está configurado como **Return Format: File Array** (não File ID ou File URL).

---

## 📞 Suporte

Para dúvidas sobre esta configuração:
- **Email:** dev@fundacao193.org.br
- **Documentação:** Ver arquivo `IMPLEMENTACAO_DOCUMENTOS.md` no repositório frontend

---

## ✨ Checklist Final

Antes de entregar ao frontend:

- [ ] 3 CPTs criados e visíveis no menu admin
- [ ] Todos os campos ACF configurados corretamente
- [ ] Pelo menos 2-3 registros de teste criados
- [ ] Endpoints REST API acessíveis e retornando JSON
- [ ] Campos ACF aparecem no JSON com `?acf_format=standard`
- [ ] URLs de download dos arquivos funcionam
- [ ] CORS configurado (frontend consegue acessar)
- [ ] Limites de upload ajustados
- [ ] Validação de tipos de arquivo funcionando

**Após completar:** Notifique o time frontend para ativar o código comentado! 🚀
