import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LatLng, reverseGeocodeBatch } from '../services/reverseGeocode';

export default function DogDetails() {
  const params = useLocalSearchParams() as { coords?: string; dogId?: string; lat?: string; lng?: string };
  const router = useRouter();
  const [list, setList] = useState<{ coord: LatLng; address: string }[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // suporta: coords (encoded JSON), ou lat/lng individuais como fallback
        let coordsParam: LatLng[] = [];
        if (params.coords) {
          try {
            coordsParam = JSON.parse(decodeURIComponent(params.coords)) as LatLng[];
          } catch {
            coordsParam = [];
          }
        } else if (params.lat && params.lng) {
          coordsParam = [{ lat: parseFloat(params.lat), lng: parseFloat(params.lng) }];
        }

        if (coordsParam.length === 0) {
          setList([]);
          return;
        }

        const map = await reverseGeocodeBatch(coordsParam);
        const out = coordsParam.map(c => {
          const key = `${c.lat.toFixed(6)},${c.lng.toFixed(6)}`;
          return { coord: c, address: map[key] ?? `${c.lat}, ${c.lng}` };
        });
        setList(out);
      } catch (e) {
        setList([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.coords, params.lat, params.lng]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalhes</Text>
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      {!loading && (
        <FlatList
          data={list || []}
          keyExtractor={(item, i) => `${item.coord.lat}-${item.coord.lng}-${i}`}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <View style={styles.avatar}>
                <Text style={{ color: '#fff' }}>{(index + 1).toString()}</Text>
              </View>
              <View style={styles.center}>
                <Text style={styles.addr}>{item.address}</Text>
                <Text style={styles.coord}>{item.coord.lat.toFixed(6)}, {item.coord.lng.toFixed(6)}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={() => <Text style={{ padding: 16, color: '#666' }}>Nenhum ponto disponível</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { height: 56, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontWeight: '600', fontSize: 16, color: '#203D59' },
  row: { flexDirection: 'row', padding: 12, alignItems: 'center', backgroundColor: '#fff', marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#203D59', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  center: { flex: 1 },
  addr: { color: '#203D59', fontWeight: '600' },
  coord: { color: '#8A94A6', marginTop: 4, fontSize: 12 },
});