import express from 'express';
import path from 'path';
import compression from 'compression';

/* eslint-disable no-console */

const port = parseInt(process.env.PORT, 10) || 4000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/Index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
});
