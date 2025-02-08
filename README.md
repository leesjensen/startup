# Calmer

[My Notes](notes.md)

![Calmer logo](public/logo.svg)

Calmer plays calming background noise that puts you into a state of blissful peace.

![Calmer app](calmerx.png)

## Installation and execution instructions

```sh
git clone https://github.com/leesjensen/startup calmer
cd calmer

# Install frontend
npm install

# Install backend
(cd service && npm install)
```

```sh
# Run frontend using Vite
npm run dev &

# Run backend using Node.js
cd service && npm run dev &
```

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

In a world filled with loud, distracting, anxiety inducing voices, what we need is something to slow us down and get our minds into a stream of focused mindfulness. Open `Calmer`, select your favorite tones, and feel the peace. You can save your preferred calming environment, and also see who is calming down.

### Design

![Calmer design](calmer-design.png)

Three different views provide login, playing, and about information. The play view allows the user to pick their calming tones, see what other users are playing, and also get the current weather forecast.

```mermaid
sequenceDiagram
    actor User
    User->>Login: Enter login information
    Login->>About: See about information
    About-->>Login: Login
    Login->>Play: After login
    Play->>Play: Listen
    Play->>Play: View weather
    Play->>Play: View others
    Play-->>Login: Logout
```

### Key features

- Login, logout, and register
- Select calming tones to play
- See what others are calming with
- See the current weather
- See a description of the app

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Three different views, login/register controls, image, calming tone selection.
- **CSS** - Complementary color scheme, responsive design, image animation.
- **React** - Single page application with routing between views, reactive user controls, and state hooks.
- **Service** - Endpoints for authentication, storing/retrieving calming preference. Third party call to get weather forecast.
- **DB/Login** - Stores authentication and calming preferences.
- **WebSocket** - Broadcast user's calming.

## Thanks

Thanks to the generous uses of [Pixabay](https://pixabay.com/) for providing the background sounds and to Dillon Jensen for providing the CS 260 theme song.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://byucsstudent.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Three different pages. One for each view.
- [x] **Proper HTML element usage** - I spent a lot of time learning about elements. I used header, footer, main, nav, img, a, fieldset, input, button, form, and many more.
- [x] **Links** - Links between views.
- [x] **Text** - About page has text.
- [x] **3rd party API placeholder** - Play page has a place to display the current weather.
- [x] **Images** - Application logo is displayed on the about page.
- [x] **Login placeholder** - Placeholder for auth on the login page.
- [x] **DB data placeholder** - Play will load and display their selected tones from the database.
- [x] **WebSocket placeholder** - The play pages has a text area that will show what other users are being calmed by.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I used a common CSS file to style these.
- [x] **Navigation elements** - Bootstrap NavBar. What a time saver.
- [x] **Responsive to window resizing** - Bootstrap and `display:flex' did most the work here.
- [x] **Application elements** - I used a lot of `display:flex` to get things to align correctly.
- [x] **Application text content** - Set all my text to Helvetica and it looks nice and clean.
- [x] **Application images** - Use an SVG that changes color on hover. I left the about image as is.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - Easy to install and use Vite.
- [x] **Components** - Easy to bring the code over from HTML and CSS, but had to rework them quite a bit.
- [x] **Router** - Easy to creating the component routing.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - All of the service mocking is abstracted to the `service.js` file.
- [x] **Hooks** - So many hooks. useState and useEffect in every component.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - This was fun and easy to set up. See `service/index.js`.
- [x] **Static middleware for frontend** - Lots of this as I implemented authentication middleware functions in `service/index.js`.
- [x] **Calls to third party endpoints** - I called the `quote.cs260.click` endpoint. I tried calling a weather API, but it was really flaky.
- [x] **Backend service endpoints** - Endpoints for authentication and storing selected sounds.
- [x] **Frontend calls service endpoints** - I created a service class to encapsulate all of the service functionality `src/service.js`
- [x] **User login, logout, and registration** - This was the hardest part since I had to deal with cookies, reading headers, creating tokens, and manipulating the storage of users in memory.
- [x] **Restricts functionality based on authentication** - You can't get or update a user unless you are authenticated.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Stores data in MongoDB** - Stores the user. See `service/database.js`.
- [x] **Stores credentials in MongoDB** - Stores the credential in the user. See `service/database.js`.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Backend listens for WebSocket connection** - Mainly used the websocket object to do everything. Very similar to the instruction.
- [x] **Frontend makes WebSocket connection** - Easy as pie. The hard part was registering observers. I probably should clean this up.
- [x] **Data sent over WebSocket connection** - Notifies when someone changes their sounds.
- [x] **WebSocket data displayed** - Box on the play page that shows the messages
- [x] **Application is fully functional** - Oh yeah!
