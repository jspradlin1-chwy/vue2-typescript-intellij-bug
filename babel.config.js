module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {node: 'current'},
      },
    ],
    '@babel/preset-typescript',
    'babel-preset-typescript-vue',
  ],
  include: ['./node_modules/@chewy', './src', './test', './config'],
  //ignore: [/node_modules\/(?!@chewy)/],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    // next four lines required for typedi to work
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['babel-plugin-parameter-decorator'],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/plugin-proposal-private-methods', {loose: true}],
    ['@babel/plugin-proposal-private-property-in-object', {loose: true}],
    ['module-resolver', {'root': '.', 'alias': {'@': './src', '@test': './test'}}],
  ],
  overrides: [{
    test: "./node_modules/@chewy/**/*",
    compact: false,
  }],
};
