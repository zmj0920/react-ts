import { Middleware } from 'redux';
import thunk from 'redux-thunk';
import { createRequestMiddleware, Model } from '../../src';

const apiMiddleware = createRequestMiddleware({
  id: Model.middlewareName,
  baseUrl: 'https://registry.npm.taobao.org',
  getHeaders: () => {
    return {
      Accept: 'application/json',
    };
  },
  onFail: (error: RM.HttpError<{ error: string, reason: string }>, transform) => {
    if (error.response.data && error.response.data.reason) {
      transform.errorMessage = error.response.data.reason;
    }
  },
  onShowSuccess: (successText) => {
    console.info(successText);
    alert(successText);
  },
  onShowError: (errorText) => {
    console.error(errorText);
    alert(errorText);
  },
});

export const rootMiddleWares: Middleware[] = [thunk, apiMiddleware];
