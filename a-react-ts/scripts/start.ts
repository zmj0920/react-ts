import WebpackDevServer, { Configuration } from 'webpack-dev-server';
import webpack from 'webpack';
import { Arguments, argv } from 'yargs';
import openBrowser from 'react-dev-utils/openBrowser';
import { getDevConfig } from './webpack/configs/dev.config';

const DEFAULT_PORT = 3096;
// 如果想让虚拟机或者其他电脑连接你的服务，务必指向 0.0.0.0
// 否则，使用localhost也是可以的
const { host = '0.0.0.0', port = DEFAULT_PORT } = argv as Arguments<{
  host?: string;
  port?: number;
}>;
const devConfig = getDevConfig('development');
const options: Configuration = {
  contentBase: '.',
  publicPath: '/',
  historyApiFallback: {
    // Paths with dots should still use the history fallback.
    disableDotRule: true,
  },
  watchOptions: {
    ignored: [
      '/node_modules/',
      '/dist/',
      '/build/',
      '/scripts/',
    ],
    // docker环境下需要开启
    poll: false,
  },
  hot: true,
  disableHostCheck: true,
  // @ts-ignore
  // progress: true,
  // gzip: false,
  compress: true,
  clientLogLevel: 'none',
  quiet: true,
  inline: true,
  host,
  port,
  overlay: true,
  // https://webpack.js.org/configuration/stats/#stats
  stats: devConfig.stats,
};

WebpackDevServer.addDevServerEntrypoints(devConfig, options);
const compiler = webpack(devConfig);
const app = new WebpackDevServer(compiler, options);

app.listen(port, host, (error?: Error) => {
  if (error) {
    throw error;
  }

  const realHost = host === '0.0.0.0' ? 'localhost' : host;
  const MILLION_SECONDS = 2000;
  const uri = `${options.publicPath!
    .replace(/^\/?(.+?)\/?$/, '$1')}/index.html`
    .split('/')
    .filter(Boolean)
    .join('/');

  setTimeout(() => openBrowser(`http://${realHost}:${port}/${uri}`), MILLION_SECONDS);
});
