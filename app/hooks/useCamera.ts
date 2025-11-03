import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform } from 'react-native';

export const useCamera = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos da permissão da câmera para tirar fotos.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  };

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('[useCamera] permissão de localização negada');
        return null;
      }
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      return { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
    } catch (err) {
      console.error('[useCamera] erro ao obter localização', err);
      return null;
    }
  };

  const navigateToMapWith = async (uri: string) => {
    try {
      const coords = await requestLocation();
      const query = [
        `photoUri=${encodeURIComponent(uri)}`,
        coords ? `lat=${coords.latitude}` : null,
        coords ? `lng=${coords.longitude}` : null,
      ]
        .filter(Boolean)
        .join('&');
      // rota para app/Map.tsx -> '/map' (lowercase)
      router.push(`/Map?${query}`);
      console.log('[useCamera] router.push -> /map with', query);
    } catch (err) {
      console.error('[useCamera] router.push failed', err);
    }
  };

  const takePhoto = async () => {
    setIsLoading(true);
    try {
      const ok = await requestCameraPermission();
      if (!ok) {
        setIsLoading(false);
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log('[useCamera] resultado da câmera', result);

      if (!result.canceled && result.assets?.[0]?.uri) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        await navigateToMapWith(uri);
        setIsLoading(false);
        return uri;
      } else {
        console.log('[useCamera] usuário cancelou a câmera');
      }
    } catch (error) {
      console.error('[useCamera] erro ao tirar foto', error);
      Alert.alert('Erro', 'Não foi possível tirar a foto. Tente novamente.', [{ text: 'OK' }]);
    }
    setIsLoading(false);
    return null;
  };

  const pickImage = async () => {
    setIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log('[useCamera] resultado da galeria', result);

      if (!result.canceled && result.assets?.[0]?.uri) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        await navigateToMapWith(uri);
        setIsLoading(false);
        return uri;
      } else {
        console.log('[useCamera] usuário cancelou a seleção');
      }
    } catch (error) {
      console.error('[useCamera] erro ao selecionar imagem', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem. Tente novamente.', [{ text: 'OK' }]);
    }
    setIsLoading(false);
    return null;
  };

  const clearImage = () => setImageUri(null);

  return { imageUri, isLoading, takePhoto, pickImage, clearImage };
};

export default useCamera;