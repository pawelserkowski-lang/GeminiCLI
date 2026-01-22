/**
 * GeminiGUI - ChatInput Component
 * @module components/chat/ChatInput
 *
 * Chat input form with image preview and model selector.
 */

import { useState, memo, type FormEvent } from 'react';
import { Send, RefreshCw, X } from 'lucide-react';
import { ModelSelector } from './ModelSelector';

// ============================================================================
// TYPES
// ============================================================================

export interface ChatInputProps {
  isStreaming: boolean;
  modelsLoading: boolean;
  modelsError: unknown;
  models: string[];
  selectedModel: string;
  onSelectModel: (model: string) => void;
  onSubmit: (prompt: string, image: string | null) => void;
  pendingImage: string | null;
  onClearImage: () => void;
}

// ============================================================================
// IMAGE PREVIEW
// ============================================================================

interface ImagePreviewProps {
  src: string;
  onRemove: () => void;
}

const ImagePreview = memo<ImagePreviewProps>(({ src, onRemove }) => (
  <div className="relative inline-block w-fit">
    <img
      src={src}
      alt="Preview"
      className="h-16 w-auto rounded border border-[var(--matrix-accent)]"
    />
    <button
      type="button"
      onClick={onRemove}
      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
    >
      <X size={12} />
    </button>
  </div>
));

ImagePreview.displayName = 'ImagePreview';

// ============================================================================
// CHAT INPUT
// ============================================================================

export const ChatInput = memo<ChatInputProps>(
  ({
    isStreaming,
    modelsLoading,
    modelsError,
    models,
    selectedModel,
    onSelectModel,
    onSubmit,
    pendingImage,
    onClearImage,
  }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if ((!prompt.trim() && !pendingImage) || isStreaming) return;

      onSubmit(prompt, pendingImage);
      setPrompt('');
    };

    const isDisabled = !!modelsError || isStreaming;
    const canSubmit = !isDisabled && (prompt.trim() || pendingImage);

    return (
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-[var(--matrix-border)] bg-black/10 flex flex-col gap-2"
      >
        {/* Image Preview */}
        {pendingImage && <ImagePreview src={pendingImage} onRemove={onClearImage} />}

        <div className="flex gap-2">
          <ModelSelector
            models={models}
            selectedModel={selectedModel}
            onSelectModel={onSelectModel}
            isLoading={modelsLoading}
            hasError={!!modelsError}
          />

          <input
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
            placeholder={pendingImage ? 'Opisz ten obraz...' : 'Wpisz polecenie...'}
            disabled={isDisabled}
            className="flex-1 matrix-input rounded px-4 py-2 transition-colors duration-300 disabled:opacity-50"
          />

          <button
            type="submit"
            className="glass-button flex items-center gap-2"
            disabled={!canSubmit}
          >
            {isStreaming ? (
              <RefreshCw className="animate-spin" size={16} />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </form>
    );
  }
);

ChatInput.displayName = 'ChatInput';

export default ChatInput;
