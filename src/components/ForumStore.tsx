import React from "react";
import { motion } from "motion/react";
import { StoreItem, PlayerStats } from "../types";
import { 
  ShoppingBag, Flame, Coins, Lock, CheckCircle, Smartphone, Award, Coffee
} from "lucide-react";

interface ForumStoreProps {
  stats: PlayerStats;
  setStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  addToast: (message: string) => void;
}

const STORE_ITEMS: StoreItem[] = [
  {
    id: "pork_knuckle",
    name: "巴伐利亚大烤猪肘 (Pork Knuckle)",
    description: "德国顶级风味烤猪肘，烤至外焦里嫩、油脂横飞。是303号宿舍八年老狗芬格尔生命的灵魂！购买后芬格尔好感度瞬间 ＋30点！",
    cost: 150,
    iconName: "🍗",
    secretKey: undefined
  },
  {
    id: "luxury_noodles",
    name: "极纯金康师傅海鲜方便面",
    description: "芬格尔深夜编写守夜人八卦头条时，唯一的圣战级泡面伴侣。高盐、提神，吃一口爽快无限。购买后芬格尔好感度 ＋15点！",
    cost: 100,
    iconName: "🍜",
    secretKey: undefined
  },
  {
    id: "caesar_hairline",
    name: "恺撒高音贝高倍发际线特写原图",
    description: "由新闻部底层干事用2000mm变焦镜头、在恺撒海滩日光浴时秘密捕捞的杰作。泄露后能直接换得恺撒哭泣求饶。购买后揭开机密：【曾经的A级黑客大师】！",
    cost: 250,
    iconName: "💇",
    secretKey: "prodigyPast"
  },
  {
    id: "eva_floppy",
    name: "EVA的红宝石心型磁性软盘",
    description: "印有红金色玫瑰徽记的特殊3.5英寸老旧软盘。里面装有古老的底层加密算法碎片，写有早已故去的战友签名。购买后解锁终极执念机密：【诺玛与EVA的幽影联结】！",
    cost: 400,
    iconName: "💾",
    secretKey: "evaConnection"
  },
  {
    id: "greenland_beer",
    name: "格陵兰深雪原产黑拉格大听装",
    description: "带有极地冰碴的黑拉格精酿，是当年格陵兰远征军唯一的取暖纪念。喝下它，揭密芬格尔尘封了八年的悲伤禁忌：【格陵兰冰原的黑色五分钟】！",
    cost: 300,
    iconName: "🍺",
    secretKey: "greenlandIncident"
  }
];

export function ForumStore({ stats, setStats, addToast }: ForumStoreProps) {

  // Handle purchasing store item with direct state mutation
  const handlePurchase = (item: StoreItem) => {
    if (stats.forumPoints < item.cost) {
      addToast(`❌ 余额不足！购买此物品需要 ${item.cost} 积分，你当前只有 ${stats.forumPoints} 积分。赶紧去发帖造谣攒钱吧！`);
      return;
    }

    if (stats.purchasedItems.includes(item.id)) {
      addToast(`⚠️ 你已经购买过【${item.name}】了！不必重复消费，勤俭持家才是废柴真谛。`);
      return;
    }

    // Apply currency deduction & append list
    let nextStats = { ...stats };
    nextStats.forumPoints -= item.cost;
    nextStats.purchasedItems = [...nextStats.purchasedItems, item.id];

    // Modify target bonuses directly based on purchased item ID
    if (item.id === "pork_knuckle") {
      nextStats.fingerFavorability = Math.min(120, nextStats.fingerFavorability + 30);
      addToast("🍗 哇！1.9米高的芬格尔像饿狼一样直接在你宿舍地板上打滚，对你的好感度暴涨 30 点！并表示这辈子为你当牛做马！");
    } else if (item.id === "luxury_noodles") {
      nextStats.fingerFavorability = Math.min(120, nextStats.fingerFavorability + 15);
      addToast("🍜 芬格尔捧着极纯金泡面狂呼万岁：‘今晚的爆料贴我有动力再肝三万字了！’，好感度 ＋15 点！");
    } else if (item.secretKey) {
      nextStats.secretsUnlocked = {
        ...nextStats.secretsUnlocked,
        [item.secretKey]: true
      };
      addToast(`🔓 购买成功！你获得此绝密道具，在个人档案中已解锁关于芬格尔的核心档案：【${item.name}相关的过往经历】！`);
    }

    setStats(nextStats);
  };

  return (
    <div id="forum_store_component" className="p-1 md:p-6 bg-slate-950 text-slate-100 rounded-xl border border-slate-850 shadow-2xl">
      {/* Head header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-5 mb-5 gap-3">
        <div>
          <h2 className="text-sm md:text-xl font-bold font-serif text-amber-400 flex items-center gap-2">
            <ShoppingBag className="text-amber-500" />
            黑鹰秘密交易所 (Secret Forum BBS Store)
          </h2>
          <p className="text-slate-400 text-xs mt-1 md:mt-2 leading-relaxed">
            校内论坛版主芬格尔利用后台协议偷偷开设的黑市。在这里，你可以使用在日常故事里攒下来的“守夜人论坛积分”兑换奇葩礼品，或者揭秘废柴师兄最深处的历史创伤。
          </p>
        </div>

        {/* Live balance banner */}
        <div className="px-4 py-2 bg-slate-900 border border-amber-600/60 rounded-xl flex items-center gap-2 text-amber-400 font-mono text-sm shadow-md shadow-amber-950/20">
          <Coins size={16} className="text-amber-500 animate-spin-slow" />
          <span>我的论坛积分：</span>
          <span className="font-bold underline">{stats.forumPoints} pt</span>
        </div>
      </div>

      {/* Item product deck layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {STORE_ITEMS.map((item) => {
          const isPurchased = stats.purchasedItems.includes(item.id);
          
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-300 relative ${
                isPurchased
                  ? "bg-slate-900/40 border-slate-850 text-slate-400 grayscale-30"
                  : "bg-slate-900 border-slate-800 hover:border-amber-500/70 hover:shadow-lg shadow-amber-950/10 hover:shadow-amber-950/20"
              }`}
            >
              {/* Sold tag badge */}
              {isPurchased && (
                <div className="absolute top-3 right-3 bg-slate-950/90 text-amber-500 border border-slate-800/80 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider z-10 flex items-center gap-1">
                  <CheckCircle size={10} />
                  已拥有
                </div>
              )}

              <div>
                {/* Big element/emoji wrapper */}
                <div className="w-12 h-12 bg-slate-950 rounded-lg flex items-center justify-center text-2xl border border-slate-850 mb-4 shadow">
                  {item.iconName}
                </div>

                <h3 className="text-xs md:text-sm font-bold text-slate-100 mb-1.5 font-serif mr-12 leading-tight">
                  {item.name}
                </h3>

                <p className="text-[11px] text-slate-400 leading-relaxed font-sans mb-4 min-h-[48px]">
                  {item.description}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-slate-850 pt-3">
                <div className="flex items-center gap-1.5 font-mono text-xs text-amber-400 font-bold">
                  <span>单价：</span>
                  <span>{item.cost} pt</span>
                </div>

                <button
                  onClick={() => handlePurchase(item)}
                  disabled={isPurchased}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${
                    isPurchased
                      ? "bg-slate-950 text-slate-600 border border-slate-800 pointer-events-none"
                      : "bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow shadow-amber-500/10"
                  }`}
                >
                  {isPurchased ? "售罄" : "积分兑换"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips section at the bottom */}
      <div className="mt-8 p-3.5 bg-slate-950/80 border border-slate-850 rounded-xl flex items-center gap-3">
        <span className="text-xl">💡</span>
        <p className="text-[11px] text-slate-400 leading-relaxed font-sans pr-4">
          <strong>积分获取攻略</strong>：完成日常故事中的各个章节、取得有利于宿舍风纪的成果、或者利用左侧的<strong>守夜人论坛造谣新闻器（Gossip Generator）</strong>，点击“一键空降大头条”能持续且无限次快速创造巨额积分！
        </p>
      </div>

    </div>
  );
}
