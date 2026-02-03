/** @type {import('tailwindcss').Config} */
import { COLORS, BORDER_RADIUS } from './src/constants/ui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme-aware semantic colors
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-light': 'var(--color-primary-light)',
        
        secondary: 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        
        institutional: 'var(--color-institutional)',
        'institutional-hover': 'var(--color-institutional-hover)',
        'institutional-light': 'var(--color-institutional-light)',
        
        // Badges
        'badge-bg': 'var(--color-badge-bg)',
        'badge-text': 'var(--color-badge-text)',
        'badge-event-bg': 'var(--color-badge-event-bg)',
        'badge-event-text': 'var(--color-badge-event-text)',
        
        // Icons
        'icon-bg': 'var(--color-icon-bg)',
        'icon-fg': 'var(--color-icon-fg)',
        
        // Hero
        'hero-start': 'var(--color-hero-start)',
        'hero-mid': 'var(--color-hero-mid)',
        'hero-end': 'var(--color-hero-end)',
        'hero-badge-bg': 'var(--color-hero-badge-bg)',
        'hero-badge-border': 'var(--color-hero-badge-border)',
        'hero-badge-icon': 'var(--color-hero-badge-icon)',
        
        // Impact
        'impact-start': 'var(--color-impact-start)',
        'impact-end': 'var(--color-impact-end)',
        
        // Text gradients
        'gradient-start': 'var(--color-gradient-start)',
        'gradient-mid': 'var(--color-gradient-mid)',
        'gradient-end': 'var(--color-gradient-end)',
        
        // Static colors (não mudam com tema)
        neutral: COLORS.neutral,
        success: COLORS.success,
        warning: COLORS.warning,
        error: COLORS.error,
        info: COLORS.info,
      },
      borderRadius: {
        sm: BORDER_RADIUS.sm,
        md: BORDER_RADIUS.md,
        lg: BORDER_RADIUS.lg,
        xl: BORDER_RADIUS.xl,
        '2xl': BORDER_RADIUS['2xl'],
      },
    },
  },
  plugins: [],
};
