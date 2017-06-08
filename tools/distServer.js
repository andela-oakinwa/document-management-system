import express from 'express';
import path from 'path';
import compression from 'compression';
import app from '../server/config/App';

/* eslint-disable no-console */
process.env.NODE_ENV = 'development';

const port = parseInt(process.env.PORT, 10) || 4000;

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
