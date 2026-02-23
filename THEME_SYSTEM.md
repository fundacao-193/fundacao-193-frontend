# Sistema de Temas - Fundação 193

## Visão Geral
O sistema de temas permite alternar facilmente entre 3 paletas de cores harmonizadas, mantendo a hierarquia visual e usabilidade em todos os temas.

## Temas Disponíveis

### 🔴 Tema Vermelho (RED) - Padrão
**Características**: Energia, Ação, Urgência
- **Primary**: #c11827 (Vermelho para CTAs e ações principais)
- **Secondary**: #ef7e24 (Laranja para destaques)
- **Institutional**: #1d4f42 (Verde escuro para confiança)
- **Uso**: Design energético, focado em conversão e ação

### 🟢 Tema Verde (GREEN) - Institucional
**Características**: Confiança, Estabilidade, Profissionalismo
- **Primary**: #3d685d (Verde como cor dominante)
- **Secondary**: #4a7a6d (Verde claro para variação)
- **Institutional**: #1d4f42 (Verde escuro para profundidade)
- **Uso**: Mais conservador, ideal para perfil institucional tradicional

### ⚫ Tema Dark (DARK) - Moderno
**Características**: Modernidade, Contraste, Alternativa
- **Primary**: #ff4757 (Vermelho vibrante)
- **Secondary**: #ffa502 (Laranja dourado)
- **Institutional**: #2ed573 (Verde neon)
- **Uso**: Estilo moderno e contrastante para públicos digitais

## Como Alternar Temas

### 1. Via Interface (Frontend)
Use o componente `ThemeToggle` que aparece como botão flutuante:
- Clique no ícone de paleta (Palette)
- Selecione entre: Vermelho, Verde ou Escuro
- A preferência é salva automaticamente no localStorage

### 2. Via Código (Programaticamente)
No arquivo `src/index.html` ou em qualquer componente React:

```javascript
// Alterar tema via JavaScript
document.documentElement.setAttribute('data-theme', 'green'); // 'red', 'green', ou 'dark'

// Salvar no localStorage
localStorage.setItem('theme', 'green');
```

### 3. Via CSS (Tema Padrão)
O tema padrão é RED. Para mudar permanentemente:

Em `src/index.css`, mova as variáveis desejadas para `:root`:
```css
:root {
  /* Copie as variáveis do tema desejado aqui */
}
```

## Hierarquia Semântica de Cores

Todas as cores seguem uma hierarquia semântica que funciona em todos os temas:

| Token CSS | Uso | Componentes |
|-----------|-----|-------------|
| `--color-primary` | CTAs principais, botões de ação | Colabore, Enviar Mensagem |
| `--color-primary-hover` | Estado hover de CTAs | Hover em botões |
| `--color-secondary` | Destaques secundários | Badges de eventos |
| `--color-institutional` | Elementos de confiança | Seção Impact, ícones |
| `--color-badge-bg` | Fundo de badges/pills | "Quem Somos", "Áreas de Atuação" |
| `--color-badge-text` | Texto de badges | Texto dentro de pills |
| `--color-icon-bg` | Fundo de ícones | Cards Missão/Visão/Valores |
| `--color-icon-fg` | Ícones | Lucide icons coloridos |

## Classes Tailwind Disponíveis

Todas as classes Tailwind estão mapeadas para variáveis CSS:

```jsx
// Backgrounds
<div className="bg-primary">        // Cor primária
<div className="bg-institutional">  // Cor institucional
<div className="bg-badge-bg">       // Fundo de badge

// Text colors
<span className="text-primary">       // Texto primário
<span className="text-badge-text">    // Texto de badge
<span className="text-icon-fg">       // Cor de ícone

// Hover states
<button className="hover:bg-primary-hover">
<a className="hover:text-institutional">

// Gradients
<div className="bg-gradient-to-br from-hero-start via-hero-mid to-hero-end">
<div className="from-impact-start to-impact-end">
```

## Arquitetura Técnica

### Fluxo de Cores
1. **Definição**: Variáveis CSS em `src/index.css` (`:root`, `[data-theme="green"]`, `[data-theme="dark"]`)
2. **Exposição**: Tailwind config mapeia variáveis para classes (`tailwind.config.js`)
3. **Uso**: Componentes usam classes Tailwind (`bg-primary`, `text-institutional`)
4. **Alternância**: Atributo `data-theme` no `<html>` altera variáveis

### Benefícios da Arquitetura
- ✅ **Zero runtime overhead**: CSS variables nativos
- ✅ **Type-safe**: TypeScript em toda stack
- ✅ **Fácil manutenção**: Uma mudança de cor afeta todo sistema
- ✅ **Performance**: Alternância instantânea sem re-render
- ✅ **Persistência**: localStorage mantém preferência do usuário

## Harmonia Visual

Cada tema foi desenhado considerando:
- **Contraste**: Mínimo 4.5:1 para acessibilidade WCAG AA
- **Hierarquia**: Primary > Secondary > Institutional clara
- **Psicologia**: Cores escolhidas para emoções específicas
- **Consistência**: Mesma hierarquia visual em todos os temas

## Componentes Afetados

Todos os componentes principais usam o sistema de temas:
- Hero (background gradient, badge, CTA)
- About (badges, ícones, links)
- Services (ícones de áreas, links "Saiba mais")
- Impact (background gradient)
- News (badges notícia/evento, links)
- Contact (ícones, focus states, botão submit)
- Header (hover, underline, botão Colabore)
- Footer (links hover)
- ErrorBoundary (botão de reset)

## Testando o Sistema

### 1. Build e Desenvolvimento
```bash
npm run build   # Verificar se compila sem erros
npm run dev     # Testar em localhost
```

### 2. Teste Manual
1. Abra o site em `http://localhost:5174`
2. Clique no botão flutuante com ícone de paleta
3. Alterne entre os 3 temas
4. Verifique se cores mudam instantaneamente
5. Recarregue a página - preferência deve persistir

### 3. Verificação de Acessibilidade
- Use DevTools > Lighthouse > Accessibility
- Verifique contraste de cores (mínimo 4.5:1)
- Teste com leitores de tela

## Próximos Passos (Opcional)

- [ ] Adicionar transições suaves entre temas
- [ ] Criar tema High Contrast para acessibilidade
- [ ] Exportar/importar paletas personalizadas
- [ ] Admin panel para gerenciar tema padrão
- [ ] A/B testing de temas por público

## Troubleshooting

**Problema**: Cores não mudam ao alternar tema
- Verificar se `data-theme` está sendo aplicado no `<html>`
- Checar console para erros do ThemeToggle
- Limpar localStorage: `localStorage.clear()`

**Problema**: Build falha
- Verificar `tailwind.config.js` - importação de `ui.ts` correta
- Verificar `index.css` - variáveis CSS sem erros de sintaxe

**Problema**: Cores hardcoded ainda aparecem
- Buscar por `#1d4f42`, `#3d685d`, `#c11827` no código
- Substituir por classes Tailwind (`bg-primary`, etc)
