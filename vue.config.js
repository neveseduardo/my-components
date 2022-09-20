const path = require('path');
const webpack = require('webpack');

module.exports = {
	devServer: {
		open: true,
		compress: true,
		https: false,
		hot: true,
		allowedHosts: 'all',
		historyApiFallback: true,
		port: 3000,
		host: 'localhost',
		static: {
			directory: path.resolve(__dirname, './dev/static'),
			staticOptions: {},
			watch: true,
		},
		watchFiles: ['dev/ot-styles/dist/ot_theme1/app.css'],
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.join(__dirname, 'src'),
			},
		},
		plugins: [
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 6,
			}),
		],
		performance: {
			hints: false,
			maxEntrypointSize: 512000,
			maxAssetSize: 512000,
		},
		optimization: {
			splitChunks: {
				minSize: 10000,
				maxSize: 250000,
			},
		},
	},
	css: {
		sourceMap: process.env.NODE_ENV !== 'production',
		extract: true,
	},
	chainWebpack: config => config.optimization.minimize(true),
};
