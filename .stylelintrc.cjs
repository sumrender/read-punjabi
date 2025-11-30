module.exports = {
  extends: ["stylelint-config-standard-scss"],
  plugins: [
    "stylelint-scss",
    "stylelint-declaration-use-variable"
  ],
  rules: {
    /* ❌ Block named colors like white, red, black */
    "color-named": "never",

    /* ❌ Block hex colors */
    "color-no-hex": true,

    /* ❌ Block hex colors directly (rgb/hsl allowed in SCSS variables via sh-waqar/declaration-use-variable) */
    "declaration-property-value-disallowed-list": {
      "/.*/": [
        // Block hex colors
        "/#([0-9a-fA-F]{3,8})/"
        // Note: rgb/rgba/hsl/hsla are allowed because:
        // 1. They're needed in SCSS variable definitions (e.g., $color-primary-alpha-10)
        // 2. Direct usage is already prevented by sh-waqar/declaration-use-variable rule
        // 3. This rule checks resolved values, so it can't distinguish variable vs direct usage
      ]
    },

    /* ✅ Enforce variables for all color-related properties */
    "sh-waqar/declaration-use-variable": [
      [
        "/color/",
        "background",
        "background-color",
        "border",
        "border-color",
        "outline",
        "box-shadow"
      ],
      {
        "ignoreValues": ["transparent", "inherit", "currentColor"]
      }
    ],

    /* ✅ Enforce strict color token naming */
    "scss/dollar-variable-pattern": "^color-[a-z0-9-]+$"
  }
};
