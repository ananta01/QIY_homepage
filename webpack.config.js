const path = require('path')
const glob = require('glob')

const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const PurifyCssPlugin = require('purifycss-webpack')

var publicPath = {
  path: 'http://localhost:9000/'
};

module.exports = {
  entry: {
    app: './src/js/index.js',
    jquery: 'jquery'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name]-bundle.js',
    publicPath: publicPath.path
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: true,
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 2000,
            outputPath: 'font/'
          }
        }]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 2000,
            outputPath: 'img/'
          }
        }]
      },
      {
        test: /\.(htm|html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src']
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')()
                ]
              }
            },
            {
              loader: "stylus-loader"
            }
          ]
        })
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [

    new webpack.ProvidePlugin({
      $: 'jquery'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'jquery',
      filename: 'js/jquery.js',
      minChunks: 2
    }),

    new HtmlPlugin({
      hash: true,
      template: './src/index.html'
    }),

    new ExtractTextPlugin('css/[name].css'),

    new PurifyCssPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html'))
    })
  ],

  devServer: {
    port: 9000,
    open: true,
    compress: true
  }
}