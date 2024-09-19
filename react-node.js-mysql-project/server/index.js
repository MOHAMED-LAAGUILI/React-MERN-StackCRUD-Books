const mysql = require("mysql");
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3010;

// Add this line to parse JSON requests
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'books-site'
});

app.get('/', async(req, res) => {
  const sql = "SELECT * FROM books"

  db.query(sql, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(data);
    }
  });
})

app.post('/AddBook', (req, res) => {
  const sql = "INSERT INTO books(`title`,`description`,`cover`,`price`) VALUES (?,?,?,?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }

    return res.json('Book Created Successfully');
  });
});

app.delete('/Books/:id', (req, res) => {
  const bookID = req.params.id;
  const sql = "DELETE FROM books WHERE id = ?";
  db.query(sql, bookID, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
    return res.json('Book Deleted Successfully');
  });
});

app.put('/Books/:id', (req, res) => {
  const bookID = req.params.id;
  const sql = "SELECT * FROM books WHERE id = ?";
  db.query(sql, bookID, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }

    const existingBook = data[0];
    const updatedBook = {
      title: req.body.title || existingBook.title,
      description: req.body.description || existingBook.description,
      cover: req.body.cover || existingBook.cover,
      price: req.body.price || existingBook.price,
    };

    const sql = "UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?";
    const values = [
      updatedBook.title,
      updatedBook.description,
      updatedBook.cover,
      updatedBook.price,
      bookID
    ];

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      return res.json('Book Updated Successfully');
    });
  });
});

app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));