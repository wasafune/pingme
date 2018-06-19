module.exports = {
  "extends": "airbnb-base",
  "env": {
    "jest": true,
    "node": true,
  },
  "rules" : {
    "new-cap": ["error", {
      "newIsCap": true,
      "properties": false,
    }],
    "no-underscore-dangle": [2, { "allow": ["_id"] }],
    "semi": 1,
  },
};
