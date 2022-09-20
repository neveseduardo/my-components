import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/main.js'),
			name: 'OTComponents',
			fileName: (format) => `ot-components.${format}.js`,
			formats: ['cjs', 'umd'],
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	plugins: [vue()],
});
