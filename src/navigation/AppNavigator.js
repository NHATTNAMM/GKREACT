import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CuisineScreen from '../screens/CuisineScreen';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import { useMyContextController } from '../store';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { dispatch } = useMyContextController();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        labelStyle={{ color: '#FF3B30', fontWeight: 'bold' }}
        onPress={() => {
          dispatch({ type: 'USER_LOGOUT' });
          props.navigation.navigate('Login');
        }}
      />
    </DrawerContentScrollView>
  );
}

const MainDrawer = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Cuisine" component={CuisineScreen} options={{ title: 'Choose Cuisine' }} />
    <Drawer.Screen name="Cart" component={CartScreen} options={{ title: 'Your Cart' }} />
  </Drawer.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Create Account' }} />
      <Stack.Screen name="Main" component={MainDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={MenuScreen} options={({ route }) => ({ title: `${route.params.category} Menu` })} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} options={{ title: 'Payment Confirmation' }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: 'Reset Password' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator; 