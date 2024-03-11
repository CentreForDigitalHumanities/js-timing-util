export default {
    input: 'src/fastTimeout.js',
    external: ['underscore'],
    output: {
        dir: 'umd',
        format: 'umd',
        name: 'TimingUtil',
        globals: {
            underscore: '_',
        },
    },
};
