/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./src/js/init.js":
/*!************************!*\
  !*** ./src/js/init.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderUsername": () => (/* binding */ renderUsername),
/* harmony export */   "createTodoLists": () => (/* binding */ createTodoLists),
/* harmony export */   "createTodos": () => (/* binding */ createTodos)
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./src/js/store.js");
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./update */ "./src/js/update.js");
/* harmony import */ var uniqid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uniqid */ "./node_modules/uniqid/index.js");
/* harmony import */ var uniqid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uniqid__WEBPACK_IMPORTED_MODULE_2__);



function renderUsername(name) {
  var nameEl = document.querySelector('#profile-name');
  nameEl.textContent = _store__WEBPACK_IMPORTED_MODULE_0__["default"].user.name;
}
function createTodoLists(todoStore) {
  var todoListContainer = document.querySelector('ul#todo-list');
  var todoListTemplate = document.querySelector('template#todo-list-template');
  var liTemplate = todoListTemplate.content.querySelector('.item');
  todoStore.forEach(function (_ref) {
    var id = _ref.id,
        listName = _ref.listName;
    var li = document.importNode(liTemplate, true);
    var a = li.querySelector('a');
    var p = a.querySelector('a p');
    var deleteListBtn = li.querySelector('.del-list-btn');
    li.setAttribute('id', id);
    a.setAttribute('id', id); // trigger event when todo list clicked

    a.addEventListener('click', function (event) {
      (0,_update__WEBPACK_IMPORTED_MODULE_1__.update)(event, 'linkClicked', _store__WEBPACK_IMPORTED_MODULE_0__["default"]);
    }); // trigger event when delete btn clicked

    deleteListBtn.addEventListener('click', function (event) {
      (0,_update__WEBPACK_IMPORTED_MODULE_1__.update)(event, 'deleteListBtnClicked', _store__WEBPACK_IMPORTED_MODULE_0__["default"]);
    });
    p.textContent = listName;
    todoListContainer.appendChild(li);
  });
}
function createTodos(_ref2) {
  var todos = _ref2.todos,
      id = _ref2.id;
  var todosTemplate = document.querySelector('template#todos-template');
  var todosContainer = document.querySelector('div.todos');
  var ul = document.createElement('ul');
  var oldUl = todosContainer.querySelector("#".concat(id));

  if (oldUl) {
    var lis = oldUl.querySelectorAll('.todo');
    lis.forEach(function (li) {
      return oldUl.removeChild(li);
    });
    ul = oldUl;
  } else {
    ul.setAttribute('id', id);
    todosContainer.appendChild(ul);
  }

  var liTemplate = todosTemplate.content.querySelector('li');
  todos.forEach(function (_ref3) {
    var id = _ref3.id,
        content = _ref3.content,
        completed = _ref3.completed;
    var li = document.importNode(liTemplate, true);
    var p = li.querySelector('p');
    var deleteTodoBtn = li.querySelector('.todo-btns .delete-btn');
    var tickTodoBtn = li.querySelector('.todo-btns .tick-btn'); // trigger event when delete btn clicked

    deleteTodoBtn.addEventListener('click', function (event) {
      (0,_update__WEBPACK_IMPORTED_MODULE_1__.update)(event, 'deleteTodoBtnClicked', _store__WEBPACK_IMPORTED_MODULE_0__["default"]);
    }); // triggeer event when tick btn clicked

    tickTodoBtn.addEventListener('click', function (event) {
      (0,_update__WEBPACK_IMPORTED_MODULE_1__.update)(event, 'tickTodoBtnClicked', _store__WEBPACK_IMPORTED_MODULE_0__["default"]);
    });
    var todoId;
    if (!id) todoId = uniqid__WEBPACK_IMPORTED_MODULE_2___default()();else todoId = id;
    li.setAttribute('id', todoId);
    p.setAttribute('class', completed ? 'completed' : '');
    p.textContent = content;
    ul.appendChild(li);
  });

  if (oldUl) {
    ul.setAttribute('class', 'activeTodos');
  } else {
    todosContainer.appendChild(ul);
  }
}

/***/ }),

/***/ "./src/js/store.js":
/*!*************************!*\
  !*** ./src/js/store.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./init */ "./src/js/init.js");



var store = {
  state: 'showingTodoLists',
  activeTodos: null,
  user: {},
  todosLists: [],
  createStore: function () {
    var _createStore = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
      var token, res, _yield$res$json, name, todosLists;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = JSON.parse(localStorage.getItem('token'));
              if (!token) window.location.href = '/signin';
              _context.next = 4;
              return fetch('/data', {
                headers: {
                  Authorization: 'Bearer ' + token
                }
              });

            case 4:
              res = _context.sent;
              _context.next = 7;
              return res.json();

            case 7:
              _yield$res$json = _context.sent;
              name = _yield$res$json.name;
              todosLists = _yield$res$json.todosLists;
              this.setUser(name);
              this.setTodosLists(todosLists); // Loading all todo lists

              (0,_init__WEBPACK_IMPORTED_MODULE_2__.createTodoLists)(store.todosLists); // Loading all todos in DOM

              store.todosLists.forEach(function (todos) {
                (0,_init__WEBPACK_IMPORTED_MODULE_2__.createTodos)(todos); //display username

                (0,_init__WEBPACK_IMPORTED_MODULE_2__.renderUsername)(name);
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createStore() {
      return _createStore.apply(this, arguments);
    }

    return createStore;
  }(),
  setTodosLists: function setTodosLists(todosLists) {
    if (!todosLists) return;
    this.todosLists = todosLists;
  },
  setUser: function setUser(newName) {
    if (!newName) return null;
    this.user.name = newName;
  },
  setStore: function setStore(_ref) {
    var state = _ref.state,
        activeTodos = _ref.activeTodos,
        todosLists = _ref.todosLists;
    this.state = state;
    this.activeTodos = activeTodos;
    this.todosLists = todosLists;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);

/***/ }),

/***/ "./src/js/update.js":
/*!**************************!*\
  !*** ./src/js/update.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "update": () => (/* binding */ update),
/* harmony export */   "signout": () => (/* binding */ signout)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./init */ "./src/js/init.js");
/* harmony import */ var uniqid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uniqid */ "./node_modules/uniqid/index.js");
/* harmony import */ var uniqid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uniqid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ "./src/js/store.js");






var performFetch = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(method, requestType, store, tokenRequired) {
    var loaderContainer, loader, popupEl, token, response, _yield$response$json, message;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            loaderContainer = document.querySelector('#loader-container');
            loader = loaderContainer.querySelector('#loader');
            popupEl = document.querySelector('p.pop-up');
            token = '';

            if (tokenRequired) {
              token = JSON.parse(localStorage.getItem('token'));
            } // display loader


            loader.classList.add('activeLoader'); // display loader container

            loaderContainer.classList.add('activeContainer');
            _context.next = 9;
            return fetch(requestType, {
              method: method,
              headers: {
                Authorization: token,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                store: store
              })
            });

          case 9:
            response = _context.sent;
            _context.next = 12;
            return response.json();

          case 12:
            _yield$response$json = _context.sent;
            message = _yield$response$json.message;
            // remove loader
            loader.classList.remove('activeLoader'); // remove loader container

            loaderContainer.classList.remove('activeContainer'); // display popup

            if (message) {
              setTimeout(function () {
                popupEl.textContent = message;
                popupEl.classList.add('activePopup');
                setTimeout(function () {
                  popupEl.classList.remove('activePopup');
                }, 5000);
              }, 500);
            }

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function performFetch(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

function update(_x5, _x6, _x7) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2(event, eventType, _ref2) {
    var state, activeTodos, todosLists, todoListsContainer, todosContainer, addTodoListForm, addTodoForm, newState, newActiveTodos, newTodosLists, id, todosListEle, todosEle, path, liIndex, li, ul, listId, curActiveContainer, _path, _liIndex, _li, _ul, todoId, listIndex, _path2, _liIndex2, _li2, p, _todoId, _listIndex, todoIndex, completed, listNameField, listName, newTodosList, todoField, todo, newTodo, _id;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            state = _ref2.state, activeTodos = _ref2.activeTodos, todosLists = _ref2.todosLists;
            todoListsContainer = document.querySelector('#todo-lists-container');
            todosContainer = document.querySelector('#todos-container');
            addTodoListForm = todoListsContainer.querySelector('#add-todo-list-form');
            addTodoForm = todosContainer.querySelector('#add-todo-form');
            newState = state;
            newActiveTodos = activeTodos;
            newTodosLists = todosLists;
            _context2.t0 = newState;
            _context2.next = _context2.t0 === 'showingTodoLists' ? 11 : _context2.t0 === 'showingTodos' ? 39 : _context2.t0 === 'showingAddListForm' ? 82 : _context2.t0 === 'showingAddTodoForm' ? 104 : 126;
            break;

          case 11:
            _context2.t1 = eventType;
            _context2.next = _context2.t1 === 'linkClicked' ? 14 : _context2.t1 === 'addListBtnClicked' ? 24 : _context2.t1 === 'deleteListBtnClicked' ? 27 : 38;
            break;

          case 14:
            id = event.currentTarget.id;
            todosListEle = todoListsContainer.querySelector("#".concat(id));
            todosEle = todosContainer.querySelector("#".concat(id));

            if (todosListEle) {
              _context2.next = 20;
              break;
            }

            _store__WEBPACK_IMPORTED_MODULE_4__["default"].setStore({
              state: 'showingTodoLists',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            });
            return _context2.abrupt("return");

          case 20:
            if (todoListsContainer.classList.contains('activeContainer')) {
              todoListsContainer.classList.remove('activeContainer');
            }

            if (!todosContainer.classList.contains('activeContainer')) {
              todosContainer.classList.add('activeContainer');
              todosEle.classList.add('activeTodos');
              newActiveTodos = id;
            }

            newState = 'showingTodos';
            return _context2.abrupt("break", 38);

          case 24:
            if (!addTodoListForm.classList.contains('activeForm')) {
              addTodoListForm.classList.add('activeForm');
            }

            newState = 'showingAddListForm';
            return _context2.abrupt("break", 38);

          case 27:
            path = event.path || event.composedPath();
            liIndex = path.findIndex(function (_ref3) {
              var tagName = _ref3.tagName;
              return tagName === 'LI';
            }); // get the li element Index

            li = path[liIndex];
            ul = li.parentElement;
            listId = li.id;
            newTodosLists = newTodosLists.filter(function (_ref4) {
              var id = _ref4.id;
              return id !== listId;
            });
            _context2.next = 35;
            return performFetch('PUT', '/deletetodolist', {
              listId: listId
            });

          case 35:
            ul.removeChild(li);
            newState = 'showingTodoLists';
            return _context2.abrupt("break", 38);

          case 38:
            return _context2.abrupt("break", 126);

          case 39:
            _context2.t2 = eventType;
            _context2.next = _context2.t2 === 'backBtnClicked' ? 42 : _context2.t2 === 'addTodoBtnClicked' ? 52 : _context2.t2 === 'deleteTodoBtnClicked' ? 55 : _context2.t2 === 'tickTodoBtnClicked' ? 67 : 81;
            break;

          case 42:
            if (!(!todosContainer.classList.contains('activeContainer') && !newActiveTodos)) {
              _context2.next = 45;
              break;
            }

            _store__WEBPACK_IMPORTED_MODULE_4__["default"].setStore({
              state: 'showingTodos',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            });
            return _context2.abrupt("return");

          case 45:
            curActiveContainer = todosContainer.querySelector("#".concat(newActiveTodos));
            todosContainer.classList.remove('activeContainer');
            curActiveContainer.classList.remove('activeTodos');
            newActiveTodos = null;

            if (!todoListsContainer.classList.contains('activeContainer')) {
              todoListsContainer.classList.add('activeContainer');
            }

            newState = 'showingTodoLists';
            return _context2.abrupt("break", 81);

          case 52:
            if (!addTodoForm.classList.contains('activeForm')) {
              addTodoForm.classList.add('activeForm');
            }

            newState = 'showingAddTodoForm';
            return _context2.abrupt("break", 81);

          case 55:
            _path = event.path || event.composedPath();
            _liIndex = _path.findIndex(function (_ref5) {
              var tagName = _ref5.tagName;
              return tagName === 'LI';
            }); // get the li element Index

            _li = _path[_liIndex];
            _ul = _li.parentElement;
            todoId = _li.id;
            listIndex = newTodosLists.findIndex(function (_ref6) {
              var id = _ref6.id;
              return id === newActiveTodos;
            });
            newTodosLists[listIndex].todos = newTodosLists[listIndex].todos.filter(function (_ref7) {
              var id = _ref7.id;
              return id != todoId;
            });
            _context2.next = 64;
            return performFetch('PUT', '/deletetodo', {
              todoId: todoId
            });

          case 64:
            _ul.removeChild(_li);

            newState = 'showingTodos';
            return _context2.abrupt("break", 81);

          case 67:
            _path2 = event.path || event.composedPath();
            _liIndex2 = _path2.findIndex(function (_ref8) {
              var tagName = _ref8.tagName;
              return tagName === 'LI';
            }); // get the li element Index

            _li2 = _path2[_liIndex2];
            p = _li2.querySelector('p');
            _todoId = _li2.id;
            _listIndex = newTodosLists.findIndex(function (_ref9) {
              var id = _ref9.id;
              return id === newActiveTodos;
            });
            todoIndex = newTodosLists[_listIndex].todos.findIndex(function (_ref10) {
              var id = _ref10.id;
              return id === _todoId;
            });
            completed = !newTodosLists[_listIndex].todos[todoIndex].completed;
            _context2.next = 77;
            return performFetch('PUT', '/marktodo', {
              todoId: _todoId,
              completed: completed
            });

          case 77:
            newTodosLists[_listIndex].todos[todoIndex].completed = completed;
            p.classList.toggle('completed');
            newState = 'showingTodos';
            return _context2.abrupt("break", 81);

          case 81:
            return _context2.abrupt("break", 126);

          case 82:
            _context2.t3 = eventType;
            _context2.next = _context2.t3 === 'closeBtnClicked' ? 85 : _context2.t3 === 'submitBtnClicked' ? 88 : 103;
            break;

          case 85:
            // closing the form
            if (addTodoListForm.classList.contains('activeForm')) {
              addTodoListForm.classList.remove('activeForm');
            }

            newState = 'showingTodoLists';
            return _context2.abrupt("break", 103);

          case 88:
            listNameField = addTodoListForm.querySelector('#list-name-field');
            listName = listNameField.value;
            listNameField.value = '';

            if (listName) {
              _context2.next = 94;
              break;
            }

            _store__WEBPACK_IMPORTED_MODULE_4__["default"].setStore({
              state: 'showingAddListForm',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            });
            return _context2.abrupt("return");

          case 94:
            newTodosList = {
              id: uniqid__WEBPACK_IMPORTED_MODULE_3___default()(),
              listName: listName,
              todos: []
            };
            _context2.next = 97;
            return performFetch('PUT', '/addtodolist', {
              listId: newTodosList.id,
              listName: newTodosList.listName
            }, true);

          case 97:
            (0,_init__WEBPACK_IMPORTED_MODULE_2__.createTodoLists)([newTodosList]);
            (0,_init__WEBPACK_IMPORTED_MODULE_2__.createTodos)(newTodosList);
            newTodosLists.push(newTodosList); // closing the form after the new todo list added

            addTodoListForm.classList.remove('activeForm');
            newState = 'showingTodoLists';
            return _context2.abrupt("break", 103);

          case 103:
            return _context2.abrupt("break", 126);

          case 104:
            _context2.t4 = eventType;
            _context2.next = _context2.t4 === 'closeBtnClicked' ? 107 : _context2.t4 === 'submitBtnClicked' ? 110 : 125;
            break;

          case 107:
            // closing the form
            if (addTodoForm.classList.contains('activeForm')) {
              addTodoForm.classList.remove('activeForm');
            }

            newState = 'showingTodos';
            return _context2.abrupt("break", 125);

          case 110:
            todoField = addTodoForm.querySelector('#todo-field');
            todo = todoField.value;
            todoField.value = '';

            if (todo) {
              _context2.next = 116;
              break;
            }

            _store__WEBPACK_IMPORTED_MODULE_4__["default"].setStore({
              state: 'showingAddTodoForm',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            });
            return _context2.abrupt("return");

          case 116:
            newTodo = {
              id: uniqid__WEBPACK_IMPORTED_MODULE_3___default()(),
              content: todo,
              completed: false
            };
            _id = newTodosLists.findIndex(function (_ref11) {
              var id = _ref11.id;
              return id === newActiveTodos;
            });
            _context2.next = 120;
            return performFetch('PUT', '/addtodo', {
              todoId: newTodo.id,
              content: newTodo.content,
              completed: newTodo.completed,
              listId: newTodosLists[_id].id
            });

          case 120:
            newTodosLists[_id].todos.push(newTodo);

            (0,_init__WEBPACK_IMPORTED_MODULE_2__.createTodos)(newTodosLists[_id]); // closing the form after the new todo added

            addTodoForm.classList.remove('activeForm');
            newState = 'showingTodos';
            return _context2.abrupt("break", 125);

          case 125:
            return _context2.abrupt("break", 126);

          case 126:
            _store__WEBPACK_IMPORTED_MODULE_4__["default"].setStore({
              state: newState,
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            });

          case 127:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _update.apply(this, arguments);
}

function signout() {
  return _signout.apply(this, arguments);
}

function _signout() {
  _signout = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee3() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            localStorage.removeItem('token');
            window.location.href = '/signin';

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _signout.apply(this, arguments);
}

/***/ }),

/***/ "./src/css/form.css":
/*!**************************!*\
  !*** ./src/css/form.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/uniqid/index.js":
/*!**************************************!*\
  !*** ./node_modules/uniqid/index.js ***!
  \**************************************/
/***/ ((module) => {

/* 
(The MIT License)
Copyright (c) 2014-2021 Halász Ádám <adam@aimform.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
var pid = typeof process !== 'undefined' && process.pid ? process.pid.toString(36) : '' ;
var address = '';
if(false){ var i, networkInterfaces, mac, os; } 

//  Exports
// ================================================
module.exports = module.exports["default"] = function(prefix, suffix){ return (prefix ? prefix : '') + address + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.process = function(prefix, suffix){ return (prefix ? prefix : '') + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.time    = function(prefix, suffix){ return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : ''); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./src/js/store.js");
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./update */ "./src/js/update.js");
__webpack_require__(/*! ../css/style.css */ "./src/css/style.css");

__webpack_require__(/*! ../css/index.css */ "./src/css/index.css");

__webpack_require__(/*! ../css/form.css */ "./src/css/form.css");



_store__WEBPACK_IMPORTED_MODULE_0__["default"].createStore();
var todoListsContainer = document.querySelector('#todo-lists-container');
var todosContainer = document.querySelector('#todos-container');
var backBtn = todosContainer.querySelector('button.back-btn');
var addTodoListBtn = todoListsContainer.querySelector('.add-todo-list-btn');
var addTodoListForm = todoListsContainer.querySelector('#add-todo-list-form');
var closeTodoListFormBtn = addTodoListForm.querySelector('.close-btn');
var openAddTodoFormBtn = todosContainer.querySelector('.add-todo-btn');
var addTodoForm = todosContainer.querySelector('#add-todo-form');
var closeTodoFormBtn = addTodoForm.querySelector('.close-btn');
var addTodoListSubmitBtn = addTodoListForm.querySelector('.add-list-submit-btn');
var addTodoSubmitBtn = addTodoForm.querySelector('.add-todo-submit-btn');
var singoutBtn = document.querySelector('.sign-out-btn');
backBtn.addEventListener('click', function (event) {
  (0,_update__WEBPACK_IMPORTED_MODULE_1__.update)(event, 'backBtnClicked', _store__WEBPACK_IMPORTED_MODULE_0__["default"]);
});
addTodoListBtn.addEventListener('click', function (event) {
  (0,_update__WEBPACK_IMPORTED_MODULE_1__.update)(event, 'addListBtnClicked', _store__WEBPACK_IMPORTED_MODULE_0__["default"]);
});
closeTodoListFormBtn.addEventListener('click', function (event) {
  (0,_update__WEBPACK_IMPORTED_MODULE_1__.update)(event, 'closeBtnClicked', _store__WEBPACK_IMPORTED_MODULE_0__["default"]);
});
openAddTodoFormBtn.addEventListener('click', function (event) {
  (0,_update__WEBPACK_IMPORTED_MODULE_1__.update)(event, 'addTodoBtnClicked', _store__WEBPACK_IMPORTED_MODULE_0__["default"]);
});
closeTodoFormBtn.addEventListener('click', function (event) {
  (0,_update__WEBPACK_IMPORTED_MODULE_1__.update)(event, 'closeBtnClicked', _store__WEBPACK_IMPORTED_MODULE_0__["default"]);
});
addTodoListSubmitBtn.addEventListener('click', function (event) {
  (0,_update__WEBPACK_IMPORTED_MODULE_1__.update)(event, 'submitBtnClicked', _store__WEBPACK_IMPORTED_MODULE_0__["default"]);
});
addTodoSubmitBtn.addEventListener('click', function (event) {
  (0,_update__WEBPACK_IMPORTED_MODULE_1__.update)(event, 'submitBtnClicked', _store__WEBPACK_IMPORTED_MODULE_0__["default"]);
});
singoutBtn.addEventListener('click', _update__WEBPACK_IMPORTED_MODULE_1__.signout);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map