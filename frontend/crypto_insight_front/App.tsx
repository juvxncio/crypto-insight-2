import React from 'react';
import './gesture-handler';
import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from './src/context/favoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </FavoritesProvider>
  );
}