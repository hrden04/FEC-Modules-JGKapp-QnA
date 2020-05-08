const express = require('express');

const PORT = 4500;
const app = express();

app.listen(PORT, () => {
  console.log('Now listening on ', PORT);
});
