import React from 'react'
import Background from '../components/Background'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <Background>
    
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
    </Background>
  )
}

const styles = StyleSheet.create({
  textWithShadow:{
      textShadowColor: 'black',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      fontSize: 30,
      color: 'white',
      fontWeight: "bold"
      
  }
});