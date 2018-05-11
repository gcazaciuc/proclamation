import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import builtins from 'rollup-plugin-node-builtins';

export default {
    input: 'index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'umd',
        name: 'Proclamation',
        sourcemap: true
    },
    plugins: [
        postcss({
            extensions: ['.css']
        }),
        builtins(),
        resolve({
            extensions: ['.js', '.css']
        }),
        commonjs()
    ]
};
