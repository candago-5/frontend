import { StyleSheet, View } from 'react-native';
// Se estiver usando web, troque por um componente de mapa web, como leaflet/react-leaflet
import MapView, { Marker } from 'react-native-maps';

const markers = [
  { id: 1, latitude: -23.527, longitude: -46.933, icon: require('../../assets/images/icon.png') },
  { id: 2, latitude: -23.528, longitude: -46.934, icon: require('../../assets/images/icon.png') },
  // Adicione mais marcadores conforme necessário
];

export default function CustomMapView() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});
