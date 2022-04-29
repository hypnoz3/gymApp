import React from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createMaterialBottomTabNavigator();

import {
    LoginScreen,
    Dashboard,
    Settings
  } from '../Screens'


  

export default function StartScreen({ navigation }) {
  return (
      <Tab.Navigator
        activeColor="black"
        barStyle={{ backgroundColor: '#910c03' }}
      >
        <Tab.Screen
          name="Profile"
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={24} />
            ),
          }}
        />
        
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Logout"
          component={LoginScreen}
          options={{
            tabBarLabel: 'Logout',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="door" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    
  )
}

const styles = StyleSheet.create({
  textWithShadow:{
     
      fontSize: 30,
      color: 'white',
      fontWeight: "bold"
      
  }
});