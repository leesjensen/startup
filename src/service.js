const calmSoundTypes = ['rain', 'thunder', 'waves', 'bowl', 'static', 'wind'];

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

      return login(username, password);
    }
  }
  return result;
}

function login(username, password) {
  // mocked to use local storage until we get a service
  const result = { success: false, message: 'Invalid username or password' };
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

function loadWeather() {
  // This will get replaced with a call to the service.
  const weatherTypes = ['sunny', 'rain', 'snow', 'cloudy', 'windy', 'stormy'];
  return weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
}

function saveSounds(username, sounds) {
  // This will get replaced with a call to the service.
  if (sounds) {
    localStorage.setItem('sounds', JSON.stringify(sounds));
  }
}

function loadSounds() {
  // This will get replaced with a call to the service.
  return JSON.parse(localStorage.getItem('sounds') || '[]');
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

export default { getCurrentUser, register, login, loadWeather, saveSounds, loadSounds, getCalmMessages, addMessageReceiver, calmSoundTypes };
