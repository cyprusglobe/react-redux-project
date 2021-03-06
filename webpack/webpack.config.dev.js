var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, '../public', 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
      },
    }),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
     extensions: ['', 'css', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query:{
          "presets": ["es2015", "stage-0", "react"],
          "plugins": [
            "transform-es2015-spread",
            "transform-decorators-legacy",
            "transform-object-rest-spread"
          ]
        },
        include: [
          path.join(__dirname, '../src')
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.svg$|\.png$/,
        exclude: path.join(__dirname, '../node_modules'),
        loader: 'file?name=[hash]--resolved.[ext]'
      }
    ]
  },
  postcss: function() {
    return [
      require('postcss-cssnext')
    ]
  }
};
