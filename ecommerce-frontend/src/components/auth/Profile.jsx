import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>
        <Typography>Name: {profile.name}</Typography>
        <Typography>Email: {profile.email}</Typography>
        <Typography>Address: {profile.address || 'Not specified'}</Typography>
        <Button 
          component={Link}
          to="/profile/update"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
}