/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, Globe, MessageCircle, ShoppingBag, Shield, Award, Coins, 
  Menu, X, Sparkles, ChevronRight, Volume2, ShieldCheck
} from "lucide-react";
import { PlayerStats, AcademicGrade } from "./types";
import { DormStory } from "./components/DormStory";
import { CampusForum } from "./components/CampusForum";
import { DormChat } from "./components/DormChat";
import { ForumStore } from "./components/ForumStore";
import { BloodProfile } from "./components/BloodProfile";

type GameTab = "story" | "forum" | "chat" | "store" | "profile";

interface ToastMsg {
  id: string;
  message: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<GameTab>("story");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  // Orchestrate shared player metrics and progress records
  const [stats, setStats] = useState<PlayerStats>({
    fingerFavorability: 10,
    luMingfeiFavorability: 0,
    caesarFavorability: 0,
    academicGrade: "C",
    forumPoints: 100,
    secretsUnlocked: {
      greenlandIncident: false,
      evaConnection: false,
      prodigyPast: false,
      brotherhood: true, // brotherhood is unlocked from start
    },
    purchasedItems: [],
  });

  // Current Visual Novel node tracker
  const [currentNodeId, setCurrentNodeId] = useState<string>("c1_intro");

  // Helper mechanism to dispatch beautiful sliding toasts on stats shifts
  const addToast = (message: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, message }]);

    // auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Pre-seed some default welcoming toasts to guide the player
  useEffect(() => {
    addToast("🏰 欢迎来到卡塞尔学院！请在大宿舍楼303号房间中，推开橡木大门展开冒险。");
  }, []);

  // Sync bloodline levels dynamically to display in the main deck
  const getGradeColor = (grade: AcademicGrade) => {
    switch (grade) {
      case "S": return "text-red-500 border-red-500 bg-red-950/20 shadow-red-500/20";
      case "A": return "text-orange-500 border-orange-500 bg-orange-950/20 shadow-orange-500/20";
      case "B": return "text-yellow-500 border-yellow-500 bg-yellow-950/20 shadow-yellow-500/20";
      case "C": return "text-green-500 border-green-500 bg-green-950/20 shadow-green-500/20";
      default: return "text-slate-500 border-slate-500 bg-slate-950/20";
    }
  };

  return (
    <div id="school_sandbox_app" className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row relative">
      
      {/* SOLID TOAST OVERLAY (STACKED ABSOLUTE IN BOTTOM RIGHT) */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-[340px] pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 120, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-slate-900/95 border border-amber-600/60 shadow-lg text-amber-200 p-3.5 rounded-lg text-xs md:text-sm font-sans tracking-wide leading-relaxed font-semibold flex items-start gap-2 backdrop-blur-md select-none"
            >
              <div className="shrink-0 mt-0.5 text-base">✨</div>
              <p>{t.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* NAVIGATION SIDEBAR: Collegiate crest banner and directories */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-850 shrink-0 select-none">
        {/* Hogwarts/Cassell style oak aesthetic logo */}
        <div className="p-5 border-b border-slate-850 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-950 rounded-full border-2 border-amber-500 flex items-center justify-center text-3xl shadow-lg relative mb-3 hover:scale-105 transition-transform">
            🐉
            <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center border border-slate-950">
              <ShieldCheck className="text-slate-950" size={12} />
            </div>
          </div>
          <h1 className="text-sm font-bold font-serif text-amber-400 tracking-wider text-center select-none uppercase">
            卡塞尔学院 · 303室
          </h1>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">CASSELL CORPUS ONLINE</p>
        </div>

        {/* Live Profile Quick Deck */}
        <div className="p-4 border-b border-slate-850 bg-slate-950/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">我的契约执照</span>
            <span className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded border shadow-inner ${getGradeColor(stats.academicGrade)}`}>
              {stats.academicGrade} 级血统
            </span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1">
              <Coins size={12} className="text-amber-500 animate-spin-slow" />
              <span>论坛财富：</span>
            </div>
            <span className="text-amber-300 font-bold">{stats.forumPoints} pt</span>
          </div>
        </div>

        {/* Vertical Direct tabs */}
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab("story")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "story"
                ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/10"
                : "text-slate-400 hover:bg-slate-850 hover:text-slate-200"
            }`}
          >
            <BookOpen size={16} />
            <span>日常故事冒险 (Dorm Story)</span>
          </button>

          <button
            onClick={() => setActiveTab("forum")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "forum"
                ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/10"
                : "text-slate-400 hover:bg-slate-850 hover:text-slate-200"
            }`}
          >
            <Globe size={16} />
            <span>守夜人论坛 (Forum Board)</span>
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "chat"
                ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/10"
                : "text-slate-400 hover:bg-slate-850 hover:text-slate-200"
            }`}
          >
            <MessageCircle size={16} />
            <span>芬格尔寝室热线 (AI Chat)</span>
          </button>

          <button
            onClick={() => setActiveTab("store")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "store"
                ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/10"
                : "text-slate-400 hover:bg-slate-850 hover:text-slate-200"
            }`}
          >
            <ShoppingBag size={16} />
            <span>黑鹰秘密交易所 (Forum Store)</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/10"
                : "text-slate-400 hover:bg-slate-850 hover:text-slate-200"
            }`}
          >
            <Shield size={16} />
            <span>个人血统档案 (Profile dossiers)</span>
          </button>
        </nav>

        {/* Sidebar Collegiate Footnote */}
        <div className="p-4 border-t border-slate-850 text-center font-mono text-[9px] text-slate-500">
          <p>© 2026 CASSELL ACADEMY</p>
          <p className="mt-0.5">龙王言灵等级监察科</p>
        </div>
      </aside>

      {/* MOBILE RESPONSIVE NAV-MENU HEADER */}
      <header className="md:hidden bg-slate-900 border-b border-slate-850 p-4 flex justify-between items-center z-30 select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐉</span>
          <div>
            <h1 className="text-xs font-bold font-serif text-amber-400 tracking-wide">龙族：卡塞尔宿舍日常</h1>
            <p className="text-[8px] text-slate-500 font-mono mt-0.5">ADMIN: CHU_303</p>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 px-2.5 text-slate-300 hover:text-white bg-slate-950 border border-slate-800 rounded-md transition-all cursor-pointer text-xs"
        >
          {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </header>

      {/* MOBILE MENU POPUP CONTAINER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="md:hidden absolute top-14 left-0 right-0 bg-slate-900 border-b border-slate-850 p-4 z-40 space-y-2 shadow-2xl flex flex-col"
          >
            {/* Quick overview rows */}
            <div className="p-3 bg-slate-950 rounded-lg flex justify-between items-center text-xs font-mono mb-2">
              <span className={`px-2 py-0.5 rounded border ${getGradeColor(stats.academicGrade)}`}>
                等级：{stats.academicGrade}级
              </span>
              <span className="text-amber-300 font-bold">余额：{stats.forumPoints} pt</span>
            </div>

            <button
              onClick={() => { setActiveTab("story"); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 rounded-lg text-left text-xs font-bold text-slate-300 hover:bg-slate-850 hover:text-white block bg-slate-950 border border-slate-850"
            >
              📔 日常故事冒险
            </button>
            <button
              onClick={() => { setActiveTab("forum"); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 rounded-lg text-left text-xs font-bold text-slate-300 hover:bg-slate-850 hover:text-white block bg-slate-950 border border-slate-850"
            >
              🌐 守夜人论坛
            </button>
            <button
              onClick={() => { setActiveTab("chat"); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 rounded-lg text-left text-xs font-bold text-slate-300 hover:bg-slate-850 hover:text-white block bg-slate-950 border border-slate-850"
            >
              💬 芬格尔寝室热线 (AI)
            </button>
            <button
              onClick={() => { setActiveTab("store"); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 rounded-lg text-left text-xs font-bold text-slate-300 hover:bg-slate-850 hover:text-white block bg-slate-950 border border-slate-850"
            >
              🏪 黑鹰秘密交易所
            </button>
            <button
              onClick={() => { setActiveTab("profile"); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 rounded-lg text-left text-xs font-bold text-slate-300 hover:bg-slate-850 hover:text-white block bg-slate-950 border border-slate-850"
            >
              🛡️ 个人血统档案
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE DISPLAY STAGE (Tabs Route Viewport) */}
      <main className="flex-1 p-3 md:p-6 bg-slate-950 overflow-y-auto flex flex-col justify-between">
        
        {/* Dynamic transition on active component route */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="flex-1 h-full"
          >
            {activeTab === "story" && (
              <DormStory
                stats={stats}
                setStats={setStats}
                currentNodeId={currentNodeId}
                setCurrentNodeId={setCurrentNodeId}
                addToast={addToast}
              />
            )}

            {activeTab === "forum" && (
              <CampusForum
                stats={stats}
                setStats={setStats}
                addToast={addToast}
              />
            )}

            {activeTab === "chat" && (
              <DormChat 
                stats={stats}
                addToast={addToast}
              />
            )}

            {activeTab === "store" && (
              <ForumStore
                stats={stats}
                setStats={setStats}
                addToast={addToast}
              />
            )}

            {activeTab === "profile" && (
              <BloodProfile 
                stats={stats} 
                addToast={addToast}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}

