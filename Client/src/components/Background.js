import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { theme } from '../core/theme'
import { BlurView } from 'expo-blur'

export default function Background({ children }) {
  return (
    
    <ImageBackground
      source={require('../assets/gym-wallpaper-idlewp-9.jpg')}
      
      style={styles.background}
    >
      <View style={styles.container}>{children}</View>
      
      
    </ImageBackground>
    
   
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    
    width: '100%',
    tintColor: "#000000",
    backgroundColor: theme.colors.surface,

  },
  container: {
    flex: 1,
    zIndex:1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  black: {
    zIndex: 2,
    height: '100%', 
    width: '100%', 
  
  }
})