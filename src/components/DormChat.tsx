import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, Send, Sparkles, MessageCircle, AlertCircle, HelpCircle, Info, Heart
} from "lucide-react";
import { ChatMessage, PlayerStats } from "../types";
import { VoiceBoard } from "./VoiceBoard";

interface DormChatProps {
  stats: PlayerStats;
  addToast: (message: string) => void;
}

const QUICK_QUESTIONS = [
  { text: "师兄，透露一下恺撒和诺诺的八卦呗？", category: "gossip" },
  { text: "透露一下你以前当A级天才时候的事吧？", category: "identity" },
  { text: "格陵兰冰川那一战，究竟发生了什么……", category: "grief" },
  { text: "师兄，下个月生活费告急，求赞助一美元！", category: "debt" }
];

export function DormChat({ stats, addToast }: DormChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init_msg",
      sender: "finger",
      text: "嗷呜！亲师弟！你终于登上咱们303的宿网专线啦！听古德里安教授说你这周刚攒了点零花钱？咳咳……师兄绝对不是要向你借饭卡，只是德国香肠正对我发出极具精神催眠性质的呼唤！来，跟师兄唠十块钱的，你想聊点嘛？",
      timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll logic to always display latest dialogue
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle post request to server-side Gemini proxy channel
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const playerMsg: ChatMessage = {
      id: `p_msg_${Date.now()}`,
      sender: "player",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, playerMsg]);
    setUserInput("");
    setIsLoading(true);

    try {
      // Gather current message history (keep up to last 10 messages for token friendliness)
      const dialogHistory = [...messages, playerMsg].slice(-10).map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch("/api/finger/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: dialogHistory })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [
        ...prev,
        {
          id: `f_msg_${Date.now()}`,
          sender: "finger",
          text: data.text,
          timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
        }
      ]);

      // Add small favorability bonus for taking time to talk with Finger
      if (Math.random() > 0.6) {
        addToast("💬 在愉快的插科打诨中，你跟芬格尔的宿舍情谊悄然递增！");
      }
    } catch (err: any) {
      console.error("Chat proxy error:", err);
      addToast("❌ 网速在极地风雪下极度迟缓，重新呼叫一下废柴师兄吧！");
    } finally {
      setIsLoading(false);
    }
  };

  // Determine friendship status indicator
  const getFriendshipBadge = (fav: number) => {
    if (fav >= 100) return { title: "【宿命铁壁 · 挚友】", color: "bg-red-950 text-red-400 border-red-800" };
    if (fav >= 75) return { title: "【格陵兰战线同袍】", color: "bg-sky-950 text-sky-400 border-sky-850" };
    if (fav >= 50) return { title: "【守夜人论坛金牌合伙人】", color: "bg-amber-950 text-amber-400 border-amber-850" };
    if (fav >= 30) return { title: "【德式香肠忠粉赞助者】", color: "bg-emerald-950 text-emerald-400 border-emerald-850" };
    return { title: "【303号废柴双星】", color: "bg-slate-900 text-slate-400 border-slate-800" };
  };

  const currentBadge = getFriendshipBadge(stats.fingerFavorability);

  return (
    <div id="dorm_chat_station" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full bg-slate-950 p-2 md:p-4 rounded-xl overflow-hidden text-slate-100">
      
      {/* DIRECT DIALOG CORE (CRT style window) */}
      <div className="lg:col-span-8 flex flex-col justify-between bg-slate-900/60 border border-slate-850 rounded-xl p-4 h-[680px]">
        {/* Terminal screen header */}
        <div className="border-b border-slate-800 pb-3 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs md:text-sm text-slate-100">芬格尔·冯·弗林斯</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded border font-bold font-mono ${currentBadge.color}`}>
                  {currentBadge.title} (羁绊：{stats.fingerFavorability})
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                网络状态：已黑入守夜人光纤专线
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
            <Terminal size={12} className="text-emerald-500" />
            <span>303_TERMINAL_ONLINE</span>
          </div>
        </div>

        {/* Chat window body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 scroll_section">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${m.sender === "player" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Text character badge */}
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold font-serif select-none shrink-0 ${
                  m.sender === "player" 
                    ? "bg-amber-950 text-amber-400 border-amber-800" 
                    : "bg-slate-950 text-yellow-400 border-slate-800"
                }`}>
                  {m.sender === "player" ? "我" : "芬"}
                </div>

                <div className="space-y-1">
                  <div className={`p-3 rounded-xl text-xs md:text-sm font-sans tracking-wide leading-relaxed shadow-md whitespace-pre-wrap ${
                    m.sender === "player"
                      ? "bg-amber-500 text-slate-950 rounded-tr-none font-semibold"
                      : "bg-slate-950 text-slate-200 rounded-tl-none border border-slate-850"
                  }`}>
                    {m.text}
                  </div>
                  <p className="text-[9px] text-slate-500 font-mono text-right">{m.timestamp}</p>
                </div>
              </motion.div>
            ))}

            {/* Simulated typing status */}
            {isLoading && (
              <motion.div className="flex gap-3 max-w-[80%] mr-auto items-center text-xs text-slate-400 font-mono animate-pulse">
                <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center text-yellow-500 font-serif">
                  芬
                </div>
                <div className="px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl rounded-tl-none">
                  【芬格尔正一边吃德国肘子，一边用咸鱼大手敲键盘……】
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Direct sending prompt input */}
        <div className="border-t border-slate-800 pt-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              disabled={isLoading}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="对芬格尔说些什么...（会触发经典的无耻吐槽反应）"
              className="px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 flex-1 min-w-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(userInput);
              }}
            />
            <button
              disabled={isLoading || !userInput.trim()}
              onClick={() => handleSendMessage(userInput)}
              className="p-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer flex items-center justify-center transition-all shadow shadow-amber-500/10 disabled:opacity-50"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Instructions, templates, and milestones */}
      <div className="lg:col-span-4 flex flex-col gap-4 h-[680px]">
        {/* Quick templates deck */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
          <h3 className="text-xs font-bold text-amber-400 font-mono uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <HelpCircle size={14} />
            师弟口水话破冰指令
          </h3>
          <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
            点击以下由新闻部预先搜集好的经典敏感话题，可以瞬间引来芬格尔的热辣回复：
          </p>

          <div className="flex flex-col gap-2">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleSendMessage(q.text)}
                className="p-2.5 bg-slate-950/80 hover:bg-slate-950 hover:border-amber-500/80 rounded-lg text-left text-xs text-slate-300 font-sans tracking-wide leading-relaxed border border-slate-850 hover:text-amber-200 cursor-pointer transition-all flex flex-col"
              >
                <span>{q.text}</span>
                <span className="font-mono text-[9px] text-slate-500 mt-1 uppercase">
                  话题方向：{q.category === "gossip" ? "恺撒绯闻" : q.category === "identity" ? "血统天才" : q.category === "grief" ? "格陵兰往事" : "蹭钱蹭饭"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Voice board sound card section */}
        <div className="flex-1 min-h-[360px]">
          <VoiceBoard addToast={addToast} />
        </div>
      </div>

    </div>
  );
}
