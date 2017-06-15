import faker from 'faker';
import config from './Config';

module.exports = {
  'Create document': (browser) => {
    browser
        .url(config.url)
        .waitForElementVisible('body')
        .click('#login')
        .assert.urlContains('login')
        .setValue('Input[name=email]', 'kaiser@gmail.com')
        .setValue('Input[name=password]', 'oluwafemi')
        .click('Button[type=submit]')
        .pause(1000)
        .waitForElementVisible('body')
        .click('div.container a#create-doc.btn.blue.darken-4')
        .pause(1000)
        .assert.urlEquals('http://localhost:4000/document')
        .waitForElementVisible('body')
        .setValue('#title', faker.lorem.word())
        .setValue('#content', faker.lorem.words())
        .click('#access option[value="private"]')
        .click('Input[type="submit"]')
        .end();
  }
};
