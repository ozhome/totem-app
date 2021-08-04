import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import Dinero from 'dinero.js';

import {Product} from './inventory';

export interface IInfo {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

interface CartContextData {
  cart: Product[];
  discount: string;
  info: IInfo;
  setInfo(data: IInfo): void;
  amount: number;
  note: string;
  setNote(value: string): void;
  updateCart(item: Product, insertInput?: boolean): void;
  clearCart(): void;
  aplyDiscount(items: Product[], code: string): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC = ({children}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [discount, setDiscount] = useState('');
  const [note, setNote] = useState('');
  const [info, setInfo] = useState<IInfo>({
    cpf: '',
    email: '',
    name: '',
    phone: '',
  });
  const [amount, setAmount] = useState(0);

  const updateCart = useCallback((item: Product, insertInput = false) => {
    setCart((state) => {
      const itemIndex = state.findIndex((product) => product.id === item.id);
      let qty_available = item.qty_available;
      let quantity = 0;
      let sum = item.quantity;

      if (item.to_weight) {
        qty_available = parseFloat(
          `${item.qty_available * 1000}`.replace(/\D/g, ''),
        );
      }

      if (!insertInput) {
        if (itemIndex >= 0) {
          sum = state[itemIndex].quantity + item.quantity;
        } else {
          sum = item.quantity;
        }
      }

      if (sum > qty_available) {
        quantity = qty_available;
      } else if (sum <= 0) {
        quantity = 0;
      } else {
        quantity = sum;
      }

      let items = state;

      if (itemIndex >= 0) {
        items[itemIndex].quantity = quantity;
      } else {
        items.push({...item, quantity});
      }

      return items.filter((product) => product.quantity > 0);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setNote('');
  }, []);

  const aplyDiscount = useCallback((items: Product[], code: string) => {
    setCart(items);
    setDiscount(code);
  }, []);

  useEffect(() => {
    let price = Dinero({amount: 0});

    cart.forEach((value) => {
      const itemPrice = parseFloat(value.price.toFixed(2).replace(/\D/g, ''));
      const item = Dinero({
        amount: itemPrice,
      })
        .multiply(value.to_weight ? value.quantity / 1000 : value.quantity)
        .percentage(100 - (value.discount || 0));

      price = price.add(item);
    });

    setAmount(price.getAmount() / 100);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        info,
        discount,
        setInfo,
        note,
        setNote,
        amount,
        updateCart,
        clearCart,
        aplyDiscount,
      }}>
      {children}
    </CartContext.Provider>
  );
};

function useCart(): CartContextData {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }

  return context;
}

export {CartProvider, useCart};
