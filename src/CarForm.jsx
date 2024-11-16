import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './App.css';

const CarForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '', tags: '' });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const formDataWithFiles = new FormData();

    formDataWithFiles.append('title', formData.title);
    formDataWithFiles.append('description', formData.description);
    formDataWithFiles.append('tags', formData.tags);

    for (const file of images) {
      formDataWithFiles.append('images', file);
    }

    try {
      const url = id ? `/api/cars/${id}` : '/api/cars';
      const method = id ? 'put' : 'post';

      await axios({
        method,
        url,
        data: formDataWithFiles,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/cars');
    } catch (error) {
      console.error('Error submitting car:', error);
      setMessage('Failed to submit car.');
    }
  };

  return (
    <div className="form-container">
      <h1>{id ? 'Edit Car' : 'Add New Car'}</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Images</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <button type="submit">{id ? 'Update Car' : 'Create Car'}</button>
      </form>
    </div>
  );
};

export default CarForm;
