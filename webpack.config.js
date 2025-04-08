const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './public/index.html', // Entry point for your application
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js', // Output JavaScript file
        clean: true, // Clean the output directory before building
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'], // Process HTML files
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Process CSS files
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Source HTML file
            filename: 'index.html', // Output HTML file
        }),
    ],
    mode: 'production', // Set mode to production for optimized builds
};