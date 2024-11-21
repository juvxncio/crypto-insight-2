import { StyleSheet } from 'react-native';
import './gesture-handler';
import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

export default function App() {
  return (
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});