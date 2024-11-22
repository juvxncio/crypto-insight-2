import React, { useState, useEffect } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { style } from "./styles";
import profilePicture from '../../assets/profilePicture2.png';
import botaoSair from '../../assets/botaoSair.png';
import { getUserProfile, logoutUser } from "../../api";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
}

export default function User() {
  const [username, setUsername] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserProfile();
        setUsername(userData.username);

        // const favoriteCryptos = await getUserFavorites(); // Se necessário, busque os favoritos
        // setFavorites(favoriteCryptos);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }

    fetchUserData();
  }, []);

  async function handleLogout() {
    setError("");
    setLoading(true);
    try {
      await logoutUser();

      setLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      setLoading(false);
      setError("Erro ao realizar logout. Tente novamente.");
    }
  }

  const renderCrypto = ({ item }: { item: Crypto }) => (
    <View style={style.cryptoItem}>
      <Text style={style.cryptoName}>{item.name} ({item.symbol.toUpperCase()})</Text>
      <Text style={style.cryptoPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
          <Image source={botaoSair} style={style.logoutIcon} />
        </TouchableOpacity>
      </View>

      <View style={style.profileContainer}>
        <Text style={style.username}>{username || "Usuário"}</Text>
        <Image source={profilePicture} style={style.profileImage} />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={style.errorMessage}>{error}</Text>}

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
