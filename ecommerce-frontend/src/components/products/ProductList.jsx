import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product._id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography>${product.price}</Typography>
              <Link to={`/products/${product._id}`}>View Details</Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}