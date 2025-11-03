import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface RegistrationSentScreenProps {
  onGoToLogin?: () => void;
}

export const RegistrationSentScreen: React.FC<RegistrationSentScreenProps> = ({
  onGoToLogin,
}) => {
  const handleGoToLogin = () => {
    if (onGoToLogin) {
      onGoToLogin();
      return;
    }
    // fallback to router if no prop provided
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Registro enviado</Text>
        <Text style={styles.message}>
          Seu registro foi enviado com sucesso.
        </Text>

        <Button
          title="Ir para Login"
          onPress={handleGoToLogin}
          variant="primary"
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.sizes.large,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.darkBlue,
    marginBottom: 12,
  },
  message: {
    fontSize: Typography.sizes.medium,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.darkBlue,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  button: {
    width: '100%',
  },
});

export default RegistrationSentScreen;