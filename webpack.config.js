const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const data = require('./data');

module.exports = {
  entry: {
    "index.js": path.resolve(__dirname, "src")
  },
  output: {
    path: path.resolve(__dirname, "build/static"),
    filename: "[name]",
    publicPath: './',
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    compress: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/templates/main.hbs"),
      templateParameters: data
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,  { nodir: true }),
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".mjs"],
    alias: {
      fonts: path.resolve(__dirname, "src/fonts"),
      images: path.resolve(__dirname, "src/images"),
      styles: path.resolve(__dirname, "src/styles"),
      scripts: path.resolve(__dirname, "src/scripts")
    }
  },
  module: {
    rules: [
      {
        test:  /\.js$/,
        sideEffects: true,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        enforce: 'pre'
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024
        }
      },
      {
        test:  /\.hbs$/,
        loader: 'handlebars-loader',
        exclude: /node_modules/,
      },
    ]
  }
};
