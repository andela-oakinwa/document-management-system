import config from './config';

module.exports = {
  'Login User': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=identifier]', 'oluwafemi@gmail.com')
      .setValue('Input[name=password]', 'phemi')
      .click('Input[type=submit]')
      .pause(1000)
      .assert.urlEquals('http://localhost:4000/')
      .end();
  },
  'Invalid user': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=identifier]', 'kaiser@gmail.com')
      .setValue('Input[name=password]', 'kaiser')
      .click('Input[type=submit]')
      .pause(1000)
      .assert.urlContains('login')
      .end();
  }
};
