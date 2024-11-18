import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { style } from "./styles";
import { Input } from "../../components/inputHome";
import { MaterialIcons } from '@expo/vector-icons'
import { getUserProfile } from "../../api";

export default function List() {
    const [username, setUsername] = useState<string | null>(null);

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

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.greeting}>
                    Bom dia, <Text style={{ fontWeight: 'bold' }}>{username || "Usuário"}</Text>
                </Text>
                <View style={style.boxInput}>
                    <Input IconLeft={MaterialIcons} iconLeftName="search" />
                </View>
            </View>
            <View style={style.boxList}>
            </View>
        </View>
    );
}