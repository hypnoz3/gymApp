import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';





export default function Settings() {
  const [people, setPeople] = useState([
    { name: 'Teema', id: '1' },
    { name: 'Info', id: '2' },
  
    
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