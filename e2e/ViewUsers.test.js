import faker from 'faker';
import config from './Config';

module.exports = {
  'View Users': (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=email]', 'kaiser@gmail.com')
     .setValue('Input[name=password]', 'oluwafemi')
     .click('Button[type=submit]')
     .pause(1000)
     .assert.urlEquals('http://localhost:4000/')
     .waitForElementVisible('body')
     .assert.elementPresent('#users-list')
     .click('#users-list')
     .pause(1000)
     .assert.urlEquals('http://localhost:4000/')
     .pause(1000)
     .end();
  }
};
