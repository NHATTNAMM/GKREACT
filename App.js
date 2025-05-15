import React from 'react';
import { MyContextControllerProvider } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <MyContextControllerProvider>
      <AppNavigator />
    </MyContextControllerProvider>
  );
};

export default App;
