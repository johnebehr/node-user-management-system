const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');

// Change the handlebar file extension from .handlebars -> .hbs
const handlebars = exphbs.create({
    extname: '.hbs'
});

// Import Environment variables from .env file
require('dotenv').config();

// Instantiate the Express server
const app = express();
// Use and environmental PORT declaration or default to 5000
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Declare the static directory 
app.use(express.static('public'));

// Set up the Templating engine
// app.engine('hbs', exphbs({extName: '.hbs'})); // Presentation code
app.engine('hbs', handlebars.engine);
// Set the View engine to Handlebars
app.set('view engine', 'hbs');

// Connection pool 
const pool = mysql.createPool({
    connectionLimit : 100, 
    host            : process.env.DB_HOST, 
    user            : process.env.DB_USER, 
    password        : process.env.DB_PASSWORD, 
    database        : process.env.DB_NAME
});

// Connect to the database 
pool.getConnection((err, connection) => {
    if(err) throw err; // not connected
    console.log(`Connected as ID: ${connection.threadId}`);
});


// Add an initial route
app.get('', (req, res) => {
    res.render('home');
});

// Tell Express to listen on the port
app.listen(port, () => console.log(`Listening on Port: ${port}`));