import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

export const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      dark: {
        surface: {
          0: '#f8fafc',
          50: '#0f172a',
          100: '#090e1f',
          800: '#05091a',
          900: '#090e1f',
        },
      },
    },
  },
});
