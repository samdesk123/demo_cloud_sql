const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path'); // Add this at the top of the file
require('dotenv').config();

const app = express();
const port = 3306;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Cloud SQL database connection
const db = mysql.createConnection({
    host: '35.202.223.51', // Replace with your Cloud SQL instance IP or hostname
    user: 'shubham', // Replace with your Cloud SQL username
    password: 'Shubham@2020', // Replace with your Cloud SQL password
    database: 'democloud', // Replace with your Cloud SQL database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the Cloud SQL database.');
});

// Route to serve the form
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'form.html');
    console.log('Serving file from:', filePath);
    res.sendFile(filePath);
});

// Route to handle form submissions
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    // Insert form data into the database
    const query = 'INSERT INTO submissions (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('An error occurred while saving your data.');
        }
        // Redirect to the Thank You page
        res.redirect('/thankyou');
    });
});

// Route to serve the Thank You page
app.get('/thankyou', (req, res) => {
    res.sendFile(path.join(__dirname, 'thankyou.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});