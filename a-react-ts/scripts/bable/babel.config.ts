import { TEnvironment } from '../webpack/configs/base.config';

export const getBabelConfig = (env: TEnvironment) => {
  const plugins: Array<string | object> = [
    ['@babel/plugin-syntax-dynamic-import'],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: false,
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
  ];
  const envOpts: {
    [key: string]: string | boolean | object;
  } = {
    loose: true,
    modules: false,
  };

  switch (env) {
    case 'production':
      plugins.push(
        ['lodash'],
      );
      break;
    case 'development':
      plugins.push(
        ['react-hot-loader/babel'],
      );
      break;
    case 'test':
      envOpts.modules = 'commonjs';
      plugins.unshift(
        ['dynamic-import-node'],
        ['@babel/plugin-transform-modules-commonjs'],
      );
      break;
    default:
  }

  const presets = [
    // @babel/preset-stage-x 已经被babel废弃
    ['@babel/env', envOpts],
    '@babel/react',
    '@babel/typescript',
  ];

  return { presets, plugins };
};

// babel-cli
export default getBabelConfig;
