import WebSocketClient from './webSocketClient';

const defaultSounds = {
  sounds: ['rain', 'thunder', 'birds', 'clock', 'waves', 'bowl', 'static', 'wind', 'police', 'base', 'ufo', 'emotion', 'bell', 'heart', 'chimes', 'cheering', 'clicking', 'raid', 'goat', 'space', 'baby', 'cs260'],
};

class Service {
  constructor() {
    this.wsClient = new WebSocketClient();
  }

  async login(email, password) {
    const user = await this.callEndpoint('/api/auth', 'PUT', { email, password });
    this.storeUserLocally(user);
    return user;
  }

  async register(email, password) {
    const user = await this.callEndpoint('/api/auth', 'POST', { email, password });
    this.storeUserLocally(user);
    return user;
  }

  async logout() {
    return new Promise(async (resolve) => {
      await this.callEndpoint('/api/auth', 'DELETE');

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      resolve();
    });
  }

  storeUserLocally(user) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
    }
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  async saveSounds(sounds, volume = 50) {
    if (sounds) {
      let user = this.getUser();
      if (user && (!areArraysEqual(user.sounds, sounds) || user.volume !== volume)) {
        user.sounds = sounds;
        user.volume = volume;
        this.storeUserLocally(user);
        await this.callEndpoint('/api/user', 'PUT', user);
      }
    }
  }

  loadSounds() {
    const user = this.getUser();
    return user?.sounds || [];
  }

  loadVolume() {
    const user = this.getUser();
    return user?.volume || 100;
  }

  async calmSoundTypes() {
    const response = await this.callEndpoint('/api/events', 'GET', null, defaultSounds);
    return response.sounds;
  }

  addMessageReceiver(messageReceiver) {
    this.wsClient.addObserver((msg) => {
      messageReceiver(msg);
    });
  }

  sendMessage(msg) {
    this.wsClient.sendMessage(msg);
  }

  async callEndpoint(path, method = 'GET', body = null, defaultResponse = null) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        };

        const authToken = localStorage.getItem('token');
        if (authToken) {
          options.headers['Authorization'] = `Bearer ${authToken}`;
        }

        if (body) {
          options.body = JSON.stringify(body);
        }

        const r = await fetch(path, options);
        const j = await r.json();
        if (r.ok) {
          resolve(j);
        } else {
          reject({ code: r.status, message: j.msg || 'unexpected error' });
        }
      } catch (e) {
        resolve(defaultResponse);
      }
    });
  }
}

function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
}

const service = new Service();
export default service;
