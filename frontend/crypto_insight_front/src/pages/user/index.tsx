import React, { useEffect, useState } from "react";
import { Image, Text, View, FlatList } from "react-native";
import { style } from "./styles";
import profilePicture from '../../assets/profilePicture2.png';
import { getUserProfile, getUserFavorites } from "../../api";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
}

export default function User() {
  const [username, setUsername] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Crypto[]>([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserProfile();
        setUsername(userData.username);

        const favoriteCryptos = await getUserFavorites();
        setFavorites(favoriteCryptos);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }

    fetchUserData();
  }, []);

  const renderCrypto = ({ item }: { item: Crypto }) => (
    <View style={style.cryptoItem}>
      <Text style={style.cryptoName}>{item.name} ({item.symbol.toUpperCase()})</Text>
      <Text style={style.cryptoPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={style.container}>
      <View style={style.header} />
      <View style={style.profileContainer}>
        <Image
          source={profilePicture}
          style={style.profileImage}
        />
        <Text style={style.username}>{username || "Usuário"}</Text>
      </View>
      <View style={style.favoritesContainer}>
        <Text style={style.favoritesTitle}>Criptomoedas Favoritas</Text>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderCrypto}
          ListEmptyComponent={<Text style={style.emptyText}>Nenhuma criptomoeda favorita.</Text>}
        />
      </View>
    </View>
  );
}
