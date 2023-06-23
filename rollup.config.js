// rollup.config.js
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-import-css';

export default {
    input: 'src/public/main.js',
    output: [
        {
            file: 'src/public/build/bundle.cjs',
            format: 'cjs'
        },
        {
            file: 'src/public/build/bundle.min.js',
            format: 'iife',
            name: 'version',
            plugins: [terser()]
        }
    ],
    watch: {
        include: 'src/public/**'
    },
    plugins: [json(), css()]
};