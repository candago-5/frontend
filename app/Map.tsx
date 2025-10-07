import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CameraButton from './components/CameraButton';
import { InputField } from './components/InputField';

const markers = [
  { id: 1, latitude: -23.527, longitude: -46.933, icon: require('../assets/images/dog.png') },
  { id: 2, latitude: -23.528, longitude: -46.934, icon: require('../assets/images/dog.png') },
  // Adicione mais marcadores conforme necessário
];

export default function Map() {
  const [search, setSearch] = useState('');
  
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
    backgroundColor: '#95ACC3', // azul pastel
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
});
