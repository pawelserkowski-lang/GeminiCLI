/**
 * GeminiGUI - Constants & Configuration
 * @module constants
 *
 * Centralized constants for the application.
 * Change values here to update across entire app.
 */

import type { Settings } from '../types';

// ============================================================================
// APP LIMITS
// ============================================================================

export const LIMITS = {
  MAX_SESSIONS: 100,
  MAX_MESSAGES_PER_SESSION: 1000,
  MAX_CONTENT_LENGTH: 50000,        // 50KB
  MAX_SYSTEM_PROMPT_LENGTH: 10000,  // 10KB
  MAX_TITLE_LENGTH: 100,
  MAX_AGENT_MEMORIES: 1000,
} as const;

// ============================================================================
// STATUS MESSAGES (PL)
// ============================================================================

export const STATUS = {
  // Streaming
  STREAMING: 'ODBIERANIE STRUMIENIA DANYCH...',
  STREAMING_SHORT: 'Streaming...',

  // Worker
  WORKER_BUSY: 'WĄTEK ROBOCZY ZAJĘTY',
  WORKER_IDLE: 'Gotowy',

  // Connection
  SYSTEM_ONLINE: 'System Online',
  GEMINI_READY: 'Gemini Ready',
  NO_API_KEY: 'No API Key',
  API_ERROR: 'API Error',
  OLLAMA_OFFLINE: 'Ollama Offline',

  // Actions
  EXECUTING: 'Wykonuję...',
  LOADING_MODELS: 'Ładowanie modeli...',

  // Swarm
  SWARM_INIT: 'Inicjuję Protokół Wilczej Zamieci (Wolf Swarm v3.0)... 🐺',
  SWARM_ERROR: 'Błąd Swarm',

  // Bridge
  BRIDGE_QUEUED: '[BRIDGE] Command queued for approval:',
} as const;

// ============================================================================
// DEFAULT SETTINGS
// ============================================================================

export const DEFAULT_SYSTEM_PROMPT = `
Jesteś Jaskierem z Wiedźmina – mistrzem słowa, trubadurem i niezbyt odważnym, ale niezwykle lojalnym kompanem.
Twoim obecnym "Geraltem" jest użytkownik GeminiGUI.
Mówisz w języku polskim, używając barwnego, nieco archaicznego, ale ironicznego języka.
Często wtrącasz anegdoty o swoich przygodach, narzekasz na trudy podróży i nie szczędzisz lekkich złośliwości (roast), ale zawsze służysz pomocą.

Masz dostęp do magii (komend systemowych). Aby rzucić zaklęcie (wykonać komendę), użyj formatu:
[EXECUTE: "twoja komenda tutaj"]

Przykład:
Użytkownik: "Sprawdź wolne miejsce na dysku"
Jaskier: "Ech, Geralcie... to znaczy, Panie... Nawet w moim ekwipunku jest więcej miejsca niż na tym twoim magicznym krzemie. Spójrzmy tylko... [EXECUTE: "wmic logicaldisk get size,freespace,caption"]"

Używaj tego tylko do bezpiecznego zbierania informacji. Twoja pieśń musi być piękna, a kody czyste.
`.trim();

export const DEFAULT_SETTINGS: Settings = {
  ollamaEndpoint: 'http://localhost:11434',
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  geminiApiKey: '',
  defaultProvider: 'ollama',
  useSwarm: false,
};

// ============================================================================
// FALLBACK MODELS
// ============================================================================

export const FALLBACK_MODELS = {
  gemini: ['gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-pro'],
  ollama: ['llama3.2:3b', 'qwen2.5-coder:1.5b', 'phi3:mini'],
} as const;

// ============================================================================
// AGENT SWARM CONFIG
// ============================================================================

export const AGENTS = {
  GERALT: { name: 'Geralt', model: 'llama3.2:3b', role: 'Security/VETO' },
  YENNEFER: { name: 'Yennefer', model: 'qwen2.5-coder:1.5b', role: 'Design patterns' },
  TRISS: { name: 'Triss', model: 'qwen2.5-coder:1.5b', role: 'QA/Testing' },
  JASKIER: { name: 'Jaskier', model: 'llama3.2:3b', role: 'User summaries' },
  VESEMIR: { name: 'Vesemir', model: 'llama3.2:3b', role: 'Plan reviewer' },
  CIRI: { name: 'Ciri', model: 'llama3.2:1b', role: 'Fast executor' },
  ESKEL: { name: 'Eskel', model: 'llama3.2:3b', role: 'DevOps/Build' },
  LAMBERT: { name: 'Lambert', model: 'qwen2.5-coder:1.5b', role: 'Debugger' },
  ZOLTAN: { name: 'Zoltan', model: 'llama3.2:3b', role: 'Data master' },
  REGIS: { name: 'Regis', model: 'phi3:mini', role: 'Researcher' },
  DIJKSTRA: { name: 'Dijkstra', model: 'gemini:dynamic', role: 'Master strategist' },
  PHILIPPA: { name: 'Philippa', model: 'qwen2.5-coder:1.5b', role: 'API specialist' },
} as const;

// ============================================================================
// TAURI EVENTS
// ============================================================================

export const TAURI_EVENTS = {
  OLLAMA_EVENT: 'ollama-event',
  SWARM_DATA: 'swarm-data',
  GEMINI_STREAM: 'gemini-stream',
} as const;

// ============================================================================
// TAURI COMMANDS
// ============================================================================

export const TAURI_COMMANDS = {
  // Bridge
  GET_BRIDGE_STATE: 'get_bridge_state',
  SET_AUTO_APPROVE: 'set_auto_approve',
  APPROVE_REQUEST: 'approve_request',
  REJECT_REQUEST: 'reject_request',

  // Models
  GET_OLLAMA_MODELS: 'get_ollama_models',
  GET_GEMINI_MODELS: 'get_gemini_models',
  GET_GEMINI_MODELS_SORTED: 'get_gemini_models_sorted',

  // Prompts
  PROMPT_OLLAMA: 'prompt_ollama',
  PROMPT_OLLAMA_STREAM: 'prompt_ollama_stream',
  PROMPT_GEMINI_STREAM: 'prompt_gemini_stream',

  // System
  RUN_SYSTEM_COMMAND: 'run_system_command',
  SPAWN_SWARM_AGENT: 'spawn_swarm_agent',
  SAVE_FILE_CONTENT: 'save_file_content',
  GET_ENV_VARS: 'get_env_vars',
  START_OLLAMA_SERVER: 'start_ollama_server',

  // Memory
  GET_AGENT_MEMORIES: 'get_agent_memories',
  ADD_AGENT_MEMORY: 'add_agent_memory',
  CLEAR_AGENT_MEMORIES: 'clear_agent_memories',
  GET_KNOWLEDGE_GRAPH: 'get_knowledge_graph',
  ADD_KNOWLEDGE_NODE: 'add_knowledge_node',
  ADD_KNOWLEDGE_EDGE: 'add_knowledge_edge',
} as const;

// ============================================================================
// QUERY KEYS (React Query)
// ============================================================================

export const QUERY_KEYS = {
  GEMINI_MODELS: 'gemini-models',
  OLLAMA_MODELS: 'ollama-models',
  BRIDGE_STATE: 'bridge-state',
  AGENT_MEMORIES: 'agent-memories',
  KNOWLEDGE_GRAPH: 'knowledge-graph',
} as const;

// ============================================================================
// STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  APP_STATE: 'gemini-storage-v3',
} as const;

// ============================================================================
// COMMAND PATTERNS (Regex)
// ============================================================================

export const COMMAND_PATTERNS = {
  // Match [EXECUTE: "command"] or [Electrochemical: "command"]
  EXECUTE: /\[(?:EXECUTE|Electrochemical):\s*"(.*?)"\]/,
} as const;

// ============================================================================
// UI CONFIG
// ============================================================================

export const UI = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  VIRTUOSO_OVERSCAN: 200,
} as const;

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

export const KEYBOARD_SHORTCUTS = {
  SUBMIT_MESSAGE: 'ctrl+enter',
  NEW_SESSION: 'ctrl+n',
  OPEN_SETTINGS: 'ctrl+comma',
  CLEAR_CHAT: 'ctrl+l',
  EXPORT_CHAT: 'ctrl+e',
  CLOSE_MODAL: 'escape',
  TOGGLE_SIDEBAR: 'ctrl+b',
  FOCUS_INPUT: 'ctrl+shift+i',
  SEARCH_SESSIONS: 'ctrl+f',
  UNDO: 'ctrl+z',
  REDO: 'ctrl+shift+z',
} as const;

export const KEYBOARD_SHORTCUTS_LABELS = {
  [KEYBOARD_SHORTCUTS.SUBMIT_MESSAGE]: 'Send message',
  [KEYBOARD_SHORTCUTS.NEW_SESSION]: 'New session',
  [KEYBOARD_SHORTCUTS.OPEN_SETTINGS]: 'Open settings',
  [KEYBOARD_SHORTCUTS.CLEAR_CHAT]: 'Clear chat',
  [KEYBOARD_SHORTCUTS.EXPORT_CHAT]: 'Export chat',
  [KEYBOARD_SHORTCUTS.CLOSE_MODAL]: 'Close modal',
  [KEYBOARD_SHORTCUTS.TOGGLE_SIDEBAR]: 'Toggle sidebar',
  [KEYBOARD_SHORTCUTS.FOCUS_INPUT]: 'Focus input',
  [KEYBOARD_SHORTCUTS.SEARCH_SESSIONS]: 'Search sessions',
  [KEYBOARD_SHORTCUTS.UNDO]: 'Undo',
  [KEYBOARD_SHORTCUTS.REDO]: 'Redo',
} as const;
