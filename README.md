
# DogSpotter Frontend

Projeto frontend em TypeScript presente na pasta `app/`. Este repositório contém a interface do aplicativo (UI) construída com componentes React/TSX. O app aparenta ser uma aplicação mobile (React Native) que utiliza recursos de câmera, mapa e telas de registro — por exemplo: `CameraButton`, `Map.tsx`, e `RegisterDogScreen.tsx`.

> Observação: algumas suposições foram feitas na documentação (ver seção "Assunções"). Se o projeto não for Expo/React Native, adapte os comandos de execução abaixo.

## Visão geral

- Linguagem: TypeScript
- UI: React / React Native (arquivos `.tsx`)
- Estrutura principal: pasta `app/` com telas e componentes

O app parece gerenciar autenticação, registro de cães e uso de câmera/mapa.

## Estrutura importante

- `app/` — código fonte principal
	- `_layout.tsx` — layout/aplicação global
	- `index.tsx` — tela inicial
	- `login.tsx` — tela de login
	- `Map.tsx` — componente/tela do mapa
	- `registerdog.tsx` — tela de registro de animal
	- `components/` — componentes reutilizáveis (ex.: `Button.tsx`, `CameraButton.tsx`, `InputField.tsx`, `Logo.tsx`, `ProfileIcon.tsx`, `SearchBar.tsx`, `TabButton.tsx`)
	- `contexts/` — contextos React (`AuthContext.tsx`, `NavigationContext.tsx`)
	- `hooks/` — hooks personalizados (`useCamera.ts`)
	- `screens/` — telas organizadas (`LoginScreen.tsx`, `OnboardingScreen.tsx`, `RegisterDogScreen.tsx`)
	- `services/` — integração com backend (`api.ts`)
- `assets/` — imagens e outros recursos estáticos

## Requisitos

- Node.js (versão compatível com o projeto)
- npm ou yarn
- Caso seja um app Expo: Expo CLI (opcional, ver observação abaixo)

## Instalação

Abra um terminal na raiz do projeto e instale dependências:

```bash
# usando npm
npm install

# ou usando yarn
yarn install
```

Se este projeto for gerenciado com Expo (observação baseada em `app.config.js`):

```bash
# instalar expo-cli globalmente (opcional)
npm install -g expo-cli

# iniciar o projeto
expo start
```

Alternativamente, se `package.json` expõe scripts, use:

```bash
npm run start
# ou
yarn start
```

Para rodar em um emulador ou dispositivo (Expo):

```bash
expo run:android
expo run:ios
```

## Scripts úteis (exemplo)

- `start` — inicia o modo de desenvolvimento
- `build` — criar build de produção (se aplicável)
- `lint` — executar linters
- `test` — executar testes

Verifique `package.json` para a lista exata de scripts disponíveis.

## Notas de desenvolvimento

- Componentes relacionados a câmera e mapa ficam em `app/components` e `app/` (ex.: `CameraButton.tsx`, `useCamera.ts` e `Map.tsx`).
- Autenticação está centralizada em `app/contexts/AuthContext.tsx`.
- Chamadas ao backend parecem estar em `app/services/api.ts`.

### Convenções rápidas

- Código em TypeScript (`.ts` / `.tsx`).
- Componentes funcionais com hooks.
- Use o contexto existente para autenticação/navegação onde aplicável.

## Como contribuir

1. Crie uma branch a partir da branch principal (ex.: `dev/fetchAll`).
2. Abra um PR descrevendo a mudança.
3. Siga as convenções de lint e formatação do projeto.

## Assunções e próximos passos

- Assumi que este é um projeto React Native com Expo gerenciando o app, devido à presença de `app.config.js` e uso de arquivos `.tsx` voltados a mobile (câmera, mapa). Se não for, ajuste os comandos de execução.
- Sugestões de melhorias:
	- Adicionar um `README` mais detalhado por tela (ex.: como testar a câmera e o fluxo de registro).
	- Incluir `CONTRIBUTING.md` com padrões de commits, PR e CI.
	- Adicionar linters (ESLint) e scripts de teste automatizados.

## Licença

Adicione aqui a licença do projeto (ex.: MIT) ou deixe conforme política do repositório.

---
Se quiser, eu posso:
- checar o `package.json` e ajustar os comandos do README exatamente aos scripts existentes;
- adicionar um `CONTRIBUTING.md` e um `CHANGELOG` mínimo;
- ou gerar um `README` em inglês adicional.
