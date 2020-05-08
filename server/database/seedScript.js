/* eslint-disable no-console */
const faker = require('faker');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const db = require('./index.js');

const dropALlTables = () => (db.query('DROP TABLE IF EXISTS products CASCADE')
  .then(() => db.query('DROP TABLE IF EXISTS users CASCADE'))
  .then(() => db.query('DROP TABLE IF EXISTS questions CASCADE'))
  .then(() => db.query('DROP TABLE IF EXISTS answers')));

const createProductsTable = () => {
  const sqlString = `CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(60) NOT NULL,
    product_image_url VARCHAR(100)
  )`;

  return db.query(sqlString);
};

const createUsersTable = () => {
  const sqlString = `CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    user_avatar_url VARCHAR(100)
  )`;

  return db.query(sqlString);
};

const createQuestionTable = () => {
  const sqlString = `CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    question_text VARCHAR(250) NOT NULL,
    product_id INT NOT NULL REFERENCES products(product_id),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id INT NOT NULL REFERENCES users(user_id),
    question_votes INT NOT NULL DEFAULT 0
  )`;

  return db.query(sqlString);
};

const createAnswersTable = () => {
  const sqlString = `CREATE TABLE answers (
    answer_id SERIAL PRIMARY KEY,
    answer_text VARCHAR(1000) NOT NULL,
    question_id INT NOT NULL REFERENCES questions(question_id),
    user_id INT NOT NULL REFERENCES users(user_id),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    answer_upvotes INT NOT NULL DEFAULT 0,
    answer_downvotes INT NOT NULL DEFAULT 0
  )`;

  return db.query(sqlString);
};

const createAllTables = () => (dropALlTables()
  .then(() => createProductsTable())
  .then(() => createUsersTable())
  .then(() => createQuestionTable())
  .then(() => createAnswersTable()));

const seedProducts = (numProducts) => {
  const sqlString = 'INSERT INTO products (product_id, product_name, product_image_url) VALUES ($1, $2, $3)';

  const promises = [];
  const productImage = 'https://picsum.photos/600/400';

  for (let i = 0; i < numProducts; i += 1) {
    const productName = faker.commerce.productName();
    promises.push(db.query(sqlString, [1000 + i, productName, productImage]));
  }

  return Promise.all(promises);
};

const seedUsers = () => {
  const sqlString = `INSERT INTO users (username, user_avatar_url)
    VALUES ($1, $2)`;

  const promises = [];
  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const avatar = faker.internet.avatar();
    promises.push(db.query(sqlString, [username, avatar]));
  }

  return Promise.all(promises);
};

const seedQuestions = (numProducts) => {
  const sqlString = `INSERT INTO questions (question_text, product_id, created_at, user_id)
    VALUES ($1, $2, $3, $4)`;

  const promises = [];

  for (let i = 0; i < numProducts; i += 1) {
    // Assume 2-15 questions per product
    const numQuestions = Math.floor(Math.random() * 13) + 2;
    const productId = 1000 + i;

    for (let j = 0; j < numQuestions; j += 1) {
      const questionText = faker.lorem.sentence();
      const createdAt = faker.date.past();
      const userId = Math.ceil(Math.random() * 50);

      promises.push(db.query(sqlString, [questionText, productId, createdAt, userId]));
    }
  }

  return Promise.all(promises);
};

const seedAnswers = (allQuestionIds) => {
  const sqlString = `INSERT INTO answers (answer_text, question_id, user_id, created_at)
    VALUES ($1, $2, $3, $4)`;

  const promises = [];

  allQuestionIds.forEach((question) => {
    const numAnswers = Math.floor(Math.random() * 10);

    for (let j = 0; j < numAnswers; j += 1) {
      const answerText = faker.lorem.paragraph();
      const userId = Math.ceil(Math.random() * 50);
      const createdAt = faker.date.past();

      const sqlParams = [answerText, question.question_id, userId, createdAt];

      promises.push(db.query(sqlString, sqlParams));
    }
  });

  return Promise.all(promises);
};

const seedAllTables = (numProducts) => (
  seedProducts(numProducts)
    .then(() => seedUsers())
    .then(() => seedQuestions(numProducts))
    .then(() => db.query('SELECT question_id FROM questions'))
    .then((results) => seedAnswers(results.rows))
);

rl.question('How many primary products do you need? ', (answer) => {
  const numProducts = parseInt(answer, 10);

  if (numProducts) {
    createAllTables()
      .then(() => seedAllTables(numProducts))
      .catch((err) => console.log(err))
      .finally(() => process.exit());
  } else {
    console.log('Please input a positive integer');
    rl.close();
  }
});
