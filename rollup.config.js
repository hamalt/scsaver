import pluginCommonjs from '@rollup/plugin-commonjs';
import pluginNodeResolve from '@rollup/plugin-node-resolve';
import { babel as pluginBabel } from '@rollup/plugin-babel';
import esbuild from 'rollup-plugin-esbuild';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve'

import * as path from 'path';

import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;
const moduleName = pkg.name.replace(/^@.*\//, '');
const moduleNameUpper = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

const inputFileName = 'src/index.js';

const banner = `
  /**
   * @license
   * ${moduleNameUpper}.js v${pkg.version}
   * Released under the ${pkg.license} License.
   */
`;

export default [
  // Browser settings
  {
    input: inputFileName,
    output: [
      // uncompressed
      {
        name: moduleNameUpper,
        file: pkg.browser,
        format: 'iife',
        sourcemap: 'inline',
        banner
      },
      // minified
      {
        name: moduleNameUpper,
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'iife',
        sourcemap: 'inline',
        banner,
        plugins: [
          esbuild({
            sourceMap: !production,
            minify: production,
          }),
        ],
      }
    ],
    plugins: [
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, '.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: true,
      }),
      serve('./'),
      livereload({
        watch: 'dist',
      }),
    ],
  },

  // ES Module settings
  {
    input: inputFileName,
    output: [
      {
        file: pkg.module,
        format: 'es',
        sourcemap: 'inline',
        banner,
        exports: 'named',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, '.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },

  // CommonJS settings
  {
    input: inputFileName,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: 'inline',
        banner,
        exports: 'default',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, '.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },
];