const { NODE_ENV, NODE_TEST } = process.env;
const presets =
    NODE_ENV === 'development' && !NODE_TEST ?
        ['@vue/babel-preset-app'] :
        [['@babel/preset-env']];
const runtime = ['@babel/plugin-transform-runtime'];
const config = {
	presets,
	plugins: [
		'@babel/plugin-proposal-nullish-coalescing-operator',
		'@babel/plugin-proposal-optional-chaining',
	],
};
if (NODE_ENV === 'development') {
	config.plugins.push(runtime);
}

module.exports = config;