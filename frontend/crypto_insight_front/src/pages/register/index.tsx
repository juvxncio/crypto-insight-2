import React, { useState } from 'react';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { style } from './styles';
import Logo from '../../assets/logo.png';
import Arroba from '../../assets/arroba.png';
import Cadeado from '../../assets/cadeado.png';
import Usuario from '../../assets/usuario.png';
import CadeadoConfirm from '../../assets/confirmsenha.png';
import { Button } from '../../components/button';
import { InputFieldRegister } from '../../components/inputRegister';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import api from '../../api';
import { CustomAlert } from '../../components/customalert';
import { ButtonVoltar } from '../../components/buttonVoltar';

export default function Register() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleRegister() {
        setError('');

        if (!username || !email || !password || !confirmPassword) {
            setError('Todos os campos são obrigatórios!');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem!');
            return;
        }

        if (password == username) {
            setError('A senha é muito similar ao nome de usuário')
            return;
        }

        try {
            setLoading(true);

            await api.post('auth/registration/', {
                username: username,
                email: email,
                password1: password,
                password2: confirmPassword,
            });

            setError('');
            navigation.navigate('Login');

        } catch (error: any) {
            const errorMessage = error.response?.data || 'Não foi possível realizar o cadastro.';
            console.error('Erro no cadastro:', errorMessage);
            setError(JSON.stringify(errorMessage));
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={Logo} style={style.logo} resizeMode='contain' />
                <Text style={style.textCadastro}>Cadastro</Text>
            </View>
            <View style={style.boxMid}>
                <InputFieldRegister
                    icon={Usuario}
                    label='Nome de usuário'
                    placeholder='Digite um nome de usuário'
                    value={username}
                    onChangeText={setUsername}
                />
                <InputFieldRegister
                    icon={Arroba}
                    label='E-mail'
                    placeholder='Digite um endereço de e-mail'
                    value={email}
                    onChangeText={setEmail}
                />
                <InputFieldRegister
                    icon={Cadeado}
                    label='Senha'
                    placeholder='Digite uma senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <InputFieldRegister
                    icon={CadeadoConfirm}
                    label='Confirmação de Senha'
                    placeholder='Confirme a senha'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true}
                />
            {loading && <ActivityIndicator size='large' color='#0000ff' />}
            {error && <CustomAlert message={error} type='error' />}
            </View>
            <View style={style.boxBottom}>
                <Button title='Cadastrar' onPress={handleRegister} loading={loading} />
                <ButtonVoltar title='Voltar' onPress={() => navigation.navigate('Login')} loading={loading}></ButtonVoltar>
            </View>
        </View>
    );
}
