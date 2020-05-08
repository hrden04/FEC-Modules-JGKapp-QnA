const { Pool } = require('pg');

const pool = new Pool({
  database: 'qna_db',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
