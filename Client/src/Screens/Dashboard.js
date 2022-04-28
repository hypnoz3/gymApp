import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";




export default function Dashboard({ navigation }) {
  const [people, setPeople] = useState([
    { name: 'Uusi treeni', id: '1' },
    { name: 'Treenit', id: '2' },
    { name: 'Tilastot', id: '3' },
    { name: 'Asetukset', id: '4' }
    
  ]);


  return (
   <FlatList 
        style={styles.container}
        keyExtractor={(item) => item.id} 
        data={people} 
        renderItem={({ item }) => ( 
          <Text style={styles.item}>{item.name}</Text>
        )}
      />

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#101010'
  },
  item: {
    flex: 1,
    marginHorizontal: 0,
    marginTop: 2,
    padding: 15,
    marginBottom: 2,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    borderColor: 'grey',
    width:'100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202020',
    textAlign: 'center'

    
  },
});