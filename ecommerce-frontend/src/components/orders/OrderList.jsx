// src/components/orders/OrderList.jsx
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography 
} from '@mui/material';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({}); // Stores product details

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch orders
        const { data: orders } = await api.getOrders();
        setOrders(orders);
        
        // 2. Fetch all products to map IDs to names
        const { data: allProducts } = await api.getProducts();
        const productMap = {};
        allProducts.forEach(p => productMap[p._id] = p);
        setProducts(productMap);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom>My Orders</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                {new Date(order.timestamp).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {order.products.map(item => (
                  <div key={item.productId}>
                    {products[item.productId]?.name || 'Product'} (x{item.quantity})
                  </div>
                ))}
              </TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}