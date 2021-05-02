module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "no-console": "off",
    "import/prefer-default-export": "off",
    "max-len": 0
  }
};