const express = require('express');

// Instantiate the Express server
const app = express();
// Use and environmental PORT declaration or default to 5000
const port = process.env.PORT || 5000;

// Tell Express to listen on the port
app.listen(port, () => console.log(`Listening on Port: ${port}`));