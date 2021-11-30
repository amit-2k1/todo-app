import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import pool from './dbConfig';

const newToken = ({ id, name, email }) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET);
};


const formatTodos = (todos) => {
  const todosLists = [];

  todos.forEach(({ todo_list_id, name, content, is_completed, todo_id }) => {
    const id = todosLists.findIndex(({ id }) => id === todo_list_id);

    if (id === -1) {
      // creating new todo list
      const newList = {
        id: todo_list_id,
        listName: name,
        todos: [
          {
            id: todo_id,
            content,
            completed: is_completed
          }
        ]
      };

      // pushing it to new todosLists array
      todosLists.push(newList);
    } else {
      // pushing new todo to todosLists.todos array
      todosLists[id].todos.push({
        id: todo_id,
        content,
        completed: is_completed
      });
    }
  });

  return todosLists;
};

const getTodosLists = async (userId) => {
  let todos = [];

  try {
    todos = await pool.query(
      'SELECT * FROM todo_list NATURAL JOIN todo WHERE todo_list.user_id=$1;',
      [userId]
    );
  } catch {
    throw err;
  }

  return formatTodos(todos.rows);
};

export const getUserData = async (req, res, next) => {
  const { id } = req.user;

  const todosLists = await getTodosLists(id);

  req.todosLists = todosLists;

  next();
} 

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.redirect('/signin');
  }

  const token = bearer.split('Bearer ')[1].trim();

  try {
    // getting user data
    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      throw err;
    } else {
      req.user = authData;
    }
  });
    next();
  } catch (e) {
    return res.redirect('/signin');
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body.user;

  const hashedPassword = await hash(password, 10);

  pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email.toLowerCase()],
    (err, result) => {
      if (err) {
        throw err;
      }

      if (result.rows.length >= 1) {
        return res.json({ error: 'User already exist!' });
      } else {
        pool.query(
          `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
          [name, email.toLowerCase(), hashedPassword],
          (err, result) => {
            if (err) {
              throw err;
            }

            return res.json({
              id: result.rows[0].id,
              message: 'User Created!'
            });
          }
        );
      }
    }
  );
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body.user;

  pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email.toLowerCase()],
    async (err, result) => {
      if (err) {
        throw err;
      }

      const user = result.rows[0];

      if (!user) {
        return res.json({
          error: 'User not exist!'
        });
      } else {
        const match = await compare(password, user.password);
        if (match) {
          const token = newToken(user);
          return res.json({
            token
          });
        } else {
          return res.json({
            error: 'Wrong credentials!'
          });
        }
      }
    }
  );
};
