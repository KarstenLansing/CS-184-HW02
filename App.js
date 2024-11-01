// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import CalendarScreen from './CalendarScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ user }) => {
  return (
    <View style={user ? styles.loggedInContainer : styles.container}>
      {user ? (
        <Text style={styles.loggedInText}>Welcome, {user.email}</Text>
      ) : (
        <Text>Please log in</Text>
      )}
    </View>
  );
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Monitor authentication state
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
    });
    return unsubscribe; // Clean up the listener on unmount
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        // User is signed in
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home">
            {(props) => <HomeScreen {...props} user={user} />}
          </Tab.Screen>
          <Tab.Screen name="Profile">
            {(props) => <ProfileScreen {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Calendar">
            {(props) => <CalendarScreen {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        // User is not signed in
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Styles for the HomeScreen
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loggedInContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingLeft: 20,
  },
  loggedInText: {
    fontSize: 18,
  },
});
