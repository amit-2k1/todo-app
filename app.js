import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import { hash } from 'bcrypt';

import pool from './server/dbConfig';

const app = express();

const PORT = process.env.SERVER_PORT || 5000;

app.set('port', PORT);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/css', express.static(path.join(__dirname, 'dist/css')));
app.use('/js', express.static(path.join(__dirname, 'dist/js')));
app.use(morgan('tiny'));

app.get('/signin', async (req, res, next) => {
  return res.sendFile(__dirname + '/dist/page/signIn.html');
});

app.get('/signup', async (req, res, next) => {
  return res.sendFile(__dirname + '/dist/page/signUp.html');
});

app.get('/', async (req, res, next) => {
  return res.sendFile(__dirname + '/dist/index.html');
});

app.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hash(password, 10);

  pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email.toLowerCase()],
    (err, result) => {
      if (err) {
        throw err;
      }

      if (result.rows.length > 0) {
        return res.redirect('/signin?userExist=true');
      } else {
        pool.query(
          `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
          [name, email.toLowerCase(), hashedPassword],
          (err, result) => {
            if (err) {
              throw err;
            }
            res.writeHead(200);
            return res.redirect('/signin?accCreated=true');
          }
        );
      }
    }
  );
});

app.listen(5000, () => {
  console.log(
    `Server is running.. on ${chalk.blue(`http://localhost:${PORT}`)}`
  );
});
