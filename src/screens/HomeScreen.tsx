import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import tailwind from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import BasicButton from '../components/BasicButton';
import { sleep } from '../helpers/sleep';

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await sleep(1000);
    await logout();
    setIsLoggingOut(false);
  }

  return (
    <SafeAreaView style={tailwind`px-4`}>
      <View style={tailwind`gap-8`}>
        <Text style={tailwind`text-xl font-bold mt-8`}>
          Welcome back, {user?.name}!
        </Text>

        <View>
          <Text>In case you forgot, your email is:</Text>
          <Text style={tailwind`font-bold text-lg`}>{user?.email}</Text>
        </View>

        <BasicButton
          isLoading={isLoggingOut}
          label="Logout"
          onPress={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
