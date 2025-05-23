---
title: "Using Cloudinary for image cloud storage with image transformations in your NodeJS express app in Heroku"
slug: using-cloudinary-for-image-cloud-storage-with-image-transformations-in-your-nodejs-express-app-in-heroku
date: 2019-11-05
url: https://mfyz.com/?p=376
tags: ["Back-End"]
category: Back-End
migration: {"wpId":376,"wpPostDate":"2019-11-05T20:57:29.000Z"}
---

![](/images/archive/en/2019/11/guillaume-bolduc-uBe2mknURG4-unsplash.jpg)

Here we are with another article about the development aspect of photo/image management (storage, serving, retrieval). I’ve previously (right before this article) wrote about [Authenticating and Getting Instagram Photos in NodeJS/Express application](/single-javascript-file-node-express-instagram-authentication-oauth-and-get-user-photos/). This story is about manually storing, handling upload, download and serving static photo/image using a CDN service called Cloudinary.  

## Content should be separate than the application

We’re (web/back-end/front-end developers) building apps, sites in many different ways (different platforms, languages, stack). One thing very common and old school is that everything on the site is organized in the same bucket. So when we code and deploy a site, it’s HTML, CSS, back-end code, images, videos, fonts, etc... all in the same place. Now we have distributed deployment systems with having multiple instances of our application on different web servers too. Which made us do a soft transition to keep common files (that can be changed) like uploads folders in block storages like s3 or azure blob... But it still doesn’t do the full justice that both static and dynamic content of an application/website should be completely separated than the application code. This is not a new practice but it’s a practice that can be missed so easily.  
  
It’s so easy to leave an image that is used in a blog post within the codebase (which is wrong). A static content that will not be used to render your page on the back-end ideally doesn’t belong to the place where you store your application (code). Yet, it shouldn’t be served (or requested) from the same servers which are responsible (only should be responsible) for rendering and serving your pages. Tiring your web server with serving images or compiled CSS is not optimal. This will also affect your site’s performance that everything is coming from the same source. Having distributed sources will make your browser to manage parallel downloads of your site’s resources faster. No brainer!  
  
We’ll not get into the techniques of how to separate these different things in different places in this article, but we’ll talk about images specifically.  
  

## Images need a big brother

This was a novelty in the past where we wanted to have multiple sizes of an image/photo so we can economically request the right size in different pages - example: get 100px width thumbnail in the page where we show photos in a grid, show the 500px width version on the lightbox, and link out to the original photo in the “download” button. This makes total sense right? Strategizing how to have the different versions ready on your server (or CDN) is another thing. So many self-solutions you can use or code it up. But from user experience (admin/editor) standpoint, nobody wants to do this manually or even automatically but wait for the server to resize and prepare these versions when uploading a single photo to your CMS/app/back-end. To me, that is a one-way road. I only want to upload an image and only wait the time takes the file transfer from my device to the server. Done!  

## What is Cloudinary and should I use it?

Cloudinary is that big brother and storage and server together. Smart CDN for images and videos. It has a pretty decent free package that will be enough for almost all personal, experimental and small projects. If you have decent size traffic, you may think to pay or optimize your solution with Cloudinary.  

Cloudinary hosts and serves images for you. It’ll be your storage bucket that also has many out of box solutions for known CMSs like WordPress. I like the API/SDK route which they have SDKs and well-designed API for almost all platforms. We’ll play with NodeJS below.  

The magic cloudinary has that is compelling that it can do so many varieties of transformations on your images on the fly (and caches them). Basic things like color filters, crop, resize, rotate etc... But the real thing is where they have face recognization that you can create square avatars with intelligently telling cloudinary to give you the face focused position in the center on your circle avatar with transparent png background and have 2px border around circle cropped avatar. All of it happens over URL parameters. True magic. I haven’t digg the video side of this but I read bunch of smart stuff on the streaming site which is also worth considering cloudinary as one-stop-shop for visual static assets.  

## Add Cloudinary service on your heroku application

Adding a service to heroku application is very easy and mostly done in command line. In order to create a new cloduinary service as add-on to your application, in your application folder run:

```sh
heroku addons:create cloudinary:starter
```

This command will create a new cloudinary account linked to your heroku account and add cloduinary credentials to your heroku config - environment variables. You can see and copy the variables to your local .env file with

```sh
heroku config
```

## Using it on nodejs/express app

Install first:

```sh
npm install --save express body-parser path multer cloudinary
```

#### server.js

```js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 4004;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    cloudinary.v2.api.resources((error, result) => {
        let html = '<form method="post" enctype="multipart/form-data">'
          + 'File: <input type="file" name="fileupload" />'
          + '<input type="submit" value="Upload" />'
          + '</form><br><br>'
          + '<h1>Files</h1><ul>';
        for (let i = 0; i < result.resources.length; i += 1) {
            html += '<li><a href="'
              + result.resources[i].secure_url + '">' 
              + result.resources[i].public_id + '</a></li>';
        }
        html += '</ul>';
        res.send(html);
    })
})

app.post('/', upload.single('fileupload'), (req, res) => {
    cloudinary.uploader.upload(req.file.path, (result) => {
        res.send('<h1>Success</h1><a href="/">Home</a>');
    })
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
```

See this example on github: [https://github.com/mfyz/heroku-cloudinary-uploads-example](https://github.com/mfyz/heroku-cloudinary-uploads-example)  
  

## Wordpress and other sites

Cloudinary has SDKs and official plugins to well-accepted platforms like Wordpress. Check out their official documentation about the ent libraries and plugins  
  
  
You can also use my invitation link to give me extra free credits: [https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/cdlhm6z9q63gdufko1kj](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/cdlhm6z9q63gdufko1kj)