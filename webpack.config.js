const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  entry: {
    "app.js": ['@babel/polyfill', path.resolve(__dirname, "src")]
  },
  output: {
    path: path.resolve(__dirname, "build/static"),
    filename: "[name]",
    publicPath: './',
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "build"),
    compress: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html")
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".mjs"],
    alias: {
      api: path.resolve(__dirname, "src/api"),
      components: path.resolve(__dirname, "src/components"),
      static: path.resolve(__dirname, "src/static"),
    }
  },
  module: {
    rules: [
      {
        test:  /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]',
                mode: 'local',
              },
            }
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: `postcss-loader`,
            options: {
              plugins: () => {
                autoprefixer({ browsers: [ 'last 2 versions' ] });
              }
            }
          }
        ]
      },
      {
        test:  /\.(svg|ttf)$/,
        loader: 'file-loader',
        exclude: /node_modules/,
      },
    ]
  }
};
