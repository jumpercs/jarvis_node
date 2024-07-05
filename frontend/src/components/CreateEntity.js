import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';

const componentTypes = [
  { value: 'text', label: 'Text' },
  { value: 'password', label: 'Password' },
  { value: 'select', label: 'Select' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
];

function CreateEntity() {
  const [name, setName] = useState('');
  const [components, setComponents] = useState([]);
  const [newComponent, setNewComponent] = useState({ type: '', label: '', validation: {} });
  const navigate = useNavigate();

  const addComponent = () => {
    setComponents([...components, newComponent]);
    setNewComponent({ type: '', label: '', validation: {} });
  };

  const handleCreateEntity = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:3001/api/entities',
        { name, components },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Entity created successfully');
      navigate('/entities');
    } catch (error) {
      console.error('Failed to create entity', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Create Entity</Typography>
        <Box component="form" onSubmit={handleCreateEntity} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Entity Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography component="h2" variant="h6">Add Component</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Type"
            value={newComponent.type}
            onChange={(e) => setNewComponent({ ...newComponent, type: e.target.value })}
          >
            {componentTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Label"
            value={newComponent.label}
            onChange={(e) => setNewComponent({ ...newComponent, label: e.target.value })}
          />
          {newComponent.type === 'select' && (
            <TextField
              margin="normal"
              fullWidth
              label="Options (comma separated)"
              value={newComponent.validation.options || ''}
              onChange={(e) => setNewComponent({
                ...newComponent,
                validation: { ...newComponent.validation, options: e.target.value.split(',') }
              })}
            />
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={addComponent}
            sx={{ mt: 2 }}
          >
            Add Component
          </Button>
          <Typography component="h2" variant="h6" sx={{ mt: 4 }}>Components</Typography>
          <ul>
            {components.map((component, index) => (
              <li key={index}>{component.label} ({component.type})</li>
            ))}
          </ul>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Entity
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateEntity;
