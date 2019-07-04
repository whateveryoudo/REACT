const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    mode : 'development',
    entry : [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:9000',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname,'./src')
    ],
    output: {
        path : path.resolve(__dirname,'./dist'),
        filename: "app/[name]_[hash:8].js"
    },
    module : {
        rules : [
            {
                test : /\.jsx?$/,
                loader : 'babel-loader',
                exclude : /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template : path.resolve(__dirname,'./src/index.html'),
            title : 'webpack学习',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool : 'cheap-module-eval-source-map'
}