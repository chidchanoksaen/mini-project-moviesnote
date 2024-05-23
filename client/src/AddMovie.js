import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddMovie.css';

const AddMovie = () => {

  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    name: '',
    detail: '',
    rating: '',
    image: '',
    date_created: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/movies', movie);
      alert('Movie added successfully');
      // Clear the form
      setMovie({
        name: '',
        detail: '',
        rating: '',
        image: '',
        date_created: ''
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Error adding movie');
    }
  };

  return (
    <div className="add-movie-container">
      <div className="MovieList">
      <div className='title'>
          <img style={{ width: '50px', height: '50px', marginRight: '15px' }} src="tv.png" alt='' />
          <h1>Movie List</h1>
        </div>
        <div class="title">
          <a class="add-movie-button" href="/">Home</a>
        </div>
      </div>
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit} className="add-movie-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={movie.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="detail">Detail:</label>
          <textarea
            id="detail"
            name="detail"
            value={movie.detail}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={movie.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_created">Date Created:</label>
          <input
            type="date"
            id="date_created"
            name="date_created"
            value={movie.date_created}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
