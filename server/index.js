const express = require('express');
const morgan = require('morgan');
const path = require('path');
const config = require('../config.js');
const router = require('./routes/index.js');

const PORT = config.app.port;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api/products', router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Now listening on ', PORT);
});
