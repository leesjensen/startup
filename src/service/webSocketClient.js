class WebSocketClient {
  observers = [];
  connected = false;

  constructor() {
    // Adjust the webSocket protocol to what is being used for HTTP
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    // Display that we have opened the webSocket
    this.socket.onopen = (event) => {
      this.notifyObservers({ from: 'system', action: 'connected' });
      this.connected = true;
    };

    // Display messages we receive from our friends
    this.socket.onmessage = async (event) => {
      const text = await event.data.text();
      this.notifyObservers(JSON.parse(text));
    };

    // If the webSocket is closed then disable the interface
    this.socket.onclose = (event) => {
      this.notifyObservers({ from: 'system', action: 'disconnected' });
      this.connected = false;
    };
  }

  // Send a message over the webSocket
  sendMessage(msg) {
    this.socket.send(JSON.stringify(msg));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(msg) {
    this.observers.forEach((h) => h(msg));
  }
}

export default WebSocketClient;
