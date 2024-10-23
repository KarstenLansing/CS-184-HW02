// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { auth } from './firebase';

const ProfileScreen = ({ navigation }) => {
    const handleSignOut = () => {
        auth.signOut();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>This is the Profile Screen.</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
    },
});
