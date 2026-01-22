/**
 * GeminiGUI - Main App Component
 * @module App
 *
 * Coordinator component with proper hook ordering.
 * Uses custom hooks for theme, streaming, and model fetching.
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

  // Theme management (only use toggleTheme and isDark)
  const { toggleTheme, isDark } = useAppTheme();

  // Environment variables loader
  useEnvLoader();

  // Model fetching
  const { models, isLoading: modelsLoading, error: modelsError } = useGeminiModels();

  // Stream listeners
  useStreamListeners({
    onChunk: updateLastMessage,
    onComplete: () => setIsStreaming(false),
    onError: (error: unknown) => {
      console.error('[App] Stream error:', error);
      setIsStreaming(false);
    },
  });

  // ========================================
  // Callbacks (defined BEFORE effects/memos that use them)
  // ========================================

  const handleToggleSettings = useCallback(() => {
    setIsSettingsOpen((prev) => !prev);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  const handleToggleSwarm = useCallback(() => {
    updateSettings({ useSwarm: !settings.useSwarm });
  }, [updateSettings, settings.useSwarm]);

  const handleClearHistory = useCallback(() => {
    if (confirm('Wyczyścić historię czatu?')) {
      clearHistory();
    }
  }, [clearHistory]);

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

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

  const handleSubmit = useCallback(
    async (userPrompt: string, attachedImage: string | null) => {
      let displayContent = userPrompt;
      if (attachedImage) {
        displayContent = `![Uploaded Image](${attachedImage})\n\n${userPrompt}`;
      }

      addMessage({ role: 'user', content: displayContent, timestamp: Date.now() });
      addMessage({ role: 'assistant', content: '', timestamp: Date.now() });

      setIsStreaming(true);

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

  const handleExport = useCallback(() => {
    if (!currentSessionId) return;

    const messages = chatHistory[currentSessionId] || [];
    const session = sessions.find((s) => s.id === currentSessionId);

    const content = messages
      .map(
        (m: { role: string; content: string; timestamp: number }) =>
          `### ${m.role.toUpperCase()} [${new Date(m.timestamp).toLocaleString()}]\n${m.content}\n`
      )
      .join('\n---\n');

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-${session?.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'export'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [currentSessionId, sessions, chatHistory]);

  // ========================================
  // Effects (now callbacks are defined)
  // ========================================

  // Auto-select first model
  useEffect(() => {
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[0]);
    }
  }, [models, selectedModel]);

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
  // Memoized Values
  // ========================================

  const logoSrc = useMemo(() => (isDark ? '/logodark.webp' : '/logolight.webp'), [isDark]);
  const headerSpanClass = useMemo(() => (isDark ? 'text-white' : 'text-gray-800'), [isDark]);

  const statusBadgeState = useMemo(() => {
    if (modelsError) {
      return { className: 'status-pending', text: STATUS.API_ERROR };
    }
    if (settings.geminiApiKey) {
      return { className: 'status-approved', text: STATUS.GEMINI_READY };
    }
    return { className: 'status-pending', text: STATUS.NO_API_KEY };
  }, [modelsError, settings.geminiApiKey]);

  const swarmButtonAttrs = useMemo(() => ({
    className: `p-2 rounded-full transition-colors ${
      settings.useSwarm
        ? 'bg-[var(--matrix-accent)] text-black shadow-[0_0_10px_rgba(0,255,65,0.5)]'
        : 'hover:bg-[var(--matrix-border)] text-[var(--matrix-text-dim)]'
    }`,
    title: settings.useSwarm ? 'Tryb Swarm Aktywny (Wolf Swarm)' : 'Aktywuj Tryb Swarm',
    filled: settings.useSwarm,
  }), [settings.useSwarm]);

  const sessionSidebarProps = useMemo(() => ({
    sessions,
    currentSessionId,
    onCreateSession: createSession,
    onSelectSession: selectSession,
    onDeleteSession: deleteSession,
    onUpdateTitle: updateSessionTitle,
  }), [sessions, currentSessionId, createSession, selectSession, deleteSession, updateSessionTitle]);

  const chatContainerProps = useMemo(() => ({
    messages: currentMessages,
    isStreaming,
    modelsLoading,
    modelsError,
    models,
    selectedModel,
    onSelectModel: setSelectedModel,
    onSubmit: handleSubmit,
    onExecuteCommand: executeCommand,
  }), [currentMessages, isStreaming, modelsLoading, modelsError, models, selectedModel, handleSubmit, executeCommand]);

  const rightSidebarProps = useMemo(() => ({
    count,
    onIncrement: increment,
    onDecrement: decrement,
    onExport: handleExport,
  }), [count, increment, decrement, handleExport]);

  const statusFooterProps = useMemo(() => ({
    isStreaming,
    isWorking: false,
    hasError: !!modelsError,
    selectedModel,
  }), [isStreaming, modelsError, selectedModel]);

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
          <button onClick={handleToggleSwarm} className={swarmButtonAttrs.className} title={swarmButtonAttrs.title}>
            <Zap size={20} fill={swarmButtonAttrs.filled ? 'currentColor' : 'none'} />
          </button>

          <button onClick={handleClearHistory} className="p-2 rounded-full hover:bg-[var(--matrix-border)] transition-colors text-[var(--matrix-accent)]" title="Wyczyść Czat">
            <Eraser size={20} />
          </button>

          <button onClick={handleToggleSettings} className="p-2 rounded-full hover:bg-[var(--matrix-border)] transition-colors text-[var(--matrix-accent)]" title="Ustawienia">
            <Settings size={20} />
          </button>

          <div className="flex bg-black/20 rounded-full px-3 py-1 border border-[var(--matrix-border)]">
            <span className="text-xs text-[var(--matrix-accent)] font-bold">Gemini AI</span>
          </div>

          <button onClick={handleToggleTheme} className="p-2 rounded-full hover:bg-[var(--matrix-border)] transition-colors text-[var(--matrix-accent)]" title="Toggle Theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

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
