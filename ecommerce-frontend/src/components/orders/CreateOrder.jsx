import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import api from '../../services/api';
import { toast } from 'react-toastify';

export default function CreateOrder() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([{ productId: '', quantity: 1 }]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.getProducts();
        setProducts(data);
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createOrder({
        products: selectedProducts.filter(item => item.productId)
      });
      toast.success('Order created successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to create order');
    }
  };

  const addProductField = () => {
    setSelectedProducts([...selectedProducts, { productId: '', quantity: 1 }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {selectedProducts.map((item, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value={item.productId}
                onChange={(e) => {
                  const newProducts = [...selectedProducts];
                  newProducts[index].productId = e.target.value;
                  setSelectedProducts(newProducts);
                }}
              >
                {products.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name} (${product.price})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              label="Quantity"
              value={item.quantity}
              onChange={(e) => {
                const newProducts = [...selectedProducts];
                newProducts[index].quantity = parseInt(e.target.value) || 0;
                setSelectedProducts(newProducts);
              }}
              fullWidth
            />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addProductField} sx={{ mr: 2 }}>
        Add Product
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Create Order
      </Button>
    </form>
  );
}