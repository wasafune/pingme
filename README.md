<h1 align="center">
  <a href="https://www.pingme.me/">
    <img src="https://www.pingme.me/media/logo-readme.svg">
  </a>
  <br>
  PingMe
  <br>
</h1>

<h4 align="center">A Manga/Anime Notifier</h4>

## About

PingMe aims to provide the anime/manga community with a multi-platform notifier, making it easier for users to stay updated on the latest releases from their favorite titles.

## The Tech Stack

### Front-end
  The single-page web application is built with `React`/`Router`, using `Redux` to manage state. `Redux-Saga` handles asynchronous events, preventing unwanted side-effects when making changes to the store. `Formik`'s form components validate registration and authentication on the client's end. Excluding the `Formik` components, all responsive elements, ie. tabs, modals, and inputs, are built entirely with `React`/`JSX` and `Sass`. `Webpack` bundles the `JSX` and `CSS` logic, allowing the rendering of `React` components on the browser with the latest `Javascript` features using `Babel`.

### Back-end
  A `Node`/`Express` server serves the user-facing application and handles the `RESTful` api routing. For validation, `bcrypt` encrypts users' sensitive information, and `sessions`/`JWTs` keep a user securely logged in. Testing suites are written with `Jest`, testing everything from `RESTful` routes to database queries. This server is hosted remotely on the `Heroku` cloud.
  Another `Express` server periodically aggregates data from various APIs and websites, updating a `Mongo` database, with a `Mongoose` ODM layer for queries, with the latest releases. After data aggregation, email notifications are sent to users based on their subscriptions using `Nodemailer`.
