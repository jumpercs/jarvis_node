import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Entities from './components/Entities';
import EntityDetails from './components/EntityDetails';
import AddRecord from './components/AddRecord';
import CreateEntity from './components/CreateEntity';
import WorkflowList from './components/WorkflowList';
import CreateWorkflow from './components/CreateWorkflow';
import WorkflowDetails from './components/WorkflowDetails';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/entities" element={<Entities />} />
            <Route path="/entities/:id" element={<EntityDetails />} />
            <Route path="/entities/:id/add-record" element={<AddRecord />} />
            <Route path="/create-entity" element={<CreateEntity />} />
            <Route path="/workflows" element={<WorkflowList />} />
            <Route path="/create-workflow" element={<CreateWorkflow />} />
            <Route path="/workflows/:id" element={<WorkflowDetails />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
