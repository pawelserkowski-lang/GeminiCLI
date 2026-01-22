/**
 * GeminiGUI - Tauri Service Layer
 * @module services/tauri.service
 *
 * Centralized service for all Tauri invoke calls.
 * Provides type-safe wrappers with error handling.
 */

import { invoke } from '@tauri-apps/api/core';
import { TAURI_COMMANDS } from '../constants';
import type { BridgeState } from '../types';

// ============================================================================
// TYPES
// ============================================================================

export interface EnvVars {
  GEMINI_API_KEY?: string;
  GOOGLE_API_KEY?: string;
  OLLAMA_HOST?: string;
  [key: string]: string | undefined;
}

export interface AgentMemory {
  id: string;
  agentName: string;
  content: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: string;
  data?: Record<string, unknown>;
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  label: string;
}

export interface KnowledgeGraph {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

// ============================================================================
// BRIDGE SERVICE
// ============================================================================

export const BridgeService = {
  /**
   * Get current bridge state
   */
  async getState(): Promise<BridgeState> {
    return invoke<BridgeState>(TAURI_COMMANDS.GET_BRIDGE_STATE);
  },

  /**
   * Set auto-approve mode
   */
  async setAutoApprove(enabled: boolean): Promise<void> {
    return invoke(TAURI_COMMANDS.SET_AUTO_APPROVE, { enabled });
  },

  /**
   * Approve pending request
   */
  async approveRequest(requestId: string): Promise<void> {
    return invoke(TAURI_COMMANDS.APPROVE_REQUEST, { requestId });
  },

  /**
   * Reject pending request
   */
  async rejectRequest(requestId: string): Promise<void> {
    return invoke(TAURI_COMMANDS.REJECT_REQUEST, { requestId });
  },
};

// ============================================================================
// MODEL SERVICE
// ============================================================================

export const ModelService = {
  /**
   * Get available Ollama models
   */
  async getOllamaModels(): Promise<string[]> {
    return invoke<string[]>(TAURI_COMMANDS.GET_OLLAMA_MODELS);
  },

  /**
   * Get available Gemini models
   */
  async getGeminiModels(apiKey: string): Promise<string[]> {
    return invoke<string[]>(TAURI_COMMANDS.GET_GEMINI_MODELS, { apiKey });
  },

  /**
   * Get Gemini models sorted by capability
   */
  async getGeminiModelsSorted(apiKey: string): Promise<string[]> {
    return invoke<string[]>(TAURI_COMMANDS.GET_GEMINI_MODELS_SORTED, { apiKey });
  },
};

// ============================================================================
// PROMPT SERVICE
// ============================================================================

export const PromptService = {
  /**
   * Send prompt to Ollama (non-streaming)
   */
  async promptOllama(
    model: string,
    prompt: string,
    systemPrompt?: string
  ): Promise<string> {
    return invoke<string>(TAURI_COMMANDS.PROMPT_OLLAMA, {
      model,
      prompt,
      systemPrompt,
    });
  },

  /**
   * Start Ollama streaming prompt
   */
  async promptOllamaStream(
    model: string,
    prompt: string,
    systemPrompt?: string
  ): Promise<void> {
    return invoke(TAURI_COMMANDS.PROMPT_OLLAMA_STREAM, {
      model,
      prompt,
      systemPrompt,
    });
  },

  /**
   * Start Gemini streaming prompt
   */
  async promptGeminiStream(
    model: string,
    prompt: string,
    apiKey: string,
    systemPrompt?: string,
    imageBase64?: string
  ): Promise<void> {
    return invoke(TAURI_COMMANDS.PROMPT_GEMINI_STREAM, {
      model,
      prompt,
      apiKey,
      systemPrompt,
      imageBase64,
    });
  },
};

// ============================================================================
// SYSTEM SERVICE
// ============================================================================

export const SystemService = {
  /**
   * Run a system command
   */
  async runCommand(command: string): Promise<string> {
    return invoke<string>(TAURI_COMMANDS.RUN_SYSTEM_COMMAND, { command });
  },

  /**
   * Spawn a swarm agent
   */
  async spawnSwarmAgent(objective: string): Promise<void> {
    return invoke(TAURI_COMMANDS.SPAWN_SWARM_AGENT, { objective });
  },

  /**
   * Save file content
   */
  async saveFileContent(path: string, content: string): Promise<void> {
    return invoke(TAURI_COMMANDS.SAVE_FILE_CONTENT, { path, content });
  },

  /**
   * Get environment variables
   */
  async getEnvVars(): Promise<EnvVars> {
    return invoke<EnvVars>(TAURI_COMMANDS.GET_ENV_VARS);
  },

  /**
   * Start Ollama server
   */
  async startOllamaServer(): Promise<void> {
    return invoke(TAURI_COMMANDS.START_OLLAMA_SERVER);
  },
};

// ============================================================================
// MEMORY SERVICE
// ============================================================================

export const MemoryService = {
  /**
   * Get agent memories
   */
  async getAgentMemories(agentName: string): Promise<AgentMemory[]> {
    return invoke<AgentMemory[]>(TAURI_COMMANDS.GET_AGENT_MEMORIES, {
      agentName,
    });
  },

  /**
   * Add agent memory
   */
  async addAgentMemory(
    agentName: string,
    content: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    return invoke(TAURI_COMMANDS.ADD_AGENT_MEMORY, {
      agentName,
      content,
      metadata,
    });
  },

  /**
   * Clear agent memories
   */
  async clearAgentMemories(agentName: string): Promise<void> {
    return invoke(TAURI_COMMANDS.CLEAR_AGENT_MEMORIES, { agentName });
  },

  /**
   * Get knowledge graph
   */
  async getKnowledgeGraph(): Promise<KnowledgeGraph> {
    return invoke<KnowledgeGraph>(TAURI_COMMANDS.GET_KNOWLEDGE_GRAPH);
  },

  /**
   * Add knowledge node
   */
  async addKnowledgeNode(node: KnowledgeNode): Promise<void> {
    return invoke(TAURI_COMMANDS.ADD_KNOWLEDGE_NODE, { node });
  },

  /**
   * Add knowledge edge
   */
  async addKnowledgeEdge(edge: KnowledgeEdge): Promise<void> {
    return invoke(TAURI_COMMANDS.ADD_KNOWLEDGE_EDGE, { edge });
  },
};

// ============================================================================
// UNIFIED TAURI SERVICE
// ============================================================================

export const TauriService = {
  bridge: BridgeService,
  models: ModelService,
  prompts: PromptService,
  system: SystemService,
  memory: MemoryService,
};

export default TauriService;
