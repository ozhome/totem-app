import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {Product} from './inventory';

interface IInfo {
  name: string;
  cpf: string;
  email: string;
}

interface CartContextData {
  cart: Product[];
  discount: string;
  info: IInfo;
  setInfo(data: IInfo): void;
  amount: number;
  plusCart(item: Product): Product;
  minusCart(item: Product): Product;
  updateCart(item: Product): void;
  clearCart(): void;
  aplyDiscount(items: Product[], code: string): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC = ({children}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [discount, setDiscount] = useState('');
  const [info, setInfo] = useState<IInfo>({
    cpf: '',
    email: '',
    name: '',
  });
  const [amount, setAmount] = useState(0);

  const plusCart = useCallback(
    (item: Product) => {
      setDiscount('');
      const index = cart.findIndex((product) => product.id === item.id);

      let products: Product[] = [];
      if (index >= 0) {
        products = cart.map((product) => {
          if (product.id === item.id) {
            return {
              ...product,
              quantity: product.quantity + 1,
              discount: 0,
            };
          }
          return {...product, discount: 0};
        });
      } else {
        products = [...cart, {...item, quantity: 1, discount: 0}];
      }

      setCart(products);
      return {...item, quantity: item.quantity + 1};
    },
    [cart],
  );

  const minusCart = useCallback(
    (item: Product) => {
      setDiscount('');
      const index = cart.findIndex((product) => product.id === item.id);

      if (index >= 0) {
        const products = cart
          .map((product) => {
            if (product.id === item.id) {
              return {
                ...product,
                quantity: product.quantity - 1,
                discount: 0,
              };
            }
            return {...product, discount: 0};
          })
          .filter((product) => product.quantity > 0);

        setCart(products);
        return {...item, quantity: item.quantity - 1, discount: 0};
      }
      return {...item, discount: 0};
    },
    [cart],
  );

  const updateCart = useCallback(
    (item: Product) => {
      setDiscount('');
      const index = cart.findIndex((product) => product.id === item.id);
      if (index >= 0) {
        setCart((state) =>
          state
            .map((i) => {
              if (i.id === item.id) {
                return {...item, discount: 0};
              }
              return {...i, discount: 0};
            })
            .filter((i) => i.quantity > 0),
        );
      } else if (item.quantity > 0) {
        setCart((state) => [...state, {...item, discount: 0}]);
      }
    },
    [cart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const aplyDiscount = useCallback((items: Product[], code: string) => {
    setCart(items);
    setDiscount(code);
  }, []);

  useEffect(() => {
    const value = cart.reduce((acc, cur) => {
      let dis = 1;
      if (cur.discount) {
        dis = parseFloat(((100 - cur.discount) / 100).toFixed(2));
      }
      if (cur.to_weight) {
        return acc + cur.price * (cur.quantity / 1000) * dis;
      }
      return acc + cur.price * cur.quantity * dis;
    }, 0);
    setAmount(parseFloat(value.toFixed(2)));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        info,
        discount,
        setInfo,
        amount,
        plusCart,
        minusCart,
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
