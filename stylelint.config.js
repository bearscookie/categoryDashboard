/* eslint-disable */
const order = require('css-property-sort-order-smacss')
const flattenDeep = require('lodash/flattenDeep')
const map = require('lodash/map')
/* eslint-enable */

const group = map(order, (v, groupName) => ({
  groupName,
  emptyLineBefore: 'always-multi-line',
  properties: flattenDeep(v),
}))

module.exports = {
  plugins: ['stylelint-prettier'],
  extends: ['stylelint-config-recommended', 'stylelint-config-property-sort-order-smacss'],
  // extends: ['stylelint-config-recommended'],
  rules: {
    'prettier/prettier': [true, { singleQuote: false }],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'block-no-empty': true,
    'order/properties-order': group,
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['ls-layout'],
      },
    ],
    // 'at-rule-no-unknown': false,
  },
}
