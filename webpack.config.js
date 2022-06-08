const webpack = require("webpack");

module.exports = {
  //...

  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size. You may
    // wish to include additional optimizations.
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      __DEV__: process.env.NODE_ENV === "production" || true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          babelrc: false,
          presets: [
            "@babel/preset-env",
            "react",
            "module:metro-react-native-babel-preset",
          ],
          plugins: ["react-hot-loader/babel"],
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "@svgr/webpack",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "react-native": "react-native-web",
    },
    extensions: [".web.js", ".js", ".web.jsx", ".jsx"],
    mainFields: ["browser", "main"],
  },
};
