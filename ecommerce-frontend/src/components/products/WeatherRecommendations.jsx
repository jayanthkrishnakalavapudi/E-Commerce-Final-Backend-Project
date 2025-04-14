import React, { useState } from 'react';
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Box,
  Alert
} from '@mui/material';
import api from '../../services/api'; // Verify this path is correct
import { toast } from 'react-toastify';

export default function WeatherRecommendations() {
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setCoordinates(prev => ({ ...prev, [name]: value }));
    }
  };

  const fetchRecommendations = async () => {
    if (!coordinates.lat || !coordinates.lon) {
      setError('Please enter both latitude and longitude');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Use the specific API method we defined
      const { data } = await api.getWeatherRecommendations(
        parseFloat(coordinates.lat),
        parseFloat(coordinates.lon)
      );

      setRecommendations(data);
      toast.success(`Showing recommendations for ${data.weather.description}`);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.message || 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Weather Recommendations
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField
          label="Latitude"
          name="lat"
          value={coordinates.lat}
          onChange={handleChange}
          placeholder="e.g. 40.7128"
          sx={{ width: 150 }}
        />
        <TextField
          label="Longitude"
          name="lon"
          value={coordinates.lon}
          onChange={handleChange}
          placeholder="e.g. -74.0060"
          sx={{ width: 150 }}
        />
        <Button
          variant="contained"
          onClick={fetchRecommendations}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Get Recommendations
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {recommendations && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Weather: {recommendations.weather.description} ({recommendations.weather.temp}°C)
            </Typography>
            <Chip label={recommendations.weather.condition} sx={{ mt: 1 }} />
            
            <Typography variant="h6" sx={{ mt: 2 }}>
              Recommended Products
            </Typography>
            {recommendations.products.length > 0 ? (
              <ul>
                {recommendations.products.map(product => (
                  <li key={product._id}>{product.name} - ${product.price}</li>
                ))}
              </ul>
            ) : (
              <Typography>No products match this weather</Typography>
            )}

            {recommendations.externalProducts.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Partner Offers
                </Typography>
                <ul>
                  {recommendations.externalProducts.map(product => (
                    <li key={product.id}>
                      {product.name} - ${product.price}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}