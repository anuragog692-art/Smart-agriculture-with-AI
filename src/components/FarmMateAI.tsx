import { useState, useEffect, useRef } from "react";
import {
  Bot,
  Send,
  X,
  Sparkles,
  Box,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Copy,
  Check,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { icon: "🏢", text: "How does AI estimate building costs?", query: "How does AI POWER calculate preliminary building construction costs and material requirements?" },
  { icon: "📐", text: "What plot parameters do I need?", query: "What plot dimensions, setback rules, and floor counts do I need for generating an AI building plan?" },
  { icon: "🏛️", text: "Which architectural style should I choose?", query: "Can you compare Futuristic High-Tech, Modern Minimalist, and Biophilic architectural styles?" },
  { icon: "🏗️", text: "Are AI structural layouts code-compliant?", query: "Are the AI-generated structural column grids compliant with international building codes?" },
];

const EXPERT_KNOWLEDGE: Record<string, string> = {
  cost: `### 💵 AI Cost & Material Estimation Methodology

**AI POWER** computes preliminary construction budgets using volumetric neural spatial modeling:

1. **Material Quantities (BOM)**:
   - **Steel Rebar (Fe-500)**: ~3.5 to 4.5 Metric Tons per 1,000 sq.ft of built-up area.
   - **Ready-Mix Concrete (M25/M30)**: ~0.32 m³ per sq.ft.
   - **Cement Bags**: ~7.5 bags per cubic meter of concrete.

2. **Budget Breakdown**:
   - **Materials & Supplies**: ~45% of total capital expenditure.
   - **Labor & Site Management**: ~30%.
   - **Machinery & Equipment**: ~12%.
   - **Permits & Buffer Allowance**: ~13%.

*You can test live budget estimates directly in our **Project Planner** workspace!*`,

  params: `### 📐 AI Project Planner Inputs Guide

To generate an optimized building plan in **AI POWER**, provide:

1. **Plot Length & Width**: Determines total plot area (sq.ft) and aspect ratio.
2. **Number of Floors (G+N)**: Defines elevation, column load requirements, and floor slabs.
3. **Building Type**: Select from Residential Villa, Commercial Hub, Apartment Skyscraper, or Mixed-Use.
4. **Architectural Style**: Select Futuristic High-Tech Glass, Modern Minimalist, Biophilic Green, or Industrial Brutalist.
5. **Bedrooms / Spatial Density**: Defines internal partition layout and circulation flow.`,

  style: `### 🏛️ Architectural Style Breakdown

- **Futuristic High-Tech**: Features curtain glass facades, aluminum composite panels, cantilevers, and integrated solar elements.
- **Modern Minimalist**: Clean geometric lines, neutral palette, recessed lighting, and open-plan spatial flow.
- **Biophilic Eco-Green**: Living plant walls, natural timber cladding, rainwater harvesting, and maximum daylighting.
- **Industrial Brutalist**: Exposed structural concrete framing, steel trusses, bold geometric forms, and high durability.`,

  code: `### 🏗️ Structural Compliance & Civil Engineering

- **Pre-Audit Rules**: AI POWER incorporates International Building Code (IBC) setback rules, column spacing grids, and wind load vectors.
- **Disclaimer**: All generated spatial plans and structural estimates are preliminary conceptual models. Final construction drawings must be audited and stamped by a licensed civil or structural engineer.`
};

export const FarmMateAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "🏢 **Welcome to AI POWER Assistant!**\n\nI am your intelligent building planning, 3D BIM, and construction cost assistant. Ask me anything about floor plans, material estimates, 3D architecture, or project workspace parameters!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: "🏢 **Chat refreshed.** Ready to assist with building design, 3D BIM modeling, and cost estimation queries!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const findAnswer = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("cost") || q.includes("price") || q.includes("budget") || q.includes("material")) {
      return EXPERT_KNOWLEDGE.cost;
    }
    if (q.includes("plot") || q.includes("parameter") || q.includes("dimension") || q.includes("floor")) {
      return EXPERT_KNOWLEDGE.params;
    }
    if (q.includes("style") || q.includes("futuristic") || q.includes("minimalist") || q.includes("biophilic")) {
      return EXPERT_KNOWLEDGE.style;
    }
    if (q.includes("code") || q.includes("compliant") || q.includes("engineer") || q.includes("structural")) {
      return EXPERT_KNOWLEDGE.code;
    }
    return `### 🏢 AI POWER Assistant\n\nRegarding: *"${query}"*\n\n1. **AI Neural Planning**: Our spatial models generate optimized 2D layout schematics and 3D BIM models in seconds.\n2. **Interactive Workspace**: Use the **Project Planner** section on our dashboard to compute complete material and cost breakdowns for your plot.\n\n*Would you like assistance with a specific building style, plot area, or structural specification?*`;
  };

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 500));
    const responseText = findAnswer(userText);

    const botMsg: Message = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-cyan-500/30 backdrop-blur-md shadow-lg text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>AI POWER Assistant</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-500 via-royal-600 to-violet-600 p-[1px] shadow-2xl shadow-cyan-500/30 hover:scale-105 transition-all duration-300"
        >
          <div className="w-full h-full bg-navy-950 rounded-[15px] flex items-center justify-center">
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Box className="w-6 h-6 text-cyan-400" />}
          </div>
        </button>
      </div>

      {/* Assistant Window */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-24 sm:inset-auto sm:right-6 sm:bottom-24 sm:w-[420px] sm:h-[580px] z-50 flex flex-col rounded-3xl overflow-hidden glass-panel-glow border border-cyan-500/40 shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="p-4 bg-navy-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Box className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-space font-bold text-sm text-white">AI POWER Assistant</h3>
                <p className="text-[10px] font-mono text-cyan-300">Building Intelligence Chat</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" onClick={handleResetChat} className="w-8 h-8 text-slate-400 hover:text-white">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)} className="w-8 h-8 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-navy-950 border-b border-slate-800/80 overflow-x-auto flex gap-2 no-scrollbar">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.query)}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-mono bg-slate-900 text-slate-300 hover:text-cyan-300 border border-slate-800"
              >
                <span>{qp.icon}</span>
                <span className="whitespace-nowrap">{qp.text}</span>
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold'
                      : 'bg-slate-900 text-slate-200 border border-slate-800'
                  }`}
                >
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                  <div className="text-[9px] opacity-60 mt-1 text-right">{m.timestamp}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-cyan-400 text-xs animate-pulse font-mono">
                &gt; Synthesizing architectural intelligence...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="p-3 bg-navy-900 border-t border-slate-800 flex items-center gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI POWER about building plans, costs, 3D BIM..."
              className="flex-1 input-cyber text-xs"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-cyber-primary px-3 py-2"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default FarmMateAI;
