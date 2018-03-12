const path = require('path')
const merge = require('webpack-merge')
const devConfiguration = require('./webpack.dev.config')
const prodConfiguration = require('./webpack.prod.config')
const vueLoaderConfiguration = require('./vue-loader.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Stylish = require('webpack-stylish')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const baseConfiguration = {
    entry: {
        app: [
            'babel-polyfill',
            '../src/main.js'
        ]
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: resolve('build'),
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
                exclude: /node_modules/
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfiguration
            },

            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader'
            }, 

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: '../index.html',
        }),
        new Stylish()
    ],

    stats: 'none'
}

if (! process.argv.includes('--env.nolint')) {
    baseConfiguration.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
    })
}

module.exports = merge(baseConfiguration, (process.argv.includes('--env.prod')
    ? prodConfiguration 
    : devConfiguration))