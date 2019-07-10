import path from 'path';
import { cloneDeep } from 'lodash';
import webpack, { RuleSetLoader } from 'webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
// @ts-ignore
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import { getBaseConfig, WebpackConfig } from './base.config';

export const getDevConfig: WebpackConfig = (environment) => {
  const config = cloneDeep(getBaseConfig(environment));

  config.mode = 'development';
  config.resolve = {
    ...config.resolve,
    alias: {
      ...(config.resolve && config.resolve.alias),
      // 需要确保 react-dom 和 @hot-loader/react-dom 的版本一致
      'react-dom': '@hot-loader/react-dom',
    },
  };
  config.devtool = 'eval';
  config.plugins = [
    ...config.plugins,
    // dll自然比hard-source快，可惜dll和react-hot-loader不兼容
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve('.cache/.webpack-hard-source-plugin/[confighash]'),
    }),
    // @ts-ignore
    // tslint:disable-next-line no-unsafe-any
    new HardSourceWebpackPlugin.ExcludeModulePlugin([
      {
        test: /extract-css-chunks-webpack-plugin[\\/]dist[\\/]loader/,
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    // tslint:disable-next-line no-unsafe-any
    new ExtractCssChunks({
      orderWarning: true,
    }),
  ];
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
        },
      },
    },
    runtimeChunk: true,
  };

  for (const rule of config.module!.rules) {
    const { use } = rule as { use: RuleSetLoader[] };

    if (use[0].loader === 'css-loader') {
      use.unshift({
        loader: ExtractCssChunks.loader,
        options: {
          hot: true,
          reloadAll: false,
        },
      });
    } else if (use[0].loader === 'babel-loader') {
      const options = use[0].options;

      use[0].options = {
        ...(typeof options === 'string' ? {} : options),
        cacheDirectory: path.resolve('.cache/.webpack-babel-loader'),
      };

      use.unshift({
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.resolve('.cache/.webpack-cache-loader'),
        },
      });
    }
  }

  return config;
};

// webpack-cli
export default getDevConfig;
