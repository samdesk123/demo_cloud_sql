const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 8080;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: process.env.INSTANCE_UNIX_SOCKET
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to Cloud SQL MySQL database.');
});

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
