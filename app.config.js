export default {
  expo: {
    name: "DogSpotter",
    slug: "DogSpotter",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "dogspotter",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "Precisamos da sua localização para registrar onde o cachorro foi visto.",
      },
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
      ],
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow DogSpotter to access your camera to take photos of dogs.",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "Allow DogSpotter to access your photos to select dog images.",
        },
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission: "Allow DogSpotter to access your location to register where dogs were spotted.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      // API URL configuration - change based on environment
      apiUrl: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api",
    },
  },
};

