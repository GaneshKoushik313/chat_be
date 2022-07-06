module.exports =
{
    entry: './src/server.js',
    target: 'node',
    mode: 'development',
    externals: {
        express: 'express',
    },
}