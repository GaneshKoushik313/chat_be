module.exports =
{
    output: {
        path: path.join(__dirname, '..', 'dist'),
        publicPath: '/',
        libraryTarget: "commonjs2"
    },
    target: 'node',
    externals: {
        express: 'express',
    },
}