import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { Logo } from '../components/Logo';
import { TabButton } from '../components/TabButton';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { useAuth } from '../contexts/AuthContext';

interface LoginScreenProps {
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { login, register } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        Alert.alert('Erro', result.error || 'Erro ao fazer login');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    // Validation
    if (!email || !password || !confirmEmail || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    if (email !== confirmEmail) {
      Alert.alert('Erro', 'Os emails não coincidem');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(email, password);

      if (result.success) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!', [
          {
            text: 'OK',
            onPress: () => {
              if (onLoginSuccess) {
                onLoginSuccess();
              }
            },
          },
        ]);
      } else {
        Alert.alert('Erro', result.error || 'Erro ao criar conta');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Em breve', 'Login com Google será implementado em breve!');
  };

  const handleForgotPassword = () => {
    Alert.alert('Em breve', 'Recuperação de senha será implementada em breve!');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        <View style={styles.tabsContainer}>
          <TabButton
            title="Login"
            isActive={activeTab === 'login'}
            onPress={() => setActiveTab('login')}
            position="left"
          />
          <TabButton
            title="Criar conta"
            isActive={activeTab === 'register'}
            onPress={() => setActiveTab('register')}
            position="right"
          />
        </View>

        <View style={styles.formContainer}>
          {activeTab === 'login' ? (
            <>
              <InputField
                placeholder="Email"
                icon="mail-outline"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <InputField
                placeholder="Senha"
                icon="lock-closed-outline"
                isPassword
                value={password}
                onChangeText={setPassword}
              />
            </>
          ) : (
            <>
              <InputField
                placeholder="Email"
                icon="mail-outline"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <InputField
                placeholder="Confirme seu email"
                icon="mail-outline"
                value={confirmEmail}
                onChangeText={setConfirmEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <InputField
                placeholder="Senha"
                icon="lock-closed-outline"
                isPassword
                value={password}
                onChangeText={setPassword}
              />
              <InputField
                placeholder="Confirme sua senha"
                icon="lock-closed-outline"
                isPassword
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </>
          )}

          {activeTab === 'login' && (
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setKeepLoggedIn(!keepLoggedIn)}
              >
                {keepLoggedIn && (
                  <Ionicons name="checkmark" size={16} color={Colors.darkBlue} />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>Manter conectado</Text>
              <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>
          )}

          <Button
            title={isLoading ? '' : (activeTab === 'login' ? 'Entrar' : 'Criar conta')}
            onPress={activeTab === 'login' ? handleLogin : handleRegister}
            variant="primary"
            style={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading && <ActivityIndicator color="#fff" />}
          </Button>

          <View style={styles.separatorContainer}>
            <Text style={styles.separatorText}>ou entrar com</Text>
          </View>

          <Button
            title="Google"
            onPress={handleGoogleLogin}
            variant="secondary"
            icon="logo-google"
            style={styles.googleButton}
          />

          <TouchableOpacity onPress={handleBack} style={styles.backContainer}>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 4,
  },
  formContainer: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxText: {
    fontSize: Typography.sizes.medium,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.darkBlue,
    flex: 1,
  },
  forgotPassword: {
    padding: 4,
  },
  forgotPasswordText: {
    fontSize: Typography.sizes.medium,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.darkBlue,
  },
  submitButton: {
    marginBottom: 24,
  },
  separatorContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  separatorText: {
    fontSize: Typography.sizes.small,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.darkBlue,
  },
  googleButton: {
    marginBottom: 32,
  },
  backContainer: {
    alignItems: 'center',
  },
  backText: {
    fontSize: Typography.sizes.medium,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.darkBlue,
  },
});

export default LoginScreen;
