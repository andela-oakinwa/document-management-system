import config from './config';

module.exports = {
  'Login User': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=identifier]', 'kaiser.phemi@gmail.com')
      .setValue('Input[name=password]', 'oluwafemi')
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
      .setValue('Input[name=identifier]', 'koko@gmail.com')
      .setValue('Input[name=password]', 'password')
      .click('Input[type=submit]')
      .pause(1000)
      .assert.urlContains('login')
      .end();
  }
};
