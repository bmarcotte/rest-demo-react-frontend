module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-console": [
          "error",
          { "allow": [ "warn", "error" ] }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "settings": {
      "react": {
        "pragma": "React",  // Pragma to use, default to "React"
        "version": "16.5"   // React version, default to the latest React stable release
      }
    }
};
