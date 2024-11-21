import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image } from "react-native";
import { style } from "./styles";
import { Input } from "../../components/inputHome";
import { MaterialIcons } from "@expo/vector-icons";
import { getUserProfile, getCryptoList } from "../../api";

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_7d_in_currency: number;
    image: string;
}

export default function List() {
    const [username, setUsername] = useState<string | null>(null);
    const [cryptos, setCryptos] = useState<Crypto[]>([]);

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
                setCryptos(cryptoData);
            } catch (error) {
                console.error("Erro ao carregar lista de criptomoedas:", error);
            }
        }

        fetchUserProfile();
        fetchCryptoList();
    }, []);

    const renderCryptoItem = ({ item }: { item: Crypto }) => {
        const isPositive = item.price_change_percentage_7d_in_currency >= 0;
        return (
            <View style={style.cryptoItem}>
                <Image source={{ uri: item.image }} style={style.cryptoIcon} />
                <View style={style.cryptoInfo}>
                    <Text style={style.cryptoName}>{item.name} ({item.symbol.toUpperCase()})</Text>
                    <Text style={style.cryptoPrice}>R$ {item.current_price.toFixed(2)}</Text>
                </View>
                <Text style={[style.cryptoChange, { color: isPositive ? "green" : "red" }]} >
                    {isPositive ? "▲" : "▼"} {Math.abs(item.price_change_percentage_7d_in_currency).toFixed(2)}% (7d)
                </Text>
            </View>
        );
    };

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.greeting}>
                    {getGreeting()}, <Text style={{ fontWeight: 'bold' }}>{username || "Usuário"}</Text>
                </Text>
                <View style={style.boxInput}>
                    <Input IconLeft={MaterialIcons} iconLeftName="search" />
                </View>
            </View>
            <View style={style.boxList}>
                <FlatList
                    data={cryptos}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCryptoItem}
                />
            </View>
        </View>
    );
}
