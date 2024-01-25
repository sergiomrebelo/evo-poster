import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import summary from 'rollup-plugin-summary';
import livereload from 'rollup-plugin-livereload'
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy';

import { rollupPluginHTML as html } from '@web/rollup-plugin-html';

export default [
    {
        input: 'src/client/main.js',
        preserveEntrySignatures: 'strict',
        output: [
            {
                dir: 'src/public',
                name: 'version',
                assetFileNames: 'assets/[name]-[hash][extname]',
                plugins: [], //terser()
            }
        ],
        watch: {
            include: ['src/client/**']
        },
        plugins: [
            resolve(),
            json(),
            html({
                input: 'src/client/index.html',
                minify: true,
                extractAssets: false
            }),
            summary(),
            url({
                include: ['**/*.woff', '**/*.woff2', '**/*.ttf'],
                limit: Infinity,
                fileName: '[dirname][name][extname]',
            }),
            copy({targets: [{src: 'src/client/assets', dest: 'src/public'}]}),
            del({ targets: 'src/public/assets/*' }),
            scss({
                fileName: 'bundle.css',
                sourceMap: true
            })]
    }
];