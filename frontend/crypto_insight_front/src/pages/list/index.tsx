import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { style } from "./styles";
import { Input } from "../../components/inputHome";
import { MaterialIcons } from "@expo/vector-icons";
import { getUserProfile, getCryptoList, removerFavorito, favoritarMoeda, getFavorites } from "../../api";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_7d_in_currency: number;
  image: string;
  isFavorite: boolean;
}

export default function List() {
  const [username, setUsername] = useState<string | null>(null);
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return "Bom dia";
    } else if (hour >= 12 && hour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  };

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const data = await getUserProfile();
        setUsername(data.username);
      } catch (error) {
        console.error("Erro ao carregar perfil do usuário:", error);
      }
    }

    async function fetchCryptoList() {
      try {
        const cryptoData = await getCryptoList();
        const favoritos = await getFavorites(); // Buscando favoritos do backend

        const cryptoListWithFavorites = cryptoData.map((crypto: Crypto) => ({
          ...crypto,
          isFavorite: favoritos.some((fav: { moeda_id: string }) => fav.moeda_id === crypto.id),
        }));

        setCryptos(cryptoListWithFavorites);
        setFilteredCryptos(cryptoListWithFavorites);
      } catch (error) {
        console.error("Erro ao carregar lista de criptomoedas:", error);
      }
    }

    fetchUserProfile();
    fetchCryptoList();
  }, []);

  useEffect(() => {
    const filtered = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCryptos(filtered);
  }, [searchQuery, cryptos]);

  const toggleFavorite = async (crypto: Crypto) => {
    try {
      if (crypto.isFavorite) {
        await removerFavorito(crypto.id);
        setCryptos((prev) =>
          prev.map((item) =>
            item.id === crypto.id ? { ...item, isFavorite: false } : item
          )
        );
      } else {
        await favoritarMoeda(crypto.id, crypto.name, crypto.symbol);
        setCryptos((prev) =>
          prev.map((item) =>
            item.id === crypto.id ? { ...item, isFavorite: true } : item
          )
        );
      }
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
    }
  };

  const renderCryptoItem = ({ item }: { item: Crypto }) => {
    const isPositive = item.price_change_percentage_7d_in_currency >= 0;
    return (
      <View style={style.cryptoItem}>
        <Image source={{ uri: item.image }} style={style.cryptoIcon} />
        <View style={style.cryptoInfo}>
          <Text style={style.cryptoName}>{item.name}</Text>
          <Text style={style.cryptoSymbol}>{item.symbol.toUpperCase()}</Text>
        </View>
        <View style={style.cryptoPriceInfo}>
          <Text style={style.cryptoPrice}>R$ {item.current_price.toFixed(2)}</Text>
          <Text style={[style.cryptoChange, { color: isPositive ? "green" : "red" }]}>
            {isPositive ? "▲" : "▼"} {Math.abs(item.price_change_percentage_7d_in_currency).toFixed(2)}% (7d)
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Image
            source={
              item.isFavorite
                ? require("../../assets/estrelaCheia.png")
                : require("../../assets/estrelaVazia.png")
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
          {getGreeting()}, <Text style={{ fontWeight: "bold" }}>{username || "Usuário"}</Text>
        </Text>
        <View style={style.boxInput}>
          <Input
            IconLeft={MaterialIcons}
            iconLeftName="search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <View style={style.boxList}>
        <FlatList
          data={filteredCryptos}
          keyExtractor={(item) => item.id}
          renderItem={renderCryptoItem}
        />
      </View>
    </View>
  );
}