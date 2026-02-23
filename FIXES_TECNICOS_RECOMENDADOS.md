# 🔧 SOLUÇÕES TÉCNICAS — Fixes Recomendados

## ⚡ Quick Start

Se você quer **corrigir os 3 problemas críticos**, comece por aqui:

```bash
# 1. Descomenta Partners.tsx (solução 1)
# 2. Valida novo WordPress tem todos os CPTs (solução 2)
# 3. Testa with novo WP URL (solução 3)
```

---

## SOLUÇÃO 1: Descomenta Partners.tsx para Consumir API

### 📝 Arquivo: `src/components/Partners.tsx`

**Problema atual**:
- Componente está com dados hardcoded
- Código de API consumo está comentado (linhas 92-100+)

**Solução**:

1. Abra `src/components/Partners.tsx`
2. Procure por este comentário (perto da linha 92):
```tsx
// ====================================================================
// CÓDIGO ORIGINAL - Versão com CPT/ACF
// ====================================================================
// Descomente este código quando o CPT de Parceiros estiver disponível
```

3. Descomente tudo de `import { useEffect...` até o final do arquivo

4. Comente ou delete todo o código anterior (linhas 1-91)

**Resultado final esperado** (`Partners.tsx` completo):

```tsx
import { useEffect, useState } from 'react';
import { AlertCircle, RotateCw } from 'lucide-react';
import { fetchParceiros } from '../services/api';
import type { Partner } from '../types/partners';
import ImageWithPlaceholder from './ImageWithPlaceholder';

// ====================================================================
// VERSÃO COM CPT/ACF (NOVA)
// ====================================================================

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPartners = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchParceiros();
      // Se empty, mostra placeholder
      if (data.length === 0) {
        console.warn('Nenhum parceiro encontrado na API');
      }
      setPartners(data);
    } catch (err) {
      console.error(err);
      setError('Não conseguimos carregar os parceiros no momento.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Parceiros e Apoiadores
            </h2>
            <p className="text-neutral-600">
              Carregando parceiros...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center gap-4">
            <AlertCircle size={20} className="text-red-600" />
            <div className="flex-1">
              <p className="text-red-900 font-medium">{error}</p>
              <button
                onClick={loadPartners}
                className="mt-2 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                <RotateCw size={14} />
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Se vazio, mostra mensagem (ou pode usar hardcoded como fallback)
  if (partners.length === 0) {
    return (
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-neutral-600">Carregando parceiros...</p>
          </div>
        </div>
      </section>
    );
  }

  // Duplica para carousel infinito
  const allPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Parceiros e Apoiadores
          </h2>
          <p className="text-neutral-600">
            Instituições que acreditam no nosso propósito
          </p>
        </div>

        <div className="relative overflow-x-hidden overflow-y-visible">
          <div className="flex gap-16 animate-scroll-left py-6">
            {allPartners.map((partner, index) => {
              const logoUrl = extractLogoUrl(partner.acf?.partner_logo);
              const partnerName = partner.acf?.partner_name || partner.title?.rendered || 'Parceiro';
              const website = partner.acf?.partner_website;

              return (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center min-w-[200px] py-2"
                >
                  {website ? (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visitar site de ${partnerName}`}
                    >
                      <ImageWithPlaceholder
                        src={logoUrl}
                        alt={partnerName}
                        className="h-20 md:h-24 w-auto object-contain transition-all duration-300 hover:scale-110"
                      />
                    </a>
                  ) : (
                    <ImageWithPlaceholder
                      src={logoUrl}
                      alt={partnerName}
                      className="h-20 md:h-24 w-auto object-contain"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Função auxiliar para extrair URL da logo (ACF pode retornar string, ID ou objeto)
function extractLogoUrl(logoValue: unknown): string {
  if (!logoValue) return '';

  if (typeof logoValue === 'string') {
    return logoValue.startsWith('http') ? logoValue : `/${logoValue}`;
  }

  if (typeof logoValue === 'number') {
    // ID da imagem — precisaria de endpoint adicional para resolver
    // Por enquanto, retorna vazio (mostrará placeholder)
    return '';
  }

  if (typeof logoValue === 'object' && logoValue !== null) {
    const obj = logoValue as Record<string, unknown>;
    if (typeof obj.url === 'string') return obj.url;
    if (typeof obj.guid === 'string') return obj.guid;
  }

  return '';
}
```

**Testes**:
```bash
# Dev com novo WordPress (CPT parceria)
VITE_WP_API_URL=http://localhost:10003/wp-json/wp/v2 npm run dev
# Verificar: Seção de parceiros carrega logos e links

# Fallback se API indisponível
# Desligar WordPress, página deve mostrar erro + retry button
```

---

## SOLUÇÃO 2: Validar CPTs no Novo WordPress

### 📝 Arquivo: `src/services/api.ts`

**Adicionar função de validação**:

```typescript
// Adicionar NO FINAL de src/services/api.ts

/**
 * Valida que o WordPress novo tem todos os CPTs necessários
 * Chame esta função no App.tsx no useEffect para verificar na inicialização
 */
export async function validateWPStructure(): Promise<{
  valid: boolean;
  errors: string[];
}> {
  const requiredCPTs = [
    { name: 'noticia', label: 'Notícias' },
    { name: 'projeto', label: 'Projetos' },
    { name: 'evento', label: 'Eventos' },
    { name: 'parceria', label: 'Parceiros' },
    { name: 'capacitacao', label: 'Capacitações' },
  ];

  const errors: string[] = [];

  for (const cpt of requiredCPTs) {
    try {
      // Tenta buscar 1 item do CPT para verificar se existe
      await fetchAPI<any>(`${cpt.name}?per_page=1`);
      console.log(`✅ CPT "${cpt.name}" encontrado`);
    } catch (err) {
      errors.push(
        `❌ CPT "${cpt.label}" (${cpt.name}) não encontrado na API. ` +
        `Verifique se foi criado no WordPress e se está públicoDEV.`
      );
      console.error(`Erro ao validar ${cpt.name}:`, err);
    }
  }

  if (errors.length === 0) {
    console.log('%c✅ Todos os CPTs validados com sucesso!', 'color: green; font-weight: bold;');
    return { valid: true, errors: [] };
  } else {
    console.error('%c❌ Problemas encontrados:', 'color: red; font-weight: bold;');
    errors.forEach(e => console.error(`  ${e}`));
    return { valid: false, errors };
  }
}

/**
 * Valida ACF fields específicos de um CPT
 * Use em teste de QA antes de produção
 */
export async function validateACFFields(
  cptName: string,
  expectedFields: string[]
): Promise<boolean> {
  try {
    const [item] = await fetchAPI<any>(`${cptName}?per_page=1&acf_format=standard`);
    if (!item || !item.acf) {
      console.warn(`⚠️ CPT ${cptName} não retornou ACF fields`);
      return false;
    }

    const actualFields = Object.keys(item.acf);
    const missing = expectedFields.filter(f => !actualFields.includes(f));

    if (missing.length > 0) {
      console.warn(`⚠️ Campo(s) faltando em ${cptName}: ${missing.join(', ')}`);
      return false;
    }

    console.log(`✅ ACF fields validados para ${cptName}`);
    return true;
  } catch (err) {
    console.error(`Erro ao validar ACF do ${cptName}:`, err);
    return false;
  }
}

// Checklist de campos por CPT
export const CPT_FIELD_REQUIREMENTS = {
  noticia: ['featured_image', 'category'],
  projeto: ['impacto', 'project_image'],
  evento: ['event_summary', 'event_start_date', 'event_location'],
  parceria: ['partner_name', 'partner_logo', 'partner_website'],
  capacitacao: ['cap_subtitle', 'cap_summary', 'cap_start_date', 'cap_modality'],
} as const;
```

### 📝 Arquivo: `src/App.tsx`

**Adicionar validação no inicio**:

```typescript
// Perto do início do App.tsx, após imports:

import { validateWPStructure } from './services/api';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return window.location.hash.replace('#', '') || 'home';
  });

  // ✨ NOVO: Validar estrutura do WordPress na inicialização
  useEffect(() => {
    if (import.meta.env.DEV) {
      validateWPStructure().then(result => {
        if (!result.valid) {
          console.warn(
            '%cAviso de Desenvolvimento: CPTs ausentes no WordPress. ' +
            'Veja erros acima para configurar.',
            'color: orange; background: yellow; padding: 4px 8px; border-radius: 3px;'
          );
        }
      });
    }
  }, []);

  // ... resto do código
}
```

**Resultado esperado no console**:
```
✅ CPT "noticia" encontrado
✅ CPT "projeto" encontrado
✅ CPT "evento" encontrado
❌ CPT "Parceiros" (parceria) não encontrado na API...
❌ CPT "Capacitações" (capacitacao) não encontrado na API...
❌ Problemas encontrados:
```

---

## SOLUÇÃO 3: Fallback para Imagens Quebradas

### 📝 Arquivo: `src/components/News.tsx`

**Melhorar extração de imagem**:

```typescript
// Substituir função extractImageFromHtml (linha ~15):

function extractImageFromHtml(html?: string): string | null {
  if (!html) return null;

  const m = html.match(/<img[^>]+src=["']?([^"'>\s]+)["']?/i);
  if (!m?.[1]) return null;

  const src = m[1];

  // Validar URL absoluta
  try {
    new URL(src);
    return src; // É válida
  } catch {
    // URL relativa — converter ou descartar
    if (src.startsWith('http')) return null;
    if (src.startsWith('/')) {
      // Tentar relativamente ao site antigo (fallback)
      const legacyUrl = import.meta.env.VITE_WP_LEGACY_API_URL || 'https://fundacao193.org.br';
      const baseUrl = new URL(legacyUrl).origin;
      return `${baseUrl}${src}`;
    }
    return null; // Descartar URLs inválidas
  }
}
```

### 📝 Arquivo: `src/components/Partners.tsx`

**Usar componente ImageWithPlaceholder**:

```typescript
// Importar (já existe no topo):
import ImageWithPlaceholder from './ImageWithPlaceholder';

// Usar em lugar de <img>:
<ImageWithPlaceholder
  src={logoUrl}
  alt={partnerName}
  className="h-20 md:h-24 w-auto object-contain"
/>

// Componente automaticamente mostra placeholder se src for vazio/inválido
```

---

## SOLUÇÃO 4: Circuit Breaker para API (Opcional mas Recomendado)

### 📝 Arquivo novo: `src/services/apiHealthCheck.ts`

```typescript
/**
 * Circuit breaker para API do WordPress
 * Evita requisições repetidas se a API estiver down
 */

type CircuitState = 'closed' | 'open' | 'half-open';

class APICircuitBreaker {
  private state: CircuitState = 'closed';
  private failureCount = 0;
  private successCount = 0;
  private lastFailureTime: number | null = null;

  private readonly FAILURE_THRESHOLD = 5; // Máx fails antes de abrir circuit
  private readonly SUCCESS_THRESHOLD = 2; // Sucessos para fechar circuit
  private readonly RESET_TIMEOUT = 30000; // 30s antes de tentar half-open

  canExecute(): boolean {
    if (this.state === 'closed') return true;
    if (this.state === 'open') {
      const now = Date.now();
      const timeSinceLastFailure = now - (this.lastFailureTime || 0);
      if (timeSinceLastFailure > this.RESET_TIMEOUT) {
        this.state = 'half-open';
        this.successCount = 0;
        return true;
      }
      return false; // Circuit ainda aberto
    }
    // half-open: permite requisição de teste
    return true;
  }

  recordSuccess(): void {
    this.failureCount = 0;
    if (this.state === 'half-open') {
      this.successCount++;
      if (this.successCount >= this.SUCCESS_THRESHOLD) {
        this.state = 'closed';
        console.log('✅ Circuit breaker FECHADO — API respondendo');
      }
    }
  }

  recordFailure(): void {
    this.lastFailureTime = Date.now();
    this.failureCount++;
    if (this.failureCount >= this.FAILURE_THRESHOLD && this.state === 'closed') {
      this.state = 'open';
      console.warn('⚠️ Circuit breaker ABERTO — API indisponível. Tentando novamente em 30s');
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}

export const apiBreaker = new APICircuitBreaker();
```

### 📝 Arquivo: `src/services/api.ts`

**Integrar circuit breaker**:

```typescript
// Adicionar import:
import { apiBreaker } from './apiHealthCheck';

// Modificar fetchJsonWithCache:
async function fetchJsonWithCache<T>(url: string, label: string): Promise<T> {
  if (!apiBreaker.canExecute()) {
    throw new Error(`API indisponível (circuit breaker aberto). Tentando novamente em 30s.`);
  }

  const cached = responseCache.get(url);
  if (cached && cached.expiry > Date.now()) {
    return cached.value as T;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      apiBreaker.recordFailure();
      throw new Error(`Erro ao buscar ${label}`);
    }

    const data = (await response.json()) as T;
    apiBreaker.recordSuccess(); // ✨ Registrar sucesso

    if (CACHE_TTL_MS > 0) {
      responseCache.set(url, {
        expiry: Date.now() + CACHE_TTL_MS,
        value: data,
      });
    }

    return data;
  } catch (err) {
    apiBreaker.recordFailure(); // ✨ Registrar falha
    throw err;
  }
}
```

---

## 🧪 TESTES RECOMENDADOS

### Teste 1: Validação Inicial
```bash
# Terminal 1: WordPress local
# Terminal 2: Frontend dev
npm run dev

# Abrir DevTools (F12), aba Console
# Deve ver:
# ✅ CPT "noticia" encontrado
# ✅ CPT "projeto" encontrado
# ... etc

# Se CPTs faltarem, erro será exibido
```

### Teste 2: Switchover entre APIs
```bash
# Testar com API antiga
VITE_DATA_SOURCE=legacy npm run dev
# Verificar: Notícias, Projetos e Eventos carregam

# Testar com API nova
npm run dev
# Verificar: Mesmas páginas, mesmo resultado
```

### Teste 3: Modo Offline
```bash
# 1. Dev server rodando (npm run dev)
# 2. Desligar WiFi/Internet
# 3. Recarregar página (Ctrl+R)
# 4. Verificar: Dados em cache ainda aparecem (60s TTL)
# 5. Reconnectar Internet
# 6. Recarregar: Dados atualizados
```

### Teste 4: Erro de Rede
```bash
# DevTools (F12) → Network
# Filtrar por XHR/Fetch
# Throttle: "Slow 3G"
# Verificar: Loading spinner aparece, retry button funciona
```

---

## 📋 Ordem de Implementação Recomendada

1️⃣ **HOJE** (15 min)
   - [ ] Descomenta Partners.tsx
   - [ ] Testa que compila (npm run typecheck)

2️⃣ **Esta semana** (1-2 horas)
   - [ ] Adiciona validateWPStructure() em api.ts
   - [ ] Integra validação em App.tsx
   - [ ] Testa com novo WordPress

3️⃣ **Antes de go-live** (30 min)
   - [ ] Circuit breaker (opcional, nice-to-have)
   - [ ] Melhora extração de imagem
   - [ ] Testes finais

---

## ❓ FAQ das Soluções

**P: E se descomenta Partners.tsx e a API falhar?**  
R: Cai no bloco `catch`, mostra erro + retry button. Usuário clica Tentar Novamente.

**P: O validateWPStructure() precisa rodar em produção?**  
R: Não recomendado. Use `import.meta.env.DEV` para rodar só em dev.

**P: E se alguns campos ACF tiverem nomes diferentes?**  
R: Atualize `CPT_FIELD_REQUIREMENTS` e o tipo TypeScript em `src/types/`.

**P: Circuit breaker é obrigatório?**  
R: Não, mas recomendado para produção. Evita bombardeio à API quando cai.

**P: Como testar fallback de imagem?**  
R: Edit src URL em DevTools e change para URL inválida. Deve mostrar placeholder.

---

Todos os fixes estão **prontos para implementação imediata**. Escolha quantos aplicar baseado em seu cronograma.
