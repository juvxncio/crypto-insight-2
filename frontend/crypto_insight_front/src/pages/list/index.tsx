import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList, Image } from "react-native";
import { style } from "./styles";
import { Input } from "../../components/inputHome";
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { getUserProfile } from "../../api";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number | null;
  change: number | null;
  logo: string;
}

export default function List() {
    const [username, setUsername] = useState<string | null>(null);
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);

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
        fetchUserProfile();
    }, []);

    useEffect(() => {
        fetchCryptos();
    }, [page]);

    const fetchCryptos = async () => {
        if (loading || loadingMore) return;

        if (page === 1) setLoading(true);
        else setLoadingMore(true);

        try {
            const response = await axios.get(
                'https://api.coingecko.com/api/v3/coins/markets',
                {
                    params: {
                        vs_currency: 'brl',
                        order: 'market_cap_desc',
                        per_page: 10,
                        page: page,
                    },
                }
            );
            const data = response.data.map((crypto: any) => ({
                id: crypto.id,
                name: crypto.name,
                symbol: crypto.symbol.toUpperCase(),
                price: crypto.current_price ?? null,
                change: crypto.price_change_percentage_7d_in_currency ?? null,
                logo: crypto.image,
            }));
            setCryptos(prevCryptos => page === 1 ? data : [...prevCryptos, ...data]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (!loadingMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const CryptoItem: React.FC<{ item: Crypto }> = ({ item }) => {
        const price = item.price !== null && !isNaN(item.price) ? item.price.toFixed(2) : "N/A";
        const change = item.change !== null && !isNaN(item.change) ? `${item.change.toFixed(2)}%` : "N/A";
        const changeColor = item.change && item.change >= 0 ? "green" : "red";

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item.logo }} style={{ width: 40, height: 40, marginRight: 10 }} />
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ fontSize: 14, color: 'gray' }}>{item.symbol}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>R${price}</Text>
                    <Text style={{ fontSize: 14, color: changeColor }}>{change} (7d)</Text>
                </View>
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
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={cryptos}
                        renderItem={({ item }) => <CryptoItem item={item} />}
                        keyExtractor={(item) => item.id}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                    />
                )}
            </View>
        </View>
    );
}
