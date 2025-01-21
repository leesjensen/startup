# CS 260 Notes

- [My domain](https://byucsstudent.click)
- [My simon](https://simon.byucsstudent.click)
- [My startup](https://startup.byucsstudent.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [HTML Input](https://codepen.io/leesjensen/pen/dyVdNej)
## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className='input-group sound-button-container'>
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className='form-check form-switch'>
      <input className='form-check-input' type='checkbox' value={sound} id={sound} onChange={() => togglePlay(sound)} checked={selectedSounds.includes(sound)}></input>
      <label className='form-check-label' htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```

## Service

This was no problem once I got Express going and defined all my endpoints correctly. Since I had mocked out everything in the client, it was easy to change the frontend code to just start calling the service. I created a utility function in `src/service.js` that made it so I only call fetch from a single location.

```js
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
```

I did twiddle around a bit with the backend getting it so that it would handle certain error cases. I also spend a bit of time thinking about how I would replace the in memory representation of `users` when I do the next deliverable.

I also had trouble with the weather endpoint that I was going to use. It is really flaky. So I just used `quote.cs260.click` instead.

## DB

Easiest deliverable so far. I just pulled in some sample code from the instruction to write to the database and put it all in a file named `database.js`. Then I just changed about five lines of code to actually call the database and got rid of the in memory representation.

Creating an account was simple. I did remember to allow access from any IP so that I don't get bit by trying to access it from where I am using my dev environment at any given moment.
