const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: {
		index: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
		}],
	},
	plugins: [
		new NodePolyfillPlugin(),
		new HtmlWebpackPlugin({
			title: 'title',
			template: './src/index.html',
			filename: './index.html',
			inlineSource: '.(js)',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			chunks: ["index"]
		}),
		new HtmlInlineScriptPlugin(),
	]
};
