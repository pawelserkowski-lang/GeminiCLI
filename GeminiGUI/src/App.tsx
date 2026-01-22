/**
 * GeminiGUI - Main App Component
 * @module App
 *
 * Coordinator component after refactoring.
 * Uses custom hooks for theme, streaming, and model fetching.
 * Optimized with useMemo and useCallback for performance.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Server, Sun, Moon, Settings, Zap, Eraser } from 'lucide-react';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

// Store & Hooks
import { useAppStore, selectCurrentMessages } from './store/useAppStore';
import { useAppTheme, useStreamListeners, useGeminiModels, useEnvLoader } from './hooks';

// Components
import { SettingsModal } from './components/SettingsModal';
import { ChatContainer } from './components/ChatContainer';
import { SessionSidebar } from './components/SessionSidebar';
import { RightSidebar } from './components/RightSidebar';
import { StatusFooter } from './components/StatusFooter';

// Constants
import { STATUS, COMMAND_PATTERNS, TAURI_COMMANDS } from './constants';

// Types
import type { BridgeState } from './types';

function App() {
  // ========================================
  // Local State
  // ========================================
  const [selectedModel, setSelectedModel] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // ========================================
  // Store State & Actions
  // ========================================
  const {
    count,
    increment,
    decrement,
    sessions,
    currentSessionId,
    chatHistory,
    createSession,
    selectSession,
    deleteSession,
    updateSessionTitle,
    addMessage,
    updateLastMessage,
    clearHistory,
    settings,
    updateSettings,
  } = useAppStore();

  // Derived state using selector
  const currentMessages = useAppStore(selectCurrentMessages);

  // ========================================
  // Custom Hooks
  // ========================================

  // Theme management
  const { theme, toggleTheme, isDark } = useAppTheme();

  // Environment variables loader
  useEnvLoader();

  // Model fetching
  const { models, isLoading: modelsLoading, error: modelsError } = useGeminiModels();

  // Auto-select first model
  useEffect(() => {
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[0]);
    }
  }, [models, selectedModel]);

  // Stream listeners
  useStreamListeners({
    onChunk: updateLastMessage,
    onComplete: () => setIsStreaming(false),
    onError: (error) => {
      console.error('[App] Stream error:', error);
      setIsStreaming(false);
    },
  });

  // ========================================
  // Effects
  // ========================================

  // Open Live Preview Window on boot
  useEffect(() => {
    const openPreview = async () => {
      const livePreview = await WebviewWindow.getByLabel('live-preview');
      if (livePreview) {
        livePreview.show();
      }
    };
    openPreview();
  }, []);

  // Agentic Tool Execution Detection
  useEffect(() => {
    if (isStreaming || currentMessages.length === 0) return;

    const lastMsg = currentMessages[currentMessages.length - 1];
    if (lastMsg.role === 'assistant') {
      const match = lastMsg.content.match(COMMAND_PATTERNS.EXECUTE);
      if (match) {
        executeCommand(match[1]);
      }
    }
  }, [currentMessages, isStreaming, executeCommand]);

  // ========================================
  // Memoized Values - Derived State
  // ========================================

  /**
   * Memoize current session lookup to prevent recalculation on every render
   */
  const currentSession = useMemo(() => {
    return sessions.find((s) => s.id === currentSessionId);
  }, [sessions, currentSessionId]);

  /**
   * Memoize current session messages to prevent array creation on every render
   */
  const currentSessionMessages = useMemo(() => {
    return chatHistory[currentSessionId] || [];
  }, [chatHistory, currentSessionId]);

  /**
   * Memoize status badge state - prevents conditional logic on every render
   */
  const statusBadgeState = useMemo(() => {
    if (modelsError) {
      return { className: 'status-pending', text: STATUS.API_ERROR };
    }
    if (settings.geminiApiKey) {
      return { className: 'status-approved', text: STATUS.GEMINI_READY };
    }
    return { className: 'status-pending', text: STATUS.NO_API_KEY };
  }, [modelsError, settings.geminiApiKey]);

  /**
   * Memoize swarm button styles and attributes
   */
  const swarmButtonAttrs = useMemo(() => {
    return {
      className: `p-2 rounded-full transition-colors ${
        settings.useSwarm
          ? 'bg-[var(--matrix-accent)] text-black shadow-[0_0_10px_rgba(0,255,65,0.5)]'
          : 'hover:bg-[var(--matrix-border)] text-[var(--matrix-text-dim)]'
      }`,
      title: settings.useSwarm
        ? 'Tryb Swarm Aktywny (Wolf Swarm)'
        : 'Aktywuj Tryb Swarm',
      filled: settings.useSwarm,
    };
  }, [settings.useSwarm]);

  /**
   * Memoize logo src based on theme
   */
  const logoSrc = useMemo(() => {
    return isDark ? '/logodark.webp' : '/logolight.webp';
  }, [isDark]);

  /**
   * Memoize header h1 span color class based on theme
   */
  const headerSpanClass = useMemo(() => {
    return isDark ? 'text-white' : 'text-gray-800';
  }, [isDark]);

  /**
   * Memoize session sidebar props to prevent unnecessary child re-renders
   */
  const sessionSidebarProps = useMemo(
    () => ({
      sessions,
      currentSessionId,
      onCreateSession: createSession,
      onSelectSession: selectSession,
      onDeleteSession: deleteSession,
      onUpdateTitle: updateSessionTitle,
    }),
    [sessions, currentSessionId, createSession, selectSession, deleteSession, updateSessionTitle]
  );

  /**
   * Memoize chat container props to prevent unnecessary child re-renders
   */
  const chatContainerProps = useMemo(
    () => ({
      messages: currentMessages,
      isStreaming,
      modelsLoading,
      modelsError,
      models,
      selectedModel,
      onSelectModel: setSelectedModel,
      onSubmit: handleSubmit,
      onExecuteCommand: executeCommand,
    }),
    [currentMessages, isStreaming, modelsLoading, modelsError, models, selectedModel, handleSubmit, executeCommand]
  );

  /**
   * Memoize right sidebar props to prevent unnecessary child re-renders
   */
  const rightSidebarProps = useMemo(
    () => ({
      count,
      onIncrement: increment,
      onDecrement: decrement,
      onExport: handleExport,
    }),
    [count, increment, decrement, handleExport]
  );

  /**
   * Memoize status footer props to prevent unnecessary child re-renders
   */
  const statusFooterProps = useMemo(
    () => ({
      isStreaming,
      isWorking: false,
      hasError: !!modelsError,
      selectedModel,
    }),
    [isStreaming, modelsError, selectedModel]
  );

  // ========================================
  // Memoized Callbacks - Event Handlers
  // ========================================

  /**
   * Toggle settings modal
   */
  const handleToggleSettings = useCallback(() => {
    setIsSettingsOpen((prev) => !prev);
  }, []);

  /**
   * Close settings modal
   */
  const handleCloseSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  /**
   * Toggle swarm mode in settings
   */
  const handleToggleSwarm = useCallback(() => {
    updateSettings({ useSwarm: !settings.useSwarm });
  }, [updateSettings, settings.useSwarm]);

  /**
   * Clear chat history with confirmation
   */
  const handleClearHistory = useCallback(() => {
    if (confirm('Wyczyścić historię czatu?')) {
      clearHistory();
    }
  }, [clearHistory]);

  /**
   * Toggle theme - delegates to custom hook
   */
  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  /**
   * Execute system command with bridge approval check
   */
  const executeCommand = useCallback(
    async (cmd: string) => {
      try {
        const bridge = await invoke<BridgeState>(TAURI_COMMANDS.GET_BRIDGE_STATE);
        if (!bridge.auto_approve) {
          addMessage({
            role: 'system',
            content: `${STATUS.BRIDGE_QUEUED} ${cmd}`,
            timestamp: Date.now(),
          });
          return;
        }
      } catch (e) {
        console.warn('[App] Bridge check failed, proceeding anyway', e);
      }

      addMessage({
        role: 'system',
        content: `> ${STATUS.EXECUTING} ${cmd}`,
        timestamp: Date.now(),
      });

      try {
        const result = await invoke<string>(TAURI_COMMANDS.RUN_SYSTEM_COMMAND, {
          command: cmd,
        });
        updateLastMessage(`\n\nRESULT:\n\`\`\`\n${result}\n\`\`\`\n`);
      } catch (err) {
        updateLastMessage(`\n\nERROR:\n${err}`);
      }
    },
    [addMessage, updateLastMessage]
  );

  /**
   * Handle chat submission - sends message to Swarm agent
   */
  const handleSubmit = useCallback(
    async (userPrompt: string, attachedImage: string | null) => {
      let displayContent = userPrompt;
      if (attachedImage) {
        displayContent = `![Uploaded Image](${attachedImage})\n\n${userPrompt}`;
      }

      addMessage({ role: 'user', content: displayContent, timestamp: Date.now() });
      addMessage({ role: 'assistant', content: '', timestamp: Date.now() });

      setIsStreaming(true);

      // SWARM MODE
      try {
        updateLastMessage(`${STATUS.SWARM_INIT}\n\n`);
        await invoke(TAURI_COMMANDS.SPAWN_SWARM_AGENT, { objective: userPrompt });
      } catch (error) {
        updateLastMessage(`\n[${STATUS.SWARM_ERROR}: ${error}]`);
        setIsStreaming(false);
      }
    },
    [addMessage, updateLastMessage]
  );

  /**
   * Export current session to markdown file
   * Uses memoized session and messages to avoid recalculation
   */
  const handleExport = useCallback(() => {
    if (!currentSessionId) return;

    // Use memoized values to avoid recalculation
    const messages = currentSessionMessages;
    const session = currentSession;

    const content = messages
      .map(
        (m) =>
          `### ${m.role.toUpperCase()} [${new Date(m.timestamp).toLocaleString()}]\n${m.content}\n`
      )
      .join('\n---\n');

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-${session?.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [currentSessionId, currentSession, currentSessionMessages]);

  // ========================================
  // Render
  // ========================================
  return (
    <main className="container mx-auto p-4 h-screen flex flex-col gap-4 matrix-bg overflow-hidden transition-all duration-500">
      <SettingsModal isOpen={isSettingsOpen} onClose={handleCloseSettings} />

      {/* HEADER */}
      <header className="flex items-center justify-between border-b border-[var(--matrix-border)] pb-2 shrink-0">
        <div className="flex items-center gap-4">
          <img
            src={logoSrc}
            alt="Gemini Logo"
            className="w-10 h-10 object-contain transition-all duration-300"
          />
          <h1 className="text-3xl font-bold flex items-center gap-3 text-[var(--matrix-accent)] transition-colors duration-300">
            Gemini
            <span className={headerSpanClass}>GUI</span>
          </h1>
        </div>

        <div className="flex gap-3 items-center">
          {/* Swarm Toggle */}
          <button
            onClick={handleToggleSwarm}
            className={swarmButtonAttrs.className}
            title={swarmButtonAttrs.title}
          >
            <Zap size={20} fill={swarmButtonAttrs.filled ? 'currentColor' : 'none'} />
          </button>

          {/* Clear Chat */}
          <button
            onClick={handleClearHistory}
            className="p-2 rounded-full hover:bg-[var(--matrix-border)] transition-colors text-[var(--matrix-accent)]"
            title="Wyczyść Czat"
          >
            <Eraser size={20} />
          </button>

          {/* Settings */}
          <button
            onClick={handleToggleSettings}
            className="p-2 rounded-full hover:bg-[var(--matrix-border)] transition-colors text-[var(--matrix-accent)]"
            title="Ustawienia"
          >
            <Settings size={20} />
          </button>

          {/* Provider Badge */}
          <div className="flex bg-black/20 rounded-full px-3 py-1 border border-[var(--matrix-border)]">
            <span className="text-xs text-[var(--matrix-accent)] font-bold">Gemini AI</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-full hover:bg-[var(--matrix-border)] transition-colors text-[var(--matrix-accent)]"
            title="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Status Badge */}
          <span className={`status-badge flex items-center gap-1 ${statusBadgeState.className}`}>
            <Server size={12} />
            {statusBadgeState.text}
          </span>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden min-h-0">
        <SessionSidebar {...sessionSidebarProps} />

        <ChatContainer {...chatContainerProps} />

        <RightSidebar {...rightSidebarProps} />
      </div>

      {/* STATUS LINE FOOTER */}
      <StatusFooter {...statusFooterProps} />
    </main>
  );
}

export default App;
