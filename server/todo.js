import pool from './dbConfig';
import jwt from 'jsonwebtoken';

const getUserId = async (token) => {
  let id;

  jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      throw err;
    } else {
      id = authData.id;
    }
  });

  return id;
};

export const addTodoList = async (req, res) => {
  const { listId, listName } = req.body.store;
  const userId = await getUserId(req.headers.authorization);

  pool.query(
    'INSERT INTO todo_list(todo_list_id, name, user_id) VALUES ($1, $2, $3);',
    [listId, listName, userId],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.json({
          id: listId,
          message: 'New todo list added!'
        });
      }
    }
  );
};

export const deleteTodoList = async (req, res) => {
  const { listId } = req.body.store;

  pool.query(
    'DELETE FROM todo_list WHERE todo_list_id=$1;',
    [listId],
    (err, result) => {
      if (err) {
        throw err;
      }

      pool.query('DELETE FROM todo WHERE todo_list_id=$1;', [listId]);

      res.json({
        message: 'Todo List Deleted!'
      });
    }
  );
};

export const addTodo = async (req, res) => {
  const { todoId, content, completed, listId } = req.body.store;

  pool.query(
    'INSERT INTO todo(todo_id, content, is_completed, todo_list_id) VALUES ($1, $2, $3, $4);',
    [todoId, content, completed, listId],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.json({
          id: todoId,
          message: 'New todo Added!'
        });
      }
    }
  );
};

export const markTodo = async (req, res) => {
  const { todoId, completed } = req.body.store;

  pool.query(
    'UPDATE todo SET is_completed=$1 WHERE todo_id=$2;',
    [completed, todoId],
    (err, result) => {
      if (err) {
        throw err;
      }

      res.json({
        message: 'Todo updated!'
      });
    }
  );
};

export const deleteTodo = async (req, res) => {
  const { todoId } = req.body.store;

  pool.query('DELETE FROM todo WHERE todo_id=$1;', [todoId], (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      message: 'Todo Deleted!'
    });
  });
};
