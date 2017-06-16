import config from './Config';

module.exports = {
  'Login User': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .assert.urlContains('login')
      .setValue('Input[name=email]', 'kaiser@gmail.com')
      .setValue('Input[name=password]', 'oluwafemi')
      .click('Button[type=submit]')
      .pause(1000)
      .end();
  },
  'Invalid user': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=email]', 'koko@gmail.com')
      .setValue('Input[name=password]', 'password')
      .click('Button[type=submit]')
      .pause(1000)
      .assert.urlContains('login')
      .end();
  }
};
