import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePluginForArco } from '@arco-plugins/vite-react';
import svgrPlugin from '@arco-plugins/vite-plugin-svgr';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
    // alias: {
    //   '@': '/src',
    // },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {},
    }),
    vitePluginForArco(),
  ],
});
