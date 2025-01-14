function getCurrentUser() {
  return JSON.parse(localStorage.getItem('activeUser'));
}

function register(username, password) {
  // mocked to use local storage until we get a service
  const result = { success: false, message: 'Invalid username' };
  if (username && password) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[username]) {
      users[username] = { username, password };
      localStorage.setItem('users', JSON.stringify(users));

      login();
      result.success = true;
    }
  }
  return result;
}

function login(username, password) {
  // mocked to use local storage until we get a service
  const result = { success: true, message: 'Invalid username or password' };
  if (username && password) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userInfo = users[username];
    if (userInfo?.password === password) {
      localStorage.setItem('activeUser', username);
      result.success = true;
    }
  }

  return result;
}
export default { getCurrentUser, register, login };
