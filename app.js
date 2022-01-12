const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

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
app.engine('hbs', exphbs({extname: 'hbs'})); // Adjust the file extension to '.hbs'
// Set the View engine to Handlebars
app.set('view engine', 'hbs');


// Tell Express to listen on the port
app.listen(port, () => console.log(`Listening on Port: ${port}`));