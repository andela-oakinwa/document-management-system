// This script copies client/index.html into /dist/index.html
/* eslint-disable no-unused-vars */
import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/* eslint-disable no-console */

fs.readFile('Client/Index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/Index.html', $.html(), 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Index.html written to /dist'.green);
  });
});
