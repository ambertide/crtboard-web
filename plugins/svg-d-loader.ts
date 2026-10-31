import { readFileSync } from 'node:fs';

/**
 * Extract pathinfo, d attr, from an svg.
 */
export const svgDLoader = () => ({
  name: 'svg-d-loader',
  transform(code: string, id: string) {
    const [path, query] = id.split('?');
    if (path.endsWith('.svg') && query === 'd') {
      const code = readFileSync(path);
      const matches = /d="([^"]*)"/g.exec(code.toString('utf-8'));
      if (matches) {
        return `export default '${matches[1]}'`;
      }
    }
    return null;
  },
});
