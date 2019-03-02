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
  url: 'https://tecdom.com.br/',
  libs_url: 'https://tecdom.com.br/',
  images_url: 'https://tecdom.com.br/',
  local_url: 'http://localhost',
  local_libs_url: 'http://localhost',
  local_images_url: 'http://localhost:[port]/assets/images/original',
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
    /*root: [],*/
    //设置require或import的时候可以不需要带后缀
    extensions: ['.json', '.js', '.less', '.css', '.ejs']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }) /*ExtractTextPlugin.extract("style", "css")*/
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        }) /* ExtractTextPlugin.extract("css!less")*/
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
          name: '../fonts/[name].[ext]?[hash]' //输出目录以及名称
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 30720 * 7, //30720 30kb 图片转base64。设置图片大小，小于此数则转换。
          name: 'images/[name].' + tmpHash + '.[ext]' //输出目录以及名称
        }
      }
    ]
  },
  plugins: [
    new CleanPlugin([dir]), // 清空目录文件夹
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // 将公共模块提取，生成名为`vendors`的chunk
      //minChunks: 3 // 提取至少3个模块共有的部分
    }),

    new ExtractTextPlugin('styles/[name].' + tmpHash + '.css'),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devServer: {
    // contentBase: "./",
    host: 'localhost',
    port: dinamicConfigs.localport, //端口
    inline: true,
    hot: false
  }
};

module.exports = config;

Object.keys(htmlEntries).forEach(function(key) {
  // console.log("generate htmls" , key)

  var conf = {
    filename: key + '.html',
    template: htmlEntries[key],
    inject: false,
    hash: false,
    // pageData: pageData[key.split(".")[0]],
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
