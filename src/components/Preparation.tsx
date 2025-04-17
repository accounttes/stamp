import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { products } from '../data/products';
import { emulator } from '../utils/emulator';

type PreparationStatus = 'preparing' | 'success' | 'error';

export const Preparation: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(productId));
  
  const [status, setStatus] = useState<PreparationStatus>('preparing');
  const [message, setMessage] = useState<string>('Приготовление напитка...');

  useEffect(() => {
    if (!product) {
      setStatus('error');
      setMessage('Продукт не найден');
      return;
    }

    let cleanup: (() => void) | undefined;
    
    cleanup = emulator.Vend(
      Number(productId),
      (result) => {
        setStatus(result ? 'success' : 'error');
        setMessage(result ? 'Напиток готов!' : 'Ошибка приготовления');
        
        if (result) {
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      }
    );
    
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [productId, navigate, product]);

  if (!product) {
    return (
      <Container>
        <Alert severity="error">Продукт не найден</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Приготовление
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          {status === 'preparing' && (
            <CircularProgress size={48} sx={{ mb: 2 }} />
          )}
          <Typography variant="h6" color={status === 'error' ? 'error' : 'textPrimary'}>
            {message}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Инструкция по эмуляции:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Нажмите Alt+V для успешного приготовления<br />
            • Нажмите Alt+X для имитации ошибки
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}; 