import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// API Base URL - reads from environment or uses default
const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || 
                     process.env.EXPO_PUBLIC_API_URL || 
                     'http://localhost:3000/api';

// For Android emulator, use: 'http://10.0.2.2:3000/api'
// For physical device, use your computer's IP: 'http://192.168.x.x:3000/api'

console.log('🔗 API URL:', API_BASE_URL);

interface ApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch {
      return null;
    }
  }

  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = await this.getToken();
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || { code: 'ERROR', message: 'Erro desconhecido' } };
      }

      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return {
        error: {
          code: 'NETWORK_ERROR',
          message: 'Erro de conexão. Verifique sua internet.',
        },
      };
    }
  }

  // ============ AUTH ============

  async register(email: string, password: string, name?: string) {
    const response = await this.request<{
      user: { id: string; email: string; name: string | null };
      token: string;
      message: string;
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    if (response.data?.token) {
      await this.setToken(response.data.token);
    }

    return response;
  }

  async login(email: string, password: string) {
    const response = await this.request<{
      user: { id: string; email: string; name: string | null };
      token: string;
      message: string;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.token) {
      await this.setToken(response.data.token);
    }

    return response;
  }

  async logout() {
    await this.removeToken();
  }

  async getCurrentUser() {
    return this.request<{
      user: { id: string; email: string; name: string | null };
    }>('/auth/me');
  }

  // ============ USERS ============

  async getProfile() {
    return this.request<{
      user: {
        id: string;
        email: string;
        name: string | null;
        avatar: string | null;
        createdAt: string;
        _count: { dogs: number };
      };
    }>('/users/me');
  }

  async updateProfile(data: { name?: string; avatar?: string }) {
    return this.request<{
      user: { id: string; email: string; name: string | null; avatar: string | null };
      message: string;
    }>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getUserStats() {
    return this.request<{
      stats: { totalDogs: number; dogsFound: number; dogsLost: number };
    }>('/users/me/stats');
  }

  // ============ DOGS ============

  async getDogs(page: number = 1, limit: number = 50) {
    return this.request<{
      dogs: Dog[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>(`/dogs?page=${page}&limit=${limit}`);
  }

  async getDogsForMap(bounds?: { north: number; south: number; east: number; west: number }) {
    let url = '/dogs/map';
    if (bounds) {
      url += `?north=${bounds.north}&south=${bounds.south}&east=${bounds.east}&west=${bounds.west}`;
    }
    return this.request<{
      markers: DogMarker[];
    }>(url);
  }

  async searchDogs(query: string, filters?: {
    status?: string;
    size?: string;
    breed?: string;
    lat?: number;
    lng?: number;
    radius?: number;
  }) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.size) params.append('size', filters.size);
    if (filters?.breed) params.append('breed', filters.breed);
    if (filters?.lat) params.append('lat', filters.lat.toString());
    if (filters?.lng) params.append('lng', filters.lng.toString());
    if (filters?.radius) params.append('radius', filters.radius.toString());

    return this.request<{ dogs: Dog[] }>(`/dogs/search?${params.toString()}`);
  }

  async getDog(id: string) {
    return this.request<{ dog: Dog }>(`/dogs/${id}`);
  }

  async getMyDogs() {
    return this.request<{ dogs: Dog[] }>('/dogs/my');
  }

  async createDog(data: CreateDogInput) {
    return this.request<{ dog: Dog; message: string }>('/dogs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDog(id: string, data: Partial<CreateDogInput>) {
    return this.request<{ dog: Dog; message: string }>(`/dogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDog(id: string) {
    return this.request<{ message: string }>(`/dogs/${id}`, {
      method: 'DELETE',
    });
  }

  // ============ UPLOAD ============

  async uploadImage(imageUri: string): Promise<ApiResponse<{ imageUrl: string; message: string }>> {
    try {
      const token = await this.getToken();

      // Create form data
      const formData = new FormData();
      
      // Get file extension
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('image', {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      } as any);

      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error };
      }

      return { data };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        error: {
          code: 'UPLOAD_ERROR',
          message: 'Erro ao enviar imagem',
        },
      };
    }
  }

  async uploadImageBase64(base64: string, mimeType: string = 'image/jpeg') {
    return this.request<{ imageUrl: string; message: string }>('/upload/base64', {
      method: 'POST',
      body: JSON.stringify({ image: base64, mimeType }),
    });
  }
}

// Types
export interface Dog {
  id: string;
  description: string;
  imageUrl: string | null;
  latitude: number;
  longitude: number;
  breed: string | null;
  color: string | null;
  size: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: {
    id: string;
    name: string | null;
    email?: string;
  };
}

export interface DogMarker {
  id: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  description: string;
  status: string;
  breed: string | null;
}

export interface CreateDogInput {
  description: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
  breed?: string;
  color?: string;
  size?: string;
  status?: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar?: string | null;
}

// Export singleton instance
export const api = new ApiService();
export default api;
