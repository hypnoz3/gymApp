import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    Dashboard,
  } from '../Screens'


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const loggedIn = true;
    const LogOut = () => {
        loggedIn = false;
      }
    return (
  <Stack.Navigator
  screenOptions={{
    headerShown: false
  }}
  >
      
      {loggedIn ? <>
    <Stack.Screen
    name="Home"
    component={StartScreen} // <----
  />  

  
<Stack.Screen
  name="Dashboard"
  component={Dashboard} // <----
/>
</>
    : <>
    <Stack.Screen
      name="Login"
      component={LoginScreen} // <----
    />
    <Stack.Screen
  name="Register"
  component={RegisterScreen} // <----
/>
    </>}
    
    
   
  </Stack.Navigator>
)};