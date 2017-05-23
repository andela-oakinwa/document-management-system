import config from './config';

module.exports = {
  'Login User': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=identifier]', 'awa@awa.com')
      .setValue('Input[name=password]', 'awa')
      .click('Input[type=submit]')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/')
      .end();
  },
  'Invalid user': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=identifier]', 'sese@gmail.com')
      .setValue('Input[name=password]', 'password')
      .click('Input[type=submit]')
      .pause(1000)
      .assert.urlContains('login')
      .end();
  }
};
