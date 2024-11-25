import React, { useEffect, useState } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { style } from "./styles";
import { getUserProfile, logoutUser } from "../../api";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useFavorites } from "../../context/favoritesContext";
import profilePicture from "../../assets/profilePicture2.png";
import logoutIcon from "../../assets/botaoSair.png";

export default function User() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { favorites } = useFavorites();
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const data = await getUserProfile();
        setUsername(data.username);
      } catch (error) {
        console.error("Erro ao carregar perfil do usuário:", error);
      }
    }

    fetchUserProfile();
  }, []);

  async function handleLogout() {
    setError(null);
    setLoading(true);
    try {
      await logoutUser();
      setLoading(false);
      navigation.navigate("Login");
    } catch (err) {
      setLoading(false);
      setError("Erro ao realizar logout. Tente novamente.");
      console.error("Erro no logout:", err);
    }
  }

  const renderCrypto = ({ item }: { item: { name: string; symbol: string } }) => (
    <View style={style.cryptoItem}>
      <Text style={style.cryptoName}>
        {item.name} ({item.symbol.toUpperCase()})
      </Text>
    </View>
  );

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
          <Image source={logoutIcon} style={style.logoutIcon} />
        </TouchableOpacity>
        <Text style={style.username}>
          {username ? `${username}` : "Usuário"}
        </Text>
      </View>

      <View style={style.profileContainer}>
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
          ListEmptyComponent={<Text style={style.emptyText}>Nenhuma moeda favorita.</Text>}
        />
      </View>
    </View>
  );
}
