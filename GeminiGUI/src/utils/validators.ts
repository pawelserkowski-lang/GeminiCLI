/**
 * GeminiGUI - Validation Utilities
 * @module utils/validators
 *
 * Centralized validation functions for security and data integrity.
 * Based on GEMINI.md security guidelines.
 */

// ============================================================================
// URL VALIDATION
// ============================================================================

/**
 * Validates if a string is a valid HTTP/HTTPS URL
 * Used for: ollamaEndpoint, API endpoints
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

/**
 * Validates localhost URLs specifically
 */
export const isLocalhostUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  } catch {
    return false;
  }
};

// ============================================================================
// API KEY VALIDATION
// ============================================================================

/**
 * Validates Gemini API key format
 * Format: AIza... (39 chars, alphanumeric + _ -)
 */
export const isValidApiKey = (key: string): boolean => {
  // Empty is valid (not set)
  if (key === '') return true;
  // Gemini API keys are typically 39 chars starting with AIza
  return key.length >= 30 && /^[A-Za-z0-9_-]+$/.test(key);
};

/**
 * Validates if API key looks like a Gemini key
 */
export const isGeminiApiKey = (key: string): boolean => {
  return key.startsWith('AIza') && key.length === 39;
};

// ============================================================================
// CONTENT SANITIZATION
// ============================================================================

/**
 * Sanitizes and limits content length
 * Default: 50KB for messages
 */
export const sanitizeContent = (content: string, maxLength: number = 50000): string => {
  if (content.length > maxLength) {
    return content.substring(0, maxLength);
  }
  return content;
};

/**
 * Sanitizes title strings (removes newlines, limits length)
 * Default: 100 chars
 */
export const sanitizeTitle = (title: string, maxLength: number = 100): string => {
  const sanitized = title.trim().replace(/[\n\r]/g, ' ');
  return sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
};

// ============================================================================
// SHELL INJECTION PREVENTION
// ============================================================================

/**
 * Escapes special characters for safe shell execution
 * CRITICAL: Used in CodeBlock.tsx for command execution
 */
export const escapeForShell = (code: string): string => {
  return code
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
};

/**
 * Checks for potentially dangerous patterns in code
 * Returns true if dangerous patterns found
 */
export const containsDangerousPatterns = (code: string): boolean => {
  const dangerousPatterns = [
    /rm\s+-rf/i,
    /del\s+\/[sf]/i,
    /format\s+[a-z]:/i,
    /mkfs/i,
    /dd\s+if=/i,
    />\s*\/dev\//i,
    /curl.*\|\s*(ba)?sh/i,
    /wget.*\|\s*(ba)?sh/i,
    /powershell.*-enc/i,
    /invoke-expression/i,
    /iex\s*\(/i,
  ];

  return dangerousPatterns.some(pattern => pattern.test(code));
};

// ============================================================================
// PATH VALIDATION
// ============================================================================

/**
 * Checks if path is in blocked system directories
 * Based on lib.rs BLOCKED_PATHS
 */
export const isBlockedPath = (path: string): boolean => {
  const blockedPaths = [
    'C:\\Windows',
    'C:\\Program Files',
    'C:\\Program Files (x86)',
    '/etc',
    '/usr',
    '/bin',
    '/sbin',
    '/var',
  ];

  const normalizedPath = path.replace(/\//g, '\\');
  return blockedPaths.some(blocked =>
    normalizedPath.toLowerCase().startsWith(blocked.toLowerCase())
  );
};

/**
 * Checks if file extension is blocked
 * Based on lib.rs BLOCKED_EXTENSIONS
 */
export const hasBlockedExtension = (filename: string): boolean => {
  const blockedExtensions = ['.exe', '.bat', '.ps1', '.sh', '.dll', '.sys', '.msi'];
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  return blockedExtensions.includes(ext);
};

// ============================================================================
// INPUT VALIDATION
// ============================================================================

/**
 * Validates session ID format (UUID)
 */
export const isValidSessionId = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

/**
 * Validates model name format
 */
export const isValidModelName = (model: string): boolean => {
  // Allow alphanumeric, dots, dashes, colons (e.g., "gemini-1.5-pro", "llama3.2:3b")
  return /^[a-zA-Z0-9._:-]+$/.test(model) && model.length <= 100;
};

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard for Message role
 */
export const isValidMessageRole = (role: string): role is 'user' | 'assistant' | 'system' => {
  return ['user', 'assistant', 'system'].includes(role);
};

/**
 * Type guard for Provider
 */
export const isValidProvider = (provider: string): provider is 'ollama' | 'gemini' => {
  return ['ollama', 'gemini'].includes(provider);
};

/**
 * Type guard for Theme
 */
export const isValidTheme = (theme: string): theme is 'dark' | 'light' => {
  return ['dark', 'light'].includes(theme);
};
