export const emulator = {
  StartCashin: function(cb: (amount: number) => void) {
    const handler = (event: KeyboardEvent) => {
      if (event.altKey && event.key === '1') {
        cb(10);
      } else if (event.altKey && event.key === '2') {
        cb(50);
      } else if (event.altKey && event.key === '3') {
        cb(100);
      }
    };
    
    document.addEventListener('keydown', handler);
    
    return () => {
      document.removeEventListener('keydown', handler);
    };
  },

  StopCashin: function() {
  },

  BankCardPurchase: function(amount: number, cb: (result: boolean) => void, display_cb: (message: string) => void) {
    display_cb('Приложите карту');
    
    const handler = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'Enter') {
        display_cb('Обработка карты');
        setTimeout(() => {
          display_cb('Связь с банком');
          setTimeout(() => {
            display_cb('Операция успешна');
            cb(true);
            document.removeEventListener('keydown', handler);
          }, 1000);
        }, 1000);
      } else if (event.altKey && event.key === 'Escape') {
        display_cb('Операция отменена');
        cb(false);
        document.removeEventListener('keydown', handler);
      }
    };
    
    document.addEventListener('keydown', handler);
    
    return () => {
      document.removeEventListener('keydown', handler);
    };
  },

  BankCardCancel: function() {
  },

  Vend: function(product_idx: number, cb: (result: boolean) => void) {
    const handler = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'v') {
        setTimeout(() => {
          cb(true);
          document.removeEventListener('keydown', handler);
        }, 2000);
      } else if (event.altKey && event.key === 'x') {
        setTimeout(() => {
          cb(false);
          document.removeEventListener('keydown', handler);
        }, 2000);
      }
    };
    
    document.addEventListener('keydown', handler);
    
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }
}; 