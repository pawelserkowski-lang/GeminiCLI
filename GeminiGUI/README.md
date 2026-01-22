# 🚀 GeminiGUI - Zaawansowana aplikacja AI Chat

[![Tauri][tauri-badge]][tauri-url]
[![React][react-badge]][react-url]
[![TypeScript][typescript-badge]][typescript-url]
[![Rust][rust-badge]][rust-url]
[![License: MIT][license-badge]][license-url]

> Nowoczesna aplikacja desktopowa łączący potęgę Gemini AI z intuicyjnym interfejsem wzorowanym na efektach Matrix. Zbudowana na frameworku Tauri z React 19 i TypeScript.

## ✨ Główne cechy

### 🎯 Zaawansowana interakcja z AI
- **Wsparcie Gemini AI** - Integracja z Google Gemini API dla zaawansowanych możliwości
- **Model Selector** - Dynamiczny wybór między różnymi modelami AI
- **Streaming responses** - Responsywne strumienne odpowiedzi w czasie rzeczywistym
- **Historii sesji** - Automatyczne zapisywanie i zarządzanie wieloma sesjami czatu

### 🌐 Wieloagentowy tryb Swarm
- Równoległa egzekucja wielu agentów AI
- Koordynacja między agentami
- Wspólne zarządzanie pamięcią kontekstową

### 🎨 Nowoczesny interfejs graficzny
- **Matrix Theme** - Elegancki motyw wizualny inspirowany stylem Matrix
- **Glassmorphism Design** - Przezroczyste komponenty z efektami szklanych powierzchni
- **Framer Motion Animations** - Płynne animacje poniżej 300ms
- **Dark Mode** - Domyślny ciemny motyw dla wygody użytkownika
- **Responsywny design** - Pełne wsparcie dla mobile-first podejścia

### 🛠️ Zaawansowane narzędzia
- **Memory Panel** - Panel zarządzania pamięcią sesji i kontekstu
- **Bridge Integration** - Integracja z CLI poprzez bridge.json
- **Error Boundary** - Obsługa błędów z eleganckim fallbackiem
- **Settings Modal** - Zaawansowane ustawienia aplikacji
- **Terminal Panel** - Wbudowany terminal dla wykonywania poleceń
- **Drag & Drop** - Obsługa przeciągania i upuszczania plików

### 🔒 Bezpieczeństwo
- **HTTPS + TLS** - Szyfrowana komunikacja z serwerami API
- **Allowlist poleceń** - Biała lista bezpiecznych poleceń systemowych
- **Tauri Security** - Wykorzystanie warstwy bezpieczeństwa Tauri
- **Sandbox environment** - Izolowane środowisko wykonania kodu

### 📦 Wydajność
- **Vite bundling** - Szybkie hot-reload podczas development
- **Code splitting** - Automatyczne dzielenie kodu
- **Tree shaking** - Usuwanie nieużywanego kodu
- **Worker threads** - Web Workers dla ciężkich obliczeń

## 🛠️ Tech Stack

### Frontend
| Technologia | Wersja | Opis |
|-------------|--------|------|
| **React** | 19.1.0 | Nowoczesna biblioteka UI |
| **TypeScript** | 5.8.3 | Statyczne typowanie |
| **Tauri** | 2.5.0 | Framework desktopowy |
| **Zustand** | 5.0.10 | Zarządzanie stanem |
| **TanStack Query** | 5.90.19 | Zarządzanie danymi serwerowymi |
| **Tailwind CSS** | 4.1.18 | Utility-first styling |
| **Framer Motion** | 12.27.1 | Biblioteka animacji |
| **Vite** | 7.0.4 | Build tool i dev server |

### Backend (Rust/Tauri)
| Technologia | Wersja | Opis |
|-------------|--------|------|
| **Tauri** | 2.0.0 | Desktop framework |
| **Tokio** | 1.43.0 | Async runtime |
| **Reqwest** | 0.12.12 | HTTP client |
| **Serde** | 1.0.217 | Serialization |

### Testing & Development
| Narzędzie | Opis |
|-----------|------|
| **Vitest** | Framework testów |
| **Testing Library** | Testy komponentów |
| **jsdom** | DOM environment do testów |

## 📋 Wymagania systemowe

### Środowisko programistyczne
- **Node.js** ≥ 20.0.0
- **Rust** ≥ 1.75 (dla Tauri development)
- **Tauri CLI** (instalacja przez npm)
- **Npm** lub **Yarn**

### Opcjonalne
- **Ollama** - Dla lokalnych modeli LLM (http://localhost:11434)
- **Git** - Dla integracji wersjonowania
- **Google Gemini API Key** - Dla funkcji AI

### Minimalne wymagania systemowe (runtime)
- **OS**: Windows 10+, macOS 10.15+, Linux (Ubuntu 18.04+)
- **RAM**: 2GB minimum, 4GB zalecane
- **Disk**: 500MB dla aplikacji + dependencji

## 🚀 Instalacja

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/your-org/GeminiHydra.git
cd GeminiHydra/GeminiGUI
```

### 2. Instalacja dependencji Node.js

```bash
npm install
```

### 3. Instalacja Rust (jeśli nie masz)

Odwiedź [rustup.rs](https://rustup.rs/) i postępuj zgodnie z instrukcjami.

### 4. Instalacja Tauri CLI (globalnie)

```bash
npm install -g @tauri-apps/cli@latest
```

Lub zainstaluj jako dev dependency:

```bash
npm install --save-dev @tauri-apps/cli
```

### 5. Konfiguracja zmiennych środowiskowych

Skopiuj plik `.env.example` na `.env`:

```bash
cp .env.example .env
```

Edytuj `.env` i ustaw wymagane zmienne:

```env
# Gemini API Configuration
GOOGLE_API_KEY=your_google_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Ollama Configuration (dla lokalnych modeli)
OLLAMA_HOST=http://localhost:11434

# Default Models
DEFAULT_MODEL=gemini-pro
FAST_MODEL=gemini-pro-vision

# Cache Configuration
CACHE_ENABLED=true
CACHE_TTL=3600
CACHE_ENCRYPTION_KEY=your_encryption_key_here

# Queue Configuration
QUEUE_MAX_CONCURRENT=4

# Custom Settings
DEFAULT_AI_PROVIDER=google
SAFE_MODE=false
```

## 📦 Komendy rozwojowe

### Development server

Uruchom serwer deweloperski z hot-reload:

```bash
npm run dev
```

Dostęp: http://localhost:1420

### Tauri development

Uruchom aplikację desktopową z debuggingiem:

```bash
npm run tauri:dev
# lub
npm run tauri dev
```

### Building aplikacji

Skompiluj TypeScript i bundluj z Vite:

```bash
npm run build
```

### Preview produkcji

Podgląd built aplikacji:

```bash
npm run preview
```

### Tauri build (desktop)

Zbuduj finalną aplikację desktopową:

```bash
npm run tauri:build
# lub
npm run tauri build
```

Binaria znajdziesz w `src-tauri/target/release/`

### Testing

Uruchom testy jednostkowe:

```bash
npm test
```

Obserwaj zmiany w plikach:

```bash
npm run test:watch
```

Pokaż interfejs testów:

```bash
npm run test:ui
```

Wygeneruj raport coverage:

```bash
npm run test:coverage
```

### Linting & Formatting

Sprawdź typy TypeScript:

```bash
npm run typecheck
# lub
npm run lint
```

Napraw problemy lintingu:

```bash
npm run lint:fix
```

Sformatuj kod:

```bash
npm run format
```

### Maintenance

Wyczyść cache Vite:

```bash
npm run clean
```

Przygotuj pre-commit hooks (husky):

```bash
npm run prepare
```

## 📁 Struktura projektu

```
GeminiGUI/
├── src/                           # Kod aplikacji React
│   ├── components/               # Komponenty React
│   │   ├── chat/                # Komponenty chatu
│   │   │   ├── ChatInput.tsx    # Input do wiadomości
│   │   │   ├── MessageList.tsx  # Lista wiadomości
│   │   │   ├── ModelSelector.tsx # Selektor modeli
│   │   │   └── DragDropZone.tsx # Obsługa plików
│   │   ├── ui/                  # Komponenty UI (Button, Input, etc.)
│   │   ├── ChatContainer.tsx    # Główny kontener czatu
│   │   ├── SessionSidebar.tsx   # Pasek boczny sesji
│   │   ├── RightSidebar.tsx     # Prawy pasek (memory, bridge)
│   │   ├── MemoryPanel.tsx      # Panel pamięci
│   │   ├── SettingsModal.tsx    # Modal ustawień
│   │   ├── ErrorBoundary.tsx    # Obsługa błędów
│   │   ├── StatusFooter.tsx     # Stopka statusu
│   │   └── BridgePanel.tsx      # Integracja z CLI
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAppStore.ts       # Hook do Zustand store
│   │   ├── useGeminiModels.ts   # Hook modeli Gemini
│   │   ├── useStreamListeners.ts # Hook dla streamingu
│   │   ├── useAppTheme.ts       # Hook motywu
│   │   └── useEnvLoader.ts      # Hook ładowania env
│   │
│   ├── store/                   # Zustand store
│   │   ├── useAppStore.ts       # Główny store aplikacji
│   │   └── selectors.ts         # Selektory store
│   │
│   ├── services/                # Usługi biznesowe
│   │   ├── tauri.service.ts     # Integracja z Tauri
│   │   ├── api.service.ts       # API komunikacji
│   │   └── storage.service.ts   # Lokalne storage
│   │
│   ├── types/                   # TypeScript definicje typów
│   │   ├── chat.ts              # Typy czatu
│   │   ├── models.ts            # Typy modeli
│   │   └── api.ts               # Typy API
│   │
│   ├── utils/                   # Funkcje pomocnicze
│   │   ├── formatters.ts        # Formatowanie tekstu
│   │   ├── validators.ts        # Walidacja danych
│   │   └── storage.ts           # Helpers storage
│   │
│   ├── styles/                  # CSS i Tailwind
│   │   ├── globals.css          # Style globalne
│   │   └── themes.css           # Definicje motywów
│   │
│   ├── constants/               # Stałe aplikacji
│   │   ├── models.ts            # Listy modeli
│   │   ├── shortcuts.ts         # Skróty klawiszowe
│   │   └── settings.ts          # Domyślne ustawienia
│   │
│   ├── workers/                 # Web Workers
│   │   ├── parser.worker.ts     # Parser odpowiedzi
│   │   └── crypto.worker.ts     # Szyfrowanie
│   │
│   ├── test/                    # Konfiguracja testów
│   │   ├── setup.ts             # Setup testów
│   │   └── mocks.ts             # Mocks
│   │
│   ├── App.tsx                  # Główny komponent
│   └── main.tsx                 # Entry point
│
├── src-tauri/                   # Kod Rust/Tauri
│   ├── src/
│   │   ├── lib.rs              # Biblioteka Rust
│   │   └── main.rs             # Main Tauri app
│   ├── Cargo.toml              # Rust dependencies
│   ├── tauri.conf.json         # Konfiguracja Tauri
│   └── icons/                  # Ikony aplikacji
│
├── public/                      # Assety statyczne
│   └── images/                 # Obrazy
│
├── dist/                       # Output build (generowany)
│
├── index.html                  # HTML entry point
├── package.json               # Node dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite config
├── vitest.config.ts           # Vitest config
├── .env                       # Zmienne środowiskowe
├── .env.example               # Przykład .env
├── tailwind.config.js         # Tailwind config
└── README.md                  # Ten plik
```

## 🏗️ Architektura aplikacji

### Architektura warstw

```
┌─────────────────────────────────────┐
│   React Components (TSX)             │ UI Layer
│   - ChatContainer                   │
│   - MessageList, ChatInput          │
│   - SettingsModal, ErrorBoundary    │
└─────────────────────────────────────┘
         ↓ (dispatch/emit)
┌─────────────────────────────────────┐
│   Custom Hooks                       │ Logic Layer
│   - useAppStore                     │
│   - useGeminiModels                 │
│   - useStreamListeners              │
│   - useAppTheme                     │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│   Zustand Store (useAppStore)        │ State Layer
│   - messages, sessions              │
│   - models, settings                │
│   - ui state                        │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│   Services                           │ Service Layer
│   - tauri.service.ts                │
│   - api.service.ts                  │
│   - storage.service.ts              │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│   Tauri Commands (Rust)              │ Native Layer
│   - execute_command                 │
│   - read_file, write_file           │
│   - stream_response                 │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│   External APIs                      │ External Layer
│   - Google Gemini API               │
│   - Ollama (localhost)              │
│   - Cloud Storage                   │
└─────────────────────────────────────┘
```

### Data Flow

```
User Input → Component → Hook → Store → Service → Tauri Command → API
   ↑                                                                  ↓
   └──────────────── Response/Update (setState) ←──────────────────┘
```

### Key Services & Hooks

#### useAppStore (Zustand Store)
Główny state management dla całej aplikacji:

```typescript
const store = useAppStore();
// State properties
store.messages         // Wiadomości czatu
store.sessions        // Historia sesji
store.currentSession  // Obecna sesja
store.models          // Lista dostępnych modeli
store.settings        // Ustawienia aplikacji
store.isLoading       // Status loading

// Actions
store.sendMessage(message)
store.addSession(name)
store.updateSettings(newSettings)
store.clearHistory()
```

#### useGeminiModels (Models Hook)
Zarządzanie modelami AI:

```typescript
const { models, loading, error } = useGeminiModels();
// Zawiera listę dostępnych modeli z API
```

#### useStreamListeners (Streaming Hook)
Obsługa responsów streamowanych:

```typescript
const { subscribe } = useStreamListeners();
subscribe('response', (data) => {
  // Obsługa streamowania odpowiedzi
});
```

#### tauri.service.ts (Tauri Commands)
Komunikacja z Rust backend:

```typescript
import { invoke } from '@tauri-apps/api/core';

// Poleceń dostępne
await invoke('execute_command', { command: 'ls' });
await invoke('read_file', { path: '/path/to/file' });
await invoke('stream_response', { params: {} });
```

## ⚙️ Konfiguracja

### .env - Zmienne środowiskowe

Pełna lista dostępnych zmiennych:

```env
# ===== API Configuration =====
GOOGLE_API_KEY=your_api_key_here
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here

# ===== Ollama (Local LLM) =====
OLLAMA_HOST=http://localhost:11434
DEFAULT_MODEL=llama3.2:3b
FAST_MODEL=llama3.2:1b
CODER_MODEL=qwen2.5-coder:1.5b

# ===== Cache Configuration =====
CACHE_ENABLED=true
CACHE_TTL=3600
CACHE_ENCRYPTION_KEY=your_encryption_key_here

# ===== Queue Configuration =====
QUEUE_MAX_CONCURRENT=4

# ===== Application Settings =====
DEFAULT_AI_PROVIDER=google
SAFE_MODE=false
WITCHER_MODE=enabled
DEFAULT_CLI=claude

# ===== Backend Services =====
VERCEL_TOKEN=your_token_here
KV_REST_API_URL=https://api.example.com
KV_REST_API_TOKEN=your_token_here
REDIS_URL=redis://localhost:6379

# ===== Security =====
SSH_PUBLIC_KEY=ssh-ed25519 AAAA...
GIT_REMOTE_URL=git@github.com:...
```

### tauri.conf.json - Konfiguracja Tauri

Główne ustawienia aplikacji desktopowej:

```json
{
  "productName": "GeminiGUI",
  "version": "0.2.0",
  "build": {
    "beforeBuildCommand": "npm run build",
    "devUrl": "http://localhost:1420",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "fullscreen": false,
        "resizable": true,
        "title": "GeminiGUI",
        "width": 1200,
        "height": 800
      }
    ]
  },
  "security": {
    "csp": "default-src 'self'; script-src 'self' 'unsafe-inline';"
  }
}
```

### vite.config.ts - Konfiguracja bundlera

```typescript
// Port: 1420
// HMR Port: 1421
// Ignored: src-tauri/
```

## ⌨️ Skróty klawiszowe

| Skrót | Akcja |
|-------|-------|
| `Ctrl+Enter` | Wyślij wiadomość |
| `Ctrl+K` | Otwórz szybkie ustawienia |
| `Ctrl+/` | Pokaż pomoc |
| `Ctrl+N` | Nowa sesja |
| `Ctrl+Shift+C` | Wyczyść historię |
| `Ctrl+,` | Otwórz ustawienia |
| `Escape` | Zamknij modal |
| `Tab` | Nawigacja między polami |
| `Arrow Up/Down` | Historia wiadomości |
| `Ctrl+L` | Zaloguj/wyloguj |

## 🧪 Testowanie

### Uruchomienie testów

```bash
# Uruchom wszystkie testy jednorazowo
npm test

# Obserwaj zmiany i uruchamiaj testy automatycznie
npm run test:watch

# Pokaż interfejs testów w przeglądarce
npm run test:ui

# Wygeneruj raport coverage (HTML)
npm run test:coverage
```

### Raport coverage

Po wygenerowaniu reportu otwórz w przeglądarce:

```bash
# Na Windows
start coverage/lcov-report/index.html

# Na macOS
open coverage/lcov-report/index.html

# Na Linux
xdg-open coverage/lcov-report/index.html
```

### Pisanie testów

Testy znajdują się obok komponentów z suffiksem `.test.ts` lub `.test.tsx`:

```typescript
// src/components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Testowane komponenty

| Komponent | Status |
|-----------|--------|
| Button | ✅ Pokryte |
| MessageList | ✅ Pokryte |
| ChatInput | ✅ Pokryte |
| ErrorBoundary | ✅ Pokryte |
| useAppStore | ✅ Pokryte |
| useGeminiModels | ✅ Pokryte |
| useStreamListeners | ✅ Pokryte |

## 📦 Building dla produkcji

### Build aplikacji React

```bash
npm run build
```

Generuje zoptymalizowane pliki w `dist/`:

```
dist/
├── index.html
├── assets/
│   ├── main-*.js
│   ├── main-*.css
│   └── vendor-*.js
└── public/
    └── images/
```

### Build aplikacji Tauri

```bash
npm run tauri:build
```

Tworzy instalatory dla każdego systemu operacyjnego:

```
src-tauri/target/release/
├── GeminiGUI.exe         (Windows)
├── GeminiGUI.app/        (macOS)
└── geminigui             (Linux)
```

### Optymalizacje wydajności

1. **Code Splitting** - Vite automatycznie dzieli kod na chunks
2. **Tree Shaking** - Usuwa nieużywany kod
3. **Minification** - Zmniejsza rozmiar JS/CSS
4. **Gzip Compression** - Serwer włącza kompresję
5. **Lazy Loading** - Ładowanie na żądanie dla tras

## 🤝 Wkład (Contributing)

### Git Workflow

```bash
# 1. Utwórz feature branch
git checkout -b feature/amazing-feature

# 2. Dokonaj zmian i commituj
git add .
git commit -m "feat(component): add amazing feature"

# 3. Upushuj na remote
git push origin feature/amazing-feature

# 4. Stwórz Pull Request na GitHub
```

### Commit Message Convention

Stosujemy Conventional Commits:

```
feat(scope): description      # Nowa funkcja
fix(scope): description       # Poprawka błędu
refactor(scope): description  # Refaktoryzacja
docs(scope): description      # Dokumentacja
test(scope): description      # Testy
perf(scope): description      # Optymalizacja
chore(scope): description     # Maintenance
```

### Przykłady:

```bash
git commit -m "feat(chat): add markdown support to messages"
git commit -m "fix(memory): resolve memory leak in useStreamListeners"
git commit -m "refactor(store): simplify Zustand store structure"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(components): add Button component tests"
```

### Code Style

- **TypeScript**: Strict mode włączony, zero `any`
- **React**: Functional components + hooks
- **Formatting**: Prettier (auto na save)
- **Linting**: ESLint (sprawdź przed commit)

### Pre-commit Checks

Husky automatycznie uruchamia:

```bash
# 1. Lint check
npm run lint

# 2. Type check
npm run typecheck

# 3. Format check
npm run format
```

## 📜 Licencja

Projekt jest dostępny na licencji **MIT**.

Pełny tekst licencji znajdziesz w pliku [LICENSE](LICENSE).

```
MIT License

Copyright (c) 2024 GeminiCLI Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 📚 Dodatkowe zasoby

### Dokumentacja

- [Tauri Documentation](https://tauri.app)
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TanStack Query Docs](https://tanstack.com/query)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tutoriale

- [Tauri + React Setup](https://tauri.app/start/frontend/react)
- [Rust Basics](https://doc.rust-lang.org/book)
- [Web Workers Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

### Tools

- [Tauri CLI](https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-cli)
- [Vite Documentation](https://vitejs.dev)
- [Vitest Documentation](https://vitest.dev)

## 🆘 Troubleshooting

### Problem: `tauri dev` nie uruchamia się

**Rozwiązanie:**

```bash
# Czyszczenie cache
npm run clean

# Reinstalacja dependencji
rm -rf node_modules
npm install

# Reinstalacja Tauri
npm install --save-dev @tauri-apps/cli@latest

# Spróbuj ponownie
npm run tauri:dev
```

### Problem: Problemy z TypeScript

```bash
# Sprawdź typy
npm run typecheck

# Wyczyść cache TypeScript
rm -rf node_modules/.vite
npm run build
```

### Problem: Testy nie przechodzą

```bash
# Wyczyść cache vitest
npm run test -- --clearCache

# Uruchom testy z debuggingiem
npm run test:ui
```

### Problem: Aplikacja Tauri nie buduje się

```bash
# Sprawdź wersję Rust
rustc --version

# Update Rust
rustup update

# Czyszczenie target
cargo clean

# Rebuild
npm run tauri:build
```

## 📞 Wsparcie

- **Issues**: [GitHub Issues](https://github.com/your-org/GeminiHydra/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/GeminiHydra/discussions)
- **Email**: support@geminigui.dev

## 👥 Autorzy

- **Team**: GeminiCLI Team
- **Maintainer**: Paweł Serkowski (@pawelserkowski)
- **Contributors**: Zobacz [CONTRIBUTORS.md](CONTRIBUTORS.md)

---

<div align="center">

**Made with ❤️ using Tauri + React**

[Stars](https://github.com/your-org/GeminiHydra/stargazers) · [Forks](https://github.com/your-org/GeminiHydra/network/members) · [Issues](https://github.com/your-org/GeminiHydra/issues)

</div>

<!-- Badges -->
[tauri-badge]: https://img.shields.io/badge/Tauri-2.0.0-blue?logo=tauri&logoColor=white
[tauri-url]: https://tauri.app
[react-badge]: https://img.shields.io/badge/React-19.1.0-61dafb?logo=react&logoColor=white
[react-url]: https://react.dev
[typescript-badge]: https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org
[rust-badge]: https://img.shields.io/badge/Rust-1.75+-ce422b?logo=rust&logoColor=white
[rust-url]: https://www.rust-lang.org
[license-badge]: https://img.shields.io/badge/License-MIT-green.svg
[license-url]: LICENSE
