"use strict";

var path = require("path");
var WebpackNotifierPlugin = require("webpack-notifier");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    mode: 'development',
    //mode: 'production',
    entry: {
        main: "./Scripts/Backend/app.js"
    },
    output: {
        path: path.resolve(__dirname, "./Scripts/dist"),
        filename: "[name].js"
    },
    //optimization: {
    //    splitChunks: {
    //        chunks: 'async',
    //        minSize: 30000,
    //        minRemainingSize: 0,
    //        maxSize: 204800,
    //        minChunks: 1,
    //        maxAsyncRequests: 6,
    //        maxInitialRequests: 4,
    //        automaticNameDelimiter: '~',
    //        cacheGroups: {
    //            defaultVendors: {
    //                test: /[\\/]node_modules[\\/]/,
    //                priority: -10
    //            },
    //            default: {
    //                minChunks: 2,
    //                priority: -20,
    //                reuseExistingChunk: true
    //            }
    //        }
    //    }
    //},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
                test: /\.css$/
            },
            {
                test: /\.html$/,
                use: [
                    { loader: "html-loader" }
                ]
            }
        ]
    },
    plugins: [new WebpackNotifierPlugin(), new BrowserSyncPlugin()]
};