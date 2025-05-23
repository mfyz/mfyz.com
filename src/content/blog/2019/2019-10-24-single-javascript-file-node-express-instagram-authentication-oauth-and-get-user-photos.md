---
title: "Single JavaScript file node/express/Instagram authentication (OAuth) and get user photos"
slug: single-javascript-file-node-express-instagram-authentication-oauth-and-get-user-photos
date: 2019-10-24
url: https://mfyz.com/?p=371
tags: ["Other"]
category: Other
migration: {"wpId":371,"wpPostDate":"2019-10-24T20:31:21.000Z"}
---

![](/images/archive/en/2019/10/jakob-owens-R-8Kkjaztn0-unsplash.jpg)

### Get Ready

Register your Instagram app in their developer portal and obtain **client id** and **client secret** keys. To do that, follow the steps below:

*   Go to IG Developer page: [https://www.instagram.com/developer/](https://www.instagram.com/developer/)
*   Click “Register your application” button (if you are not logged in, you will be asked to log in on this step)
*   Fill all fields. The only field you need to pay attention to is the “valid redirect URLs”. This is where your app is publicly hosted. Below, we will create a URL on the application to capture Instagram authentication after the user goes to the Instagram page for permission dialog, then comes back to this URL. It’ll be something like [https://yoursite.com/instagram/callback](https://yoursite.com/instagram/callback)
*   Once you register the app, the page will display client id and secret. Keep this ready on the next steps.

### Code it up

Let’s set up the plain node.js and express the application.  
  
First, install the required packages:

```sh
npm install --save express path instagram-node cookie-parser
```

**index.js (or server.js)**

```js
const express = require('express')
const path = require('path')
const ig = require('instagram-node').instagram()
const cookieParser = require('cookie-parser')

// Set the config values below inline or from environment variables
const PORT = process.env.PORT || 8110
const IG_CLIENT_ID = process.env.IG_CLIENT_ID
const IG_CLIENT_SECRET = process.env.IG_CLIENT_SECRET

ig.use({
  client_id: IG_CLIENT_ID,
  client_secret: IG_CLIENT_SECRET
})

const igRedirecrUri = process.env.IG_REDIRECT_URI

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('<a href="/instagram/authorize">Login with Instagram</a>');
})

app.get('/instagram/authorize', (req, res) => {
  res.redirect(ig.get_authorization_url(igRedirecrUri, {
    scope: ['public_content', 'likes']
  }))
})

app.get('/instagram/callback', (req, res) => {
  ig.authorize_user(req.query.code, igRedirecrUri, (err, result) => {
  if(err) return res.send(err)
    // ideally, store token in db and create a
    // browser session id to use the token from db
    // but for quick demo, we'll use cookie store
    // method below is not secure at all
    res.cookie('igAccessToken', result.access_token)
    res.redirect('/instagram/photos')
  })
})

app.get('/instagram/photos', (req, res) => {
  try {
    // use ig token from db (that is linked to the browser session id)
    // or for our demo version, get it from cookies
    const accessToken = req.cookies.igAccessToken

    ig.use({ access_token: accessToken })

    const userId = accessToken.split('.')[0] // ig user id, like: 1633560409
    ig.user_media_recent(userId, (err, result, pagination, remaining, limit) => {
      if(err) return res.render('error')
      // send photo array to a view or for our demo build html
      // (list of ig photos) and return to the browser
      let html = '';
      result.map((photo) => {
        html += '<a href="' + photo.link + '">' +
          '<img src="' + photo.images.low_resolution.url + '"/></a><br/>'
      })
      res.send(html);
    })
  }
  catch (e) {
    res.render('error')
  }
})

app.listen(PORT, () => console.log(\`App listening on port ${PORT}!\`))
```

### Deploy and run

Either locally or after you place it on your server, run:

```sh
node index.js
```

Tip 1: use “forever” on your server to run this application permanently.  

Tip 2: For experimental purposes, you can run this app on your local and have a tunneling tool like “ngrok" to open your local port to the public with a quick domain assignment. Ngrok will provide a URL (random subdomain on their domain), you have to update the IG developer app’s settings to add this domain as a valid redirect URL, otherwise, after this app redirects user for authentication to Instagram, it will give an error.

### Get the real thing

The code above in this article was a quick and dirty version. I put the little bit more proper express application version on Github. It uses pug for its views and has proper layout/content block separation as well.  

[https://github.com/mfyz/express-passport-instagram-example](https://github.com/mfyz/express-passport-instagram-example)