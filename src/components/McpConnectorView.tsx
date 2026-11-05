import React, { useState } from 'react';
import { Copy, Check, Terminal, Plug, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { DESIGN_PROMPTS_CATALOG } from '../data/motionsitesCatalog';
import { DesignPromptItem } from '../types/catalog';

type McpToolOption = 'antigravity' | 'claude' | 'claude-code' | 'cursor' | 'codex';

interface McpConnectorViewProps {
  onInspectPrompt?: (item: DesignPromptItem) => void;
}

export const McpConnectorView: React.FC<McpConnectorViewProps> = ({ onInspectPrompt }) => {
  const [selectedTool, setSelectedTool] = useState<McpToolOption>('antigravity');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [activePromptQuery, setActivePromptQuery] = useState(
    'Build a landing page hero for a luxury sleep-tracking ring using MotionSites MCP.'
  );
  const [isSimulatingMcp, setIsSimulatingMcp] = useState(false);
  const [simulatedResults, setSimulatedResults] = useState<DesignPromptItem[]>([
    DESIGN_PROMPTS_CATALOG[0],
    DESIGN_PROMPTS_CATALOG[1],
    DESIGN_PROMPTS_CATALOG[2],
  ]);

  const mcpEndpoint = 'https://motionsites.ai/api/mcp';

  const toolInstructions: Record<McpToolOption, { title: string; steps: string; snippet: string }> = {
    antigravity: {
      title: 'Google Antigravity IDE & agy CLI',
      steps:
        'In Google Antigravity IDE: Open Agent Panel → MCP Servers → Add Custom Connector, or run this command in the Antigravity terminal:',
      snippet: `agy mcp add motionsites https://motionsites.ai/api/mcp\n\n# Or add to .antigravity/mcp.json:\n{\n  "mcpServers": {\n    "motionsites": {\n      "url": "https://motionsites.ai/api/mcp"\n    }\n  }\n}`,
    },
    claude: {
      title: 'Claude on the Web or Desktop',
      steps:
        'In Claude on the web or desktop: Settings → Connectors → Add custom connector. Name it MotionSites and paste this URL:',
      snippet: `Connector Name: MotionSites\nConnector URL: https://motionsites.ai/api/mcp`,
    },
    'claude-code': {
      title: 'Claude Code CLI & Web Builder Skill',
      steps:
        'Add the MotionSites MCP server or install the official MotionSites Web Builder plugin:',
      snippet: `claude mcp add --transport http motionsites https://motionsites.ai/api/mcp\n\n# Plus install the free Claude skill:\n/plugin marketplace add Motionsites-AI/claude-skill\n/plugin install motionsites-web-builder@motionsites`,
    },
    cursor: {
      title: 'Cursor IDE',
      steps: 'Open Cursor Settings → Features → MCP → + Add New MCP Server and paste:',
      snippet: `{\n  "mcpServers": {\n    "motionsites": {\n      "url": "https://motionsites.ai/api/mcp"\n    }\n  }\n}`,
    },
    codex: {
      title: 'Codex / OpenAI Agents',
      steps:
        'Register https://motionsites.ai/api/mcp as an HTTP streamable MCP tool server in your agent configuration:',
      snippet: `mcp_servers = [{ "name": "motionsites", "url": "https://motionsites.ai/api/mcp" }]`,
    },
  };

  const handleSimulatePrompt = (query: string) => {
    setActivePromptQuery(query);
    setIsSimulatingMcp(true);
    setTimeout(() => {
      setIsSimulatingMcp(false);
      // Pick matching or varied items
      if (query.toLowerCase().includes('portfolio') || query.toLowerCase().includes('architectural')) {
        setSimulatedResults([DESIGN_PROMPTS_CATALOG[7], DESIGN_PROMPTS_CATALOG[11], DESIGN_PROMPTS_CATALOG[0]]);
      } else if (query.toLowerCase().includes('pricing') || query.toLowerCase().includes('saas')) {
        setSimulatedResults([DESIGN_PROMPTS_CATALOG[4], DESIGN_PROMPTS_CATALOG[12], DESIGN_PROMPTS_CATALOG[9]]);
      } else {
        setSimulatedResults([DESIGN_PROMPTS_CATALOG[0], DESIGN_PROMPTS_CATALOG[5], DESIGN_PROMPTS_CATALOG[3]]);
      }
    }, 450);
  };

  return (
    <section className="py-20 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="liquid-glass px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300 inline-flex items-center gap-2 mb-5">
          <Plug className="w-3.5 h-3.5" />
          MotionSites AI MCP
        </span>
        <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[1.08]">
          The design <span className="shimmer-superpowers">Superpowers</span> your AI agents are missing.
        </h2>
        <p className="text-white/60 text-base sm:text-lg font-light mt-5">
          Keep the web free of AI slop. Connect Google Antigravity IDE, Claude Code, and Cursor directly to 500+ Premium Website Design Prompts. Set up in under a minute. No API key.
        </p>
      </div>

      {/* 4-Step Interactive Setup Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1 */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 font-mono text-xs flex items-center justify-center mb-4">
            1
          </div>
          <h3 className="text-xl font-normal text-white mb-2">Pick your AI tool</h3>
          <p className="text-xs text-white/60 mb-5">
            We'll show you the exact connector command to add.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'antigravity', label: '✦ Antigravity IDE' },
              { id: 'claude', label: '✺ Claude' },
              { id: 'claude-code', label: '✳ Claude Code' },
              { id: 'cursor', label: '▲ Cursor' },
              { id: 'codex', label: '◍ Codex' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id as McpToolOption)}
                className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer ${
                  selectedTool === tool.id
                    ? 'bg-white text-black font-medium shadow'
                    : 'liquid-glass text-white/75 hover:text-white'
                }`}
              >
                {tool.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 font-mono text-xs flex items-center justify-center mb-4">
            2
          </div>
          <h3 className="text-xl font-normal text-white mb-2">
            Add MotionSites as a custom connector
          </h3>
          <p className="text-xs text-white/60 mb-4">{toolInstructions[selectedTool].steps}</p>
          <div className="flex items-center justify-between gap-2 bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 mb-3">
            <code className="text-xs font-mono text-purple-300 truncate">{mcpEndpoint}</code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(mcpEndpoint);
                setCopiedUrl(true);
                setTimeout(() => setCopiedUrl(false), 2000);
              }}
              className="bg-white text-black px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 shrink-0 cursor-pointer"
            >
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              {copiedUrl ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="relative">
            <pre className="bg-black/50 border border-white/10 rounded-xl p-3 text-[11px] font-mono text-white/80 overflow-x-auto whitespace-pre-wrap">
              {toolInstructions[selectedTool].snippet}
            </pre>
            <button
              onClick={() => {
                navigator.clipboard.writeText(toolInstructions[selectedTool].snippet);
                setCopiedConfig(true);
                setTimeout(() => setCopiedConfig(false), 2000);
              }}
              className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white/80 px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 cursor-pointer"
            >
              {copiedConfig ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
              {copiedConfig ? 'Copied' : 'Copy Snippet'}
            </button>
          </div>
        </div>

        {/* Step 3 */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 font-mono text-xs flex items-center justify-center mb-4">
            3
          </div>
          <h3 className="text-xl font-normal text-white mb-2">Sign in and authorize</h3>
          <p className="text-xs text-white/60 leading-relaxed mb-4">
            Click Connect next to MotionSites. A window opens: sign in with your MotionSites account and approve access. Free accounts can open 3 free prompts; paid plans unlock all 500+.
          </p>
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/30 flex items-center justify-center text-purple-200 font-mono font-bold text-xs">
                MS
              </div>
              <div>
                <div className="text-xs font-medium text-white">MotionSites Protocol Hub</div>
                <div className="text-[11px] text-white/50">OAuth 2.0 PKCE · Ready to connect</div>
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Connected
            </span>
          </div>
        </div>

        {/* Step 4 */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 font-mono text-xs flex items-center justify-center mb-4">
              4
            </div>
            <h3 className="text-xl font-normal text-white mb-2">You're set — Prompt your agent</h3>
            <p className="text-xs text-white/60 leading-relaxed mb-3">
              Ask your AI for a website design. It finds matching MotionSites designs, you pick one, and it builds from the real production prompt.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {[
                'Build a landing page hero for a luxury sleep-tracking ring',
                'Create a 3D interactive portfolio for an architectural studio',
                'Build a high-conversion SaaS pricing matrix with liquid glass',
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSimulatePrompt(q)}
                  className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 px-2.5 py-1 rounded-full transition-colors text-left cursor-pointer"
                >
                  "{q.slice(0, 38)}..."
                </button>
              ))}
            </div>

            <div className="bg-black/60 border border-white/10 rounded-xl p-3 text-xs font-mono text-emerald-300 mb-4">
              <span className="text-purple-400">&gt; </span>
              {activePromptQuery}
            </div>

            {/* Simulated Agent Tool Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-purple-400" />
                  MCP Server Match: {isSimulatingMcp ? 'Querying vector index...' : `${simulatedResults.length} Flagship Specs Found`}
                </span>
                <span className="text-emerald-400">HTTP 200 OK</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {simulatedResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onInspectPrompt && onInspectPrompt(item)}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/50 cursor-pointer transition-all group"
                  >
                    <div className="text-[10px] font-medium text-white truncate group-hover:text-purple-300">
                      {item.title}
                    </div>
                    <div className="text-[9px] text-white/40 font-mono mt-0.5">{item.badge}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

