const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/build"),
        filename: "bundle.js"
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/favicon.ico"
        })
    ],
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /.(png|jpg|svg)$/,
                type: "asset/resource"
            }
        ]
    },
    devServer: {
        port: 3000,
        historyApiFallback: true
    }
}