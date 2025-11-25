import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

interface RegisterDogScreenProps {
  photoUri?: string;
}

const RegisterDogScreen: React.FC<RegisterDogScreenProps> = ({ photoUri }) => {
  const { isAuthenticated } = useAuth();
  
  const [description, setDescription] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState<'pequeno' | 'medio' | 'grande'>('medio');
  const [status, setStatus] = useState<'encontrado' | 'perdido'>('encontrado');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    getCurrentLocation();
    
    // If we have a photo and user is authenticated, upload it immediately
    if (photoUri && isAuthenticated) {
      uploadImage(photoUri);
    }
  }, [photoUri, isAuthenticated]);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos da sua localização para registrar onde o cachorro foi visto.',
          [{ text: 'OK' }]
        );
        // Use default location if permission denied
        setLocation({ latitude: -23.527, longitude: -46.933 });
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      console.error('Error getting location:', error);
      // Use default location on error
      setLocation({ latitude: -23.527, longitude: -46.933 });
    }
  };

  const uploadImage = async (uri: string) => {
    setIsUploadingImage(true);
    
    try {
      const response = await api.uploadImage(uri);
      
      if (response.data?.imageUrl) {
        setUploadedImageUrl(response.data.imageUrl);
        console.log('Image uploaded:', response.data.imageUrl);
      } else if (response.error) {
        console.error('Upload error:', response.error);
        Alert.alert('Aviso', 'Não foi possível enviar a imagem, mas você pode continuar o registro.');
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!description.trim()) {
      Alert.alert('Erro', 'Por favor, adicione uma descrição do cachorro');
      return;
    }

    if (!location) {
      Alert.alert('Erro', 'Aguarde a localização ser obtida');
      return;
    }

    if (!isAuthenticated) {
      Alert.alert(
        'Login necessário',
        'Você precisa estar logado para registrar um cachorro. Deseja fazer login agora?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Fazer Login', onPress: () => router.push('/login') },
        ]
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.createDog({
        description: description.trim(),
        imageUrl: uploadedImageUrl || undefined,
        latitude: location.latitude,
        longitude: location.longitude,
        breed: breed.trim() || undefined,
        color: color.trim() || undefined,
        size,
        status,
      });

      if (response.data?.dog) {
        Alert.alert(
          'Sucesso! 🐶',
          'Cachorro registrado com sucesso! Obrigado por ajudar.',
          [
            {
              text: 'Ver no mapa',
              onPress: () => router.replace('/Map'),
            },
          ]
        );
      } else if (response.error) {
        Alert.alert('Erro', response.error.message || 'Erro ao registrar cachorro');
      }
    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registrar Cachorro</Text>

      {photoUri ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: photoUri }} style={styles.preview} resizeMode="cover" />
          {isUploadingImage && (
            <View style={styles.uploadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.uploadingText}>Enviando imagem...</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>Nenhuma foto selecionada</Text>
        </View>
      )}

      <Text style={styles.label}>Descrição do cão: *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: cão de porte médio, pelo curto, muito dócil..."
        multiline
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#95ACC3"
      />

      <Text style={styles.label}>Raça (opcional):</Text>
      <TextInput
        style={styles.inputSingle}
        placeholder="Ex: Vira-lata, Labrador, SRD..."
        value={breed}
        onChangeText={setBreed}
        placeholderTextColor="#95ACC3"
      />

      <Text style={styles.label}>Cor (opcional):</Text>
      <TextInput
        style={styles.inputSingle}
        placeholder="Ex: Caramelo, Preto, Branco com manchas..."
        value={color}
        onChangeText={setColor}
        placeholderTextColor="#95ACC3"
      />

      <Text style={styles.label}>Porte:</Text>
      <View style={styles.optionsRow}>
        {(['pequeno', 'medio', 'grande'] as const).map((s) => (
          <Button
            key={s}
            title={s === 'pequeno' ? 'Pequeno' : s === 'medio' ? 'Médio' : 'Grande'}
            variant={size === s ? 'primary' : 'outline'}
            onPress={() => setSize(s)}
            style={styles.optionButton}
          />
        ))}
      </View>

      <Text style={styles.label}>Situação:</Text>
      <View style={styles.optionsRow}>
        <Button
          title="🔍 Encontrado"
          variant={status === 'encontrado' ? 'primary' : 'outline'}
          onPress={() => setStatus('encontrado')}
          style={styles.statusButton}
        />
        <Button
          title="😢 Perdido"
          variant={status === 'perdido' ? 'primary' : 'outline'}
          onPress={() => setStatus('perdido')}
          style={styles.statusButton}
        />
      </View>

      {location && (
        <Text style={styles.locationText}>
          📍 Localização: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </Text>
      )}

      <View style={styles.buttons}>
        <Button
          title="Cancelar"
          variant="outline"
          onPress={handleCancel}
          style={styles.cancelButton}
        />
        <Button
          title={isLoading ? 'Enviando...' : 'Registrar'}
          variant="primary"
          onPress={handleSubmit}
          disabled={isLoading || isUploadingImage}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F0F8FF',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#203D59',
    marginBottom: 20,
    marginTop: 40,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    backgroundColor: '#EEE',
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  noImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#DFE7EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  noImageText: {
    color: '#95ACC3',
    fontSize: 14,
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
    minHeight: 100,
    padding: 12,
    marginBottom: 16,
    color: '#203D59',
    textAlignVertical: 'top',
  },
  inputSingle: {
    backgroundColor: '#fff',
    borderColor: '#DFE7EF',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    marginBottom: 16,
    color: '#203D59',
  },
  optionsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 8,
  },
  statusButton: {
    flex: 1,
  },
  locationText: {
    fontSize: 12,
    color: '#95ACC3',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 2,
  },
});

export default RegisterDogScreen;
