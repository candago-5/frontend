import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CameraButton from './components/CameraButton';
import { InputField } from './components/InputField';

const markers = [
  { id: 1, dogId: 'A', latitude: -23.527, longitude: -46.933, icon: require('../assets/images/dog.png') },
  { id: 3, dogId: 'A', latitude: -23.5265, longitude: -46.9345, icon: require('../assets/images/dog.png') },
  { id: 2, dogId: 'B', latitude: -23.528, longitude: -46.934, icon: require('../assets/images/dog.png') },
];

export default function Map() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);
  const router = useRouter();

  const handleMoreDetails = () => {
    if (!selected) return;
    // pega todos os pontos do mesmo dogId (rastro) e formata [{lat,lng},...]
    const trail = markers
      .filter(m => (selected.dogId ?? selected.id) === (m.dogId ?? m.id))
      .sort((a, b) => a.id - b.id)
      .map(m => ({ lat: m.latitude, lng: m.longitude }));
    const params = {
      dogId: selected.dogId ?? selected.id,
      coords: encodeURIComponent(JSON.stringify(trail)),
    };
    router.push({
      pathname: '/screens/DogDetailsScreen',
      params,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.527,
          longitude: -46.933,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            onPress={() => setSelected(marker)}
            image={marker.icon}
          />
        ))}
      </MapView>

      <View style={styles.bottomBar}>
        <View style={styles.inputFieldWrapper}>
          <InputField
            placeholder="Buscar cachorro..."
            icon="search"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.cameraButtonWrapper}>
          <CameraButton />
        </View>

        {selected ? (
          <TouchableOpacity style={styles.moreButton} onPress={handleMoreDetails}>
            <Text style={styles.moreButtonText}>Mais detalhes</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 500,
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
    minHeight: 80,
  },
  inputFieldWrapper: {
    width: '100%',
    marginBottom: 12,
  },
  cameraButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButton: {
    marginTop: 10,
    backgroundColor: '#203D59',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  moreButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});