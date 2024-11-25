import React, { createContext, useState, useContext } from 'react';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
}

interface FavoritesContextData {
  favorites: Crypto[];
  addFavorite: (crypto: Crypto) => void;
  removeFavorite: (cryptoId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextData | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Crypto[]>([]);

  const addFavorite = (crypto: Crypto) => {
    setFavorites((prev) => [...prev, crypto]);
  };

  const removeFavorite = (cryptoId: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== cryptoId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextData => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites precisa ser usado dentro de um FavoritesProvider');
  }
  return context;
};
