const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // Being explicit about what files to include can vastly improve performance
        // so that webpack knows when to even bother checking a file
        include: [path.join(__dirname, 'client', 'scripts'), path.join(__dirname, 'common')],
        use: {
          loader: 'tslint-loader',
          options: {
            // Disabling typeCheck gives a bump in build performance, but makes certain rules
            // unable to run. Opting for more linting rather than saving a bit of build time
            typeCheck: true,
            tsConfigFile: path.join(__dirname, 'tsconfig.webpack.json')
          }
        },
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        include: [path.join(__dirname, 'client')],
        use: [
          // Style-loader is required for css hot-reloading, but we need the performance boost
          // of extracting to a single CSS file in production
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: isDev ? '[name]__[local]' : '[name]__[local]___[chunkhash]',
              minimize: !isDev,
              sourceMap: isDev
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // Don't need to include cssnano here, because that's done automatically by css-loader above
                require('stylelint'),
                // So useful so I don't have to worry about browser-compatibility as much!
                require('autoprefixer')
              ]
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        include: [path.join(__dirname, 'client', 'scripts'), path.join(__dirname, 'common')],
        use: {
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig.webpack.json",
            compilerOptions: {
              sourceMap: isDev
            }
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: [path.join(__dirname, 'client', 'images')],
        loader: 'file-loader'
      }
    ]
  },

  entry: ['./client/scripts/index.tsx'],

  output: {
    // Hashing the name takes a non-trivial amount of time, so we don't bother in development mode
    // since Chrome dev tools disables caching anyway
    filename: isDev ? '[name].js' : '[name].[chunkhash].min.js',
    chunkFilename: isDev ? '[name].js' : '[name].[chunkhash].min.js',
    path: path.join(__dirname, 'build', 'public')
  },

  // Setting this does lots of lovely things for us by default
  // https://webpack.js.org/concepts/mode/
  mode: process.env.NODE_ENV,

  target: 'web',

  // Don't want to scope just to the client directory, because the common directory is used by
  // both the client & server code
  context: __dirname,

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
  },

  devtool: isDev && 'inline-source-map',

  plugins: [
    // Yay auto-injecting generated assets into the HTML!
    new HtmlWebpackPlugin({
      title: 'TicTacToe Dungeon',
      inject: 'body',
      template: path.join(__dirname, 'client', 'index.ejs')
    })
  ],

  optimization: {
    // Enable automatic chunk splitting. By default webpack will split out all vendor
    // code into its own bundle. This will improve client performance, because vendor packages
    // change much less frequently than application code, so the browser can cache the vendor
    // packages rather than downloading them again every time the code changes
    splitChunks: {
      chunks: 'all'
    }
  },

  performance: {
    // The default max size is only 244kb... which we reach just by including react
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000
  }

};

if (!isDev) {
  module.exports = merge(webpackConfig, {
    plugins: [
      new CleanWebpackPlugin(['public'], {
        root: path.join(__dirname, 'build'),
        verbose: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].min.css',
      })
    ]
  });
} else {
  module.exports = webpackConfig;
}
