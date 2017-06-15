import config from './Config';

module.exports = {
  Search: (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=email]', 'kaiser@gmail.com')
     .setValue('Input[name=password]', 'oluwafemi')
     .click('Button[type=submit]')
     .pause(1000)
     .waitForElementVisible('body')
     .assert.elementPresent('#search')
     .click('#search')
     .setValue('#search', '')
     .assert.containsText('.card-title', '')
     .pause(1000)
     .end();
  },
};
