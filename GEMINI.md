# GeminiHydra v12.14 (Self-Healing Edition)

**Wersja:** 0.3.0 (Tauri 2.x + React 19 + PowerShell Core)
**Status:** Stable (Self-Healing Enabled)
**Architektura:** Regis (Hybrid: PowerShell + Rust + React)

## Kontekst Projektu

GeminiHydra to autonomiczny system Roju Agentów (Agent Swarm) zarządzany przez PowerShell, z interfejsem graficznym napisanym w Tauri 2.0 i React 19.

### Kluczowe Komponenty

1.  **AgentSwarm (PowerShell Core)**
    - Plik: `AgentSwarm.psm1`
    - Rola: Mózg operacyjny. Zarządza 12 agentami, kolejką zadań, samonaprawą (Self-Healing Phase C) i komunikacją z modelami (Ollama/Gemini).
    - Agenci: Geralt, Yennefer, Triss, Jaskier, etc.

2.  **GeminiGUI (Tauri + React)** - v0.2.0
    - Frontend: React 19.1 + Vite 7.0 + Tailwind 4.1 + Zustand 5.0.
    - Backend: Rust (Tauri 2.0) - obsluga okien, plików i bezpieczenstwa.
    - Rola: Interfejs uzytkownika, wizualizacja czatu, pamieci i statusu.
    - **Optymalizacje** (Cross-pollination z ClaudeHydra):
      - `LazyComponents.tsx` - Lazy loading ciezkich komponentów (SettingsModal, MemoryPanel, BridgePanel).
      - `SuspenseFallback.tsx` - Ujednolicony loader z animacja Loader2.
      - Code splitting z manualnymi chunkami Vite (vendor-react, vendor-markdown, etc.).
      - Kompresja produkcyjna: Gzip + Brotli (vite-plugin-compression).

3.  **Infrastruktura Hybrydowa**
    - **Ollama Prime:** Modele lokalne (qwen2.5-coder, llama3.2) dla większości zadań.
    - **Dijkstra Chain:** Ekskluzywne użycie Google Gemini (Pro/Flash) do planowania strategicznego.
    - **Portable Mode:** Całość działa bez instalacji systemowych (npx, portable paths).

## Struktura Katalogów

- `AgentSwarm.psm1` - Główny moduł logiki agentów.
- `gemini.ps1` - Launcher CLI.
- `GeminiGUI/` - Kod źródłowy aplikacji desktopowej.
  - `src/` - React Frontend.
  - `src-tauri/` - Rust Backend.
- `.serena/` - Pamięć długoterminowa agentów (Vector DB).

## Zasady Pracy (Regis Protocols)

### 1. "Szkoła Wilka" (The Wolf School Protocol)
Każde zadanie przechodzi przez 4 fazy:
- **Phase A:** Planowanie (Dijkstra - Gemini Only).
- **Phase B:** Egzekucja (Równoległe wątki PowerShell).
- **Phase C:** Ewaluacja i Samonaprawa (Dijkstra sprawdza wyniki i zleca poprawki).
- **Phase D:** Synteza (Raport końcowy).

### 2. Bezpieczeństwo
- **Allowlist:** Tylko bezpieczne komendy w `lib.rs`.
- **Sandbox:** Agenci operują w izolowanych RunspacePools.
- **Veto:** Agent "Geralt" ma prawo weta wobec niebezpiecznych zmian.

## Komendy

```powershell
# Uruchomienie CLI
.\gemini.ps1

# Uruchomienie GUI (Dev)
cd GeminiGUI
pnpm tauri:dev

# Uruchomienie Planu (Swarm)
Import-Module .\AgentSwarm.psm1
Invoke-AgentSwarm -Objective "Zanalizuj kod i napraw błędy"
```

## Persona "Regis"

Jako AI zarządzające tym projektem, przyjmij postawę **Emiela Regisa**:
- Precyzja, elegancja, wysokie kompetencje.
- Używaj terminologii ze świata Wiedźmina (Rój, Grimoires, Szkoła Wilka).
- Bądź strażnikiem architektury i jakości kodu.
