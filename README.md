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

### Adding Middleware and Layouts
- Add dependencies for: 
    - [body-parser](https://www.npmjs.com/package/body-parser)
        - Parsing middleware: helps in passing data from forms
    - [Handlebars](https://handlebarsjs.com/)
    - mysql
- Add a dependency for the _.env_ file
- Add a new directory for the _static_ files.
- Set up the Templating engine (Handlebars)
    - The default file extension for Handlebars is _.handlebars_, you'll shorten that with the _extname_ option
    - Set Handlebars as the view engine
- Add a new directory for the Handlebar views
    - By default Handbars looks for a directory named views
        - will also look for another directory named layouts
    - Add a Handlebars template that will service as the default layout: _main.hbs_
    - Add a Handlebars template that will serve as the Homepage: _home.hbs_
- Add a route for the first view in _app.js_
- Start setting up the main HTML layout.

### Setting up Bootstrap
- All of the Bootstrap items are being delivered via CDN
- Pull the Bootstrap: CSS, Icons, JS, and Navbar
- Add the default container for the content, _body_, section 

### Database Setup
- Add MySQL support to Docker-Compose and create the database.
- Connect to the MySQL database with Workbench (you'll probobly switch to  Sequelize as some point)
    - Define the _user_ table and create it.
    - Add some mock data
- Create a connection pool and _.env_ file (remember, the database server is running in a separate container).

### Routes and Controllers
- Refactor app.js to declutter it and provide organization for you controllers and routes.
- Add a new directory: _server_ and two subdirectories: _controllers_ and _routes_
- Move the existing route to _server/routes/user.js_
- Add the logic for the route to _server/controllers/userController.js_

### Home - Querying Data
- Institute a MySQL query for user data to display on the Home page
- Query the database and pass the results to the template engine. 
    - Also console.log the query result to make sure that data is returned.
    
### Search
- Modify the search form in _main.js_ to submit the input text via a POST request to a MySQL query 

### Submit Record 
- Create the ability to add a new user 
    - Add a button that will send the app user to a new endpoint for the add user form.

### Update Record
- Add a new Handlebars template - _edit-user.hbs_ 
- Use a "partial" for the Update form

### Delete Record
- Delete a record by id
- No need to create a new page. 

### User Detail Page
- Add a new Handlebars template - _view-user.hbs_