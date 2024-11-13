import React, { useState } from "react";
import {Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { style } from "./styles";
import Logo from '../../assets/logo.png'
import Arroba from '../../assets/arroba.png'
import Cadeado from '../../assets/cadeado.png'
import { InputFieldLogin } from "../../components/inputLogin";
import { Button } from "../../components/button";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function Login() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function getLogin(){
        try {
            setLoading(true)
            
            if(!email || !password){
                return Alert.alert('Atenção', 'Informe os campos obrigatórios!')
            }

            navigation.reset({routes:[{name:'BottomRoutes'}]})

            console.log('LOGOU!')

        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return(
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image
                source={Logo}
                style={style.logo}
                resizeMode="contain"
                />
            </View>
            <View style={style.boxMid}>
                <InputFieldLogin
                icon={Arroba}
                placeholder="Insira seu endereço de e-mail"
                value={email}
                onChangeText={setEmail}
                />
                <InputFieldLogin
                    icon={Cadeado}
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>
            <View style={style.boxBottom}>
                <Button title="Entrar" onPress={getLogin} loading={loading} />
            </View>
            <View style={style.boxRegisterText}>
                <Text style={style.textBottom}>Ainda não possui uma conta?</Text>
                    <TouchableOpacity>
                        <Text style={style.textBottomRegister}> Cadastre-se</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}