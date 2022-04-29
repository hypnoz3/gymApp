import * as React from 'react';
import { BottomNavigation, Provider } from 'react-native-paper'
import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from './src/core/theme';
import { StatusBar } from 'expo-status-bar';


import RootNavigator from './src/components/RootNavigator';



export default function App() {
  return (
    
    <Provider theme={theme}>
      <NavigationContainer>
      <RootNavigator/>
      </NavigationContainer>
      <StatusBar style="light" />
      
    </Provider>
    
  );
}



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fffddd',
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 3,
//     elevation: 3,
//     backgroundColor: '#a80a15',
//   },
//   btntext:{
//     textAlign:'center',
//     color: '#fff',
//    },
//    backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '50%',
    
   
// }
// });

