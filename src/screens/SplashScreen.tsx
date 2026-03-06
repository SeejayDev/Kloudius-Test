import { View, Text } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';

const SplashScreen = () => {
  return (
    <View style={tailwind`items-center justify-center flex-1`}>
      <Text style={tailwind`font-bold text-xl`}>WELCOME TO</Text>
      <Text style={tailwind`font-bold text-5xl`}>THE</Text>
      <Text style={tailwind`font-bold text-3xl`}>LOGIN APP</Text>

      <Text style={tailwind`mt-8`}>Checking your credentials...</Text>
    </View>
  );
};

export default SplashScreen;
