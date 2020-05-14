const { Pool } = require('pg');

const pool = new Pool({
  database: 'qna_db',
  user: 'postgres',
  password: 'postgres',
  host: 'database',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
