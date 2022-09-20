module.exports = {
	moduleFileExtensions: [ 'js', 'json', 'vue' ],
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
            'jest-transform-stub',
		'^.+\\.(js|jsx)?$': 'babel-jest',
		'\\.[jt]sx?$': 'babel-jest',
	},
	moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
	testMatch: [ '<rootDir>/src/packages/**/*.{spec, test}.{j,t}s?(x)' ],
	transformIgnorePatterns: [
		'<rootDir>/node_modules/',
		'/node_modules/(?!@babel)',
	],
	testEnvironment: 'jest-environment-jsdom',
};