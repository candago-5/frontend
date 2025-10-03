import React, { useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  View
} from 'react-native';
import { Colors } from './constants/colors';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { useCamera } from './hooks/useCamera';
import { LoginScreen } from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';
import OnboardingScreen from './screens/OnboardingScreen';


const AppWithCamera: React.FC = () => {
  const { takePhoto } = useCamera();

  const handleQuickRegister = async () => {
    try {
      const photoUri = await takePhoto();
      if (photoUri) {
        console.log('Foto tirada:', photoUri);
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
    }
  };

  return (
    <NavigationProvider>
      <AppContentWithCamera onQuickRegister={handleQuickRegister} />
    </NavigationProvider>
  );
};

const AppContentWithCamera: React.FC<{ onQuickRegister: () => void }> = ({ onQuickRegister }) => {
  const { currentScreen, navigateTo } = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleAccessAccount = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      navigateTo('login');
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return (
          <OnboardingScreen
            onQuickRegister={onQuickRegister}
            onAccessAccount={handleAccessAccount}
          />
        );
      case 'login':
      case 'register':
        return <LoginScreen />;
      case 'map':
        return <MapScreen />;
      default:
        return (
          <OnboardingScreen
            onQuickRegister={onQuickRegister}
            onAccessAccount={handleAccessAccount}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Exibe o cachorro apenas nas telas de onboarding, login e registro */}
      {(currentScreen === 'onboarding' || currentScreen === 'login' || currentScreen === 'register') && (
        <>
          <View style={styles.topSection}>
            <View style={styles.dogContainer}>
            </View>
          </View>
          <View style={styles.dogImageContainer}>
            <Image
              source={require('../assets/images/bigo.png')}
              style={styles.dogImage}
              resizeMode="contain"
            />
          </View>
        </>
      )}
      <Animated.View style={[styles.bottomSection, { opacity: fadeAnim }]}> 
        {renderCurrentScreen()}
      </Animated.View>
    </View>
  );
};

export default function App() {
  return <AppWithCamera />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.4,
    backgroundColor: Colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'relative',
  },
  dogContainer: {
    marginTop: -150,
    width: 300,
    height: 300,
    backgroundColor: Colors.yellow,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dogImageContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    width: 200,
    height: 200,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogImage: {
    width: 400,
    height: 400,
    marginTop: -415,
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -50,
    zIndex: 5,
  },
});
