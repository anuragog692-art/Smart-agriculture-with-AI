import { useState, useEffect, useRef } from "react";
import {
  Bot,
  Send,
  X,
  Sparkles,
  Leaf,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Copy,
  Check,
  RotateCcw,
  Minimize2,
  Maximize2,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVoice } from "@/hooks/useVoice";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { icon: "🌱", text: "Which crop is suitable for my soil?", query: "Which crop is suitable for my soil? Can you guide me based on alluvial, black, or red soil?" },
  { icon: "💧", text: "How often should I irrigate?", query: "How often should I irrigate wheat, rice, and vegetables during the current season?" },
  { icon: "🦠", text: "How can I identify crop disease?", query: "How can I identify common fungal and bacterial crop diseases from leaf symptoms?" },
  { icon: "🌾", text: "How can I improve soil health?", query: "How can I improve soil organic matter, microbial health, and NPK balance naturally?" },
  { icon: "📈", text: "Give me farming recommendations", query: "Give me high-yield smart farming recommendations for the current agricultural cycle." },
];

// Rich domain-expert knowledge for immediate, highly detailed intelligent responses
const EXPERT_KNOWLEDGE: Record<string, string> = {
  soil: `### 🌱 Soil-Crop Compatibility Recommendations

Based on agricultural soil classification in India:

1. **Black Cotton Soil (Regur)**
   - **Characteristics**: High clay content, rich in calcium, magnesium, and carbonate. High moisture retention.
   - **Best Crops**: Cotton, Soybean, Wheat, Sorghum (Jowar), Chickpea, and Sunflower.
   - **Management Tip**: Avoid over-irrigation during monsoon; ensure adequate drainage.

2. **Alluvial Soil (Indo-Gangetic & River Basins)**
   - **Characteristics**: Highly fertile, balanced loam, rich in potash and phosphoric acid.
   - **Best Crops**: Rice, Wheat, Sugarcane, Maize, Mustard, Pulses, and Vegetables.
   - **Management Tip**: Maintain organic carbon with green manuring (Dhaincha/Sunn hemp).

3. **Red & Laterite Soil**
   - **Characteristics**: Porous structure, rich in iron oxide, lower nitrogen and phosphorus.
   - **Best Crops**: Groundnut, Millets (Ragi, Bajra), Pulses, Tobacco, and horticulture crops (Mango, Cashew).
   - **Management Tip**: Incorporate compost, bio-fertilizers (Rhizobium, PSB), and lime if acidic.

*Would you like customized advice based on your exact region or pH value?*`,

  irrigate: `### 💧 Precision Irrigation Guidelines

Effective water management prevents root rot and boosts crop yield by up to 35%:

1. **Critical Growth Stages for Watering**:
   - **Wheat**: Crown Root Initiation (20-25 days after sowing) is most critical, followed by Tillering, Flowering, and Milk stage.
   - **Paddy (Rice)**: Shallow submergence (2-3 cm) during vegetative phase; drain 10-14 days before harvest.
   - **Vegetables (Tomato, Chili, Onion)**: Frequent light irrigation every 3 to 5 days depending on soil moisture.

2. **Drip & Sprinkler Efficiency**:
   - Drip irrigation delivers 90-95% water efficiency compared to 40-50% in flood irrigation.
   - Best time to irrigate: **Early morning (5 AM - 8 AM)** or **late afternoon** to minimize evaporative loss.

3. **Soil Moisture Check**:
   - Squeeze a handful of soil from 6 inches deep. If it forms a firm ball without releasing excess water, moisture is optimal.

*Tip: Check the live Weather widget on our dashboard for rainfall forecasts before scheduling your pump!*`,

  disease: `### 🦠 Crop Disease Diagnosis & Management

Common plant symptoms and actionable remedies:

1. **Fungal Leaf Spots & Blights (Early / Late Blight)**:
   - **Symptoms**: Concentric brown/black circular rings with yellow halos on lower leaves.
   - **Treatment**: Spray Mancozeb (2.5 g/L) or Copper Oxychloride (3 g/L). Avoid overhead wetting.

2. **Powdery Mildew**:
   - **Symptoms**: White or gray powdery talc-like coating on upper leaf surface and tender stems.
   - **Treatment**: Spray Wettable Sulfur (2 g/L) or Azoxystrobin + Difenoconazole at first appearance.

3. **Bacterial Wilt / Leaf Streak**:
   - **Symptoms**: Sudden daytime wilting while foliage remains green, or water-soaked lesions.
   - **Treatment**: Use certified disease-free seeds; spray Streptocycline (1 g/10 L) + Copper hydroxide.

4. **Viral Mosaic**:
   - **Symptoms**: Yellow-green mottled patches, leaf puckering, stunted growth.
   - **Control**: Control vector insects (whiteflies, aphids) using Neem oil (5ml/L) or Imidacloprid (0.5ml/L).

*You can also visit our **Disease Detection** tab to upload a photo of your leaf for instant AI computer vision diagnosis!*`,

  health: `### 🌾 Soil Health & Regenerative Farming Blueprint

To restore soil vitality and maximize natural nutrient uptake:

1. **Boost Soil Organic Carbon (SOC)**:
   - Apply well-decomposed Farm Yard Manure (FYM) or Vermicompost at **4 to 5 tonnes/acre**.
   - Grow and incorporate green manure crops (Sesbania/Dhaincha) before the main sowing season.

2. **Bio-Fertilizer Integration**:
   - **Nitrogen Fixers**: *Azotobacter* (for cereals), *Rhizobium* (for legumes/pulses).
   - **Phosphorus Solubilizers**: *PSB* (Phosphate Solubilizing Bacteria) mobilizes locked soil phosphorus.
   - **Potash Mobilizers**: *Frateuria aurantia* releases fixed potassium.

3. **Crop Rotation & Cover Cropping**:
   - Alternate heavy nitrogen-depleting crops (maize, cotton) with legumes (chickpea, mung bean) to naturally replenish nitrogen.
   - Practice mulching to retain soil moisture and feed earthworms.

4. **Soil pH Balancing**:
   - Ideal range: **6.2 to 7.5**. If acidic, apply agricultural lime; if alkaline/saline, apply gypsum with flush irrigation.`,

  recommendations: `### 📈 High-Yield Seasonal Farming Strategy

Key recommendations for peak agricultural productivity:

1. **Certified Seed Selection**:
   - Treat seeds before sowing with Trichoderma viride (4g/kg) and bio-fertilizers to prevent soil-borne pathogens.
2. **Balanced NPK Nutrition (4:2:1 Ratio)**:
   - Avoid excessive urea; split nitrogen application into 2-3 stages (basal, vegetative, and flowering).
3. **Integrated Pest Management (IPM)**:
   - Install yellow sticky traps (5-6/acre) and pheromone traps to monitor pest incidence early.
4. **Market-Aligned Harvesting**:
   - Check our **Market Insights** page for current mandi prices across regional APMCs to time your harvest sale at peak rates.

*How can I assist you with a specific crop or location today?*`
};

export const FarmMateAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "🌾 **Hello! I'm FarmMate AI**, your smart farming assistant developed by **Anurag** for **Farm to Field Hub**.\n\nI can help you with crop selection, soil health, precision irrigation, pest & disease diagnosis, and live mandi market insights. How can I assist your field today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { language } = useLanguage();
  const voice = useVoice({ language });

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Sync voice transcript
  useEffect(() => {
    if (voice.transcript) {
      setInput((prev) => (prev ? prev + " " : "") + voice.transcript);
    }
  }, [voice.transcript]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

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
        text: "🌾 **Chat refreshed.** I am ready to answer any farming, soil, crop, or mandi price queries!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const findExpertAnswer = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("soil") || q.includes("mitti") || q.includes("alluvial") || q.includes("black")) {
      return EXPERT_KNOWLEDGE.soil;
    }
    if (q.includes("irrigate") || q.includes("water") || q.includes("paani") || q.includes("sinchai") || q.includes("drip")) {
      return EXPERT_KNOWLEDGE.irrigate;
    }
    if (q.includes("disease") || q.includes("pest") || q.includes("fungus") || q.includes("blight") || q.includes("rog")) {
      return EXPERT_KNOWLEDGE.disease;
    }
    if (q.includes("improve") || q.includes("health") || q.includes("fertilizer") || q.includes("khad") || q.includes("compost")) {
      return EXPERT_KNOWLEDGE.health;
    }
    if (q.includes("recommend") || q.includes("yield") || q.includes("market") || q.includes("mandi") || q.includes("rate")) {
      return EXPERT_KNOWLEDGE.recommendations;
    }
    return `### 🌾 FarmMate AI Response\n\nRegarding your question: *"${query}"*\n\n1. **Best Practice**: In modern AgriTech farming, maintaining balanced soil organic matter and timely crop scouting are key to reducing input costs.\n2. **Actionable Step**: Test soil pH every season and maintain nitrogen, phosphorus, and potassium according to specific crop thresholds.\n3. **Tools Available**: Check our **Crop Advisor**, **Disease Detection**, and **Market Insights** tools in the navbar for deep analytics.\n\n*Would you like more specific advice for a particular crop, region, or soil type?*`;
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

    try {
      // Check if real Supabase edge function is reachable and user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      let aiResponseText = "";

      if (session?.access_token) {
        const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ask-ai`;
        try {
          const resp = await fetch(CHAT_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ question: userText, language }),
          });

          if (resp.ok && resp.body) {
            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let accumulated = "";

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split("\n");
              for (const line of lines) {
                if (line.startsWith("data: ")) {
                  const dataStr = line.slice(6).trim();
                  if (dataStr === "[DONE]") break;
                  try {
                    const parsed = JSON.parse(dataStr);
                    const content = parsed.choices?.[0]?.delta?.content;
                    if (content) accumulated += content;
                  } catch {
                    // Ignore parse error on partial chunks
                  }
                }
              }
            }
            if (accumulated.trim()) {
              aiResponseText = accumulated;
            }
          }
        } catch (apiErr) {
          console.warn("Supabase API fetch skipped or errored; fallback to expert knowledge engine", apiErr);
        }
      }

      // If no session or API didn't return text, use our rich AgriTech knowledge engine
      if (!aiResponseText) {
        await new Promise((r) => setTimeout(r, 600)); // Natural typing delay
        aiResponseText = findExpertAnswer(userText);
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);

      if (autoSpeak) {
        const plainText = aiResponseText.replace(/[#*_`\[\]]/g, "").substring(0, 400);
        voice.speak(plainText);
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: findExpertAnswer(userText),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <>
      {/* ============================================================== */}
      {/* FLOATING BOT BUTTON (BOTTOM-RIGHT)                            */}
      {/* ============================================================== */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Helper tooltip badge when closed */}
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/30 backdrop-blur-md shadow-lg text-xs font-semibold text-emerald-200 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>FarmMate AI Online</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open FarmMate AI Assistant"
          className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_28px_rgba(16,185,129,0.45)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)]"
        >
          {/* Outer glowing pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-400 animate-spin-slow opacity-80 blur-xs" />
          <span className="absolute -inset-1 rounded-full bg-emerald-400/20 animate-ping opacity-40" />

          {/* Inner Button Body */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 border border-emerald-400/40 flex items-center justify-center overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-radial from-emerald-400/20 to-transparent" />

            {isOpen ? (
              <X className="w-6 h-6 text-emerald-200 transition-transform group-hover:rotate-90 duration-200" />
            ) : (
              <div className="relative flex items-center justify-center">
                <Bot className="w-7 h-7 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-amber-300 animate-bounce" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* ============================================================== */}
      {/* FARM MATE AI CHAT WINDOW                                       */}
      {/* ============================================================== */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-24 sm:inset-auto sm:right-6 sm:bottom-24 sm:w-[440px] sm:h-[620px] max-h-[85vh] z-50 flex flex-col rounded-3xl overflow-hidden bg-emerald-950/90 backdrop-blur-2xl border border-emerald-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(16,185,129,0.25)] animate-scale-in">
          {/* Header */}
          <div className="relative px-5 py-4 bg-gradient-to-r from-emerald-900/80 via-emerald-950 to-teal-950/80 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-amber-400 p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
                {/* Active indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-emerald-950 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-white tracking-tight">
                    FarmMate AI
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/70 font-medium">
                  Your Smart Farming Assistant
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAutoSpeak(!autoSpeak)}
                className={`w-8 h-8 rounded-full ${autoSpeak ? "text-amber-300 bg-amber-500/20" : "text-emerald-300/70 hover:text-white"}`}
                title={autoSpeak ? "Mute auto-speech" : "Enable voice read-out"}
              >
                {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleResetChat}
                className="w-8 h-8 rounded-full text-emerald-300/70 hover:text-white"
                title="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full text-emerald-300/70 hover:text-white"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-emerald-950/60 border-b border-emerald-500/10 overflow-x-auto no-scrollbar flex items-center gap-2">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.query)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/20 text-emerald-200 hover:text-white transition-all duration-200 hover:border-emerald-400/50"
              >
                <span>{qp.icon}</span>
                <span className="whitespace-nowrap">{qp.text}</span>
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 shrink-0 self-start shadow-sm mt-1">
                    <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>
                )}

                <div
                  className={`group relative max-w-[85%] rounded-2xl p-3.5 shadow-md ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-xs"
                      : "bg-emerald-900/45 text-emerald-50 border border-emerald-500/20 rounded-tl-xs backdrop-blur-md"
                  }`}
                >
                  <div className="prose prose-invert prose-xs max-w-none break-words leading-relaxed">
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>

                  <div className="mt-2 pt-1 flex items-center justify-between gap-3 text-[10px] text-emerald-200/50">
                    <span>{m.timestamp}</span>

                    {m.sender === "bot" && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopy(m.id, m.text)}
                          className="hover:text-emerald-200 transition-colors p-1"
                          title="Copy text"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            const plain = m.text.replace(/[#*_`\[\]]/g, "").substring(0, 400);
                            voice.speak(plain);
                          }}
                          className="hover:text-emerald-200 transition-colors p-1"
                          title="Speak answer"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-center justify-start">
                <div className="w-7 h-7 rounded-xl bg-emerald-900/60 p-0.5 shrink-0 flex items-center justify-center border border-emerald-500/20">
                  <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="text-xs text-emerald-300/80 font-medium ml-2">FarmMate is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Input Feedback */}
          {voice.isListening && (
            <div className="px-4 py-2 bg-emerald-900/50 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span>Listening to your question...</span>
              </div>
              <Button size="sm" variant="ghost" onClick={voice.stopListening} className="h-6 text-xs text-red-400">
                Stop
              </Button>
            </div>
          )}

          {/* Chat Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-emerald-950/90 border-t border-emerald-500/20 flex items-center gap-2"
          >
            {voice.isSupported && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={voice.isListening ? voice.stopListening : voice.startListening}
                className={`w-10 h-10 rounded-xl shrink-0 transition-colors ${
                  voice.isListening
                    ? "bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse"
                    : "text-emerald-300 hover:text-white bg-emerald-900/40 border border-emerald-500/20 hover:bg-emerald-800/40"
                }`}
                title={voice.isListening ? "Stop voice listening" : "Speak question"}
              >
                {voice.isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            )}

            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask FarmMate anything about farming..."
              className="flex-1 h-11 rounded-xl bg-emerald-900/40 border-emerald-500/25 text-white placeholder:text-emerald-200/50 text-xs sm:text-sm focus-visible:ring-emerald-400"
              disabled={isLoading}
            />

            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-emerald-950 font-bold shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.35)] disabled:opacity-40"
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
