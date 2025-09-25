import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  return (
    <ImageBackground
      source={require('../assets/images/dog-park-background.png')}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Main Login Panel */}
      <View style={styles.loginPanel}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Image
              source={require('../assets/images/dog-spotter-logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Camera Button */}
      <TouchableOpacity style={styles.cameraButton}>
        <Ionicons name="camera" size={24} color="white" />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPanel: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.1,
    right: width * 0.1,
    backgroundColor: '#2D5016',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 80,
  },
  loginButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraButton: {
    position: 'absolute',
    bottom: height * 0.1,
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#2D5016',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
