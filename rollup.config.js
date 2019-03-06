import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import minify from "rollup-plugin-babel-minify";
import cleanup from "rollup-plugin-cleanup";

export default {
    input: 'src/index.js',
    output: {
        file: 'build/index.js',
        format: 'cjs',
    },
    plugins: [
        babel({exclude: 'node_modules/**'}),
        commonjs(),
        cleanup(),
        minify({mangle: {topLevel: true}}),
    ],
}
