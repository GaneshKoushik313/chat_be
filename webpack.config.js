module.exports =
{
    target: 'node',
    externals: [
        { 'express': 
            { commonjs: 'express' } 
        },
        {
            'utf-8-validate': 'commonjs utf-8-validate',
            bufferutil: 'commonjs bufferutil',
        }
    ],
}