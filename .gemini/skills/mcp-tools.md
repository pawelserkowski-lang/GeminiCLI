# MCP Tools Skills

## Available MCP Servers (24 total)

### Local Servers (stdio/npx) - 15

| Server | Command | Description |
|--------|---------|-------------|
| `ollama` | `npx ollama-mcp` | Local LLM inference |
| `desktop-commander` | `npx @wonderwhy-er/desktop-commander` | Terminal + files + processes |
| `filesystem` | `npx @modelcontextprotocol/server-filesystem` | File system access |
| `memory` | `npx @modelcontextprotocol/server-memory` | Long-term memory |
| `fetch` | `npx @modelcontextprotocol/server-fetch` | HTTP fetch |
| `brave-search` | `npx @anthropic-ai/mcp-server-brave` | Brave search |
| `puppeteer` | `npx @anthropic-ai/mcp-server-puppeteer` | Headless browser |
| `sequential-thinking` | `npx @modelcontextprotocol/server-sequential-thinking` | Chain-of-thought |
| `everything-search` | `npx @anthropic-ai/mcp-server-everything` | Windows Everything |
| `time` | `npx @modelcontextprotocol/server-time` | Time operations |
| `git` | `npx @anthropic-ai/mcp-server-git` | Git operations |
| `context7` | `npx @upstash/context7-mcp` | Library documentation |
| `firebase` | `npx firebase-tools@latest mcp` | Google Firebase |
| `playwright` | `npx @playwright/mcp@latest` | Browser automation |
| `serena` | `uvx serena start-mcp-server` | Symbolic code analysis (LSP) |

### HTTP Servers (remote API) - 6

| Server | URL | Description |
|--------|-----|-------------|
| `github` | `https://api.githubcopilot.com/mcp/` | GitHub Copilot API |
| `gitlab` | `https://gitlab.com/api/v4/mcp` | GitLab API |
| `greptile` | `https://api.greptile.com/mcp` | Code intelligence |
| `linear` | `https://mcp.linear.app/mcp` | Linear issue tracking |
| `stripe` | `https://mcp.stripe.com` | Stripe payments |
| `supabase` | `https://mcp.supabase.com/mcp` | Supabase backend |

### SSE Servers (Server-Sent Events) - 2

| Server | URL | Description |
|--------|-----|-------------|
| `asana` | `https://mcp.asana.com/sse` | Asana tasks |
| `slack` | `https://mcp.slack.com/sse` | Slack messaging |

---

## /mcp-list - List MCP Servers

**Usage:**
```
/mcp-list
```

**Implementation:**
```bash
cat "C:\Users\BIURODOM\Desktop\GeminiCLI\.mcp.json" | jq '.mcpServers | keys[]'
```

---

## /mcp-test - Test MCP Server

**Usage:**
```
/mcp-test <server-name>
```

**Implementation:**
```bash
# For local servers
npx <server-package> --help

# For HTTP servers
curl -I <server-url>
```

---

## Environment Variables Required

```env
# For brave-search
BRAVE_API_KEY=your_brave_api_key

# For github
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token

# For greptile
GREPTILE_API_KEY=your_greptile_key
```

Create a `.env` file in the GeminiCLI directory with these values.
