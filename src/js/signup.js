require('../css/style.css');
require('../css/auth.css');

import { checkName, checkEmail, checkPassword, debounce } from './validate';

const signupFormEl = document.querySelector('#signup-form');
const nameEl = signupFormEl.querySelector('#name');
const emailEl = signupFormEl.querySelector('#email');
const passwordEl = signupFormEl.querySelector('#password');

signupFormEl.addEventListener('submit', function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isNameValid = checkName(nameEl),
    isEmailValid = checkEmail(emailEl),
    isPasswordValid = checkPassword(passwordEl);

  let isFormValid = isNameValid && isEmailValid && isPasswordValid;

  if (isFormValid) {
    [nameEl.value, emailEl.value, passwordEl.value] = ['', '', ''];
    console.log('Signup Form Submitted.');
  }
});

signupFormEl.addEventListener(
  'focusout',
  debounce(function (e) {
    switch (e.target.id) {
      case 'name':
        checkName(nameEl);
        break;
      case 'email':
        checkEmail(emailEl);
        break;
      case 'password':
        checkPassword(passwordEl);
        break;
    }
  })
);
