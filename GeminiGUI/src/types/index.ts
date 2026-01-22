/**
 * GeminiGUI - Centralized Type Definitions
 * @module types
 */

// ============================================================================
// MESSAGE TYPES
// ============================================================================

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  role: MessageRole;
  content: string;
  timestamp: number;
}

// ============================================================================
// SESSION TYPES
// ============================================================================

export interface Session {
  id: string;
  title: string;
  createdAt: number;
}

// ============================================================================
// SETTINGS TYPES
// ============================================================================

export type Provider = 'ollama' | 'gemini';

export interface Settings {
  ollamaEndpoint: string;
  systemPrompt: string;
  geminiApiKey: string;
  defaultProvider: Provider;
  useSwarm: boolean;
}

// ============================================================================
// THEME TYPES
// ============================================================================

export type Theme = 'dark' | 'light';

// ============================================================================
// STREAM TYPES (Tauri Events)
// ============================================================================

export interface StreamPayload {
  chunk: string;
  done: boolean;
}

// ============================================================================
// BRIDGE TYPES
// ============================================================================

export interface BridgeState {
  auto_approve: boolean;
}

export interface BridgeRequest {
  id: string;
  command: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: number;
}

// ============================================================================
// MEMORY TYPES (Agent Swarm)
// ============================================================================

export interface AgentMemory {
  id: string;
  agent: string;
  content: string;
  timestamp: number;
  tags?: string[];
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'concept' | 'entity' | 'action';
}

export interface KnowledgeEdge {
  from: string;
  to: string;
  relation: string;
}

export interface KnowledgeGraph {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface ChatContainerProps {
  messages: Message[];
  isStreaming: boolean;
  modelsLoading: boolean;
  modelsError: Error | null;
  models: string[] | undefined;
  selectedModel: string;
  onSelectModel: (model: string) => void;
  onSubmit: (prompt: string, image: string | null) => Promise<void>;
  onExecuteCommand: (cmd: string) => Promise<void>;
}

export interface SessionSidebarProps {
  sessions: Session[];
  currentSessionId: string | null;
  onCreateSession: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onUpdateTitle: (id: string, title: string) => void;
}

export interface StatusFooterProps {
  isStreaming: boolean;
  isWorking: boolean;
  hasError: boolean;
  selectedModel: string;
}

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ============================================================================
// APP STATE TYPES (Zustand Store)
// ============================================================================

export interface AppState {
  // UI State
  count: number;
  theme: Theme;
  provider: Provider;

  // Session Management
  sessions: Session[];
  currentSessionId: string | null;
  chatHistory: Record<string, Message[]>;

  // Settings
  settings: Settings;

  // Actions - Counter
  increment: () => void;
  decrement: () => void;
  reset: () => void;

  // Actions - Theme
  toggleTheme: () => void;

  // Actions - Provider
  setProvider: (provider: Provider) => void;

  // Actions - Sessions
  createSession: () => void;
  deleteSession: (id: string) => void;
  selectSession: (id: string) => void;
  updateSessionTitle: (id: string, title: string) => void;

  // Actions - Messages
  addMessage: (msg: Message) => void;
  updateLastMessage: (content: string) => void;
  clearHistory: () => void;

  // Actions - Settings
  updateSettings: (settings: Partial<Settings>) => void;
}
