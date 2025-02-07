import ChatClient from './chatClient';

class Service {
  messageReceivers = [];
  constructor() {
    this.chatClient = new ChatClient();
    this.chatClient.addObserver((chat) => {
      this.messageReceivers.forEach((messageReceiver) => {
        messageReceiver(chat);
      });
    });
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
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  async saveSounds(sounds) {
    if (sounds) {
      let user = this.getUser();
      if (user && !areArraysEqual(user.sounds, sounds)) {
        user.sounds = sounds;
        this.storeUserLocally(user);
        await this.callEndpoint('/api/user', 'PUT', user);
      }
    }
  }

  loadSounds() {
    const user = this.getUser();
    return user?.sounds || [];
  }

  async calmSoundTypes() {
    const response = await this.callEndpoint('/api/events', 'GET');
    return response.sounds;
  }

  addMessageReceiver(messageReceiver) {
    this.messageReceivers.push(messageReceiver);
  }

  sendMessage(name, msg) {
    this.chatClient.sendMessage(name, msg);
  }

  async callEndpoint(path, method = 'GET', body = null) {
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
        reject({ code: 500, message: e.message });
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
