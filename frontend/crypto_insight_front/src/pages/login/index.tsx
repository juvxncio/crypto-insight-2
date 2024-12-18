import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { style } from './styles';
import Logo from '../../assets/logo.png';
import Arroba from '../../assets/arroba.png';
import Cadeado from '../../assets/cadeado.png';
import { InputFieldLogin } from '../../components/inputLogin';
import { Button } from '../../components/button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api';
import { CustomAlert } from '../../components/customalert';

export default function Login() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

async function handleLogin() {
    try {
        setLoading(true);
        setError('');

        if (!email || !password) {
            setError('Informe os campos obrigatórios!');
            return;
        }

        const response = await api.post('auth/login/', {
            email: email,
            password: password,
        });

        const { key } = response.data;

        await AsyncStorage.setItem('access_token', key);

        navigation.reset({ routes: [{ name: 'BottomRoutes' }] });

    } catch (error) {
        console.error(error);
        setError('Não foi possível fazer login. Verifique suas credenciais.');
    } finally {
        setLoading(false);
    }
}

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={Logo} style={style.logo} resizeMode='contain' />
            </View>
            <View style={style.boxMid}>
                <InputFieldLogin
                    icon={Arroba}
                    placeholder='Insira seu endereço de e-mail'
                    value={email}
                    onChangeText={setEmail}
                />
                <InputFieldLogin
                    icon={Cadeado}
                    placeholder='Digite sua senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    />
                    {loading && <ActivityIndicator size='large' color='#0000ff' />}
                    {error && <CustomAlert message={error} type='error' />}
            </View>
            <View style={style.boxBottom}>
                <Button title='Entrar' onPress={handleLogin} loading={loading} />
            </View>
            <View style={style.boxRegisterText}>
                <Text style={style.textBottom}>Ainda não possui uma conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={style.textBottomRegister}> Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
