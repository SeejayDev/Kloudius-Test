import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './src/contexts/AuthContext';
import AppRouter from './AppRouter';
import SplashScreen from './src/screens/SplashScreen';
import { sleep } from './src/helpers/sleep';

const AppPreloader = () => {
  const { restorePreviousLogin } = useContext(AuthContext);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function checkForPreviousLogin() {
      await sleep(1000);
      await restorePreviousLogin();
      setIsReady(true);
    }

    checkForPreviousLogin();
  }, []);

  return !isReady ? <SplashScreen /> : <AppRouter />;
};

export default AppPreloader;
