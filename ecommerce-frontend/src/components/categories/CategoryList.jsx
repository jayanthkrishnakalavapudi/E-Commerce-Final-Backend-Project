import { useEffect, useState } from 'react';
import api from '../../services/api';
import { List, ListItem, ListItemText, Button, TextField } from '@mui/material';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      const { data } = await api.createCategory({ name: newCategory });
      setCategories([...categories, data]);
      setNewCategory('');
    } catch (error) {
      console.error('Failed to create category', error);
    }
  };

  return (
    <div>
      <TextField
        label="New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <Button onClick={handleCreateCategory}>Add Category</Button>
      
      <List>
        {categories.map((category) => (
          <ListItem key={category._id}>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}