const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '.dist'),
        },
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.html'
    }),
        new CopyPlugin({
            patterns: [
                { from: "./src/templates", to: "templates" },
                // { from: "./src/css", to: "css" },
                { from: "./node_modules/admin-lte/plugins/fontawesome-free/webfonts", to: "webfonts" },
                { from: "./node_modules/admin-lte/plugins/fontawesome-free/css/all.css", to: "css" },
                { from: "./node_modules/admin-lte/dist/css/adminlte.min.css", to: "css" },
                { from: "./node_modules/admin-lte//plugins/icheck-bootstrap/icheck-bootstrap.min.css", to: "css" },
                { from: "./node_modules/admin-lte/dist/js/adminlte.min.js", to: "js" },
                { from: "./node_modules/admin-lte/plugins/jquery/jquery.min.js", to: "js" },
            //     { from: "static/fonts", to: "fonts" },
                { from: "./src/static/images", to: "images" },
             ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            // Prefer `dart-sass`, even if `sass-embedded` is available
                            implementation: require("sass"),
                        },
                    },
                ],
            },
        ],
    },
};