import config from './config';

module.exports = {
  Search: (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=identifier]', 'awa@awa.com')
     .setValue('Input[name=password]', 'awa')
     .click('Input[type=submit]')
     .pause(5000)
     .assert.urlEquals('http://localhost:3000/')
     .waitForElementVisible('body')
     .assert.elementPresent('#search')
     .click('#search')
     .setValue('#search', 'New Title')
     .assert.containsText('.card-title', 'New Title')
     .pause(2000)
     .end();
  },
};
