import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import path, { dirname } from 'path';

const app = express();

const PORT = process.env.SERVER_PORT || 5000;

app.set('port', PORT);
app.set('views', path.resolve(__dirname, 'dist'));

app.use('/css', express.static(path.join(__dirname, 'dist/css')));
app.use('/js', express.static(path.join(__dirname, 'dist/js')));
app.use(morgan('tiny'));

app.get('/signin', async function (req, res, next) {
  res.sendFile(__dirname + '/dist/page/signIn.html');
});

app.get('/signup', async function (req, res, next) {
  res.sendFile(__dirname + '/dist/page/signUp.html');
});

app.get('/', async function (req, res, next) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(5000, function () {
  console.log(
    `Server is running.. on ${chalk.blue(`http://localhost:${PORT}`)}`
  );
});
