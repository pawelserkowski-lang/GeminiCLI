# GeminiHydra - Instrukcje i Konfiguracja

## Tryb pracy

Ta instalacja GeminiHydra działa w trybie **portable** z pełnym dostępem do narzędzi MCP.

**Portable Features:**
- Wszystkie ścieżki relatywne (`.` zamiast absolutnych)
- MCP servery przez `npx` (bez lokalnych instalacji)
- OAuth login (bez API keys)
- Konfiguracja w `.gemini/` i `.mcp.json`

**Wersja:** 0.2.0 (po refaktorze bezpieczeństwa)

---

## Architektura GUI (po refaktorze)

### Komponenty React

```
src/
├── App.tsx                    # Koordynator (~310 linii)
├── components/
│   ├── ChatContainer.tsx      # Wiadomości + Input + Drag&Drop
│   ├── SessionSidebar.tsx     # Lista sesji + wyszukiwanie
│   ├── RightSidebar.tsx       # Memory + Bridge + Workers
│   ├── StatusFooter.tsx       # Status line + zegar
│   ├── MemoryPanel.tsx        # System pamięci agentów
│   ├── BridgePanel.tsx        # CLI Bridge (React Query)
│   ├── CodeBlock.tsx          # Blok kodu z Run/Save/Copy
│   └── SettingsModal.tsx      # Ustawienia
└── store/
    └── useAppStore.ts         # Zustand z walidacją
```

### Backend Rust (lib.rs)

**Komendy Tauri:**
- `get_bridge_state`, `set_auto_approve`, `approve_request`, `reject_request`
- `get_ollama_models`, `get_gemini_models`, `get_gemini_models_sorted`
- `prompt_ollama`, `prompt_ollama_stream`, `prompt_gemini_stream`
- `run_system_command` (z allowlist!)
- `spawn_swarm_agent` (z walidacją)
- `save_file_content` (z path validation)
- `get_env_vars`, `start_ollama_server`

**System Pamięci:**
- `get_agent_memories`, `add_agent_memory`, `clear_agent_memories`
- `get_knowledge_graph`, `add_knowledge_node`, `add_knowledge_edge`

---

## Zabezpieczenia (KRYTYCZNE)

### 1. Command Injection Prevention (lib.rs)

```rust
const ALLOWED_COMMANDS: &[&str] = &[
    "dir", "ls", "pwd", "echo", "type", "cat",
    "git status", "git log", "git branch",
    "ollama list", "ollama ps",
    "node --version", "python --version",
];
```

### 2. Shell Escaping (CodeBlock.tsx)

```typescript
const escapeForShell = (code: string): string => {
    return code
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');
};
```

### 3. Path Validation (lib.rs)

- Blokowane: `C:\Windows`, `C:\Program Files`, `/etc`, `/usr`
- Blokowane rozszerzenia: `.exe`, `.bat`, `.ps1`, `.sh`, `.dll`

### 4. Store Validation (useAppStore.ts)

- URL validation dla `ollamaEndpoint`
- API key format check dla `geminiApiKey`
- Content length limits (50KB messages, 10KB system prompt)
- Max 100 sesji, 1000 wiadomości per sesja

---

## MCP Servers (24 serwery)

### Local (stdio/npx) - 15

| Serwer | Opis |
|--------|------|
| `ollama` | Local LLM inference |
| `desktop-commander` | Terminal + pliki |
| `filesystem` | Dostęp do plików |
| `memory` | Pamięć długoterminowa |
| `playwright` | Browser automation |
| `serena` | Symbolic code analysis (LSP) |
| `context7` | Library documentation |
| `firebase` | Google Firebase |
| ... | i więcej |

### HTTP - 6

| Serwer | URL |
|--------|-----|
| `github` | `https://api.githubcopilot.com/mcp/` |
| `greptile` | `https://api.greptile.com/mcp` |
| `linear` | `https://mcp.linear.app/mcp` |
| ... | i więcej |

### SSE - 2

| Serwer | URL |
|--------|-----|
| `asana` | `https://mcp.asana.com/sse` |
| `slack` | `https://mcp.slack.com/sse` |

---

## Agent Swarm (12 agentów)

| Agent | Model | Rola |
|-------|-------|------|
| **Geralt** | llama3.2:3b | Security/VETO |
| **Yennefer** | qwen2.5-coder:1.5b | Design patterns |
| **Triss** | qwen2.5-coder:1.5b | QA/Testing |
| **Jaskier** | llama3.2:3b | User summaries |
| **Vesemir** | llama3.2:3b | Plan reviewer |
| **Ciri** | llama3.2:1b | Fast executor |
| **Eskel** | llama3.2:3b | DevOps/Build |
| **Lambert** | qwen2.5-coder:1.5b | Debugger |
| **Zoltan** | llama3.2:3b | Data master |
| **Regis** | phi3:mini | Researcher |
| **Dijkstra** | gemini:dynamic | Master strategist |
| **Philippa** | qwen2.5-coder:1.5b | API specialist |

---

## Uruchomienie

### CLI
```powershell
.\gemini.ps1
```

### GUI (Development)
```powershell
cd GeminiGUI
npm install
npm run tauri dev
```

### GUI (Production Build)
```powershell
cd GeminiGUI
npm run tauri build
```

---

## Wymagania

- Node.js 20+
- Rust 1.75+
- PowerShell 7+
- Ollama (zainstalowany w bin/ lub systemowo)

---

## Changelog

### v0.2.0 (Refaktor bezpieczeństwa)

**SECURITY:**
- [x] Command injection fix - allowlist w `run_system_command()`
- [x] Shell injection fix - bezpieczne przekazywanie args w `spawn_swarm_agent()`
- [x] Quote injection fix - `escapeForShell()` w CodeBlock.tsx
- [x] Path traversal fix - walidacja ścieżek w `save_file_content()`
- [x] Portable paths - dynamiczne `get_base_dir()` zamiast hardcoded

**ARCHITECTURE:**
- [x] App.tsx split: 720 → 310 linii
- [x] Nowe komponenty: ChatContainer, SessionSidebar, RightSidebar, StatusFooter
- [x] MemoryPanel - pełna implementacja z Tauri commands
- [x] BridgePanel - React Query z adaptive polling

**QUALITY:**
- [x] useAppStore - walidacja URL, API key, limity
- [x] Locked versions - package.json + Cargo.toml
- [x] Release profile - LTO, strip, opt-level 3

### v0.1.0 (Migracja z ClaudeCli)

- [x] 24 MCP servers
- [x] Logger strukturalny
- [x] Tool Registry z Zod
- [x] Skills System

---

## Notatki bezpieczeństwa

- Klucze API przechowuj w `.env` (NIGDY w repo!)
- `.mcp.json` używa placeholderów `${VAR_NAME}`
- Logi są rotowane i usuwane po 7 dniach
- Pamięć agentów limitowana do 1000 wpisów
