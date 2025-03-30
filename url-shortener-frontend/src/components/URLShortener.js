import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  IconButton,
  Stack,
  Alert,
  Link,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

function URLShortener() {
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState('');
  const [error, setError] = useState('');
  const [editingUrl, setEditingUrl] = useState(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/urls/`);
      setUrls(response.data);
    } catch (err) {
      setError('Failed to fetch URLs');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUrl) {
        await axios.put(`${API_BASE_URL}/urls/${editingUrl.short_code}/`, {
          original_url: originalUrl,
        });
        setEditingUrl(null);
      } else {
        await axios.post(`${API_BASE_URL}/urls/`, {
          original_url: originalUrl,
        });
      }
      setOriginalUrl('');
      fetchUrls();
    } catch (err) {
      setError('Failed to save URL');
    }
  };

  const handleDelete = async (shortCode) => {
    try {
      await axios.delete(`${API_BASE_URL}/urls/${shortCode}/`);
      fetchUrls();
    } catch (err) {
      setError('Failed to delete URL');
    }
  };

  const handleEdit = (url) => {
    setEditingUrl(url);
    setOriginalUrl(url.original_url);
  };

  const handleCancelEdit = () => {
    setEditingUrl(null);
    setOriginalUrl('');
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        URL Shortener
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Enter URL to shorten"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              type="url"
            />
            <Button type="submit" variant="contained">
              {editingUrl ? 'Update' : 'Shorten'}
            </Button>
            {editingUrl && (
              <Button variant="outlined" onClick={handleCancelEdit}>
                Cancel
              </Button>
            )}
          </Stack>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Your Shortened URLs
      </Typography>

      <List>
        {urls.map((url) => (
          <ListItem
            key={url.id}
            component={Paper}
            sx={{ mb: 1, p: 2 }}
            secondaryAction={
              <Stack direction="row" spacing={1}>
                <IconButton onClick={() => handleEdit(url)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(url.short_code)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            }
          >
            <Stack spacing={1} sx={{ width: '100%' }}>
              <Typography variant="body2" color="text.secondary">
                Original URL:
              </Typography>
              <Link href={url.original_url} target="_blank" rel="noopener">
                {url.original_url}
              </Link>
              <Typography variant="body2" color="text.secondary">
                Short URL:
              </Typography>
              <Link href={url.short_url} target="_blank" rel="noopener">
                {url.short_url}
              </Link>
              <Typography variant="body2">
                Clicks: {url.access_count} | Created: {new Date(url.created_at).toLocaleDateString()}
              </Typography>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default URLShortener;