const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [ path.join(__dirname, 'client', 'scripts') ],
        use: {
          loader: 'tslint-loader',
          options: {
            typeCheck: true,
            tsConfigFile: path.join(__dirname, 'tsconfig.webpack.json')
          }
        },
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        include: [ path.join(__dirname, 'client', 'styles') ],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              minimize: !isDev,
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        include: [ path.join(__dirname, 'client', 'scripts') ],
        use: {
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig.webpack.json",
            compilerOptions: {
              sourceMap: isDev
            }
          }
        }
      }
    ]
  },

  entry: [ './client/scripts/index.ts' ],

  output: {
    filename: isDev ? 'app.[hash].js' : 'app.[hash].min.js',
    path: path.join(__dirname, 'build', 'public')
  },

  mode: process.env.NODE_ENV,

  context: __dirname,

  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx', '.css', 'scss' ]
  },

  devtool: isDev && 'inline-source-map',

  plugins: [
    new CleanWebpackPlugin([ 'public' ], {
      root: path.join(__dirname, 'build'),
      verbose: true
    }),
    new HtmlWebpackPlugin({
      title: 'TicTacToe Dungeon',
      inject: 'body',
      template: path.join(__dirname, 'client', 'index.ejs')
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? 'app.[hash].css' : 'app.[hash].min.css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
        'DEVTOOLS': isDev
      }
    }),
  ]

};

module.exports = webpackConfig;