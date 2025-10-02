import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Platform } from 'react-native';

export const useCamera = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos da permissão da câmera para tirar fotos dos cães.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  };

  const takePhoto = async () => {
    setIsLoading(true);
    
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        setIsLoading(false);
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        setIsLoading(false);
        return uri;
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert(
        'Erro',
        'Não foi possível tirar a foto. Tente novamente.',
        [{ text: 'OK' }]
      );
    }
    
    setIsLoading(false);
    return null;
  };

  const pickImage = async () => {
    setIsLoading(true);
    
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        setIsLoading(false);
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        setIsLoading(false);
        return uri;
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert(
        'Erro',
        'Não foi possível selecionar a imagem. Tente novamente.',
        [{ text: 'OK' }]
      );
    }
    
    setIsLoading(false);
    return null;
  };

  const clearImage = () => {
    setImageUri(null);
  };

  return {
    imageUri,
    isLoading,
    takePhoto,
    pickImage,
    clearImage,
  };
};

export default useCamera;
