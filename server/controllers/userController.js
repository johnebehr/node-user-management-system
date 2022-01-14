const mysql = require('mysql');

// Connection pool 
const pool = mysql.createPool({
    connectionLimit : 100, 
    host            : process.env.DB_HOST, 
    user            : process.env.DB_USER, 
    password        : process.env.DB_PASSWORD, 
    database        : process.env.DB_NAME
});

// View all users 
exports.view = (req, res) => {
    // Connect to the database 
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log(`Connected as ID: ${connection.threadId}`);

        // Use the connection 
        connection.query('SELECT * FROM user', (err, rows) => {
            // When done with the connnection release it 
            connection.release();

            if(!err){
                // Pass the result to the template engine
                res.render('home', {rows});
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });    
}