const calmSoundTypes = ['rain', 'thunder', 'waves', 'bowl', 'static', 'wind'];

function getCurrentUser() {
  return localStorage.getItem('activeUser') || null;
}

async function register(username, password) {
  let result = { success: false, message: 'Invalid username' };
  if (username && password) {
    try {
      const body = { name: username, password };
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem('activeUser', username);
        result = { success: true };
      }
    } catch (error) {
      result.message = error.message;
    }
  }
  return result;
}

function login(username, password) {
  // mocked to use local storage until we get a service
  let result = { success: false, message: 'Invalid username or password' };
  if (username && password) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userInfo = users[username];
    if (userInfo?.password === password) {
      localStorage.setItem('activeUser', username);
      result = { success: true };
    }
  }

  return result;
}

function logout() {
  // This will get replaced with a call to the service.
  localStorage.removeItem('activeUser');
}

function loadWeather() {
  // This will get replaced with a call to the service.
  const weatherTypes = ['sunny', 'rain', 'snow', 'cloudy', 'windy', 'stormy'];
  return weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
}

function saveSounds(sounds, username) {
  // This will get replaced with a call to the service.
  if (sounds) {
    username = username || getCurrentUser();
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userInfo = users[username];
    if (userInfo) {
      userInfo.sounds = sounds;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}

function loadSounds(username) {
  // This will get replaced with a call to the service.
  let sounds = [];
  username = username || getCurrentUser();
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const userInfo = users[username];
  return userInfo?.sounds || [];
}

function getCalmMessages() {
  // This will get replaced with a call to the service.
  return ['Bud calmed by static', 'John calmed by rain', '민수 calmed by waves', 'Sai calmed by thunder'];
}

function addMessageReceiver(messageReceiver) {
  // This will get replaced with a call to the service.
  const names = ['Bud', 'Tal', 'Jordan', 'John', '민수', 'Sai'];
  setInterval(() => {
    const name = names[Math.floor(Math.random() * names.length)];
    messageReceiver({ name, sound: calmSoundTypes[Math.floor(Math.random() * calmSoundTypes.length)] });
  }, 5000);
}

export default { getCurrentUser, register, login, logout, loadWeather, saveSounds, loadSounds, getCalmMessages, addMessageReceiver, calmSoundTypes };
