const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: {
		index: "./src/index.js",
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new NodePolyfillPlugin(),
		new HtmlWebpackPlugin({
			title: 'title',
			template: './src/index.html',
			filename: './index.html',
			inlineSource: '.(js|css)',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			chunks: ["index"]
		}),
		new HtmlInlineScriptPlugin(),
	]
};
