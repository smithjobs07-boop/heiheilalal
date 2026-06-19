import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, MessageSquare, Volume2, Bookmark } from "lucide-react";
import { StoryNode, PlayerStats, BulletComment } from "../types";
import { STORY_NODES, DUMMY_BULLET_COMMENTS } from "../data/chapters";
import { triggerFingerVoice, BgmManager } from "../utils/audio";

interface DormStoryProps {
  stats: PlayerStats;
  setStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  currentNodeId: string;
  setCurrentNodeId: (id: string) => void;
  addToast: (message: string) => void;
}

const NARRATOR_THEMES: Record<string, { bg: string; border: string; text: string; role: string }> = {
  "我": { bg: "bg-slate-900 border-amber-500/40 text-amber-250", border: "border-amber-500/50", text: "text-amber-400 font-bold", role: "C级新生 / 303主人" },
  "芬格尔": { bg: "bg-slate-900 border-yellow-500/40 text-yellow-105", border: "border-yellow-500/50", text: "text-yellow-400 font-bold", role: "败狗师兄 / F级退化元老" },
  "路明非": { bg: "bg-slate-900 border-blue-500/40 text-blue-150", border: "border-blue-500/50", text: "text-blue-400 font-bold", role: "S级衰仔 / 废柴挚友" },
  "恺撒": { bg: "bg-slate-900 border-purple-500/40 text-purple-200", border: "border-purple-500/50", text: "text-purple-400 font-bold", role: "学生会会长 / 尊贵帝王" },
  "诺诺": { bg: "bg-slate-900 border-rose-500/40 text-rose-250", border: "border-rose-500/50", text: "text-rose-400 font-bold", role: "红发小魔女 / 恺撒女友" },
  "古德里安教授": { bg: "bg-slate-900 border-red-500/40 text-red-200", border: "border-red-500/50", text: "text-red-400 font-bold", role: "303导师 / 脑补学术大师" },
  "EVA": { bg: "bg-slate-900 border-cyan-500/40 text-cyan-200", border: "border-cyan-500/50", text: "text-cyan-400 font-bold", role: "卡塞尔超人工智能" },
  "系统": { bg: "bg-slate-950 border-slate-800 text-slate-100", border: "border-slate-700", text: "text-amber-400 font-bold", role: "卡塞尔底层沙盒" }
};

const BACKGROUND_STYLING: Record<string, { gradient: string; overlayIcon: string; label: string }> = {
  "dorm_view": { gradient: "from-slate-900 via-slate-850 to-amber-950/40", overlayIcon: "🏠", label: "卡塞尔新宿舍 303大寝" },
  "dorm_dust": { gradient: "from-slate-950 via-zinc-900 to-amber-900/30", overlayIcon: "💨", label: "垃圾山与堆积如山的空易拉罐" },
  "dorm_clasp": { gradient: "from-zinc-900 via-stone-850 to-slate-900", overlayIcon: "🤝", label: "废柴盟约之手" },
  "dorm_chase": { gradient: "from-amber-950 via-stone-900 to-red-950/20", overlayIcon: "🐕", label: "无赖师兄的拖拽留客" },
  "eating_noodle": { gradient: "from-amber-950 via-orange-950 to-neutral-900", overlayIcon: "🍜", label: "热气腾腾的老坛酸菜面" },
  "eating_sausage": { gradient: "from-red-950 via-amber-900 to-stone-950", overlayIcon: "🌭", label: "黑森林高级法兰克福香肠" },
  "guderian_comming": { gradient: "from-red-950 via-zinc-950 to-slate-950", overlayIcon: "🚨", label: "突击突袭！古德里安的银手电筒" },
  "deal_gossip": { gradient: "from-indigo-950 via-slate-900 to-amber-950/20", overlayIcon: "💼", label: "夜色下的八卦分账交易" },
  "phone_view": { gradient: "from-cyan-950 via-slate-900 to-neutral-900", overlayIcon: "📱", label: "诺玛数据库地下接口" },
  "sad_finger": { gradient: "from-slate-950 via-indigo-950 to-stone-950", overlayIcon: "❄️", label: "银发背后的格陵兰冰川创伤" },
  "forum_view": { gradient: "from-indigo-950 via-slate-950 to-zinc-950", overlayIcon: "🌐", label: "守夜人论坛超级后台" },
  "forum_post": { gradient: "from-indigo-900 via-slate-900 to-blue-950", overlayIcon: "✍️", label: "引爆全校的加粗红字贴" },
  "lumingfei_angry": { gradient: "from-blue-950 via-indigo-950 to-amber-950/20", overlayIcon: "🎮", label: "路明非的青春期碎碎念" },
  "gun_war": { gradient: "from-orange-900 via-red-950 to-neutral-950", overlayIcon: "💥", label: "自由一日！铺天盖地的Frigga子弹" },
  "hospital_view": { gradient: "from-emerald-950 via-slate-950 to-zinc-950", overlayIcon: "🏥", label: "校医室高能麻醉病房" },
  "eva_hologram": { gradient: "from-sky-950 via-cyan-900 to-slate-950", overlayIcon: "🧬", label: "EVA的虚幻淡蓝色投影" },
  "finger_fight": { gradient: "from-yellow-900 via-amber-950 to-stone-950", overlayIcon: "🛡️", label: "言灵·青铜御——古老皇血觉醒" },
  "dorm_victory": { gradient: "from-amber-900 via-indigo-950 to-slate-950", overlayIcon: "🍻", label: "阳台日落，两只败狗的干杯" },
  "lobby_view": { gradient: "from-amber-800 via-stone-900 to-zinc-950", overlayIcon: "🏆", label: "英灵殿荣誉授勋现场" }
};

export function DormStory({ stats, setStats, currentNodeId, setCurrentNodeId, addToast }: DormStoryProps) {
  const [bullets, setBullets] = useState<BulletComment[]>([]);
  const [bulletsEnabled, setBulletsEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const bulletIdCounter = useRef(0);

  const node: StoryNode = STORY_NODES[currentNodeId] || STORY_NODES["c1_intro"];
  const theme = NARRATOR_THEMES[node.narrator] || NARRATOR_THEMES["系统"];
  const bgData = BACKGROUND_STYLING[node.backgroundImage || ""] || BACKGROUND_STYLING["dorm_view"];

  // Toggle bgm on story nodes dynamically and play click chimes
  useEffect(() => {
    if (voiceEnabled) {
      let bgmTheme: "cozy" | "sorrow" | "action" | "cyber" = "cozy";
      
      const currentBg = node.backgroundImage || "dorm_view";
      if (["sad_finger", "hospital_view", "eva_hologram"].includes(currentBg)) {
        bgmTheme = "sorrow";
      } else if (["gun_war", "dorm_chase", "guderian_comming", "finger_fight"].includes(currentBg)) {
        bgmTheme = "action";
      } else if (["forum_view", "forum_post", "phone_view"].includes(currentBg)) {
        bgmTheme = "cyber";
      }
      
      BgmManager.transitionTo(bgmTheme);
    } else {
      BgmManager.shutdown();
    }
    
    // Play a gentle navigation click chime matching scene atmosphere
    if (voiceEnabled) {
      const currentBg = node.backgroundImage || "dorm_view";
      let mood: "cozy" | "sad" | "heroic" | "cyber" = "cozy";
      if (["sad_finger", "hospital_view"].includes(currentBg)) {
        mood = "sad";
      } else if (["gun_war", "dorm_chase", "guderian_comming", "finger_fight"].includes(currentBg)) {
        mood = "heroic";
      } else if (["forum_view", "forum_post", "phone_view"].includes(currentBg)) {
        mood = "cyber";
      }
      BgmManager.playClickChime(mood);
    }
  }, [currentNodeId, voiceEnabled, node]);

  // Clean up BGM when leaving the story
  useEffect(() => {
    return () => {
      BgmManager.shutdown();
    };
  }, []);

  // Random Bullet comment generator (吐槽系统)
  useEffect(() => {
    if (!bulletsEnabled) {
      setBullets([]);
      return;
    }

    // Seed initial bullets
    const initialBullets = [1, 2, 3].map((_, idx) => ({
      id: `init_${idx}`,
      author: ["恺撒铁粉", "楚子航除螨大队", "路人丁", "装备部狗友"][idx % 4],
      text: DUMMY_BULLET_COMMENTS[Math.floor(Math.random() * DUMMY_BULLET_COMMENTS.length)],
      color: ["text-amber-400", "text-sky-400", "text-rose-400", "text-teal-400", "text-white"][Math.floor(Math.random() * 5)],
      yOffset: 12 + idx * 25
    }));
    setBullets(initialBullets);

    const interval = setInterval(() => {
      const randomAuthor = [
        "恺撒少爷的护卫", "楚党大弟子", "衰仔守护神", "Eva的看门狗", "装备部受害者",
        "303隔壁声纳员", "昂热的折刀", "诺诺后援会", "古德里安得意门生"
      ][Math.floor(Math.random() * 9)];
      const randomText = DUMMY_BULLET_COMMENTS[Math.floor(Math.random() * DUMMY_BULLET_COMMENTS.length)];
      const randomColor = [
        "text-amber-400", "text-white", "text-cyan-400", "text-red-400", "text-emerald-400", "text-fuchsia-400"
      ][Math.floor(Math.random() * 6)];

      bulletIdCounter.current += 1;
      const newBullet: BulletComment = {
        id: `b_${bulletIdCounter.current}_${Date.now()}`,
        author: randomAuthor,
        text: randomText,
        color: randomColor,
        yOffset: Math.floor(Math.random() * 60) + 10
      };

      setBullets(prev => [...prev.slice(-12), newBullet]);
    }, 3800);

    return () => clearInterval(interval);
  }, [bulletsEnabled, currentNodeId]);

  // Handle choice selection with reward and penalty calculations
  const handleChoiceClick = (choice: any) => {
    let nextStats = { ...stats };

    // Apply currency changes
    if (choice.pointsChange) {
      nextStats.forumPoints = Math.max(0, nextStats.forumPoints + choice.pointsChange);
    }

    // Apply character favorability changes
    if (choice.favorabilityChanges) {
      if (choice.favorabilityChanges.finger) {
        nextStats.fingerFavorability = Math.max(0, Math.min(120, nextStats.fingerFavorability + choice.favorabilityChanges.finger));
      }
      if (choice.favorabilityChanges.luMingfei) {
        nextStats.luMingfeiFavorability = Math.max(0, Math.min(100, nextStats.luMingfeiFavorability + choice.luMingfeiFavorability));
      }
      if (choice.favorabilityChanges.caesar) {
        nextStats.caesarFavorability = Math.max(0, Math.min(100, nextStats.caesarFavorability + choice.favorabilityChanges.caesar));
      }
    }

    // Dynamic Academic Rank modifications based on storyline results
    if (choice.id === "c1_self_intro_opt1") {
      addToast("🥨 贡品香肠极其美味，芬格尔对你的亲密度疯狂上升！");
    } else if (choice.id === "c1_blackmail_prof_opt1") {
      nextStats.academicGrade = "A";
      addToast("🎓 恭喜！你在欺骗古德里安教授的联合汇演中表现惊艳，绩点暂定为：A级！");
    } else if (choice.id === "c1_betray_finger") {
      nextStats.academicGrade = "F";
      addToast("📉 你背叛了芬格尔，古德里安评定你毫无担当精神，宿敌血统跌落至：F级！");
    } else if (choice.id === "c3_dog_opt2" || choice.id === "c3_fight_opt1") {
      nextStats.academicGrade = "S";
      addToast("🔥 宿命觉醒！芬格尔为你展开言灵！校长昂热授予你：S级血统勋章！");
    }

    // Update state & node
    setStats(nextStats);
    setCurrentNodeId(choice.nextId);

    // Build notifications for visual feedback
    let feedback = "";
    if (choice.favorabilityChanges?.finger) {
      feedback += `与芬格尔羁绊 ${choice.favorabilityChanges.finger > 0 ? "＋" : "－"}${Math.abs(choice.favorabilityChanges.finger)} `;
    }
    if (choice.pointsChange) {
      feedback += `校内积分 ${choice.pointsChange > 0 ? "＋" : "－"}${Math.abs(choice.pointsChange)} `;
    }
    if (feedback) {
      addToast(`✨ 【数值变动】${feedback}`);
    }
  };

  // Reset Chapter Adventure to initial node
  const handleReset = () => {
    setCurrentNodeId("c1_intro");
    setStats(prev => ({
      ...prev,
      fingerFavorability: 10,
      luMingfeiFavorability: 0,
      academicGrade: "C",
      forumPoints: 100
    }));
    addToast("⏳ 逆转因果：卡塞尔校役室的故事重置回第一章！");
  };

  return (
    <div id="story_module_container" className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Visual Adventure Stage */}
      <div id="story_stage_viewport" className={`relative h-[340px] w-full bg-gradient-to-b ${bgData.gradient} overflow-hidden flex flex-col justify-between p-4 border-b border-slate-950 select-none`}>
        {/* Stage Floating Overlay Indicators */}
        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-950/85 text-slate-300 text-xs font-mono tracking-wide rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></span>
            <span>{bgData.label}</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Bullet Comment Switch */}
            <button
              onClick={() => {
                setBulletsEnabled(!bulletsEnabled);
                addToast(bulletsEnabled ? "📴 弹幕吐槽系统已关闭。" : "🔛 弹幕吐槽系统已开启！可以接收来自全校的吃瓜评论。");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 ${
                bulletsEnabled 
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold" 
                  : "bg-slate-950/80 text-slate-400 border border-slate-800"
              }`}
            >
              <MessageSquare size={13} />
              <span>吐槽 ({bulletsEnabled ? "开" : "关"})</span>
            </button>

            {/* Ambient Story Soundpack Switch */}
            <button
              onClick={() => {
                const draft = !voiceEnabled;
                setVoiceEnabled(draft);
                if (draft) {
                  addToast("🔊 卡塞尔背景音乐广播已开启！旋律将在此配合剧情实时流转。");
                } else {
                  addToast("🔇 背景音乐已静音。");
                  BgmManager.shutdown();
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 ${
                voiceEnabled 
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold" 
                  : "bg-slate-950/80 text-slate-400 border border-slate-800"
              }`}
            >
              <Volume2 size={13} />
              <span>音乐 ({voiceEnabled ? "开" : "关"})</span>
            </button>

            <button
              onClick={handleReset}
              className="px-2.5 py-1 bg-slate-950/90 hover:bg-slate-900 text-red-400 hover:text-red-305 text-xs font-mono rounded-md border border-slate-800 transition-all cursor-pointer"
            >
              重置
            </button>
          </div>
        </div>

        {/* Floating Bullet comments (吐槽系统) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mt-8">
          <AnimatePresence>
            {bulletsEnabled && bullets.map((b) => (
              <div
                key={b.id}
                className="absolute left-full bullet-comment-fly flex items-center gap-1 px-3 py-1 text-xs bg-slate-950/70 border border-slate-900/60 rounded-full font-sans tracking-wide shadow-md"
                style={{ top: `${b.yOffset}%` }}
              >
                <span className="text-slate-400 font-semibold">{b.author}:</span>
                <span className={`${b.color} font-medium`}>{b.text}</span>
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Ambient Big Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 font-sans select-none pointer-events-none text-[150px]">
          {bgData.overlayIcon}
        </div>

        {/* Visual Novel Character Box */}
        <div id="stage_footer_character_line" className="w-full flex justify-between items-end z-10 pt-16">
          {node.narrator !== "系统" && node.narrator !== "我" ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              key={node.narrator}
              className="px-4 py-2 bg-slate-950/90 text-slate-200 border-l-4 border-yellow-500 rounded-r-lg max-w-sm shadow-xl flex items-center gap-2 border border-slate-800"
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-semibold select-none shadow">
                {node.narrator[0]}
              </div>
              <div>
                <h4 className="text-sm font-bold text-yellow-400 tracking-tight">{node.narrator}</h4>
                <p className="text-[10px] text-slate-400 font-mono">{(NARRATOR_THEMES[node.narrator] || NARRATOR_THEMES["系统"]).role}</p>
              </div>
            </motion.div>
          ) : (
            <div />
          )}

          {/* Quick blood indicator */}
          <div className="px-3 py-1 bg-slate-950/80 border border-slate-800 rounded-md font-mono text-[10px] text-amber-500 flex items-center gap-1">
            <Award size={11} className="text-amber-500" />
            <span>当前评分：</span>
            <span className="font-bold underline text-amber-400">{stats.academicGrade}级血统</span>
          </div>
        </div>
      </div>

      {/* Narration and Speech Panel */}
      <div id="story_narration_box" className="p-5 flex-1 flex flex-col justify-between bg-slate-950 text-slate-100 min-h-[160px]">
        {/* Dynamic speech box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNodeId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
            className={`p-4 rounded-xl border ${theme.bg} ${theme.border} shadow-inner flex-1 flex flex-col gap-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2.5 py-1 rounded bg-slate-950 border border-slate-800/80 font-mono uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-1.5 shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                {node.title || "卡塞尔纪行"}
              </span>
              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <Bookmark size={11} />
                <span className="font-mono text-[10px]">{node.chapterId === "chapter1" ? "第一章" : node.chapterId === "chapter2" ? "第二章" : "第三章"}</span>
              </div>
            </div>
            
            <p className="text-sm md:text-base leading-relaxed tracking-wide font-sans mt-2 whitespace-pre-wrap font-medium text-slate-100">
              {node.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Branching choices line */}
        <div id="story_choices_grid" className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {node.choices.length > 0 ? (
            node.choices.map((choice, idx) => {
              // Grade requirement check
              const isLocked = choice.requiredGrade && 
                ["S", "A", "B", "C", "D", "E", "F"].indexOf(stats.academicGrade) > ["S", "A", "B", "C", "D", "E", "F"].indexOf(choice.requiredGrade);

              return (
                <button
                  key={choice.id}
                  disabled={isLocked}
                  onClick={() => handleChoiceClick(choice)}
                  className={`relative p-3.5 rounded-lg text-left text-xs md:text-sm font-semibold transition-all duration-300 border flex flex-col justify-between group cursor-pointer ${
                    isLocked
                      ? "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed"
                      : "bg-slate-900 hover:bg-slate-850 hover:border-amber-500 border-slate-800 text-amber-200 hover:text-amber-100 shadow-lg hover:shadow-amber-950/20"
                  }`}
                >
                  <p className="font-sans pr-4 leading-normal">{choice.text}</p>
                  
                  {/* Reward indicator tags */}
                  <div className="flex items-center gap-2 mt-2 font-mono text-[10px] text-slate-400 group-hover:text-slate-300">
                    {choice.pointsChange && (
                      <span className={choice.pointsChange > 0 ? "text-emerald-400" : "text-rose-400"}>
                        积分 {choice.pointsChange > 0 ? "+" : ""}{choice.pointsChange}
                      </span>
                    )}
                    {choice.favorabilityChanges?.finger && (
                      <span className="text-amber-400">
                        芬格尔羁绊 {choice.favorabilityChanges.finger > 0 ? "+" : ""}{choice.favorabilityChanges.finger}
                      </span>
                    )}
                    {choice.requiredGrade && (
                      <span className="text-cyan-400 border border-cyan-800/60 px-1 py-0.2 rounded">
                        限等级：{choice.requiredGrade}级
                      </span>
                    )}
                  </div>

                  {/* Absolute index label */}
                  <span className="absolute top-2 right-2 font-mono text-[10px] text-slate-500 group-hover:text-amber-500">
                    选项 {idx + 1}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-4 text-center">
              <span className="text-amber-500 text-sm font-bold tracking-wider golden-iris mb-1">
                【宿命支线结束 · 结局达成】
              </span>
              <p className="text-xs text-slate-400">
                请前往‘守夜人论坛’搞事爆料赚取积分外快，或随时进入‘芬格尔寝室热线’跟师兄深度畅聊吧！
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
