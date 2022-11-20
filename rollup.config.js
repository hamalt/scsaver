import pluginCommonjs from '@rollup/plugin-commonjs';
import pluginNodeResolve from '@rollup/plugin-node-resolve';
import { babel as pluginBabel } from '@rollup/plugin-babel';
// import esbuild from 'rollup-plugin-esbuild'; // TODO: esbuild is not a function
import { terser } from "rollup-plugin-terser";
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import eslint from '@rollup/plugin-eslint';
import scss from 'rollup-plugin-scss';

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
        sourcemap: production ? false : 'inline',
        banner
      },
      // minified
      {
        name: moduleNameUpper,
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'iife',
        sourcemap: production ? false : 'inline',
        banner,
        plugins: [
          // TODO: esbuild is not a function
          // esbuild({
          //   sourceMap: !production,
          //   minify: production,
          // }),
          terser()
        ],
      }
    ],
    plugins: [
      scss({
        output: 'dist/scsaver.min.css',
        sourceMap: !production,
        outputStyle: production ? 'compressed' : 'expanded',
      }),
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
      eslint({}),
      !production && serve({
        open: true,
        openPage: '/demo/demo.html',
      }),
      !production && livereload('./dist'),
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
      scss({
        output: false
      }),
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
      scss({
        output: false
      }),
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