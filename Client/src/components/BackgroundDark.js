import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View } from 'react-native'

import { theme } from '../core/theme'

export default function BackgroundDark({ children }) {
  return (
    <View style={styles.black}>
      <View style={styles.container}>{children}</View>
      </View>
      
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    zIndex: -1,
    width: '100%',
    backgroundColor: theme.colors.surface,


  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    
  }
}
)