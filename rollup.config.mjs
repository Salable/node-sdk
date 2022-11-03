import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import cleaner from 'rollup-plugin-cleaner';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from 'rollup-plugin-json';

import packageJson from './package.json' assert { type: 'json' };

const config = {
  input: './src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    json(),
    peerDepsExternal(),
    cleaner({
      targets: ['./dist'],
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
  ],
};

export default config;
