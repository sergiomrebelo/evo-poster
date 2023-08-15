import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.mjs',
    plugins: [terser()],
    output: [
        {
            file: `lib/evaluator.min.js`,
            format: 'es',
            sourcemap: true
        },
    ]
};