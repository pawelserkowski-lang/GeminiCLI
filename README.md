# GeminiHydra

![Version](https://img.shields.io/badge/version-0.3.0-blue)
![Stack](https://img.shields.io/badge/stack-PowerShell_7%2B_Tauri_2%2B_React_19-green)
![AI](https://img.shields.io/badge/AI-Ollama_%2B_Gemini-purple)
![Build](https://img.shields.io/badge/build-Vite_7%2B_Tailwind_4-orange)

**GeminiHydra** to zaawansowany system autonomicznych agentów AI ("Rój"), który laczy potege skryptów PowerShell z nowoczesnym interfejsem graficznym.

> **Note:** GeminiGUI v0.2.0 - Interfejs graficzny z lazy loading, code splitting i kompresja Brotli/Gzip.

---

## 🐺 Rój Agentów (The Swarm)

System składa się z 12 wyspecjalizowanych agentów, inspirowanych postaciami z Wiedźmina:

| Agent | Rola | Model (Ollama) | Specjalizacja |
|-------|------|----------------|---------------|
| **Dijkstra** | Strateg | Gemini Pro | Planowanie, Synteza, Samonaprawa (Phase C) |
| **Geralt** | Security | llama3.2:3b | Audyt bezpieczeństwa, Veto |
| **Yennefer** | Architect | qwen2.5-coder | Design Patterns, Architektura |
| **Triss** | QA | qwen2.5-coder | Testy, Scenariusze błędów |
| **Jaskier** | Dokumentacja | llama3.2:3b | Tłumaczenia, Raporty user-friendly |
| **Ciri** | Speed | llama3.2:1b | Szybkie operacje atomowe (IO) |
| **Zoltan** | Data | llama3.2:3b | JSON, CSV, walidacja danych |
| ... | ... | ... | (Pełna lista w `AgentSwarm.psm1`) |

---

## 🚀 Szybki Start

### Wymagania
- Windows 10/11
- PowerShell 7+
- Node.js 20+
- Rust (dla kompilacji GUI)
- Ollama (uruchomiona lokalnie)

### Instalacja

1.  **Sklonuj repozytorium:**
    ```powershell
    git clone https://github.com/your-repo/GeminiHydra.git
    cd GeminiHydra
    ```

2.  **Zainstaluj zależności GUI:**
    ```powershell
    cd GeminiGUI
    pnpm install
    ```

3.  **Uruchomienie (Tryb Hybrydowy):**
    ```powershell
    # W katalogu głównym
    .\gemini.ps1
    ```

---

## Architektura "Regis"

GeminiHydra dziala w oparciu o unikalna architekture hybrydowa:

1.  **Warstwa Logiki (PowerShell):** `AgentSwarm.psm1` to silnik wykonawczy. Wykorzystuje `RunspacePool` do wielowatkowego wykonywania zadan przez agentów.
2.  **Warstwa UI (Tauri + React):** Nowoczesny frontend w React 19 komunikuje sie z backendem Rust, który z kolei moze wywolywac logike PowerShell lub Node.js.
3.  **Self-Healing Loop:** Unikalna cecha Hydry. Jesli agenci zawioda, Dijkstra (Gemini) analizuje bledy i generuje plan naprawczy w petli.

### GeminiGUI - Zaawansowane Funkcje

Frontend wykorzystuje nowoczesne techniki optymalizacji wydajnosci:

| Funkcja | Opis | Zródlo |
|---------|------|--------|
| **LazyComponents** | Lazy loading komponentów z React.lazy() i Suspense | ClaudeHydra |
| **SuspenseFallback** | Ujednolicony loader dla wszystkich lazy komponentów | ClaudeHydra |
| **Code Splitting** | Manualne chunki (vendor-react, vendor-markdown, etc.) | Vite 7 |
| **Compression** | Gzip + Brotli dla produkcji (vite-plugin-compression) | Vite 7 |
| **Terser Minification** | drop_console, drop_debugger w produkcji | Build Config |

**Tech Stack GUI:**
- React 19.1.0 + Vite 7.0.4 + Tailwind 4.1.18
- Zustand 5.0.10 (state management)
- Framer Motion 12.x (animations)
- React Virtuoso (virtual scrolling)
- Vitest + Playwright (testing)

---

## Wersje Komponentów

| Komponent | Wersja | Lokalizacja |
|-----------|--------|-------------|
| GeminiHydra (Core) | 0.3.0 | `GEMINI.md`, `ARCHITECTURE.md` |
| GeminiGUI | 0.2.0 | `GeminiGUI/package.json` |
| geminicli | 1.0.0 | `package.json` (root) |

---

## Kontrybucje

Projekt jest w fazie aktywnego rozwoju. Zapoznaj sie z `CONTRIBUTING.md` i dolacz do Szkoly Wilka!

**Licencja:** MIT
**Autor:** GeminiCLI Team
