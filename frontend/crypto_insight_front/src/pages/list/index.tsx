import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { style } from './styles';
import { Input } from '../../components/inputHome';
import { MaterialIcons } from '@expo/vector-icons';
import { getUserProfile, getCryptoList } from '../../api';
import { useFavorites } from '../../context/favoritesContext';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  isFavorite: boolean;
}

export default function List() {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [username, setUsername] = useState<string | null>(null);
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getGreeting = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const data = await getUserProfile();
        setUsername(data.username);
      } catch (error) {
        console.error('Erro ao carregar perfil do usuário:', error);
      }
    }

    async function fetchCryptoList() {
      try {
        const cryptoData = await getCryptoList();

        const cryptoListWithFavorites = cryptoData.map((crypto: Crypto) => ({
          ...crypto,
          isFavorite: favorites.some((fav) => fav.id === crypto.id),
        }));

        setCryptos(cryptoListWithFavorites);
        setFilteredCryptos(cryptoListWithFavorites);
      } catch (error) {
        console.error('Erro ao carregar lista de criptomoedas:', error);
      }
    }

    fetchUserProfile();
    fetchCryptoList();
  }, [favorites]);

  useEffect(() => {
    const filtered = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCryptos(filtered);
  }, [searchQuery, cryptos]);

  const toggleFavorite = (crypto: Crypto) => {
    if (crypto.isFavorite) {
      removeFavorite(crypto.id);
    } else {
      addFavorite({ id: crypto.id, name: crypto.name, symbol: crypto.symbol });
    }
  };

  const renderCryptoItem = ({ item }: { item: Crypto }) => {
    const isPositive = item.price_change_percentage_24h >= 0;
    return (
      <View style={style.cryptoItem}>
        <Image source={{ uri: item.image }} style={style.cryptoIcon} />
        <View style={style.cryptoInfo}>
          <Text style={style.cryptoName}>{item.name}</Text>
          <Text style={style.cryptoSymbol}>{item.symbol.toUpperCase()}</Text>
        </View>
        <View style={style.cryptoPriceInfo}>
          <Text style={style.cryptoPrice}>{formatCurrency(item.current_price)}</Text>
          <Text style={[style.cryptoChange, { color: isPositive ? 'green' : 'red' }]}>
            {isPositive ? '▲' : '▼'} {Math.abs(item.price_change_percentage_24h).toFixed(2)}% (1d)
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Image
            source={
              item.isFavorite
                ? require('../../assets/estrelaCheia.png')
                : require('../../assets/estrelaVazia.png')
            }
            style={style.favoriteIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.greeting}>
          {getGreeting()}, <Text style={{ fontWeight: 'bold' }}>{username || 'Usuário'}</Text>
        </Text>
        <View style={style.boxInput}>
          <Input
            IconLeft={MaterialIcons}
            iconLeftName='search'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <FlatList
        data={filteredCryptos}
        keyExtractor={(item) => item.id}
        renderItem={renderCryptoItem}
      />
    </View>
  );
}
