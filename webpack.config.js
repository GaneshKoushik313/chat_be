const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports =
{
    entry: './src/server.js',
    target: 'node',
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.[hash].js'
    },
    externals: {
        express: 'express',
    },
    module: {
        rules:[
            {
                test: /\.html$/,
                use: [
                   {
                        loader: "html-loader",
                        options: { minimize : false }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}