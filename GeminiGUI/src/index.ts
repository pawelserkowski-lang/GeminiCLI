/**
 * GeminiGUI - Main Barrel Export
 * @module index
 *
 * Centralized entry point for all GeminiGUI exports.
 * This allows consumers to import from '@/index' or the package root.
 *
 * Usage:
 *   import { ChatContainer, useAppStore, LIMITS } from '@/index';
 *   import type { Message, Session, Settings } from '@/index';
 */

// ============================================================================
// COMPONENTS
// ============================================================================

// Main Components
export {
  ChatContainer,
  SessionSidebar,
  RightSidebar,
  SettingsModal,
  StatusFooter,
  MemoryPanel,
  BridgePanel,
  CodeBlock,
  ErrorBoundary,
  ErrorBoundaryDefault,
} from './components';

export type {
  ChatContainerProps,
  SessionSidebarProps,
  StatusFooterProps,
  SettingsModalProps,
} from './components';

// Chat Components
export {
  MessageList,
  MessageListDefault,
  ChatInput,
  ChatInputDefault,
  ModelSelector,
  ModelSelectorDefault,
  DragDropZone,
  DragDropZoneDefault,
} from './components/chat';

export type {
  MessageListProps,
  ChatInputProps,
  ModelSelectorProps,
  DragDropZoneProps,
} from './components/chat';

// UI Components
export {
  Button,
  ButtonDefault,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonMessage,
} from './components/ui';

export type {
  ButtonProps,
  SkeletonBaseProps,
  SkeletonTextProps,
  SkeletonAvatarProps,
  SkeletonCardProps,
  SkeletonMessageProps,
} from './components/ui';

// ============================================================================
// HOOKS
// ============================================================================

export {
  useAppTheme,
  useAppThemeDefault,
  useStreamListeners,
  useStreamListenersDefault,
  useGeminiModels,
  useGeminiModelsDefault,
  useEnvLoader,
  useEnvLoaderDefault,
  useToast,
  useToastDefault,
  useHotkey,
  isHotkeyPressed,
  useHotkeyDefault,
  useKeyboardShortcuts,
  useKeyboardShortcutsDefault,
} from './hooks';

export type {
  ToastNotification,
  UseToastReturn,
} from './hooks';

// ============================================================================
// SERVICES
// ============================================================================

export {
  TauriService,
  BridgeService,
  ModelService,
  PromptService,
  SystemService,
  MemoryService,
  TauriServiceDefault,
} from './services';

export type {
  EnvVars,
  AgentMemory,
  KnowledgeNode,
  KnowledgeEdge,
  KnowledgeGraph,
} from './services';

// ============================================================================
// STORE (Zustand State Management)
// ============================================================================

export {
  useAppStore,
  selectTheme,
  selectProvider,
  selectCount,
  selectSessions,
  selectCurrentSession,
  selectCurrentSessionMessages,
  selectIsApiKeySet,
  selectSettings,
  selectSessionById,
  selectMessagesBySessionId,
} from './store';

// ============================================================================
// TYPES
// ============================================================================

export type {
  MessageRole,
  Message,
  Session,
  Provider,
  Settings,
  Theme,
  StreamPayload,
  BridgeState,
  BridgeRequest,
  AgentMemory as AgentMemoryType,
  KnowledgeNode as KnowledgeNodeType,
  KnowledgeEdge as KnowledgeEdgeType,
  KnowledgeGraph as KnowledgeGraphType,
  ChatContainerProps as ChatContainerPropsType,
  SessionSidebarProps as SessionSidebarPropsType,
  StatusFooterProps as StatusFooterPropsType,
  SettingsModalProps as SettingsModalPropsType,
  AppState,
} from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export {
  LIMITS,
  STATUS,
  DEFAULT_SYSTEM_PROMPT,
  DEFAULT_SETTINGS,
  FALLBACK_MODELS,
  AGENTS,
  TAURI_EVENTS,
  TAURI_COMMANDS,
  QUERY_KEYS,
  STORAGE_KEYS,
  COMMAND_PATTERNS,
  UI,
  KEYBOARD_SHORTCUTS,
  KEYBOARD_SHORTCUTS_LABELS,
} from './constants';

// ============================================================================
// UTILITIES
// ============================================================================

export {
  isValidUrl,
  isValidApiKey,
  sanitizeContent,
  sanitizeTitle,
} from './utils/validators';

// ============================================================================
// RE-EXPORT TYPE UTILITIES
// ============================================================================

// For convenience, also export as type-only re-exports if needed
export type {
  MessageRole,
  Message,
  Session,
  Settings,
  Theme,
  StreamPayload,
  BridgeState,
  BridgeRequest,
  AppState,
} from './types';
