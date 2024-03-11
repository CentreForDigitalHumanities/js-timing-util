export default {
    input: 'src/fastTimeout.js',
    external: ['underscore'],
    output: {
        dir: 'umd',
        format: 'umd',
        name: 'fastTimeout',
        globals: {
            underscore: '_',
        },
    },
};
