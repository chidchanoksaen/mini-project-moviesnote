const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db/connection');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM movies');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add
app.post('/api/movies', async (req, res) => {
  const { name, detail, rating, image, date_created } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO movies (name, detail, rating, image, date_created) VALUES (?, ?, ?, ?, ?)',
      [name, detail, rating, image, date_created]
    );
    res.status(201).send({ id: result.insertId });
  } catch (err) {
    console.error('Error inserting movie:', err);
    res.status(500).send('Internal Server Error');
  }
});
// Get a specific movie by ID
app.get('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query('SELECT * FROM movies WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send({ message: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a movie by ID
app.put('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { name, detail, rating, image } = req.body;
  try {
    const [result] = await connection.query(
      'UPDATE movies SET name = ?, detail = ?, rating = ?, image = ? WHERE id = ?',
      [name, detail, rating, image, id]
    );
    if (result.affectedRows > 0) {
      res.send({ message: 'Movie updated successfully' });
    } else {
      res.status(404).send({ message: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a movie by ID
app.delete('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query('DELETE FROM movies WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.send({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).send({ message: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});