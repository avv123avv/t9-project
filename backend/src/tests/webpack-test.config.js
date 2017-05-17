const webpack               = require('webpack');
const nodeExternals         = require('webpack-node-externals');
const WebpackShellPlugin    = require('webpack-shell-plugin');

const config = {
    entry: './src/tests/tests.webpack',
    output: {
        filename: './compiled/testBundle.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
        fs: 'empty'
    },

    plugins: [
        new WebpackShellPlugin({
            onBuildExit: "mocha ./compiled/testBundle.js"
        })
    ]
};

module.exports = config;
