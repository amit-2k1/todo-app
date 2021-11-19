const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  input.classList.remove('success');
  input.classList.add('error');

  // show the error message
  const error = formField.querySelector('small');
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  input.classList.remove('error');
  input.classList.add('success');

  // hide the error message
  const error = formField.querySelector('small');
  error.textContent = '';
};

const isNameValid = (name) => {
  const re = new RegExp('^([a-zA-Z ]+)$');

  return re.test(name);
};

const isEmailValid = (email) => {
  const re = new RegExp('^([a-zA-Z0-9]+)@([a-zA-Z]+).([a-zA-Z]+)$');
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp('^([a-zA-Z0-9@.-]){8,}');
  return re.test(password);
};

const isRequired = (value) => (value === '' ? false : true);

const checkName = (nameEl) => {
  let valid = false;

  const name = nameEl.value.trim();

  if (!isRequired(name)) {
    showError(nameEl, 'Name field cannot be empty.');
  } else if (!isNameValid(name)) {
    showError(nameEl, 'Name contains only alphabet.');
  } else {
    showSuccess(nameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = (emailEl) => {
  let valid = false;

  const email = emailEl.value.trim();

  if (!isRequired(email)) {
    showError(emailEl, 'Email field cannot be blank.');
  } else if (!isEmailValid(email)) {
    showError(emailEl, 'Email is not valid.');
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = (passwordEl) => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, 'Password cannot be empty.');
  } else if (!isPasswordSecure(password)) {
    showError(passwordEl, 'Password must has at least 8 characters.');
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

export { checkName, checkEmail, checkPassword, debounce };
