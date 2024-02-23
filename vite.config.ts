import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  base: '/api',
  server: {
    port: 9000,
  },
  plugins: [
    tsconfigPaths(),
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/index.ts',
      exportName: 'app',
    }),
  ],
});
