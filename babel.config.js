module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-jsx-remove-data-test-id',
  ],
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/typescript'],
};
