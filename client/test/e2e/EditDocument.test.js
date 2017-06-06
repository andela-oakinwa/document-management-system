import config from './Config';

module.exports = {
  'Edit document': (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=identifier]', 'kaiser.phemi@gmail.com')
     .setValue('Input[name=password]', 'oluwafemi')
     .click('Input[type=submit]')
     .pause(5000)
     .assert.urlEquals('http://localhost:4000/')
     .waitForElementVisible('body')
     .assert.elementPresent('.card')
     .click('.card-action > .right > .edit')
     .pause(1000)
     .waitForElementVisible('body')
     .clearValue('#title')
     .clearValue('#content')
     .setValue('#title', 'New Title')
     .setValue('#content', 'New Content Here')
     .click('#access option[value="private"]')
     .click('Input[type="submit"]')
     .end();
  }
};
