const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const StaticFilesWebpackPlugin = require('static-files-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
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
    })
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
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test:  /\.(svg|ttf|png|jpg|woff|woff2|eot)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
      },
      {
        test:  /\.hbs$/,
        loader: 'handlebars-loader',
        exclude: /node_modules/,
      },
    ]
  }
};
