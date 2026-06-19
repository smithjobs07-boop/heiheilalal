import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, Pin, Heart, MessageSquare, Send, Sparkles, AlertCircle, Cpu, User, Flame
} from "lucide-react";
import { ForumPost, PlayerStats } from "../types";
import { FORUM_PRESEED_POSTS } from "../data/chapters";

interface CampusForumProps {
  stats: PlayerStats;
  setStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  addToast: (message: string) => void;
}

export function CampusForum({ stats, setStats, addToast }: CampusForumProps) {
  const [posts, setPosts] = useState<ForumPost[]>(FORUM_PRESEED_POSTS);
  const [activePostId, setActivePostId] = useState<string | null>("post1");
  const [commentInput, setCommentInput] = useState<string>("");
  const [gossipKeyword, setGossipKeyword] = useState<string>("");
  const [isGeneratingGossip, setIsGeneratingGossip] = useState<boolean>(false);

  // Handle Likes increment dynamically
  const handleLikePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = !p.hasLiked;
        return {
          ...p,
          likes: p.likes + (liked ? 1 : -1),
          hasLiked: liked
        };
      }
      return p;
    }));
    addToast("👍 点赞成功！恺撒和芬格尔在后台对你翻了个白眼。");
  };

  // Submit custom comment back to local list
  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newC = {
          id: `c_dyn_${Date.now()}`,
          author: `C级匿名萌新 (你)`,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80",
          content: commentInput.trim(),
          timestamp: "刚刚",
          likes: 0
        };
        return {
          ...p,
          comments: [...p.comments, newC],
          replyCount: p.replyCount + 1
        };
      }
      return p;
    }));

    setCommentInput("");
    addToast("📨 吐槽言论成功发布！正在接受守夜人网警风纪审查……");
  };

  // Make an API Request to local Express server for an AI Rumor Generation
  const handleGenerateAIYaoYan = async () => {
    if (!gossipKeyword.trim()) {
      addToast("⚠️ 请先输入绯闻关键字（比如：‘恺撒和拖把’、‘昂热的假发’）！");
      return;
    }

    setIsGeneratingGossip(true);
    addToast(`🚀 正在呼叫EVA黑入服务器，将围绕【${gossipKeyword}】制作特大造谣头条……`);

    try {
      const response = await fetch("/api/finger/gossip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: gossipKeyword })
      });
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Add the generated thread to our top post array
      setPosts(prev => [data, ...prev]);
      setActivePostId(data.id);
      setGossipKeyword("");
      
      // Reward the user with forum points for generating spectacular rumors
      setStats(prev => ({
        ...prev,
        forumPoints: prev.forumPoints + 50
      }));

      addToast("🔥 惊天造谣大获成功！全校师生在守夜人论坛集体炸锅，获得 50 积分赏金！");
    } catch (err: any) {
      console.error("Gossip fail:", err);
      addToast("❌ 抱歉，EVA的服务器接口正被昂热追踪，造谣失败，重试一次吧！");
    } finally {
      setIsGeneratingGossip(false);
    }
  };

  const selectedPost = posts.find(p => p.id === activePostId);

  return (
    <div id="forum_module_layout" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full bg-slate-950 p-1 md:p-4 rounded-xl overflow-hidden text-slate-100">
      
      {/* LEFT COLUMN: Gossip creator and thread previews */}
      <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-1 h-[680px]">
        {/* Rumor engine widget */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 px-2 bg-red-950 border border-red-800 rounded text-red-400 font-mono text-[10px] uppercase tracking-wider animate-pulse flex items-center gap-1">
              <Cpu size={10} />
              AI CORE
            </span>
            <h3 className="text-sm font-bold text-amber-400 font-serif">守夜人造谣大新闻生成器</h3>
          </div>
          <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
            输入任何卡塞尔人名或奇怪关键词，黑入论坛后台伪造惊天大新闻！测试全校大佬对绯闻的反应并大赚特赚积分！
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              disabled={isGeneratingGossip}
              value={gossipKeyword}
              onChange={(e) => setGossipKeyword(e.target.value)}
              placeholder="例如：恺撒的发际线 / 施耐德的面罩"
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 flex-1 min-w-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGenerateAIYaoYan();
              }}
            />
            <button
              disabled={isGeneratingGossip}
              onClick={handleGenerateAIYaoYan}
              className="px-3.5 py-2 bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-500 hover:to-red-650 text-white font-semibold text-xs md:text-sm rounded-lg flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
            >
              <Sparkles size={14} className={isGeneratingGossip ? "animate-spin" : ""} />
              <span>{isGeneratingGossip ? "正在合成..." : "一键空降头条"}</span>
            </button>
          </div>
        </div>

        {/* Thread list headers */}
        <div className="flex items-center justify-between px-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1">
            <Globe size={11} />
            全部置顶 & 热门贴 ({posts.length})
          </h4>
          <span className="text-[10px] text-slate-500 font-mono">网速：100 Gbps</span>
        </div>

        {/* Thread deck preview */}
        <div id="school_bbs_threads" className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setActivePostId(post.id)}
                className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all duration-200 select-none ${
                  activePostId === post.id
                    ? "bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/35 border-amber-600/80 shadow-md"
                    : "bg-slate-900/60 hover:bg-slate-900 border-slate-850 hover:border-slate-800"
                }`}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-1.5 justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-300">{post.author}</span>
                    <span className="bg-slate-950 text-yellow-500 border border-slate-800 px-1 py-0.2 rounded text-[8px]">
                      {post.authorGrade}级
                    </span>
                  </div>
                  {post.isPinned && (
                    <span className="text-red-400 font-bold flex items-center gap-0.5 text-[9px]">
                      <Pin size={10} />
                      置顶
                    </span>
                  )}
                </div>

                <h5 className="text-xs md:text-sm font-bold tracking-tight text-slate-100 group-hover:text-amber-300 line-clamp-2 leading-snug">
                  {post.title}
                </h5>

                {/* Engagement parameters */}
                <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <MessageSquare size={11} />
                      {post.replyCount}个吐槽
                    </span>
                    <span className={`flex items-center gap-0.5 ${post.hasLiked ? "text-rose-400" : ""}`}>
                      <Heart size={11} fill={post.hasLiked ? "#fb7185" : "none"} />
                      {post.likes}赞
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleLikePost(post.id, e)}
                    className="hover:text-rose-400 p-1 rounded hover:bg-slate-800 font-medium transition-all"
                  >
                    {post.hasLiked ? "已赞" : "送红心"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT COLUMN: Active thread detail and reply column */}
      <div id="thread_focus_panel" className="lg:col-span-12 xl:col-span-7 bg-slate-900/70 border border-slate-850 rounded-xl p-5 flex flex-col justify-between h-[680px]">
        {selectedPost ? (
          <div className="flex flex-col h-full justify-between">
            {/* Scrollable conversation section */}
            <div className="overflow-y-auto pr-2 flex-1 scroll_section">
              {/* Main thread header */}
              <div className="border-b border-slate-800 pb-4 mb-4">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={selectedPost.avatar}
                      alt={selectedPost.author}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700 bg-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-yellow-400">{selectedPost.author}</span>
                        <span className="bg-amber-950 text-amber-500 text-[9px] px-1.5 py-0.2 rounded border border-amber-800/50 font-bold font-mono">
                          {selectedPost.authorGrade}级血统
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono">卡塞尔论坛发布 · 独家发布</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-red-950/30 border border-red-900/60 text-red-400 rounded-md font-mono text-[10px] flex items-center gap-0.5">
                    <Flame size={11} className="animate-bounce" />
                    <span>热度极高 ({selectedPost.likes} 热度)</span>
                  </div>
                </div>

                <h2 className="text-sm md:text-lg font-bold font-serif leading-snug tracking-tight text-slate-100">
                  {selectedPost.title}
                </h2>
              </div>

              {/* Thread body content */}
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 text-slate-300 text-xs md:text-sm leading-relaxed mb-6 font-sans">
                {selectedPost.content}
              </div>

              {/* Dynamic commentary line */}
              <div className="space-y-3 mb-4">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  📬 全校围观回复 ({selectedPost.comments.length})
                </h4>
                
                {selectedPost.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3 bg-slate-950 border border-slate-850 rounded-lg flex gap-3 select-none hover:border-slate-800 transition-all"
                  >
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-8 h-8 rounded-full object-cover border border-slate-800 bg-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1">
                        <span className="font-bold text-amber-500/90">{comment.author}</span>
                        <span>{comment.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In-forum message keyboard */}
            <div className="border-t border-slate-800 pt-4 mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder={`吐槽回复 @${selectedPost.author}...`}
                  className="px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs md:text-sm rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddComment(selectedPost.id);
                  }}
                />
                <button
                  onClick={() => handleAddComment(selectedPost.id)}
                  className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg flex items-center justify-center cursor-pointer transition-all shadow shadow-amber-500/10"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <AlertCircle size={32} className="mb-2 text-slate-600" />
            <p className="text-xs">请在左侧点击贴子，查看卡塞尔守夜人论坛详情</p>
          </div>
        )}
      </div>

    </div>
  );
}
