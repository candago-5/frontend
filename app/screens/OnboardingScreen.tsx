
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CameraButton from '../components/CameraButton';
import CustomMapView from '../components/MapView';
import ProfileIcon from '../components/ProfileIcon';
import SearchBar from '../components/SearchBar';

const OnboardingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CustomMapView />
      <ProfileIcon />
      <SearchBar />
      <CameraButton />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
});

export default OnboardingScreen;
