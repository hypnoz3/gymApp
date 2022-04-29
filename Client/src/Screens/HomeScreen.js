import React from "react";
import Background from "../components/Background";



export default function HomeScreen() {


    return (
        <Background>
        <View>
        <Header style={styles.textWithShadow}>START HERE</Header>
  
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
      </View>
        </Background>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100,
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