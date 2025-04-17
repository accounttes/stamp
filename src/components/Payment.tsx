import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { products } from '../data/products';
import { emulator } from '../utils/emulator';
import { PaymentMethod, PaymentState } from '../types';

export const Payment: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(productId));
  
  const [paymentState, setPaymentState] = useState<PaymentState>({
    method: 'cash',
    amount: product?.price || 0,
    insertedAmount: 0,
    status: 'pending',
    message: 'Выберите способ оплаты'
  });

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    
    if (paymentState.method === 'cash') {
      cleanup = emulator.StartCashin((amount) => {
        setPaymentState(prev => ({
          ...prev,
          insertedAmount: prev.insertedAmount + amount,
          status: prev.insertedAmount + amount >= prev.amount ? 'success' : 'pending',
          message: prev.insertedAmount + amount >= prev.amount 
            ? 'Оплата успешна' 
            : `Внесено: ${prev.insertedAmount + amount} ₽`
        }));
      });
    }
    
    return () => {
      if (cleanup) {
        cleanup();
      }
      emulator.StopCashin();
    };
  }, [paymentState.method]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    
    if (paymentState.method === 'card' && paymentState.status === 'pending') {
      cleanup = emulator.BankCardPurchase(
        paymentState.amount,
        (result) => {
          setPaymentState(prev => ({
            ...prev,
            status: result ? 'success' : 'error',
            message: result ? 'Оплата успешна' : 'Ошибка оплаты'
          }));
          if (result) {
            setTimeout(() => {
              navigate(`/preparation/${productId}`);
            }, 2000);
          }
        },
        (message) => {
          setPaymentState(prev => ({
            ...prev,
            message
          }));
        }
      );
    }
    
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [paymentState.method, paymentState.status, productId, navigate]);

  useEffect(() => {
    if (paymentState.method === 'cash' && paymentState.status === 'success') {
      setTimeout(() => {
        navigate(`/preparation/${productId}`);
      }, 2000);
    }
  }, [paymentState.status, paymentState.method, productId, navigate]);

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentState(prev => ({
      ...prev,
      method,
      status: 'pending',
      message: method === 'cash' ? 'Внесите купюры' : 'Приложите карту'
    }));
  };

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
          Оплата
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary">
            {product.price} ₽
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button
            variant={paymentState.method === 'cash' ? 'contained' : 'outlined'}
            fullWidth
            onClick={() => handlePaymentMethodSelect('cash')}
          >
            Наличные
          </Button>
          <Button
            variant={paymentState.method === 'card' ? 'contained' : 'outlined'}
            fullWidth
            onClick={() => handlePaymentMethodSelect('card')}
          >
            Карта
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          {paymentState.status === 'pending' && (
            <CircularProgress size={24} sx={{ mr: 2 }} />
          )}
          <Typography variant="h6" color={paymentState.status === 'error' ? 'error' : 'textPrimary'}>
            {paymentState.message}
          </Typography>
          {paymentState.method === 'cash' && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Внесено: {paymentState.insertedAmount} ₽
            </Typography>
          )}
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Инструкция по эмуляции:
          </Typography>
          {paymentState.method === 'cash' ? (
            <Typography variant="body2" color="text.secondary">
              • Нажмите Alt+1 для внесения 10 рублей<br />
              • Нажмите Alt+2 для внесения 50 рублей<br />
              • Нажмите Alt+3 для внесения 100 рублей
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              • Нажмите Alt+Enter для успешной оплаты<br />
              • Нажмите Alt+Escape для отмены операции
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}; 