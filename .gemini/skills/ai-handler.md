# AI Handler Skills for GeminiCLI

## /ai - Quick Local AI Query

Execute a quick query to local Ollama model.

**Usage:**
```
/ai <prompt>
```

**Examples:**
```
/ai "Write a function to check if a number is prime"
/ai "Explain the difference between let and const in JavaScript"
```

**Implementation:**
```bash
powershell -ExecutionPolicy Bypass -Command "& { $response = ollama run qwen2.5-coder:1.5b '$ARGS'; Write-Host $response }"
```

---

## /ai-batch - Parallel Batch AI Queries

Process multiple prompts in parallel using Ollama.

**Usage:**
```
/ai-batch <prompts-file.txt>
```

**File format:**
```
Prompt 1
Prompt 2
Prompt 3
```

**Implementation:**
```bash
powershell -ExecutionPolicy Bypass -File "C:\Users\BIURODOM\Desktop\GeminiCLI\scripts\ai-batch.ps1" "$ARGS"
```

---

## /ai-pull - Pull Ollama Model

Download a new model to Ollama.

**Usage:**
```
/ai-pull <model-name>
```

**Popular models:**
- `llama3.2:1b` - Fast, small (1.3GB)
- `llama3.2:3b` - Balanced (2GB)
- `llama3.2:7b` - Large, accurate (4GB)
- `qwen2.5-coder:1.5b` - Best for code (1GB)
- `qwen2.5-coder:7b` - Better for code (4GB)
- `phi3:mini` - Microsoft, good general (2.2GB)
- `gemma2:2b` - Google's model (1.6GB)
- `codellama:7b` - Meta, for code (4GB)

**Implementation:**
```bash
ollama pull "$ARGS"
```

---

## /ai-status - Check AI Status

Check AI providers status (Ollama, models, configuration).

**Usage:**
```
/ai-status
```

**Implementation:**
```bash
ollama list && curl -s http://127.0.0.1:11434/api/tags | jq '.models[] | {name, size}'
```

---

## /ai-models - List Available Models

List all locally installed Ollama models.

**Usage:**
```
/ai-models
```

**Implementation:**
```bash
ollama list
```

---

## /swarm - Run Agent Swarm

Execute a task using the Witcher-themed AI agent swarm.

**Usage:**
```
/swarm <task-description>
```

**Available agents:**
- **Geralt** - Security/VETO (llama3.2:3b)
- **Yennefer** - Design patterns (qwen2.5-coder:1.5b)
- **Triss** - QA/Testing (qwen2.5-coder:1.5b)
- **Jaskier** - User summaries (llama3.2:3b)
- **Vesemir** - Plan reviewer (llama3.2:3b)
- **Ciri** - Fast executor (llama3.2:1b)
- **Dijkstra** - Master strategist (gemini)

**Implementation:**
```powershell
Import-Module "C:\Users\BIURODOM\Desktop\GeminiCLI\AgentSwarm.psm1"
Invoke-SwarmTask -Task "$ARGS"
```

---

## /memory - Manage Agent Memory

Interact with the agent memory system.

**Usage:**
```
/memory add <key> <value>    # Add memory entry
/memory get <key>            # Get memory entry
/memory list                 # List all memories
/memory search <query>       # Search memories
```

**Implementation:**
```powershell
Import-Module "C:\Users\BIURODOM\Desktop\GeminiCLI\AgentSwarm.psm1"
# Memory operations
```

---

## /mcp - MCP Server Management

Manage Model Context Protocol servers.

**Usage:**
```
/mcp list                    # List all MCP servers
/mcp status <server>         # Check server status
/mcp restart <server>        # Restart a server
```

**Available MCP Servers:**
- `ollama` - Local LLM
- `filesystem` - File access
- `memory` - Long-term memory
- `playwright` - Browser automation
- `github` - GitHub API
- `greptile` - Code intelligence
- ... and 18 more!

---

## Configuration

Skills are defined in `.gemini/skills/` directory.

Each skill file should contain:
1. Skill name and description
2. Usage examples
3. Implementation (bash/powershell command)

To add a new skill, create a new `.md` file in the skills directory.
