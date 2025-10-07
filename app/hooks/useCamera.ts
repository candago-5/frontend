import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform } from 'react-native';

export const useCamera = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos da permissão da câmera para tirar fotos.', [{ text: 'OK' }]);
        return false;
      }
    }
    return true;
  };

  const navigateToRegisterdog = (uri: string) => {
    try {
      router.push(`/registerdog?photoUri=${encodeURIComponent(uri)}`);
      console.log('[useCamera] router.push -> /registerdog with photoUri');
    } catch (err) {
      console.error('[useCamera] router.push failed', err);
    }
  };

  const takePhoto = async () => {
    console.log('[useCamera] takePhoto chamado');
    setIsLoading(true);
    try {
      const ok = await requestPermissions();
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
        console.log('[useCamera] foto obtida:', uri);
        navigateToRegisterdog(uri);
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
    console.log('[useCamera] pickImage chamado');
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
        navigateToRegisterdog(uri);
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