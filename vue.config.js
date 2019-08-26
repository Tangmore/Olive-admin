/**
 * 修改启动端口
 */
const webpack = require('webpack');
module.exports={
    devServer:{
        open:true,
        host:'127.0.0.1',
        port:8091,
        https:false
    },
    configureWebpack: {
           plugins: [
              new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
              })
            ]
        }
}