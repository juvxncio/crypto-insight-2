import React, { useState } from "react";
import {Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { style } from "./styles";
import Logo from '../../assets/logo.png'
import Arroba from '../../assets/arroba.png'
import Cadeado from '../../assets/cadeado.png'
import { themas } from "../../global/themes";
import { InputFieldLogin } from "../../components/inputLogin";
import { Button } from "../../components/button";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { InputFieldRegister } from "../../components/inputRegister";
import Usuario from '../../assets/usuario.png'

export default function Register() {

    return(
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image
                source={Logo}
                style={style.logo}
                resizeMode="contain"
                />
                <Text style={style.textCadastro}>Cadastro</Text>
            </View>
            <View style={style.boxMid}>
                <InputFieldRegister
                    icon={Usuario}
                    label="Nome de usuário"
                    placeholder="Digite um nome de usuário"
                    // value={username}
                    // onChangeText={setEmail}
                />
                <InputFieldRegister
                    icon={Arroba}
                    label="E-mail"
                    placeholder="Digite um endereço de e-mail"
                    // value={username}
                    // onChangeText={setEmail}
                />
                <InputFieldRegister
                    icon={Cadeado}
                    label="Senha"
                    placeholder="Digite uma Senha"
                    // value={username}
                    // onChangeText={setEmail}
                />
                <InputFieldRegister
                    icon={Cadeado}
                    label="Confirmação de Senha"
                    placeholder="Confirme a senha"
                    // value={username}
                    // onChangeText={setEmail}
                />
            </View>
            <View style={style.boxBottom}>
                <Button title="Cadastrar" onPress={function (): void {
                    throw new Error("Function not implemented.");
                } } loading={false}/>
            </View>
        </View>
    )
}