const path = require('path');
const wepack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry:'./src/main.js',
    output:{
        path:__dirname + '/dist',
        publicPath:'/static/',
        filename:'build.js'
    },
    devServer: {
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot:true,       
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            },{
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },{
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: 'image/[name].[hash:7].[ext]'    // 将图片都放入 images 文件夹下，[hash:7]防缓存
                    }
                }]
            
            },{
                test: /\.js$/,
                use: "babel-loader",
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
        }
    },
    plugins:[
        new wepack.optimize.UglifyJsPlugin()//压缩js
    ]
}