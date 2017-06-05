// This script copies client/index.html into /dist/index.html
/* eslint-disable no-unused-vars */
import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/* eslint-disable no-console */

fs.readFile('client/Index.html', 'utf8', (error, markup) => {
  if (error) {
    return console.log(error);
  }

  const $ = cheerio.load(markup);

  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/Index.html', $.html(), 'utf8', (error) => {
    if (error) {
      return console.log(error);
    }
    console.log('Index.html written to /dist'.green);
  });
});
