import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button
} from '@mui/material';
import { products } from '../data/products';

export const ProductSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleProductSelect = (productId: number) => {
    navigate(`/payment/${productId}`);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Выберите напиток
        </Typography>
        
        <Box 
          sx={{ 
            mt: 2,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3
          }}
        >
          {products.map((product) => (
            <Box 
              key={product.id} 
              sx={{ 
                flexGrow: 1,
                flexBasis: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.333% - 24px)' },
                minWidth: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.333% - 24px)' }
              }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {product.price} ₽
                  </Typography>
                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => handleProductSelect(product.id)}
                  >
                    Выбрать
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}; 