// rollup.config.js
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-import-css';

export default {
    input: 'src/rollup-project/main.js',
    output: [
        {
            file: 'src/rollup-project/build/bundle.cjs',
            format: 'cjs'
        },
        {
            file: 'src/rollup-project/build/bundle.min.js',
            format: 'iife',
            name: 'version',
            plugins: [terser()]
        }
    ],
    watch: {
        include: 'src/rollup-project/**'
    },
    plugins: [json(), css()]
};