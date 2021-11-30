import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import cons from 'consolidate';

import { protect, signin, signup, getUserData } from './server/auth';

const app = express();

const PORT = process.env.SERVER_PORT || 5000;

app.set('port', PORT);
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '/dist'));
app.set('view engine', 'html');

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

app.get('/', async (req, res) => {
  return res.sendFile(__dirname + '/dist/index.html');
})

app.get('/data', protect, getUserData, async (req, res, next) => {
  const name = req.user.name;
  const todosLists = req.todosLists;

  return res.json({
    name,
    todosLists
  })
});


app.post('/signin', signin);

app.post('/signup', signup);

app.listen(5000, () => {
  console.log(
    `Server is running.. on ${chalk.blue(`http://localhost:${PORT}`)}`
  );
});
