---
title: "3 ways of redirections in react-router"
description: "Three different methods for implementing navigation and redirections in React applications using the react-router library are explained, including using the Link component, the Redirect component, and programmatic navigation via the history object."
slug: 3-ways-of-redirections-in-react-router
date: 2020-11-16
url: https://mfyz.com/?p=577
tags:
  [
    "react",
    "react-router",
    "javascript",
    "frontend",
    "web development",
    "routing",
    "single page application",
  ]
category: Front-End
migration: { "wpId": 577, "wpPostDate": "2020-11-16T21:50:26.000Z" }
---

![Drive Around The Mountain by pine  watt](/images/archive/en/2020/11/dUbKcgu0zjw.jpg)

by pine watt

We use “react-router” which is a general underlying routing package. And with it, we use react-router-dom which manages routing on web applications together with react-router package.

[react-router-dom](https://reactrouter.com/) essentially is a layer on top of the browser’s history API. It tracks URL changes in the browser and maps to a router where it’s defined in a single place on our web apps. Generally named as router or routes.js.

The rest of the app, both programmatically (javascript) or the HTML links uses to root path addresses to request navigation in the router. The rest is handled by react-router.

## 3 Types of Navigation Requests in React JS Web Applications

### 1) Links - Replacements of `<a>` tags in reactjs web apps

We use a special “Link” component from the react-router-dom library that wraps simple links with javascript event handlers and maps directly to react-router where it’s handled as URL change without page refresh.

To use Link component, first import it from react-router-dom package:

```js
import { Link } from "react-router-dom";
```

and to use the component:

```js
<Link to="/">...text, button or other elements....</Link>
```

Keep in mind that `<a>` tags are still functional but may have complications on the react-router-dom package to capture if the link is internal. Or external so it’s captured properly by react-router-dom.

### 2) Redirections as Component in “render” methods

This method is not a good practice in my opinion but it’s a quick solution and in some cases where of your page component is directly resulting a redirection all together which will need to be unmounted/destructed and the application has to navigate to another page component. Like unauthorized access, login page, error page redirection...

Simply import and use the `Redirect` component from the react-router-dom package. Here is a scenario in your component render method that your page is resulting in unauthorized access:

```js
if (!authorized) {
  return <Redirect to="/login" />;
}
```

### 3) Programmatical redirect from javascript

This is probably the most common scenario where a redirect needed when certain user interaction synchronously or asynchronously results in the redirect. Like clicking a button that calls the API and results in the redirect when it successfully resolves.

This case is unfortunately not very straightforward. In order to access history API, you need to configure it as a prop to all components from the router. For this, there has to be a shared history instance of the browser. So at the highest level when we define our router using react-router and react-router-dom package wrappers. We need to create and pass the history instance that will enable the `history` prop in the components so we can push new changes or request navigation to previous steps (going back). We will use the `history` package to create a browser history instance.

For the first time set up, after installing the history package from npm, in your app container. Import `createBrowserHistory` method from the history package. Then call it to create an instance of browser history.

```js
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
```

After that, where you define redux Provider, before your root `router` definition, wrap your root router component with `BrowserRouter` (which you may already have for the react-router-dom package), pass the history instance to your `BrowserRouter` component as a prop:

```js
<Provider store={store}>
  <BrowserRouter history={history}>
    <Route path="/:filter?" component={App} />
  </BrowserRouter>
</Provider>
```

You’re ready to start manipulating browser history from your components.

In your components, whenever you need to programmatically redirect, deconstruct (or directly use) `history` object from props of the component. Then, to redirect to a new address:

```js
const { history } = this.props;
history.push("/dashboard");
```

This will initiate react-router-dom to listen to the history instance and resolve the route and re-render the whole app container with the component assigned to the route requested.

Some of these methods feel unnatural but sometimes all we need. Good to know different approaches to initiate dom, native or redux routers in different platforms. The approach above is focused on a web-based application but the same/most approaches can be applied to react-native applications as well.
