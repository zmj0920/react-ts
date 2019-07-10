import { TEnvironment } from '../configs/base.config';

export const switchHash = (environment: TEnvironment, hashNumber = 10) => {
  if (environment === 'development') {
    return 'hash.[id]';
  }

  return `[hash:${hashNumber}]`;
};

export const switchChunkHash = (environment: TEnvironment, hashNumber = 10) => {
  if (environment === 'development') {
    return 'chunkhash.[id]';
  }

  return `[chunkhash:${hashNumber}]`;
};

export const switchContentHash = (environment: TEnvironment, hashNumber = 10) => {
  if (environment === 'development') {
    return 'contenthash.[id]';
  }

  return `[contenthash:${hashNumber}]`;
};
