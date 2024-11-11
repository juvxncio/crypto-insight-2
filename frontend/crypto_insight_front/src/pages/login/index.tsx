import React, { useState } from "react";
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import { style } from "./styles";
import Logo from '../../assets/logo.png'
import Arroba from '../../assets/arroba.png'
import Cadeado from '../../assets/cadeado.png'
import { themas } from "../../global/themes";

export default function Login() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                <View style={style.boxInput}>
                    <TextInput
                        style={style.input}
                        placeholder="Insira seu endereço de e-mail"
                        placeholderTextColor={'#A3A3A3'}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Image
                        source={Arroba}
                        />
                </View>
                <View style={style.boxInput}>

                    <TextInput
                        style={style.input}
                        placeholder="Digite sua senha"
                        placeholderTextColor={'#A3A3A3'}
                        value={password}
                        onChangeText={setPassword}
                        />
                    <Image
                        source={Cadeado}
                        />
                </View>
            </View>
            <View style={style.boxBottom}>
                <TouchableOpacity style={style.button}>
                    <Text style={style.textButton}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <Text style={style.textBottom}>Ainda não possui uma conta? <Text style={{color:themas.colors.primary}}>Cadastre-se</Text></Text>
        </View>
    )
}