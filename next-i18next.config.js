const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'vi'],
    localePath: path.resolve('./public/locales'),
  },
};
