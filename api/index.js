const express = require("express");
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const jsonParser = bodyParser.json();

const db = mysql.createConnection({
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

db.connect();

db.query("CREATE TABLE IF NOT EXISTS `simple-todo`.`todo` (`id` INT NOT NULL AUTO_INCREMENT,`text` TEXT NULL,PRIMARY KEY (`id`));");

app.get("/health", (req, res) => {
  const successResponse = {
    status: "ok"
  };
  res.status(200).json(successResponse);
});

app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todo", (err, rows, fields) => {
    if (err) {
      const errorResponse = {
        error: err
      };
      res.status(400).json(errorResponse);
    } else {
      res.status(200).json(rows);
    }
  });
});

app.post("/todos", jsonParser, (req, res) => {
  if (req.body.text) {
    db.query(`INSERT INTO \`simple-todo\`.\`todo\` (\`text\`) VALUES ('${req.body.text}');`, (err, rows, fields) => {
      if (err) {
        const errorResponse = {
          error: err
        };
        res.status(400).json(errorResponse);
      } else {
        const successResponse = {
          status: "ok"
        };
        res.status(201).json(successResponse);
      }
    });
  } else {
    const errorResponse = {
      error: "Field 'text' is required"
    };
    res.status(400).json(errorResponse);
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
});
