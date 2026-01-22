/**
 * GeminiGUI - Chat Components Barrel Export
 * @module components/chat
 *
 * Sub-components for the ChatContainer, organized by feature.
 * All chat-related components are centrally exported from this file.
 *
 * Usage:
 *   import { MessageList, ChatInput, ModelSelector } from '@/components/chat';
 *   import type { MessageListProps, ChatInputProps } from '@/components/chat';
 */

// ============================================================================
// MESSAGE DISPLAY COMPONENTS
// ============================================================================

export { MessageList, default as MessageListDefault } from './MessageList';
export type { MessageListProps } from './MessageList';

export {
  MessageSkeleton,
  MessageStreamSkeleton,
  default as MessageSkeletonDefault,
} from './MessageSkeleton';

export type { MessageSkeletonProps } from './MessageSkeleton';

// ============================================================================
// INPUT & INTERACTION COMPONENTS
// ============================================================================

export { ChatInput, default as ChatInputDefault } from './ChatInput';
export type { ChatInputProps } from './ChatInput';

export { DragDropZone, default as DragDropZoneDefault } from './DragDropZone';
export type { DragDropZoneProps } from './DragDropZone';

// ============================================================================
// MODEL SELECTION COMPONENT
// ============================================================================

export { ModelSelector, default as ModelSelectorDefault } from './ModelSelector';
export type { ModelSelectorProps } from './ModelSelector';
