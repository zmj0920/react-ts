import path from 'path';
import scss2json from 'scss-to-json';

const themeFilePath = path.resolve('src/assets/css/antdTheme.scss');

export const antThemeVars: {
  [key: string]: number | string;
} = {};

Object.entries<string | number>(scss2json(themeFilePath)).forEach(([key, value]) => {
  antThemeVars[key.replace(/^\$/, '@')] = value;
});
