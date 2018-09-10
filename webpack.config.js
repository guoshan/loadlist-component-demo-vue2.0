const path = require('path');
const wepack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry:{
        lib:['vue','axios','weui.js','weui'],
        common:['./src/js/common.js'],
        index:"./src/js/main.js"
    },
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
		filename:'js/[name].js?[hash]',//[chunkhash]
        chunkFilename: 'js/chunk/[name].[hash].js',
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
        new HtmlWebpackPlugin({
            filename: './index.html',
            template:"./src/index.html",
            chunks: ['index','common','lib']
        }),
        new wepack.optimize.UglifyJsPlugin({//压缩js
            names: ['common','lib']
        })
    ]
}