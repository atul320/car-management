import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './AuthForm';
import CarsDashboard from './CarsDashboard';
import CarForm from './CarForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/cars" element={<CarsDashboard />} />
        <Route path="/cars/new" element={<CarForm />} />
        <Route path="/cars/edit/:id" element={<CarForm />} />
      </Routes>
    </Router>
  );
}

export default App;
