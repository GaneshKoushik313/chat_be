module.exports =
{
    entry: './src/server.js',
    target: 'node',
    externals: {
        express: 'express',
    },
}