import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-import-css';
import resolve from '@rollup/plugin-node-resolve';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';


export default [
    {
        input: 'src/public/index.html',
        output: { dir: 'src/public/build' },
        plugins: [html()],
    },
    {
        input: 'src/public/app.js',
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
        plugins: [
            resolve(),
            json(),
            css()
        ]
    }
];