/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, Sparkles, Play, Award, Heart, HelpCircle, Radio, Music } from "lucide-react";
import { FINGER_VOICE_PACK, VoiceLine, triggerFingerVoice } from "../utils/audio";

interface VoiceBoardProps {
  addToast: (message: string) => void;
}

export function VoiceBoard({ addToast }: VoiceBoardProps) {
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [playbackWave, setPlaybackWave] = useState<boolean>(false);

  const handlePlayVoice = (line: VoiceLine) => {
    setActiveSpeechId(line.id);
    setPlaybackWave(true);
    addToast(`🔊 正在播放芬格尔【${line.mood === "hungry" ? "干饭" : line.mood === "sorrow" ? "深情" : line.mood === "heroic" ? "热血" : "中二"}】原声音频...`);
    
    triggerFingerVoice(line.speachText, line.mood, () => {
      setActiveSpeechId(null);
      setPlaybackWave(false);
    });
  };

  const currentPlayingLine = FINGER_VOICE_PACK.find(l => l.id === activeSpeechId);

  return (
    <div id="soundboard_sandbox_panel" className="p-4 bg-slate-900 border border-slate-800 rounded-xl shadow-xl flex flex-col justify-between h-full select-none text-slate-100">
      
      {/* Soundboard stats & headings */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1 px-1.5 bg-amber-950 border border-amber-800 rounded text-amber-400 font-mono text-[9px] uppercase tracking-wider animate-pulse flex items-center gap-1">
              <Radio size={10} />
              LIVE SOUND
            </span>
            <h3 className="text-sm font-bold text-amber-400 font-serif">芬格尔无赖原声互动配音板</h3>
          </div>
          <Volume2 size={16} className="text-amber-500 animate-bounce-slow" />
        </div>
        <p className="text-[11px] text-slate-400 mb-4 leading-relaxed font-sans">
          卡塞尔校役部地下黑市珍藏录音包。点击任意台词，触发废柴师兄经典原声大作！支持高级发音合成与情绪频率调音。
        </p>

        {/* Audio Wave Visualizer */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-600/30 flex items-center justify-center">
              <Music size={14} className="text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider">声卡播放状态</p>
              <h4 className="text-xs font-semibold text-slate-300 font-sans truncate pr-2 max-w-[180px]">
                {playbackWave && currentPlayingLine ? `正在发声: "${currentPlayingLine.quote.slice(0, 10)}..."` : "闲置中 · 等待拨打"}
              </h4>
            </div>
          </div>

          {/* Animated wave lines */}
          <div className="flex items-end gap-0.5 h-6">
            {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
              <motion.div
                key={i}
                animate={playbackWave ? { height: ["15%", `${h * 10 + 20}%`, "15%"] } : { height: "15%" }}
                transition={{ repeat: Infinity, duration: 0.6 + i * 0.08, ease: "easeInOut" }}
                className="w-0.75 bg-amber-500 rounded-xs"
              />
            ))}
          </div>
        </div>

        {/* Quotes Deck Grid */}
        <div className="grid grid-cols-1 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
          {FINGER_VOICE_PACK.map((line) => {
            const isPlaying = activeSpeechId === line.id;
            return (
              <button
                key={line.id}
                onClick={() => handlePlayVoice(line)}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all duration-200 select-none flex items-start gap-2.5 ${
                  isPlaying
                    ? "bg-gradient-to-r from-slate-950 to-amber-950/20 border-amber-500 shadow-md shadow-amber-950/20"
                    : "bg-slate-950/60 hover:bg-slate-950 border-slate-850 hover:border-slate-800 text-slate-300 hover:text-slate-100"
                }`}
              >
                {/* Playing trigger indicator */}
                <span className={`w-6 h-6 rounded-md border flex items-center justify-center text-[10px] font-mono shrink-0 ${
                  isPlaying 
                    ? "bg-amber-500 text-slate-950 font-bold border-amber-400 scale-105" 
                    : "bg-slate-900 text-slate-400 border-slate-800"
                }`}>
                  {isPlaying ? <span className="animate-spin text-xs">✨</span> : <Play size={10} />}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 justify-between">
                    <p className={`text-[10px] uppercase font-mono font-bold tracking-wider ${
                      line.mood === "hungry" ? "text-red-400" : line.mood === "sorrow" ? "text-sky-400" : line.mood === "heroic" ? "text-yellow-400" : "text-amber-500"
                    }`}>
                      {line.mood === "hungry" ? "🥩 干饭求饶" : line.mood === "sorrow" ? "❄️ 真实过往" : line.mood === "heroic" ? "🛡️ 言灵防线" : "💬 论坛爆料"}
                    </p>
                    <span className="text-[8px] text-slate-500 font-mono">声频ID: {line.id}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed mt-1 line-clamp-2 pr-1 font-sans font-medium">
                    "{line.quote}"
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Synchronized Live Subtitle Bar at bottom */}
      <div className="border-t border-slate-800 pt-3.5 mt-3">
        <h5 className="text-[9px] text-slate-500 font-mono uppercase tracking-widest mb-1.5">高能同步字幕</h5>
        <div className="bg-slate-950/80 p-2.5 rounded border border-slate-850/60 min-h-[46px] flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {playbackWave && currentPlayingLine ? (
              <motion.p
                key={currentPlayingLine.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-amber-200 text-xs font-semibold leading-relaxed tracking-wide font-sans animate-pulse"
              >
                🗣️ "{currentPlayingLine.quote}"
              </motion.p>
            ) : (
              <p className="text-[10px] text-slate-500 font-sans italic">
                点击上方声频列表，在此同步显示芬格尔大师的唇语大字幕
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
