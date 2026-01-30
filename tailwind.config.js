/** @type {import('tailwindcss').Config} */
import { COLORS, BORDER_RADIUS } from './src/constants/ui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: COLORS.primary,
        'primary-dark': COLORS.primaryDark,
        neutral: COLORS.neutral,
        success: COLORS.success,
        warning: COLORS.warning,
        error: COLORS.error,
        info: COLORS.info,
        // Visual guide accents
        'accent-red': COLORS.accent.red,
        'accent-orange': COLORS.accent.orange,
        'accent-green': COLORS.accent.deepGreen,
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
