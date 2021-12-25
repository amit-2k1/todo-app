import store from './store';

export function displayUsername(name) {
  const nameEl = document.querySelector('#profile-name');
  nameEl.textContent = store.user.name;
}

export async function signout() {
  localStorage.removeItem('token');

  window.location.href = '/signin';
}
