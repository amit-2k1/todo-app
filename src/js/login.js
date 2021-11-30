require('../css/style.css');
require('../css/auth.css');

import { checkEmail, checkPassword, debounce } from './validate';

const token = JSON.parse(localStorage.getItem('token'));

if (token) window.location.href = '/'

const params = new URLSearchParams(window.location.search);
const errMsg = params.get('err');
const successMsg = params.get('success');

function showPopup(msg, type) {
  const msgClass = type === 'error' ? 'err-msg' : 'success-msg';
  if (msg) {
    setTimeout(() => {
      const ele = document.querySelector('.pop-up');
      ele.textContent = msg;
      ele.classList.add(msgClass);
      ele.classList.add('activePopup');
      setTimeout(() => {
        ele.classList.remove('activePopup');
      }, 5000);
    }, 500);
  }
}

errMsg && showPopup(errMsg, 'error'); // if error present then popup displays
successMsg && showPopup(successMsg, 'success'); // if account created then popup displays

const loginFormEl = document.querySelector('#login-form');
const emailEl = loginFormEl.querySelector('#email');
const passwordEl = loginFormEl.querySelector('#password');

loginFormEl.addEventListener('submit', async (e) => {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isEmailValid = checkEmail(emailEl),
    isPasswordValid = checkPassword(passwordEl);

  let isFormValid = isEmailValid && isPasswordValid;

  if (isFormValid) {
    const email = emailEl.value;
    const password = passwordEl.value;

    const result = await fetch('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          email,
          password
        }
      })
    });

    const { token, error } = await result.json();

    if (error) {
      showPopup(error, 'error');
      return;
    }

    localStorage.setItem('token', JSON.stringify(token));

    [emailEl.value, passwordEl.value] = ['', ''];

    // redirecting to user todo page
    window.location.href = '/'
  }
});

loginFormEl.addEventListener(
  'focusout',
  debounce(function (e) {
    switch (e.target.id) {
      case 'email':
        checkEmail(emailEl);
        break;
      case 'password':
        checkPassword(passwordEl);
        break;
    }
  })
);
