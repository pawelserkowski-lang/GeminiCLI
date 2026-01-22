/**
 * GeminiGUI - ChatContainer Component
 * @module components/ChatContainer
 *
 * Main chat interface container using sub-components.
 */

import { useState, useCallback, memo } from 'react';
import type { Message } from '../types';

// Sub-components
import { MessageList, ChatInput, DragDropZone } from './chat';

// ============================================================================
// TYPES
// ============================================================================

export interface ChatContainerProps {
  messages: Message[];
  isStreaming: boolean;
  modelsLoading: boolean;
  modelsError: unknown;
  models: string[];
  selectedModel: string;
  onSelectModel: (model: string) => void;
  onSubmit: (prompt: string, image: string | null) => void;
  onExecuteCommand: (cmd: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ChatContainer = memo<ChatContainerProps>(
  ({
    messages,
    isStreaming,
    modelsLoading,
    modelsError,
    models,
    selectedModel,
    onSelectModel,
    onSubmit,
    onExecuteCommand,
  }) => {
    const [pendingImage, setPendingImage] = useState<string | null>(null);
    const [textContext, setTextContext] = useState<string>('');

    // Handle image drop
    const handleImageDrop = useCallback((base64: string) => {
      setPendingImage(base64);
    }, []);

    // Handle text file drop
    const handleTextDrop = useCallback((content: string, filename: string) => {
      setTextContext(
        `[Plik Kontekstowy: ${filename}]\n\`\`\`\n${content}\n\`\`\`\n\nPrzeanalizuj tresc tego pliku.`
      );
    }, []);

    // Handle form submission
    const handleSubmit = useCallback(
      (prompt: string, image: string | null) => {
        // Include text context if available
        const finalPrompt = textContext ? `${textContext}\n\n${prompt}` : prompt;
        onSubmit(finalPrompt, image);
        setTextContext('');
        setPendingImage(null);
      },
      [onSubmit, textContext]
    );

    // Clear pending image
    const handleClearImage = useCallback(() => {
      setPendingImage(null);
    }, []);

    return (
      <DragDropZone onImageDrop={handleImageDrop} onTextDrop={handleTextDrop}>
        <div className="glass-panel flex-1 rounded-lg border-[var(--matrix-border)] flex flex-col min-h-0">
          {/* Messages List */}
          <div className="flex-1 min-h-0">
            <MessageList
              messages={messages}
              isStreaming={isStreaming}
              onExecuteCommand={onExecuteCommand}
            />
          </div>

          {/* Input Area */}
          <ChatInput
            isStreaming={isStreaming}
            modelsLoading={modelsLoading}
            modelsError={modelsError}
            models={models}
            selectedModel={selectedModel}
            onSelectModel={onSelectModel}
            onSubmit={handleSubmit}
            pendingImage={pendingImage}
            onClearImage={handleClearImage}
          />
        </div>
      </DragDropZone>
    );
  }
);

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;
