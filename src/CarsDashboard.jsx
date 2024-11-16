import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const CarsDashboard = () => {
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/api/cars', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setMessage('Failed to fetch cars.');
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
      setMessage('Failed to delete car.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>My Cars</h1>
      {message && <p className="message">{message}</p>}
      <button onClick={() => navigate('/cars/new')} className="add-button">
        Add Car
      </button>
      <ul className="car-list">
        {cars.map((car) => (
          <li key={car._id} className="car-item">
            <h2>{car.title}</h2>
            <p>{car.description}</p>
            <button onClick={() => navigate(`/cars/edit/${car._id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(car._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarsDashboard;
