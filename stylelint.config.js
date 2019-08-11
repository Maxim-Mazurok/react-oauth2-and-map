module.exports = {
  extends: 'stylelint-config-recommended-scss',
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['totalHeaderTabletWidth'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['export'] },
    ],
  },
};
