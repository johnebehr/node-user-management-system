<div style="text-align:center">
<h1>User Management System</h1>
<h2>Node.js, Express, MySQL & Express-Handlebars</h2>
</div>
<hr style="border: 3px solid #393e46; width:70%; margin:0 auto;">

### Reference
- YouTube: [User Management System – Nodejs, Express, MySQL & Express-Handlebars](https://www.youtube.com/watch?v=1aXZQcG2Y6I&t=29s)
- GitHub: [RaddyTheBrand/Using-Node.js-with-MySQL--CRUD](https://github.com/RaddyTheBrand/Using-Node.js-with-MySQL--CRUD)
- The README sections, roughly, correspond the video's chapters.

### Setup: Creating the Node.js Project
- ```shell
  $ # Initialize the Node.js project* 
  $ npm init -y 
  $ # install global dependencies
  $ npm install express dotenv express-handlebars mysql
  $ # install dev dependencies
  $ npm install --save-dev nodemon
  $ # Add the entrypoint file, don't forget to add nodemon start script in package.json**
  $ touch app.js
  ```
  - Follow-up by editing <span style="font: 1.3rem Inconsolata, monospace; font-size:1.10em;">package.json</span> and add a proper package name.
  - Might be a better idea to declare the "main" in <span style="font: 1.3rem Inconsolata, monospace; font-size:1.10em;">package.json</span> first, then _touch_ the file. 

### Express Server
- _require_ Express
- Instantiate the Express server
- Declare the listening port
- Tell express to listen on that port
    - Console out that Express is running and listening on the port
- ```shell
  $ # Run the nodemon script and verify output
  $ npm start
  > nodemon app

  [nodemon] 2.0.15
  [nodemon] to restart at any time, enter `rs`
  [nodemon] watching path(s): *.*
  [nodemon] watching extensions: js,mjs,json
  [nodemon] starting `node app.js`
  Listening on Port: 5000
  ```
