const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
    externals: { chartjs: 'chart.js', tailwindcss: 'tailwindcss' }
}
