import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export default function UpdateProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateProfile(formData);
      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Update Profile
        </Button>
      </form>
    </Container>
  );
}