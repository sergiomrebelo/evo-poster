import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import summary from 'rollup-plugin-summary';

import { rollupPluginHTML as html } from '@web/rollup-plugin-html';


const production = !process.env.ROLLUP_WATCH

export default [
    {
        input: 'src/public/app.js',
        preserveEntrySignatures: 'strict',
        output: [
            {
                dir: 'src/public/build',
                name: 'version',
                assetFileNames: 'assets/[name]-[hash][extname]',
                plugins: [terser()],
            }
        ],
        watch: {
            include: 'src/public/**'
        },
        plugins: [
            resolve(),
            json(),
            scss({ fileName: 'bundle.css' }),
            html({
                input: 'src/public/index.html',
                minify: false,
                extractAssets: false
            }),
            summary(),
            del({ targets: 'src/public/build/assets/*' })
        ]
    }
];


