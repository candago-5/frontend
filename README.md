<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?size=28&duration=4000&color=36BCF7&center=true&vCenter=true&width=600&lines=🐶+Dog+Spotter+Frontend;Expo+React+Native+App;Candago+Building+Tech+" alt="Dog Spotter Frontend banner">
</p>

---

![Repo Views](https://komarev.com/ghpvc/?username=candago-5&repo=frontend&label=Views&color=blue&style=flat)
![GitHub top language](https://img.shields.io/github/languages/top/candago-5/frontend?style=flat&color=green)
![GitHub last commit](https://img.shields.io/github/last-commit/candago-5/frontend?color=yellow)

![TypeScript](https://img.shields.io/badge/-TypeScript-333333?style=flat&logo=typescript)
![Expo](https://img.shields.io/badge/-Expo-333333?style=flat&logo=expo)
![React Native](https://img.shields.io/badge/-React%20Native-333333?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/-Node.js-333333?style=flat&logo=node.js)
![Jest](https://img.shields.io/badge/-Jest-333333?style=flat&logo=jest)

# 🐶 Dog Spotter Frontend

This is the mobile frontend for the Dog Spotter project - an [Expo](https://expo.dev) React Native app created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) for locating and tracking dogs.

---

## ✅ Prerequisites
- Node.js 18+ and npm (or pnpm/yarn)
- Expo CLI: `npm install -g @expo/cli`
- Mobile device with Expo Go app OR
- Android/iOS simulator setup

---

## 📂 Project Structure
- `app/` — main application code using Expo Router file-based routing
- `assets/` — images, icons, and static assets
- `components/` — reusable React Native components
- `constants/` — app constants and configuration
- `hooks/` — custom React hooks
- `scripts/` — utility scripts

---

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npx expo start
   ```

3. **Run on device/simulator**

   In the output, you'll find options to open the app in:
   - [development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

   You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

---

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Start with specific platform
npm run android
npm run ios
npm run web

# Reset project to blank state
npm run reset-project

# Run linter
npm run lint
```

---

## 🌐 API Integration

This frontend connects to the Dog Spotter backend API. Make sure to:

- Configure the API base URL in your environment configuration
- Handle authentication with Bearer tokens (JWT)
- Follow the API endpoints:
  - `GET /health` → API health check
  - `POST /auth/login` → User authentication
  - `GET /dogs` → List dogs
  - `POST /dogs` → Create dog entry

---

## 🧪 Testing & Quality

```bash
# Run tests (when configured)
npm test

# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

---

## 📱 Development Tips

### Get a Fresh Project
When you're ready to start from scratch, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Learn More
To learn more about developing with Expo:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

### Join the Community
- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make your changes with clear, descriptive commits
3. Test your changes on multiple platforms (iOS/Android)
4. Open a Pull Request describing changes and testing steps

---

## 👥 Team

- 🤖 **Guilherme Teixeira** — Product Owner | [@GuilhermeCardoso0](https://github.com/Guilhermecardoso0)
- 👨‍💻 **Caique Moura** — Scrum Master | [@caiquefrd](https://github.com/caiquefrd)
- 💻 **Rafael Soares** — Developer | [@RafaelSM21](https://github.com/RafaelSM21)
- 💻 **Luis Gustavo** — Developer | [@l-gustavo-barbosa](https://github.com/l-gustavo-barbosa)
- 💻 **Lucas Jaques** — Developer | [@jaqueslucas](https://github.com/jaqueslucas)
- 💻 **Lucas Assis** — Developer | [@Lucassis1](https://github.com/Lucassis1)

---

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?size=24&duration=4000&color=FF5733&center=true&vCenter=true&width=500&lines=Candago+Building+Tech+" alt="Team signature">
</p>
