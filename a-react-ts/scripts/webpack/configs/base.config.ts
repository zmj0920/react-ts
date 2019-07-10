import path from 'path';
import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoPrefixer from 'autoprefixer';
import { switchChunkHash } from '../libraries/switchHash';
import { antThemeVars } from '../libraries/modifyAntdTheme';
import { getBabelConfig } from '../../bable/babel.config';

export type TEnvironment = 'development' | 'test' | 'production' | 'integration';
export type WebpackConfig = (environment: TEnvironment) => Configuration;

export const getBaseConfig: WebpackConfig = (environment) => {
  const isProd = environment === 'production';

  return {
    target: 'web',
    mode: 'none',
    stats: {
      colors: true,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
      moduleTrace: false,
      source: false,
      warnings: true,
      // 打包后的列表
      assets: true,
      children: false,
      warningsFilter: [
        // mini-css-extract-plugin 报antd的错误。即使做了按顺序排序引入，也没用。应该是antd内部问题
        /Conflicting order between:/,
      ],
    },
    entry: ['./src/index.tsx'],
    output: {
      filename: `scripts/js.[name].${switchChunkHash(environment)}.js`,
      // must be absolute path
      path: path.resolve('dist', environment),
      publicPath: './',
      chunkFilename: `scripts/js.chunk.${switchChunkHash(environment)}.js`,
      pathinfo: false,
    },
    resolve: {
      extensions: [
        '.ts', '.tsx', '.js',
      ],
      modules: [path.resolve('node_modules')],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve('src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                // babel不支持.ts后缀的配置，所以暂时直接引入
                ...getBabelConfig(environment),
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          include: path.resolve('src'),
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]-[hash:base64:12]',
                // The option importLoaders allows you to configure
                // how many loaders before css-loader should be applied to @imported resources.
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // https://github.com/postcss/postcss-loader#plugins
                ident: 'postcss',
                plugins: [autoPrefixer],
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        // 为了更改antd主题而设置的loader，业务开发请使用scss
        // node_modules中的js是不经过webpack处理的，jsx中className不会被处理，所以css-loader不能开启modules
        {
          test: /\.less$/,
          include: path.resolve('node_modules/antd/'),
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
            {
              loader: 'less-loader',
              options: {
                modifyVars: antThemeVars,
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|eot|ttf|mp3)$/i,
          include: path.resolve('src/assets'),
          use: [
            {
              loader: 'url-loader',
              options: {
                // 小于当前字节的图片会被base64存在代码中
                limit: 3096,
                name: 'images/assets.[name].[hash:12].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve('src/assets/html/index.html'),
        filename: 'index.html',
        html5: true,
        hash: false,
        chunksSortMode: 'dependency',
        minify: {
          collapseWhitespace: true,
          minifyJS: isProd,
          minifyCSS: isProd,
          removeComments: true,
        },
      }),
      // moment插件把所有语言都打包进来了，而我们只需要中文
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack#using-contextreplacementplugin
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    ],
  };
};
