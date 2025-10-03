import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InputField from './InputField';

export default function SearchBar() {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Buscar cachorro..."
        icon="search"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
