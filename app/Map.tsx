import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import CameraButton from './components/CameraButton';
import { InputField } from './components/InputField';
import { useAuth } from './contexts/AuthContext';
import { useCamera } from './hooks/useCamera';
import api, { DogMarker } from './services/api';

const DEFAULT_REGION: Region = {
  latitude: -23.527,
  longitude: -46.933,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function Map() {
  const { isAuthenticated } = useAuth();
  const { takePhoto } = useCamera();
  
  const [search, setSearch] = useState('');
  const [markers, setMarkers] = useState<DogMarker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);

  useEffect(() => {
    loadMarkers();
  }, []);

  const loadMarkers = async () => {
    setIsLoading(true);
    try {
      const response = await api.getDogsForMap();
      
      if (response.data?.markers) {
        setMarkers(response.data.markers);
        
        // If we have markers, center on the first one
        if (response.data.markers.length > 0) {
          const firstMarker = response.data.markers[0];
          setRegion({
            ...DEFAULT_REGION,
            latitude: firstMarker.latitude,
            longitude: firstMarker.longitude,
          });
        }
      }
    } catch (error) {
      console.error('Error loading markers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = useCallback(async (text: string) => {
    setSearch(text);
    
    if (text.trim().length < 2) {
      // If search is too short, load all markers
      loadMarkers();
      return;
    }

    try {
      const response = await api.searchDogs(text);
      
      if (response.data?.dogs) {
        // Convert dogs to markers format
        const searchMarkers: DogMarker[] = response.data.dogs.map(dog => ({
          id: dog.id,
          latitude: dog.latitude,
          longitude: dog.longitude,
          imageUrl: dog.imageUrl,
          description: dog.description,
          status: dog.status,
          breed: dog.breed,
        }));
        
        setMarkers(searchMarkers);
        
        // Center on first result
        if (searchMarkers.length > 0) {
          setRegion({
            ...DEFAULT_REGION,
            latitude: searchMarkers[0].latitude,
            longitude: searchMarkers[0].longitude,
          });
        }
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  }, []);

  const handleCameraPress = async () => {
    if (!isAuthenticated) {
      // If not logged in, redirect to login
      router.push('/login');
      return;
    }

    try {
      const photoUri = await takePhoto();
      if (photoUri) {
        router.push({
          pathname: '/registerdog',
          params: { photoUri },
        });
      }
    } catch (error) {
      console.error('Camera error:', error);
    }
  };

  const handleMarkerPress = (marker: DogMarker) => {
    // You could navigate to a detail screen here
    console.log('Marker pressed:', marker);
  };

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'perdido':
        return '#FF6B6B'; // Red for lost
      case 'encontrado':
        return '#4ECDC4'; // Teal for found
      case 'adotado':
        return '#95E1A3'; // Green for adopted
      default:
        return '#FFD93D'; // Yellow default
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#203D59" />
          <Text style={styles.loadingText}>Carregando marcadores...</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          showsUserLocation
          showsMyLocationButton
        >
          {markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{ 
                latitude: marker.latitude, 
                longitude: marker.longitude 
              }}
              title={marker.breed || 'Cachorro'}
              description={marker.description.substring(0, 50) + '...'}
              pinColor={getMarkerColor(marker.status)}
              onPress={() => handleMarkerPress(marker)}
            />
          ))}
        </MapView>
      )}
      
      <View style={styles.bottomBar}>
        <View style={styles.inputFieldWrapper}>
          <InputField
            placeholder="Buscar cachorro..."
            icon="search"
            value={search}
            onChangeText={handleSearch}
          />
        </View>
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {markers.length} {markers.length === 1 ? 'registro' : 'registros'} encontrados
          </Text>
        </View>
        
        <View style={styles.cameraButtonWrapper}>
          <CameraButton onPress={handleCameraPress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 500,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  loadingText: {
    marginTop: 12,
    color: '#203D59',
    fontSize: 14,
  },
  map: {
    flex: 1,
    minHeight: 400,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#95ACC3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    minHeight: 100,
  },
  inputFieldWrapper: {
    width: '100%',
    marginBottom: 8,
  },
  statsContainer: {
    marginBottom: 8,
  },
  statsText: {
    color: '#203D59',
    fontSize: 12,
    fontWeight: '500',
  },
  cameraButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
