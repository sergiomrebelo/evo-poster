import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.mjs',
    plugins: [terser()],
    output: [
        {
            file: `dist/evaluator.min.js`,
            format: 'es',
            sourcemap: true
        },
    ]
};