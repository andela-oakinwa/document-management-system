import config from './Config';

module.exports = {
  'Login': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.title('Doqman Document Management System')
      .end();
  }
};
