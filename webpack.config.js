"use strict";

const path = require("path");
const webpack = require("webpack");

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DefinePlugin = webpack.DefinePlugin;
const ProvidePlugin = webpack.ProvidePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VendorChunkPlugin = require("webpack-vendor-chunk-plugin");

const isProduction = process.env.NODE_ENV === "production";
const isDevServer = path.basename(require.main.filename) === "webpack-dev-server.js";

let config = {
    context: path.join(__dirname),

    devtool: isProduction ? "" : "inline-source-map",

    devServer: {
        compress: true,
        contentBase: "assets"
    },

    entry: {
        game: [
            "source/Main.ts"
        ],
        vendor: [
            "excalibur"
        ]
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "scripts/game.js"
    },

    resolve: {
        extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
        ],

        modules: [
            "node_modules",
            "extlibs",
            path.join(__dirname, "node_modules"),
            path.join(__dirname)
        ]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new LoaderOptionsPlugin({
            options: {
                ts: {
                    logLevel: "warn"
                }
            }
        }),
        new CommonsChunkPlugin({
            name: "vendor",
            filename: "scripts/vendor.js"
        }),
        new VendorChunkPlugin([
            "vendor"
        ]),
        new ProvidePlugin({
            "ex": "excalibur"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "Simple Breakout"
        }),
    ]
};

if (!isDevServer) {
    config.plugins.push(
        new CopyWebpackPlugin([
            {
                from: "assets/",
                to: "./"
            }
        ])
    );
}

if (isProduction) {
    config.plugins.push(
        new UglifyJsPlugin()
    );
}

module.exports = config;
