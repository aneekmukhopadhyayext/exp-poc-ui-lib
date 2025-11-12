import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Base configuration
  const baseConfig = {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }

  // Library mode configuration
  if (mode === 'lib') {
    return {
      ...baseConfig,
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'UISandboxLibrary',
          formats: ['es', 'cjs'],
          fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
        },
        rollupOptions: {
          // Externalize dependencies that shouldn't be bundled
          external: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            '@radix-ui/react-slot',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'jsxRuntime',
            },
          },
        },
        sourcemap: true,
        emptyOutDir: false, // Don't empty dist for library builds
      },
    }
  }

  // App mode configuration (default)
  return {
    ...baseConfig,
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      origin: `${process.env.DDEV_PRIMARY_URL_WITHOUT_PORT}:5173`,
      cors: {
        origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/,
      },
    },
  }
})
