const { transformSync } = require("@babel/core");

module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        ['@babel/preset-typescript', {allowDeclareFields: true}]
    ],
    plugins: [
        ['@babel/plugin-transform-typescript', {allowDeclareFields: true}]
    ]
};
