import React from 'react';
import CustomMapView from '../components/MapView';

import { StyleSheet, View } from 'react-native';

const MapScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CustomMapView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default MapScreen;
