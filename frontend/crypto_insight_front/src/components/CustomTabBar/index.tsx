import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { style } from './styles';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { themas } from '../../global/themes';

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {

  const go = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={style.tabArea}>
      <TouchableOpacity style={style.tabItem} onPress={() => go('Home')}>
        <AntDesign
          name='bars'
          style={{
            opacity: state.index === 0 ? 1 : 0.3,
            color: themas.colors.primary,
            fontSize: 32,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={style.tabItem} onPress={() => go('User')}>
        <FontAwesome
          name='user'
          style={{
            opacity: state.index === 1 ? 1 : 0.3,
            color: themas.colors.primary,
            fontSize: 32,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
