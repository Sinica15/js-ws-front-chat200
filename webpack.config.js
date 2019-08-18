const express = require("express");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "../nodejs-ws-back-chat200/public"),
    filename: "client_bundle.js"
  },
  module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
       ]
    },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/some_page.html"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
//    open: true,
    port: 9000,
    before: function(app, server) {
      app.use("/api", express.static(path.join(__dirname, "data")));
    }
  }
};
