import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Keep the 3D scene out of the entry chunk (spec 34).
        manualChunks(id) {
          if (id.includes('applianceScene')) return 'appliance-3d';
          return undefined;
        },
      },
    },
  },
});
