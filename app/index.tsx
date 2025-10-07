import { router } from 'expo-router';
import React, { useRef } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Colors } from './constants/colors';
import { useCamera } from './hooks/useCamera';
import { OnboardingScreen } from './screens/OnboardingScreen';

const AppContent: React.FC = () => {
  const { takePhoto } = useCamera();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleQuickRegister = async () => {
    try {
      const photoUri = await takePhoto();
      if (photoUri) {
        console.log('Foto tirada:', photoUri);
        // Navigate to register dog screen after taking photo
        router.push({
          pathname: '/registerdog',
          params: { photoUri }
        });
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
    }
  };

  const handleAccessAccount = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Navigate to login screen
      router.push('/login');
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
        <Animated.View style={[styles.contentSection, { opacity: fadeAnim }]}> 
          <OnboardingScreen
            onQuickRegister={handleQuickRegister}
            onAccessAccount={handleAccessAccount}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default function Index() {
  return <AppContent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSection: {
    minHeight: 300,
    backgroundColor: Colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'relative',
    paddingVertical: 40,
  },
  dogContainer: {
    marginTop: -50,
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
  contentSection: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -50,
    zIndex: 5,
    minHeight: 400,
  },
});