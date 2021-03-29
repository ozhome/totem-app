import React from 'react';

import {IzettleProvider} from './izettle';
import {AuthProvider} from './auth';
import {InventoryProvider} from './inventory';
import {CartProvider} from './cart';

const AppProvider: React.FC = ({children}) => (
  <IzettleProvider>
    <AuthProvider>
      <InventoryProvider>
        <CartProvider>{children}</CartProvider>
      </InventoryProvider>
    </AuthProvider>
  </IzettleProvider>
);

export default AppProvider;
