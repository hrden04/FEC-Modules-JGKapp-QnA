const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes/index.js');

const PORT = 4500;
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api/products', router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Now listening on ', PORT);
});
