const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const webpack = require('webpack');
const path = require('path');
const compiler = webpack(config);


const server = new WebpackDevServer(compiler,{
    contentBase : path.resolve(__dirname,'./dist'),
    historyApiFallback : true,
    port : 9000,
    inline : true,
    hot : true
})

server.listen(9000,'localhost',function (err) {
    if(err){throw err}
})