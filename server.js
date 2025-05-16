const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 8080;

// Replace these with your actual Cloud SQL instance credentials
const dbConfig = {
  host: '35.202.223.51',         // e.g. '34.168.1.23'
  user: 'shubham',
  password: 'Shubham@2020',
  database: 'democloud'
};
// Create a connection to the Cloud SQL database
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to Cloud SQL MySQL database.');
});

// Sample route
app.get('/', (req, res) => {
  connection.query('SELECT NOW() AS now', (error, results) => {
    if (error) {
      res.status(500).send('Database query failed.');
    } else {
      res.send(`Database time: ${results[0].now}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
