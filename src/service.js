import ChatClient from '../chatClient';

class Service {
  messageReceivers = [];
  constructor() {
    this.chatClient = new ChatClient();
    this.chatClient.addObserver((chat) => {
      this.messageReceivers.forEach((messageReceiver) => {
        const names = ['Bud', 'Tal', 'Jordan', 'John', '민수', 'Sai'];
        const name = names[Math.floor(Math.random() * names.length)];
        messageReceiver({ name, sound: this.calmSoundTypes[Math.floor(Math.random() * this.calmSoundTypes.length)] });
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

  async loadWeather() {
    // try {
    //   const response = await fetch('https://goweather.herokuapp.com/weather/provo');
    //   const weather = await response.json();
    //   const temp = ((parseFloat(weather.temperature) * 9) / 5 + 32).toFixed(2);
    //   return `${temp} °F, ${weather.wind} wind, and ${weather.description}`;
    // } catch (e) {
    //   return '...loading';
    // }
    const response = await fetch('https://quote.cs260.click');
    const quote = await response.json();
    return quote.quote;
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

  getCalmMessages() {
    return [];
  }

  addMessageReceiver(messageReceiver) {
    this.messageReceivers.push(messageReceiver);
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
