import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import cleaner from 'rollup-plugin-cleaner';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
import packageJson from './package.json' assert { type: 'json' };

dotenv.config();

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
    replace({
      'process.env.SALABLE_BASE_URL': `"${process.env.SALABLE_BASE_URL}"`,
    }),
    peerDepsExternal(),
    cleaner({
      targets: ['./dist'],
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
      tsconfigOverride: {
        exclude: ['docs/**'],
      },
    }),
  ],
};

export default config;
