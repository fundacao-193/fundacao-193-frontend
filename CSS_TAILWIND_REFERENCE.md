# 🎨 Visual Reference Guide - CSS/Tailwind Quick Tips

A quick reference for implementing the recommended improvements using Tailwind CSS.

---

## Hover State Patterns

### Pattern 1: Lift & Shadow (Cards)
```tsx
className="hover:shadow-xl hover:shadow-[#3d685d]/30 hover:-translate-y-2 transition-all duration-300"
```

### Pattern 2: Scale & Glow
```tsx
className="hover:scale-105 hover:shadow-2xl hover:shadow-[#3d685d]/40 transition-all"
```

### Pattern 3: Border Accent
```tsx
className="hover:border-t-4 hover:border-[#3d685d] transition-all"
```

### Pattern 4: Icon Rotate
```tsx
className="group-hover:rotate-6 group-hover:scale-110 transition-transform"
```

### Pattern 5: Grayscale Filter
```tsx
className="filter grayscale hover:grayscale-0 transition-all"
```

### Pattern 6: Text Color Shift
```tsx
className="text-neutral-600 hover:text-[#3d685d] transition-colors"
```

---

## Animation Duration Reference

| Duration | Use Case | Class |
|----------|----------|-------|
| 150ms | Fast micro-interactions | `duration-150` |
| 300ms | Standard transitions | `duration-300` (default) |
| 500ms | Scroll animations | `duration-500` |
| 700ms | Loading states | `duration-700` |
| 1000ms | Entrance animations | `duration-1000` |

---

## Shadow Hierarchy

```tsx
// Light shadow (subtle)
className="shadow-md"

// Medium shadow (noticeable)
className="shadow-lg"

// Strong shadow (prominent)
className="shadow-xl"

// Very strong (rare)
className="shadow-2xl"

// With color tint
className="shadow-xl shadow-[#3d685d]/30"
```

---

## Opacity & Color Variants

### Background Opacity
```tsx
// 10% opacity
className="bg-[#3d685d]/10"

// 20% opacity
className="bg-[#3d685d]/20"

// 50% opacity
className="bg-[#3d685d]/50"
```

### Text Opacity
```tsx
className="text-white/80"      // 80% opacity
className="text-white/50"      // 50% opacity
```

### Border Opacity
```tsx
className="border-[#3d685d]/50"
className="border-white/20"
```

---

## Transform Effects

### Scale
```tsx
className="hover:scale-105"    // 5% larger
className="hover:scale-110"    // 10% larger
className="hover:scale-95"     // 5% smaller
```

### Translate
```tsx
className="hover:-translate-y-1"  // Move up 4px
className="hover:-translate-y-2"  // Move up 8px
className="hover:translate-x-1"   // Move right 4px
```

### Rotate
```tsx
className="hover:rotate-6"     // 6 degrees
className="hover:rotate-45"    // 45 degrees
className="hover:-rotate-45"   // -45 degrees
```

---

## Filter Effects

### Grayscale
```tsx
className="filter grayscale"           // Full grayscale
className="filter grayscale-0"         // Normal colors
className="hover:grayscale-0"          // On hover
```

### Brightness
```tsx
className="filter brightness-75"
className="hover:brightness-110"
```

### Blur
```tsx
className="backdrop-blur-sm"           // Small blur
className="backdrop-blur-md"           // Medium blur
className="backdrop-blur-lg"           // Large blur
```

---

## Smooth Transitions Template

```tsx
// Complete transition setup
className="
  transition-all              // Animate all properties
  duration-300                // 300ms duration
  ease-out                    // Easing function
  hover:shadow-xl             // On hover effect
  hover:scale-105             // Scale effect
  hover:-translate-y-2        // Lift effect
  focus:outline-2             // Focus indicator
  focus:outline-offset-2      // Focus offset
  focus:outline-[#3d685d]     // Focus color
"
```

---

## Animation Composition Examples

### Card (Lift + Shadow)
```tsx
<div className="group bg-white rounded-xl p-8 
                shadow-md hover:shadow-xl 
                hover:scale-105 hover:-translate-y-2 
                transition-all duration-300">
  {content}
</div>
```

### Icon (Rotate + Scale)
```tsx
<div className="w-14 h-14 bg-[#3d685d]/10 rounded-lg 
                flex items-center justify-center 
                group-hover:scale-125 group-hover:rotate-6 
                transition-transform">
  <Icon />
</div>
```

### Button (Glow + Lift)
```tsx
<button className="bg-[#3d685d] text-white px-8 py-3 
                   rounded-lg font-semibold 
                   hover:bg-[#2f5349] 
                   hover:shadow-lg hover:shadow-[#3d685d]/40
                   hover:scale-105
                   transition-all duration-300">
  Click me
</button>
```

### Logo (Grayscale to Color)
```tsx
<img src="logo.png" 
     className="filter grayscale hover:grayscale-0 
                transition-all duration-300" />
```

---

## Responsive Pattern Reference

### Mobile First
```tsx
// Small screens (mobile) - default
className="text-base"

// Medium screens and up
className="md:text-lg"

// Large screens and up
className="lg:text-xl"

// Combined
className="text-base md:text-lg lg:text-xl"
```

### Grid Layout
```tsx
// 1 column on mobile
// 2 columns on tablet
// 4 columns on desktop
className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
```

---

## Color System Reference

### Primary Color (Teal)
```tsx
// Base
className="text-[#3d685d]"
className="bg-[#3d685d]"
className="border-[#3d685d]"

// Dark variant
className="bg-[#2f5349]"

// With opacity
className="bg-[#3d685d]/10"
className="hover:bg-[#3d685d]/20"
```

### Neutral Colors
```tsx
// Text
className="text-neutral-900"    // Dark text
className="text-neutral-600"    // Secondary text
className="text-neutral-400"    // Tertiary text

// Backgrounds
className="bg-white"            // Pure white
className="bg-neutral-50"       // Very light
className="bg-neutral-100"      // Light
className="bg-neutral-900"      // Very dark
```

---

## Focus State Pattern (Accessibility)

### For all interactive elements
```tsx
className="focus:outline-2 focus:outline-offset-2 focus:outline-[#3d685d]"
```

### With transition
```tsx
className="focus:outline-2 focus:outline-offset-2 focus:outline-[#3d685d] 
           transition-outline duration-300"
```

---

## Animation Classes (from index.css)

### Fade Animations
```tsx
// Fade in from bottom
className="animate-fade-in-up"

// Fade in from left
className="animate-fade-in-left"

// Fade in from right
className="animate-fade-in-right"

// Simple fade
className="animate-fade-in"

// Scale in
className="animate-scale-in"
```

### Delays
```tsx
className="animate-fade-in-up animate-delay-100"
className="animate-fade-in-up animate-delay-200"
className="animate-fade-in-up animate-delay-300"
```

---

## Group Hover Pattern

### Parent-child hover effects
```tsx
<div className="group hover:bg-blue-50 transition-colors">
  <div className="group-hover:scale-110 transition-transform">
    <Icon className="group-hover:text-blue-600" />
  </div>
  <p className="group-hover:text-blue-900 transition-colors">
    Text that changes color
  </p>
</div>
```

---

## Staggered Animation Pattern

```tsx
{items.map((item, index) => (
  <div
    key={index}
    className="opacity-0 animate-fade-in-up"
    style={{
      animationDelay: `${index * 100}ms`,
      animationFillMode: 'forwards',
    }}
  >
    {item}
  </div>
))}
```

---

## Scroll Animation Hook Pattern

```tsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Component() {
  const { elementRef, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      Content
    </div>
  );
}
```

---

## Glass Morphism Effect

```tsx
className="bg-white/10 backdrop-blur-sm border border-white/20"
```

---

## Text Gradient

```tsx
className="text-transparent bg-clip-text bg-gradient-to-r from-[#3d685d] to-[#d97706]"
```

---

## Backdrop Overlay

```tsx
// Subtle dark overlay
className="inset-0 bg-black/20"

// For modals
className="fixed inset-0 bg-black/50 backdrop-blur-sm"
```

---

## Skeleton Loader

```tsx
className="bg-neutral-200 rounded animate-pulse"
```

---

## Disabled State

```tsx
className="disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-300"
```

---

## Quick Checklist for Any Component

```tsx
// Always include
transition-all          ✓
duration-300           ✓
hover: states          ✓
focus: indicators      ✓

// Consider adding
shadow                 ⚠️
scale/translate        ⚠️
rounded-lg             ⚠️
group effects          ⚠️
```

---

## Common Mistakes to Avoid

❌ Missing `transition-all` - changes are instant
❌ Wrong duration - too fast (150ms) or too slow (1000ms)
❌ No focus states - fails accessibility
❌ Opacity without backdrop - can look unclear
❌ Too many transforms - causes performance issues
❌ Conflicting hover states - unpredictable behavior
❌ No color contrast check - fails accessibility

---

## Performance Tips

✅ Use `transition-all` (let browser optimize)
✅ Keep animations under 500ms
✅ Use `transform` over `top/left` (GPU accelerated)
✅ Avoid animating `width/height` (use `scale` instead)
✅ Use `will-change` for heavy animations
✅ Test on actual devices
✅ Monitor Lighthouse scores

```tsx
// Good - GPU accelerated
className="hover:scale-105 hover:-translate-y-2"

// Bad - CPU expensive
className="hover:w-full hover:h-full"
```

---

## Browser Support Notes

All recommended Tailwind utilities have excellent browser support:
- ✅ Chrome/Edge/Firefox: 100%
- ✅ Safari: 100%
- ✅ Mobile browsers: 100%

No polyfills needed!

---

**Last Updated**: January 2026
**Tailwind Version**: v3+
**Browser Support**: All modern browsers
