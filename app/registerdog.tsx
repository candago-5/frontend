import { useLocalSearchParams } from 'expo-router';
import RegisterDogScreen from './screens/RegisterDogScreen';

export default function RegisterDogPage() {
  const { photoUri } = useLocalSearchParams() as { photoUri?: string };
  return <RegisterDogScreen photoUri={photoUri} />;
}