import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid,
  TextField,
  Box,
  CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.getProduct(id);
        setProduct(data);
      } catch (error) {
        toast.error('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await api.createOrder({
        products: [{ productId: id, quantity }],
        total: product.price * quantity
      });
      toast.success('Order created successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create order');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        Product not found
      </Typography>
    );
  }

  return (
    <Grid container justifyContent="center" spacing={4} mt={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>
            <Typography paragraph>
              {product.description || 'No description available'}
            </Typography>
            
            <Box mt={3} display="flex" alignItems="center">
              <TextField
                type="number"
                label="Quantity"
                variant="outlined"
                size="small"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                inputProps={{ min: 1 }}
                sx={{ width: 100, mr: 2 }}
              />
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleAddToCart}
                size="large"
              >
                Add to Cart
              </Button>
            </Box>

            {product.weatherTags?.length > 0 && (
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Perfect for: {product.weatherTags.join(', ')} weather
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}