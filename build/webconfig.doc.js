var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var path = require('path')
var precss       = require('precss')
var autoprefixer = require('autoprefixer')
var projectRoot = path.resolve(__dirname, 'src/')

module.exports = {
  entry: {
    bundle: ['./web/index.js']
  },
  output: {
    path: './web/tmp/',
    publicPath: '/web/',
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  plugins: [

  ],
  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.js', '.vue'],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  externals: {
    vue: {
      commonjs: 'vue',
      amd: 'vue',
      root: 'Vue'
    }
  },
  module: {
    preLoaders: [{
      test: /\.vue$/,
      loader: 'eslint',
      include: projectRoot,
      exclude: /node_modules/
    },{
      test: /\.js$/,
      loader: 'eslint',
      include: projectRoot,
      exclude: /node_modules/
    }],
    loaders: [{
        test: /\.vue$/,
        loader: 'vue'
    },{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
    },{
        test: /\.less$/,
        loader: 'style!css!less'
    },{
        test: /\.css$/,
        loader: "style-loader!css-loader"
    },{
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000'
    },{
        test: /\.md/,
        loader: 'vue-markdown-loader'
    }],
    noParse:[/addr.js/,/^vue$/]
  },
  vueMarkdown: {

  },
  vue: {
    loaders: {
      less: ExtractTextPlugin.extract(
              // activate source maps via loader query
              'css?sourceMap!' +
              'less?sourceMap'
              ),
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  postcss: function () {
    return {
      defaults: [precss, autoprefixer],
      cleaner:  [autoprefixer({ browsers: ['ie >= 9'] })]
    }
  },
  devtool: 'source-map'
}

if (process.env.NODE_ENV === 'production') {
  delete module.exports.devtool
  return
  module.exports.entry = {
    
  }
  module.exports.output = {
      
  }
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        // sourceMap:false,
        compress: {
            warnings: true
        },
        output: {
            "ascii_only": true
        }
    })
  ])
}
