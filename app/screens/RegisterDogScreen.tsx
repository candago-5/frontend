import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../components/Button';

interface RegisterDogScreenProps {
  photoUri?: string;
}

const RegisterDogScreen: React.FC<RegisterDogScreenProps> = ({ photoUri }) => {
  const [description, setDescription] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registro</Text>

      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.preview} resizeMode="cover" />
      ) : null}

      <Text style={styles.label}>Descrição do cão:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: cão de porte médio, pelo curto..."
        multiline
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#95ACC3"
      />

      <View style={styles.buttons}>
        <View style={styles.spacer} />
        <Button
          title="Enviar registro"
          variant="primary"
          onPress={() => {
            // navegar para a tela de registro enviado
            router.push('/screens/RegisterSentScreen');
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F0F8FF',
    alignItems: 'stretch',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#203D59',
    marginBottom: 16,
  },
  preview: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#EEE',
  },
  label: {
    fontSize: 14,
    color: '#203D59',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#DFE7EF',
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 120,
    padding: 12,
    marginBottom: 12,
    color: '#203D59',
    textAlignVertical: 'top',
  },
  buttons: {
    marginTop: 8,
  },
  spacer: {
    height: 12,
  },
});

export default RegisterDogScreen;