import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import cors from 'cors';

import { protect, signin, signup, getUserData } from './server/auth';
import {
  addTodoList,
  addTodo,
  markTodo,
  deleteTodo,
  deleteTodoList
} from './server/todo';

const app = express();

const PORT = process.env.PORT || 5000;

app.set('port', PORT);

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(favicon(path.join(__dirname, '/dist/favicon.ico')));
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
});

app.get('/data', protect, getUserData, async (req, res, next) => {
  const name = req.user.name;
  const todosLists = req.todosLists;

  return res.json({
    name,
    todosLists
  });
});

app.put('/addtodolist', addTodoList);
app.put('/deletetodolist', deleteTodoList);
app.put('/addtodo', addTodo);
app.put('/marktodo', markTodo);
app.put('/deletetodo', deleteTodo);

app.post('/signin', signin);

app.post('/signup', signup);

app.listen(PORT, () => {
  console.log(
    `Server is running.. on ${chalk.blue(`http://localhost:${PORT}`)}`
  );
});
