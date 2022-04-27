import * as React from 'react';
import { Container, Image,TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import image from './assets/gym-wallpaper-idlewp-9.jpg'
import { Fragment } from 'react/cjs/react.production.min';


function HomeScreen({navigation}) {
  return (
    <View >
      <Image source={image} style={styles.backgroundImage} />
      <Fragment style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <TouchableOpacity
        title="Go to Details"
        style={styles.button}
        onPress={() => navigation.push('Details')}>
          <Text style={styles.btntext}>Details</Text>
    </TouchableOpacity>
       <TouchableOpacity
        title="Workouts"
        style={styles.button}

        onPress={() => navigation.push('Workouts')}
        >
          <Text style={styles.btntext}>Workouts</Text>
        </TouchableOpacity>
        </Fragment>
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
   
    <Button title="Go back" onPress={() => navigation.goBack()} />
    
  </View>
  );
}

function Workouts({navigation}) {
  return (
    <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
      <Button style={styles.button} title="Go back" onPress={() => navigation.goBack()} />
      </View>

  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Workouts" component={Workouts} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffddd',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 3,
    elevation: 3,
    backgroundColor: '#a80a15',
  },
  btntext:{
    textAlign:'center',
    color: '#fff',
   },
   backgroundImage: {
    flex: 1,
    width: '100%',
    height: '50%',
    
   
}
});

