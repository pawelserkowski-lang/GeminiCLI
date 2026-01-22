/**
 * GeminiGUI - Components Barrel Export
 * @module components
 *
 * Main component exports for the application.
 * All components are centrally exported from this file.
 *
 * Usage:
 *   import { ChatContainer, Button } from '@/components';
 *   import type { ChatContainerProps } from '@/components';
 */

// ============================================================================
// MAIN LAYOUT COMPONENTS
// ============================================================================

export { ChatContainer, default as ChatContainerDefault } from './ChatContainer';
export type { ChatContainerProps } from './ChatContainer';

export { SessionSidebar, default as SessionSidebarDefault } from './SessionSidebar';
export type { SessionSidebarProps } from './SessionSidebar';

export { RightSidebar, default as RightSidebarDefault } from './RightSidebar';

export { SettingsModal, default as SettingsModalDefault } from './SettingsModal';
export type { SettingsModalProps } from './SettingsModal';

export { StatusFooter, default as StatusFooterDefault } from './StatusFooter';
export type { StatusFooterProps } from './StatusFooter';

// ============================================================================
// FEATURE COMPONENTS
// ============================================================================

export { MemoryPanel, default as MemoryPanelDefault } from './MemoryPanel';
export { BridgePanel, default as BridgePanelDefault } from './BridgePanel';

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

export { CodeBlock, default as CodeBlockDefault } from './CodeBlock';

export { ErrorBoundary, default as ErrorBoundaryDefault } from './ErrorBoundary';
export type { ErrorBoundaryProps } from './ErrorBoundary';

// ============================================================================
// RE-EXPORT ALL UI COMPONENTS
// ============================================================================

export {
  Button,
  ButtonDefault,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonMessage,
} from './ui';

export type {
  ButtonProps,
  SkeletonBaseProps,
  SkeletonTextProps,
  SkeletonAvatarProps,
  SkeletonCardProps,
  SkeletonMessageProps,
} from './ui';

// ============================================================================
// RE-EXPORT ALL CHAT COMPONENTS
// ============================================================================

export {
  MessageList,
  MessageListDefault,
  ChatInput,
  ChatInputDefault,
  ModelSelector,
  ModelSelectorDefault,
  DragDropZone,
  DragDropZoneDefault,
} from './chat';

export type {
  MessageListProps,
  ChatInputProps,
  ModelSelectorProps,
  DragDropZoneProps,
} from './chat';
