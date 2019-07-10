import path from 'path';
import { cloneDeep } from 'lodash';
import webpack, { RuleSetLoader } from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtraPlugin from 'mini-css-extract-plugin';
import MiniJsWebpackPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { getBaseConfig, WebpackConfig } from './base.config';
import { switchContentHash } from '../libraries/switchHash';

export const buildConfig: WebpackConfig = (environment) => {
  const isProd = environment === 'production';
  const config = cloneDeep(getBaseConfig(environment));

  config.devtool = false;
  config.mode = 'production';

  config.module!.rules.push({
    test: /\.html$/,
    include: path.resolve('src/assets/html'),
    use: [
      {
        loader: 'html-loader',
        options: {
          // 标签:属性
          attrs: [
            'img:src',
            'link:href',
            'audio:src',
            'video:src',
          ],
        },
      },
    ],
  });

  config.plugins = [
    ...config.plugins,
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    // https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-all-css-in-a-single-file
    new MiniCssExtraPlugin({
      filename: `styles/style.[name].${switchContentHash(environment)}.css`,
      chunkFilename: `styles/style.chunk.${switchContentHash(environment)}.css`,
    }),
  ];
  config.optimization = {
    nodeEnv: environment,

    minimize: true,
    minimizer: [
      // https://github.com/webpack-contrib/terser-webpack-plugin#options
      new MiniJsWebpackPlugin({
        test: /\.js$/i,
        cache: false,
        parallel: true,
        // cheap-source-map options don't work with this plugin.
        sourceMap: !isProd,
        extractComments: false,
        // https://github.com/fabiosantoscode/terser#minify-options
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          module: false,
          toplevel: false,
          nameCache: undefined,
          keep_classnames: !isProd,
          keep_fnames: !isProd,
          ie8: false,
          safari10: false,
          mangle: isProd,
          // https://github.com/fabiosantoscode/terser#output-options
          output: {
            comments: false,
            beautify: !isProd,
          },
        },
      }),
      // https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-all-css-in-a-single-file
        styles: {
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          enforce: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          chunks: 'all',
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: true,
  };

  for (const rule of config.module!.rules) {
    const { use } = rule as {use: RuleSetLoader[]};

    if (use[0].loader === 'css-loader') {
      use.unshift({
        // @ts-ignore 支持类型 string
        loader: MiniCssExtraPlugin.loader,
        options: {
          // 图片相对于样式文件的位置
          publicPath: '../',
        },
      });
    }
  }

  return config;
};

// webpack-cli
export default buildConfig;
