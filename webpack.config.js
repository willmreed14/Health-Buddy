const path = require('path') // core node module 'path'

module.exports = { // export an object from this file
    //specify aspects of webpack configuration
    mode: 'development', // dev mode
    entry: './src/index.js', // where should webpack look for js source file?
    output: { 
        path: path.resolve(__dirname, 'dist'), // path to what folder to put output file into
        filename: 'bundle.js'
    },
    watch:true, // watch file and bundle after every change
    devtool: 'eval-source-map'
}