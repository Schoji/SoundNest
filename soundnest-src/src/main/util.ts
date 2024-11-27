/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';

export function resolveHtmlPath(htmlFileName: string, view = 1) {
  if (htmlFileName == "splash.html") {
    const filePath = path.resolve(__dirname, '../../src/renderer/', htmlFileName)
    const url = new URL(filePath);
    return url.href;
  }
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}?view=${view}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  const filePath = `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  const url = new URL(filePath);
  url.searchParams.append('view', view.toString());
  return url.href;
}
