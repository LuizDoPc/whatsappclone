import React from 'react';
import { View, Text, Button, Image, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default props => (
  <ImageBackground style={{ flex: 1 }} source={require('../img/bg.png')}>
    <View style={{ flex: 1, padding: 15 }}>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'white' }}>Seja Bem-vindo</Text>
        <Image source={require('../img/logo.png')} />
      </View>
      <View style={{ flex: 1 }}>
        <Button title="Fazer Login" onPress={() => Actions.formlogin()} />
      </View>
    </View>
  </ImageBackground>
);
