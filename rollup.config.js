import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import summary from 'rollup-plugin-summary';
import livereload from 'rollup-plugin-livereload'

import { rollupPluginHTML as html } from '@web/rollup-plugin-html';



const production = !process.env.ROLLUP_WATCH

// live loaading plugi
// tree-shaling -->


export default [
    {
        input: 'src/client/app.js',
        preserveEntrySignatures: 'strict',
        output: [
            {
                dir: 'src/public',
                name: 'version',
                assetFileNames: 'assets/[name]-[hash][extname]',
                plugins: [terser()],
            }
        ],
        watch: {
            include: 'src/client/**'
        },
        plugins: [
            resolve(),
            json(),
            scss({ fileName: 'bundle.css' }),
            html({
                input: 'src/client/index.html',
                minify: false,
                extractAssets: false
            }),
            summary(),
            livereload(),
            del({ targets: 'src/public/assets/*' })
        ]
    }
];


