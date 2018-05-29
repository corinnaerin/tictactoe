# Overview

Welcome to my Tic Tac Toe dungeon! This is my fun spin on the classic game, containing four different difficulty levels:

* Ron Weasely (Easy)
* Harry Potter (Medium)
* Hermione Granger (Hard)
* Luna Lovegood (Who can tell?)

The app is live at www.corinnaerin.com

Link to documentation: www.corinnaerin.com/docs


# Getting started

1. Install the dependencies and build the app:

  ```
  npm install
  ```

2. Start the server

  ```
  npm start
  ```
  
3. Access the app at `http://localhost:5000`.

# IntelliJ Setup

## TypeScript support

1. Open Settings > Languages & Frameworks > TypeScript.
2. Check `TypeScript Language Server`.

## Executing Mocha tests

1. Run > Edit Configurations
2. Click + and select Mocha
3. Set the following values:
    * Extra Mocha options: `--require ts-node/register`
    
## TSLint support

1. Open Settings > Languages & Frameworks > TypeScript > TSLint
2. Check `enable`
3. Check `search for tslint.json`

# Developing in the app

1. Install the dependencies and build the app:

  ```
  npm install
  ```

2. Start up the dev server:

  ```
  npm run watch
  ```
    
3. Access the app at `http://localhost:5000`.

# Accessing the documentation

You can access the documentation for the current release at https://corinnaerin.github.io/tictactoe/. To access the documentation
for the checked-out local version, just open `build/public/docs/index.html` in your browser.

# Deploying the app

1. Before committing, be sure that appropriate tests have been modified/added and release build succeeds.

  ```
  npm run release
  ```
  
2. Push to the `master` branch. Heroku will automatically pick up the changes and deploy.

# All npm targets

## Server targets
_Note: there is no `server:build` task because for development, we will use nodemon which is configured
to compile TypeScript on the fly_

* `server:tslint`: lint the server TypeScript
* `server:release`: clean the `build/server` directory, run `server:tslint`, and compile the TypeScript to JavaScript

## Client targets
* `client:build`: execute webpack to do a development build of the client
* `client:release`: execute webpack to do a production build of the client

## Other

* `postinstall`: runs the tests with code coverage and executes a release build of the client & server
* `release`: alias for `postinstall`
* `coverage`: run the tests through Istanbul to generate code coverage docs
* `docs`: generate the documenation via TypeDoc
* `test`: run all of the tests
* `watch`: start nodemon and webpack dev server
* `start`: run the built server, requires a build to be executed first. This is mostly for production use
* `nodemon`: start nodemon
* `clean`: clean the workspace, removing the `node_modules`, `build` directory, and coverage output

# Terminology & AI Overview

The basic approach for the AI is simple. Each type of move can be ranked by how optimal it is. For example,
a winning move is obviously more optimal than a move in an empty line. To that end, I've defined the following
concepts:

* **Line**: any row, column, or diagonal in the board
* **MoveFinder**: a function that takes in a board or a line and returns some moves. 
These are analogous to the function one would pass to Array.prototype.filter,
but specific to checking a 3x3 array
* **BoardMoveFinder**: a MoveFinder that checks the board as a whole
* **LineMoveFinder**: a MoveFinder that checks a single line at a time

For details on the logic for each difficulty level, see `server/ai/ai.ts`.

# Testing the app

See below for useful tools to aid in manual testing of both the client & server code. You can (obviously)
run the automated tests via `npm run test`, which includes unit & integration tests for the server
and unit tests for the client. A future step for front-end testing would be to add a Selenium test
framework to do integration tests & user-interaction tests. 

# Testing tools

* [Postman](https://www.getpostman.com/): tool for developing and debugging APIs
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi):
a Chrome DevTools extension for the open-source React JavaScript library. 
It allows you to inspect the React component hierarchies in the Chrome Developer Tools.
* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd): Chrome extension that 
provides power-ups for your Redux development workflow. Apart from Redux, it can be used with any other architectures which handle the state.

# Libraries & languages in use by this app

* [NodeJS](https://nodejs.org) - a JavaScript runtime built on Chrome's V8 JavaScript engine
* [ExpressJS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Nodemon](http://nodemon.io/) - a utility that will monitor for any changes in your source and automatically restart your server
* [Webpack](https://webpack.github.io/) - module bundler
* [ReactJS](https://facebook.github.io/react/) - a javascript library for building user interfaces
* [TypeScript](https://www.typescriptlang.org/) - a typed superset of JavaScript that compiles to plain JavaScript
* [Mocha](https://mochajs.org/) - a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun
* [ReduxJS](http://redux.js.org/index.html) - a predictable state container for JavaScript apps
* [Istanbul](https://istanbul.js.org/) - JavaScript test coverage made simple
* [TypeDoc](http://typedoc.org/) - a documentation generator for TypeScript projects.

# Helpful development resources

* [React & Redux tutorial](https://css-tricks.com/learning-react-router/)
* [Official React documentation](https://facebook.github.io/react/docs/getting-started.html)
* [Official NodeJS documentation](https://nodejs.org/dist/latest-v4.x/docs/api/)
* [Official TypeScript documentation](https://www.typescriptlang.org/docs/tutorial.html)
* [Official Redux documentation](http://redux.js.org/index.html)
* [Official React Router documentation](https://reacttraining.com/react-router/)