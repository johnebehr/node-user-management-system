const res = require('express/lib/response');
const mysql = require('mysql');

// Connection pool 
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// View all users 
exports.view = (req, res) => {
    // Connect to the database 
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log(`Connected as ID: ${connection.threadId}`);

        // Use the connection 
        connection.query('SELECT * FROM user', (err, rows) => {
            // When done with the connnection release it 
            connection.release();

            if (!err) {
                // Pass the result to the template engine
                res.render('home', { rows });
            } else {
                console.log(err);
            }

            // console.log('The data from user table: \n', rows);
        });
    });
}

// User search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log(`Connected as ID: ${connection.threadId}`);

        // get the data from the search input
        let searchTerm = req.body.search;

        // Use the connection 
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', [`%${searchTerm}%`, `%${searchTerm}%`], (err, rows) => {
            // When done with the connnection release it 
            connection.release();

            if (!err) {
                // Pass the result to the template engine
                res.render('home', { rows });
            } else {
                console.log(err);
            }

            // console.log('The data from user table: \n', rows);
        });
    });
}

// Display the add user form
exports.showForm = (req, res) => {
    res.render('add-user');
}

// Add a new user
exports.createUser = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;

    // Connect to the database 
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log(`Connected as ID: ${connection.threadId}`);

        // Use the connection 
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
            // When done with the connnection release it 
            connection.release();

            if (!err) {
                // Pass the result to the template engine
                res.render('add-user', { alert: 'User added successfully' });
            } else {
                console.log(err);
            }

            // console.log('The data from user table: \n', rows);
        });
    });
}

// Show the Update user form 
// exports.editForm = (req, res) => {
//     res.render('edit-user');
// }

// Edit user: fetch the user data for display
exports.editUser = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log(`Request Body Param: ${req.params.id}`);

        // Use the connection 
        connection.query(
            'SELECT * FROM user WHERE id = ?', 
            [req.params.id], 
            (err, rows) => {
            // When done with the connnection release it 
            connection.release();

            if (!err) {
                // Pass the result to the template engine
                res.render('edit-user', { rows });
            } else {
                console.log(err);
            }

            // console.log('The data from user table: \n', rows);
        });
    });
}

// Update user: Submit changes back to the database
exports.updateUser = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log(`Connected as ID: ${connection.threadId}`);

        // Query the database
        connection.query(
            'UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?',
            [first_name, last_name, email, phone, comments, req.params.id],
            (err, rows) => {
                // When done with the connection, release it
                connection.release;

                if(!err) {
                    pool.getConnection((err, connection) => {
                        if(err) throw err; // Not connected
                        connection.query(
                            'SELECT * FROM user WHERE id = ?', 
                            [req.params.id], 
                            (err, rows) => {
                                // Release the connection when done querying
                                connection.release();
                                if(!err) {
                                    res.render(
                                        'edit-user', 
                                        {rows, alert: `${first_name} has been updated.`}
                                    );
                                } else {
                                    console.log(err);
                                }
                                console.log('The data from user table: \n', rows);
                            }
                        );
                    });
                }
            });
    });
}