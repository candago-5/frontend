import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';

interface OnboardingScreenProps {
  onQuickRegister: () => void;
  onAccessAccount: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onQuickRegister,
  onAccessAccount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Registro rápido"
          onPress={onQuickRegister}
          variant="primary"
          icon="camera-outline"
          style={styles.quickRegisterButton}
        />

        <Button
          title="Acessar minha conta"
          onPress={onAccessAccount}
          variant="outline"
          style={styles.accessAccountButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
  },
  quickRegisterButton: {
    marginBottom: 8,
  },
  accessAccountButton: {
    marginBottom: 8,
  },
});

export default OnboardingScreen;