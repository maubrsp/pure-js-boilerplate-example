var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');

var argv;
try {
  argv = JSON.parse(process);
} catch (ex) {
  argv = process.argv;
}

let dinamicConfigs = {
  localport: '8080',
  homologa_url: 'https://pure-js-boilerplate-example.netlify.com/',
  homologa_libs_url: 'https://pure-js-boilerplate-example.netlify.com/',
  homologa_images_url:
    'https://pure-js-boilerplate-example.netlify.com/images/',
  js: './src/libs/pages',
  js: './src/libs/pages',
  html: 'src/doom'
};

let jsEntries = {};
let htmlEntries = {};
let pageData = [
  {
    id: 'index'
  }
];

pageData.forEach((value, index) => {
  jsEntries[value.id] =
    dinamicConfigs.js + '/' + value.id + '/' + value.id + '.js';
  jsEntries[value.id + '.mobile'] =
    dinamicConfigs.js + '/' + value.id + '/' + value.id + '.mobile.js';

  htmlEntries[value.id] =
    dinamicConfigs.html + '/' + value.id + '/' + value.id + '.ejs';
  htmlEntries[value.id + '.mobile'] =
    dinamicConfigs.html + '/' + value.id + '/' + value.id + '.mobile.ejs';
});

jsEntries['prerender'] = './src/libs/' + 'prerender.js';
let tmpHash = Math.round(Math.random() * 11111111 + 99999999);

/*console.log(`argv: ${argv[2]}`);*/
var production = argv[2] == '-p' ? true : false;
var dir = './../dev';
var assetPath = './../assets';

let urls = {
  url: dinamicConfigs.homologa_url,
  libs_url: dinamicConfigs.homologa_libs_url,
  images_url: dinamicConfigs.homologa_images_url
};

var config = {
  entry: jsEntries,
  output: {
    path: path.join(__dirname, dir),
    publicPath: '',
    filename: 'libs/[name].' + tmpHash + '.js',
    chunkFilename: 'libs/[id].chunk.js'
  },
  resolve: {
    extensions: ['.json', '.js', '.less', '.css', '.ejs']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: '../fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 30720 * 7,
          name: 'images/[name].' + tmpHash + '.[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanPlugin([dir]), // 清空目录文件夹
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),

    new ExtractTextPlugin('styles/[name].' + tmpHash + '.css'),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, assetPath),
        to: path.join(__dirname, dir + '/assets')
      }
    ])
  ],

  devServer: {
    host: 'localhost',
    port: dinamicConfigs.localport, //端口
    inline: true,
    hot: false
  }
};

module.exports = config;

Object.keys(htmlEntries).forEach(function(key) {
  var conf = {
    filename: key + '.html',
    template: htmlEntries[key],
    inject: false,
    hash: false,
    production: production,
    currentHash: tmpHash,
    url: urls.url,
    libs_url: urls.libs_url,
    images_url: urls.images_url,
    chunks: ['common', key]
    //minify: true,
    /*
  ,
      minify: { //压缩HTML文件
  	removeComments: false,//移除HTML中的注释
  	collapseWhitespace: false, //删除空白符与换行符
  	removeAttributeQuotes: false // 移除属性的引号
  }
  */
  };
  config.plugins.push(new HtmlWebpackPlugin(conf));
});

//By file name to get the entry file (that is, the number of template files that need to be generated)
function getEntry(globPath) {
  var files = glob.sync(globPath);
  var entries = {},
    entry,
    dirname,
    basename,
    pathname,
    extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    entries[pathname] = './' + entry;
  }
  return entries;
}
