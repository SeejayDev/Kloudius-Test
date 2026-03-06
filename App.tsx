/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { AuthContext, useAuthContextValue } from './src/contexts/AuthContext';
import { SystemBars } from 'react-native-edge-to-edge';
import AppRouter from './AppRouter';
import AppPreloader from './AppPreloader';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const authContext = useAuthContextValue();

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <NavigationContainer>
          <AuthContext value={authContext}>
            <SystemBars style="dark" />
            <AppPreloader />
          </AuthContext>
        </NavigationContainer>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
