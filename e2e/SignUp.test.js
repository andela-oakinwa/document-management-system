import faker from 'faker';

import config from './Config';

module.exports = {
  'Sign up': (browser) => {
    browser
        .url(config.url)
        .waitForElementVisible('body')
        .assert.containsText('.brand-logo', 'doqMan')
        .element('css selector', '#signup')
        .click('#signup')
        .moveToElement('#signup', 0, 0)
        .assert.urlEquals('http://localhost:4000/signup')
        .mouseButtonClick(0)
        .waitForElementVisible('body')
        .pause(1000)
        .setValue('Input[name="username"]', faker.internet.userName())
        .setValue('Input[name="firstName"]', faker.name.firstName())
        .setValue('Input[name="lastName"]', faker.name.lastName())
        .setValue('Input[type="email"]', faker.internet.email())
        .setValue('Input[type="password"]', 'passwordpassword')
        .setValue('Input[name="passwordConfirmation"]', 'passwordpassword')
        .click('Button[type="submit"]')
        .pause(1000)
        .end();
  }
};
