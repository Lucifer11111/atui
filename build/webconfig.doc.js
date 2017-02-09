var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var path = require('path')
var precss       = require('precss')
var autoprefixer = require('autoprefixer')
var projectRoot = path.resolve(__dirname, 'src/')


function entity2html(htmlStr){
  var escapeEntityMap = {
     '&lt;':'<',
     '&gt;':'>',
     '&quot;':'"',
     '&#x27;':"'",
     '&#x2F;':'/'
  };

  for(var k in escapeEntityMap){
    htmlStr = htmlStr.replace(new RegExp(k, 'g'), escapeEntityMap[k])
  }
  return htmlStr
}



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
        loader: 'markdown-data-loader'
    }],
    noParse:[/addr.js/,/^vue$/]
  },
  MarkdownData: {
    languages: ['zh-CN', 'en-US'],
    defaultLanguage: 'zh-cn'
  },
  vueMarkdown: {
    preprocess: function(markdownIt, source){
      return source
    },
    prerenderVueTemplate: function(html, $){
      var root = $.root()
      var codeBlock = $('code.language-vue-script')
      var markupBlock = $('code.language-jsx')
      var code = codeBlock.text()
      var markup = markupBlock.text()
      var randomId = 'J_vue_' + Math.random().toString(36).substring(2)
      code =code.replace(/([^\r?\n]el:\s*['"]{1})body(['"]{1})/, '$1#'+ randomId +'$2')
      console.log(code)
      // move markup to codeblock to form the final markupblock
      codeBlock.prepend('<div>' + markupBlock.html() + '</div>')

      //create template container
      root.prepend('<div id="'+randomId+'"><div>')
      $('#'+randomId).append(entity2html(markup))

      //create script tag
      root.append('<script>'+code+'</script>')

      //remove markupblock
      markupBlock.parent('pre').remove()

      return $.html()
    }
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
