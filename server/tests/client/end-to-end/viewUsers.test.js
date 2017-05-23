import faker from 'faker';
import config from './config';

module.exports = {
  'View Users': (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=identifier]', 'awa@awa.com')
     .setValue('Input[name=password]', 'awa')
     .click('Input[type=submit]')
     .pause(5000)
     .assert.urlEquals('http://localhost:3000/')
     .waitForElementVisible('body')
     .assert.elementPresent('#users')
     .click('#users')
     .pause(1000)
     .assert.urlEquals('http://localhost:3000/editprofile')
     .waitForElementVisible('Pagination')
     .pause(1000)
     .end();
  }
};
