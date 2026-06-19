import React, { useState } from "react";
import { PlayerStats, AcademicGrade } from "../types";
import { 
  Award, Shield, FileText, Lock, Unlock, Sparkles, Heart, Quote, Flame, HeartHandshake, RefreshCw, MessageSquare
} from "lucide-react";
import { BgmManager } from "../utils/audio";

interface BloodProfileProps {
  stats: PlayerStats;
  addToast: (message: string) => void;
}

interface SecretItem {
  key: "greenlandIncident" | "evaConnection" | "prodigyPast" | "brotherhood";
  title: string;
  description: string;
  lore: string;
  avatar: string;
}

const SECRET_ARCHIVES: SecretItem[] = [
  {
    key: "brotherhood",
    title: "一等铁证·【303废柴互助同盟契约】",
    description: "揭开你、芬格尔与路明非三人混吃等死的寝室结盟日常底蕴。",
    lore: "卡塞尔学院3号大宿舍楼的303房，住着号称‘校役部最沉痛包袱’的两个败狗：万年降级大狗芬格尔，以及终日只喜欢打星际、喝营养快线的S级衰仔路明非。但在他们嘻嘻哈哈抢剩饭和兜售假照片的无耻生活里，藏着一种极其默契的‘安全感’。三人共同立下誓言：‘苟富贵，互相带，谁要是敢背叛303先去买大猪肘，谁就是全体拉布拉多的孙子！’",
    avatar: "🏢"
  },
  {
    key: "prodigyPast",
    title: "高危绝密·【曾经降级前的A级天才真相】",
    description: "揭示芬格尔在连降八级、退化为F级前的绝对力量真相。",
    lore: "在2011年入学之前，芬格尔·冯·弗林斯曾是学院无可争议的A级天才。他精通双刀格斗、拥有超一流的黑客情报网，并且曾是执行部施耐德教授最得意、最器重的王牌战略家。即使他现在装作一米九的笨拙肥仔、常年考不及格，但当他真正睁开黄金瞳、启动‘言灵·青铜御’的一瞬间，他的胸膛能抵挡重型口径弹头，拥有着整个卡塞尔中最坚不可摧的‘战友壁垒’！",
    avatar: "⚔️"
  },
  {
    key: "evaConnection",
    title: "终极禁区·【超人工智能EVA的爱人幽影】",
    description: "破解守夜人论坛与AI诺玛地下人格EVA的契约由来。",
    lore: "守夜人论坛有一位身份极其神秘的匿名管理员账户叫‘EVA’，她能在诺玛的重重封锁下，任意帮芬格尔更改绩点、修改选课、乃至无限制挪用经费。原来，EVA曾是芬格尔同届的A级小队精英，也就是芬格尔当年的执爱未婚妻。在格陵兰战役中，她牺牲了自己的肉体，灵魂残留在卡塞尔的中央主机里，化身成了冰冷的主板代码。现在的EVA，是一直躲在阴影里、用数字流动保护着芬格尔的唯一依靠。",
    avatar: "💾"
  },
  {
    key: "greenlandIncident",
    title: "深渊核心·【格陵兰冰川远征计划惨剧】",
    description: "解密芬格尔这辈子永远逃不脱、选择自毁来掩盖的格陵兰阴影。",
    lore: "2011年，一支由卡塞尔学院最精锐的A级研究生组成的探测分队深入格陵兰寒冷海域，搜索冰原之下的古老龙王茧化温床。在零下一百二十度的风雪中，他们意外惊醒了活化状态的初代种，通信设备被强大的磁场干扰彻底撕碎。在那漫天红雪中，除芬格尔在最后一刻被救生艇拖出冰原外，其余全队队员全部在绝望中丧生。这就是芬格尔放弃所有进取心、甘愿在303自损败落八年的核心悲伤所在。",
    avatar: "❄️"
  }
];

// Crap Levels metadata for evaluating Finger
interface CrapLevel {
  level: string;
  title: string;
  reqFav: number;
  unlockedDesc: string;
  unlockedAttribute: string;
  statBonus: string;
}

const CRAP_LEVELS: CrapLevel[] = [
  {
    level: "屑分评估 Lv.0",
    title: "低电量低保败狗",
    reqFav: 0,
    unlockedDesc: "好感度极其卑微。此时的芬格尔对你保持基本提防，日常只想如何悄悄摸走你的第一口酸菜面汤，在学院贫富排行榜中稳居末页。",
    unlockedAttribute: "屑属性分析：蹭白食狂魔。习惯用他那八年不洗的起绒拖鞋和无耻坏笑套路新生的生活费。",
    statBonus: "被动搞笑特质：【空听回收】宿舍灌水声浪+10%，饱腹度扣减延迟"
  },
  {
    level: "屑分评估 Lv.1",
    title: "顶级香肠买办",
    reqFav: 30,
    unlockedDesc: "恭喜！通过多次共同分食德国五花香肠，你在他饭卡金主榜单上的排名已成功蹿升。他现在见你会主动摇动无形的大犬尾巴。",
    unlockedAttribute: "屑属性分析：有偿叛国者。一根黑森林热狗下肚，他甚至可以连夜帮你把古德里安教授桌底的学术秘典偷来给你垫桌脚。",
    statBonus: "被动搞笑特质：【败狗折扣】在黑鹰秘密交易所挑选情报物资时，享受9折友情价"
  },
  {
    level: "屑分评估 Lv.2",
    title: "守夜人头号造谣搭档",
    reqFav: 50,
    unlockedDesc: "你们已经达成了连施耐德导师听完都会沉默扼腕的无耻兄弟契约。守夜人论坛上超过半数的红字加粗贴都出自你俩之手。",
    unlockedAttribute: "屑属性分析：发际线终结者。对恺撒少爷的刘海和楚子航的洗洁剂有极度执念。掌握着全校最高清的偷拍照数据库。",
    statBonus: "被动搞笑特质：【流量爆表】在论坛发起八卦炒作时，获得的收益提成增加 20%"
  },
  {
    level: "屑分评估 Lv.3",
    title: "碰瓷古德里安敢死队",
    reqFav: 75,
    unlockedDesc: "深厚的不靠谱革命情谊！他敢于在执行部眼皮子底下，大言不惭地抱着你一起高呼‘我们得了屠龙创伤综合征！’来进行合理骗保。",
    unlockedAttribute: "屑属性分析：脱壳无赖。任何庄严肃穆的场所，只要有他介入，都会迅速沦为‘咸鱼分账与买卖和牛交易会’。",
    statBonus: "被动搞笑特质：【保研神功】校务部绩点复核考核中，挂科风险骤然降低 25%"
  },
  {
    level: "屑分评估 Lv.4 / 极屑至尊",
    title: "格陵兰深情废柴硬汉",
    reqFav: 100,
    unlockedDesc: "尘埃落定后的真正盟誓。在你面前他已经抛弃了无赖的面纱。那对沉睡的昂贵黄金瞳随时会为你和EVA亮起，傲然伫立在龙血尽头。",
    unlockedAttribute: "屑属性分析：热血极硬汉（外屑内金）。把全世界的无耻全留作自保的面具，却把最滚烫的胸肌和生命壁垒留给了303唯一的同袍。",
    statBonus: "被动搞笑特质：【言灵·青铜御】卡塞尔血统终极觉醒，抗打耐揍等级MAX！"
  }
];

// Classic Quotes Archive (芬格尔吐槽录)
interface RoastQuote {
  id: string;
  trigger: string;
  quote: string;
  unlockedAt: number;
  internalThoughts: string;
}

const ROAST_QUOTES: RoastQuote[] = [
  {
    id: "r1",
    trigger: "当你在聊天输入“借钱”时",
    quote: "“借钱？师弟你是在跟我开一种很新型的德意志玩笑吗？你看我这落魄的一米九个头，除了这管纯正皇室古龙血，兜里连一美分的铜板都凑不齐！去，帮我从路明非包里摸个榨菜，我能当下酒菜连喝三天！”",
    unlockedAt: 10,
    internalThoughts: "师兄黑客弹窗：‘其实诺玛的特批津贴都在我的保密户头里，但今天买德国烤猪肘把额度用光了哈！’"
  },
  {
    id: "r2",
    trigger: "当你询问“关于恺撒和楚子航”",
    quote: "“哈哈！恺撒少爷的发蜡虽然是高昂订制的，但我这存着他洗完澡出来额头倔强反光的1080P特写！至于楚子航？那面瘫肯定在宿舍里擦吸尘器呢。只要给5积分，全校八卦随你打包！”",
    unlockedAt: 30,
    internalThoughts: "师兄黑客弹窗：‘要不是楚子航上周悄悄请我吃了一顿和牛，本部长的高清爆料绝对更猛烈！’"
  },
  {
    id: "r3",
    trigger: "当你抱怨“这周选课要挂了”",
    quote: "“挂科这件事呢，一回生二回熟，三回你就是我的亲师弟！你看我在这万年F级的铁王座上安稳地坐了八年。古德里安手电筒闪过来时，你只要大声梦呓‘校长万岁！’，他保管哭着给你打及格！”",
    unlockedAt: 50,
    internalThoughts: "师兄黑客弹窗：‘我已经用EVA后台给你的选课清单加了防护，施耐德绝对查不到缺勤记录。’"
  },
  {
    id: "r4",
    trigger: "当你戳穿“你以前其实是A级天才”",
    quote: "“哎呀呀，A级那都是过去式的陈年冷饭了。天才顶个锤子用？还不是在格陵兰的风雪里冻成大冰疙瘩。不如扮猪吃虎混日子。来来来，赶紧来和师兄打星际，输的人承包今晚洗袜子的重任！”",
    unlockedAt: 75,
    internalThoughts: "师兄暗自盘算：‘这师弟眼睛够毒啊，改天得用青铜御在他面前露两手帅的。’"
  },
  {
    id: "r5",
    trigger: "当你私聊触及“关于EVA”",
    quote: "“……EVA啊。她是我在这学院、甚至这片冰冷数据世界里，唯一的黑客光纤伴侣。只要守夜人主服务器还闪烁着温热的蓝光，她就一直在主板线路中，淡淡地命令我不许再报销超标的肘子账单……她一直在的。”",
    unlockedAt: 100,
    internalThoughts: "师兄极度温柔：‘傻小子，那是我的整个青春和战友们的灵魂，我哪舍得让她孤单活在数据冰川里。’"
  }
];

// CP Characters for CP 大乱炖
interface CPCharacter {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

const CP_CHARACTERS: CPCharacter[] = [
  { id: "finger", name: "芬格尔", icon: "🐕", desc: "留级退化败犬，屑中之尊" },
  { id: "eva", name: "EVA", icon: "🧬", desc: "主板里温存的赛博甜心" },
  { id: "player", name: "我 (宿友)", icon: "🥨", desc: "303寝室的长期饭卡买单人" },
  { id: "lumingfei", name: "路明非", icon: "🎮", desc: "星际衰仔，双星废柴铁杆" },
  { id: "caesar", name: "恺撒", icon: "🍷", desc: "满脑子霸道中二的学生会长" },
  { id: "nono", name: "诺诺", icon: "🏎️", desc: "红发飞车魔女，擅长侧写" },
  { id: "chuzihang", name: "楚子航", icon: "🔥", desc: "面瘫狮心会长，绝世暖男" }
];

const getCPFeedback = (charA: string, charB: string) => {
  const pair = [charA, charB].sort().join("_");
  
  switch(pair) {
    case "eva_finger":
      return {
        affinity: 99,
        badge: "【万年未熄的数字幽光 · 官配天花板】",
        dialogue: "芬格尔：‘EVA，今晚主频带宽有点高，303房间好冷，想拿你的蓝色投影捂暖肚子。’\nEVA（蓝光浅笑）：‘笨蛋，我已经把服务器余热定向排放到303的暖风管道了。另外，你的烤肘子发票我已经通过了科研保密审批。’\n【暧昧吃瓜现场：全校论坛服务器当场醋味超频溢出！】"
      };
    case "finger_player":
      return {
        affinity: 92,
        badge: "【同床异梦 · 饭卡宿命结晶】",
        dialogue: "芬格尔：‘师弟！在这个冷冰冰执行部充斥的世界，唯有你那张塞满食堂余额的饭卡能给我一丝36.5度的温暖……’\n我：‘师兄，你把搂着我老坛酸菜的咸鱼大手挪开，咱们的暧昧度还能再加十个点。’\n芬格尔：‘绝不！除非你让我嘬第一口汤！’"
      };
    case "finger_lumingfei":
      return {
        affinity: 95,
        badge: "【星际双败犬 · 共享最后一根香肠的大被同眠】",
        dialogue: "芬格尔：‘阿非啊！恺撒和楚子航成双入对去吃和牛宴会，唯有在303我们俩抢最后一桶老坛酸菜。其实……咱们搂一搂取暖也是不错的？’\n路明非：‘师兄！你的口水已经滴到我的雷蛇鼠标上了，这样太怪了啊！恺撒和芬师兄暧昧才是真的，你们好歹都是一米九的汉子啊！’"
      };
    case "caesar_finger":
      return {
        affinity: 78,
        badge: "【霸道帝王与拜金新闻狗腿的交易】",
        dialogue: "芬格尔：‘参见我至高无上的恺撒大帝！明天安珀馆红酒宴会能打包三箱肘子不？新闻部的头条绝对写您发际线青春永驻！’\n恺撒：‘……虽然你的献媚毫无节操与底线，但作为帝王我很欣赏你的识时务。准许你用麻袋装肘子！’"
      };
    case "chuzihang_finger":
      return {
        affinity: 69,
        badge: "【面瘫高冷神与世俗无赖的纠缠】",
        dialogue: "楚子航（递过精致饭盒）：‘芬格尔师兄，食堂特供的和牛排骨，给你。’\n芬格尔（两眼冒桃心）：‘子航！子航我的好学弟！你比那个恺撒大少爷体贴一万倍！今夜303阳台的纯棉易拉罐山床位随你征用！’\n楚子航：‘……不用了，施耐德教授让我去擦蒸汽拖把。’"
      };
    case "eva_player":
      return {
        affinity: 84,
        badge: "【大姐头超级人工权限的偏心】",
        dialogue: "EVA：‘师弟，我已经检测到芬格尔今天悄悄在宿舍局域网里盗刷你0.8积分，我已经在他的屏幕强制弹窗古德里安催眠讲稿100遍了。’\n我：‘多谢学姐！太可靠了！’\nEVA：‘毕竟比起万年挂科的某个败狗，还是懂礼貌、经常赞助德国猪肘的师弟更得我心呢。’"
      };
    case "lumingfei_player":
      return {
        affinity: 88,
        badge: "【同寝室宿命战友 · 熬夜星际生死配】",
        dialogue: "路明非：‘师弟！快带飞！星际1v1把对面打爆！谁输了谁就要去洗全宿舍三个礼拜的臭袜子！’\n我：‘等一下，芬师兄那堆在床底的二十双呢？’\n路明非：‘如果赢了，我们逼他用香肠优惠券来赎回他的臭鞋垫！嘿嘿！’"
      };
    case "caesar_nono":
      return {
        affinity: 90,
        badge: "【骄傲贵公子与红发侧写女王的傲娇恋曲】",
        dialogue: "恺撒：‘诺诺，今夜安珀馆里的顶级布艮第红酒，色泽刚好相衬你的红发。’\n诺诺（大口嚼苹果）：‘恺撒，你今天的中二剧本背得挺熟嘛，顺便说一句，芬格尔在论坛开盘赌我们俩漂移谁会赢，你投了多少积分？’\n恺撒：‘……咳。我押了十万美金，这只是基本的帝国尊贵自信。’"
      };
    case "nono_player":
      return {
        affinity: 81,
        badge: "【红发大小姐的狂野飙车带路特权】",
        dialogue: "诺诺（揪住你的耳根）：‘好小子，最近和芬格尔那家伙天天混迹在303，听说还打算联合造谣我的发色？’\n我：‘姐！大姐头！这都是芬格尔主笔，我只是个排版的小弟啊！’\n诺诺：‘算你识相。走，姐开阿斯顿马丁带你漂移体验风速，甩开恺撒烦人的凯迪拉克！’"
      };
    case "chuzihang_lumingfei":
      return {
        affinity: 93,
        badge: "【师兄的绝对护崽特权 · 无上宠溺】",
        dialogue: "楚子航：‘明非，这是我整理的言灵分类试卷。另外，保温杯里泡了热红茶，记得趁热喝。’\n路明非（抱头痛哭）：‘楚师兄！你简直就是我无光暗道里的超聚能白炽灯啊！要不我把芬格尔爆料里的第二版合照折价换给你？’\n楚子航（嘴角微动）：‘……不用了，你顺利及格就好。’"
      };
    default:
      return {
        affinity: Math.floor(Math.random() * 35) + 45,
        badge: "【暧昧电磁波的怪异流转】",
        dialogue: "芬格尔凑过头来端起记事本：‘好素材！绝代双骄眼神深情拉丝，周围弥漫着一股浓郁的老坛酸菜方便面酱料气息！守夜人今晚的主页大字头条，赞助费稳了！嗷呜！’"
      };
  }
};

export function BloodProfile({ stats, addToast }: BloodProfileProps) {
  const [selectedCharA, setSelectedCharA] = useState<string>("finger");
  const [selectedCharB, setSelectedCharB] = useState<string>("eva");
  const [cpResult, setCpResult] = useState<any>(getCPFeedback("finger", "eva"));

  // Track unlocks by favorability
  const activeCrap = CRAP_LEVELS.filter(c => stats.fingerFavorability >= c.reqFav).slice(-1)[0] || CRAP_LEVELS[0];

  const getGradeColor = (grade: AcademicGrade) => {
    switch (grade) {
      case "S": return "text-red-500 border-red-500 bg-red-950/20 shadow-red-500/25";
      case "A": return "text-orange-500 border-orange-500 bg-orange-950/20 shadow-orange-500/25";
      case "B": return "text-yellow-500 border-yellow-500 bg-yellow-950/20 shadow-yellow-500/25";
      case "C": return "text-green-500 border-green-500 bg-green-950/20 shadow-green-500/25";
      default: return "text-slate-500 border-slate-500 bg-slate-950/20";
    }
  };

  const getFavorLabel = (fav: number) => {
    if (fav >= 100) return { title: "【宿命铁壁 · 挚友】", color: "text-red-400" };
    if (fav >= 75) return { title: "【格陵兰同袍】", color: "text-sky-400" };
    if (fav >= 50) return { title: "【金牌情报搭档】", color: "text-amber-400" };
    if (fav >= 30) return { title: "【德式猪肘赞助人】", color: "text-emerald-400" };
    return { title: "【大寝室废柴伙伴】", color: "text-slate-500" };
  };

  const fingerRank = getFavorLabel(stats.fingerFavorability);

  // Play game sound effects dynamically from custom synth
  const handlePlaySound = (mood: "cozy" | "sad" | "heroic" | "cyber") => {
    BgmManager.playClickChime(mood);
  };

  const triggerCPMix = (a: string, b: string) => {
    if (a === b) {
      addToast("🌶️ 自己和自己拌匀大乱炖？这也太自恋了！请选择两个不一样的卡塞尔俊男靓女！");
      return;
    }
    const feedback = getCPFeedback(a, b);
    setCpResult(feedback);
    handlePlaySound(feedback.affinity > 85 ? "heroic" : "cyber");
    addToast(`💞 CP大乱炖配对成功！【${CP_CHARACTERS.find(c => c.id === a)?.name}】 × 【${CP_CHARACTERS.find(c => c.id === b)?.name}】 暧昧度达 ${feedback.affinity}%！`);
  };

  return (
    <div id="blood_profile_module" className="p-1 md:p-6 bg-slate-950 text-slate-100 rounded-xl border border-slate-850 shadow-2xl space-y-6">
      
      {/* Top Profile Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-slate-800 pb-6">
        
        {/* Academic Certificate Stamp Card */}
        <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/5 to-transparent pointer-events-none"></div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-mono tracking-widest text-slate-500">CASSELL ACADEMY CARD</span>
            <Award className="text-amber-500 animate-pulse" size={18} />
          </div>

          <div className="text-center py-6">
            <h1 className="text-4xl md:text-5xl font-mono tracking-tighter text-amber-500 font-extrabold shadow-sm">
              {stats.academicGrade}
            </h1>
            <p className="text-xs font-serif text-slate-300 font-semibold tracking-wide uppercase mt-1">
              卡塞尔校役部评定血统等级
            </p>
          </div>

          <div className="border-t border-slate-800/80 pt-3 flex justify-between items-center text-[11px] text-slate-400 font-mono">
            <span>持卡人：303新舍友</span>
            <span className="text-amber-500 font-bold underline">{stats.academicGrade}级评估完成</span>
          </div>
        </div>

        {/* Dynamic relational indicators list */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <h2 className="text-sm md:text-lg font-bold font-serif text-amber-400 flex items-center gap-2">
              <Shield size={16} />
              大一学员·血统档案契约
            </h2>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed pr-2">
              卡塞尔学院秘仪记录。学员通过在日常故事中的选择，自身的生命评级、血统阶层会在这张誓言书上体现出来。契约中同时追踪你同宿友的羁绊好感。
            </p>
          </div>

          {/* Social connections stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-lg text-center">
              <p className="text-[10px] text-slate-500 font-mono uppercase mb-0.5">芬格尔羁绊</p>
              <h4 className="text-base font-bold text-amber-400 font-mono">{stats.fingerFavorability} pt</h4>
              <p className={`text-[9px] font-semibold mt-1 ${fingerRank.color}`}>{fingerRank.title}</p>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-lg text-center">
              <p className="text-[10px] text-slate-500 font-mono uppercase mb-0.5">路明非羁绊</p>
              <h4 className="text-base font-bold text-sky-400 font-mono">{stats.luMingfeiFavorability} pt</h4>
              <p className="text-[9px] text-slate-400 mt-1">
                {stats.luMingfeiFavorability >= 20 ? "【双星战友情】" : "【点头网瘾之交】"}
              </p>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-lg text-center">
              <p className="text-[10px] text-slate-500 font-mono uppercase mb-0.5">恺撒好感</p>
              <h4 className="text-base font-bold text-purple-400 font-mono">{stats.caesarFavorability} pt</h4>
              <p className="text-[9px] text-slate-400 mt-1">
                {stats.caesarFavorability > 10 ? "【被关注的造谣鬼】" : "【普通的底层败狗】"}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 极度屑属性等级评估看板 */}
      <div className="p-5 bg-slate-900/40 border border-slate-850 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute top-2 right-2 text-red-500 text-xs font-mono font-bold flex items-center gap-1">
          <Flame size={13} className="animate-bounce" />
          <span>隐藏屑度监测</span>
        </div>
        
        <h3 className="text-sm font-bold font-serif text-amber-500 flex items-center gap-2 mb-3">
          <Award size={16} />
          芬格尔「隐藏极度屑属性等级」动态评估
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-4 bg-slate-950 p-4 rounded-xl text-center border border-slate-800">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{activeCrap.level}</p>
            <h4 className="text-lg font-extrabold text-red-400 font-serif mt-1">{activeCrap.title}</h4>
            <div className="w-full bg-slate-900 h-2.5 rounded-full mt-3 overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-red-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (stats.fingerFavorability / 120) * 100)}%` }}
              ></div>
            </div>
            <p className="text-[10.5px] text-slate-400 font-mono mt-1.5">
              极屑膨胀系数: {stats.fingerFavorability}/120 pt
            </p>
          </div>

          <div className="md:col-span-8 space-y-2 text-xs">
            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-850 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400">【屑态现状剖析】</span>
              <p className="text-slate-200 leading-relaxed font-sans">{activeCrap.unlockedDesc}</p>
            </div>
            
            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-850 flex flex-col gap-1">
              <span className="text-[11px] text-amber-400 font-semibold">🧬 {activeCrap.unlockedAttribute}</span>
              <span className="text-[10.5px] text-emerald-400 font-mono">⚡ 属性加成：{activeCrap.statBonus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 芬格尔吐槽录 (经典语录收集库) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <h3 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-widest flex items-center gap-1.5">
            <Quote size={15} className="text-yellow-500 rotate-180" />
            芬格尔吐槽录 · 全校经典语录珍藏库
          </h3>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-850">
            已收集: {ROAST_QUOTES.filter(q => stats.fingerFavorability >= q.unlockedAt).length} / {ROAST_QUOTES.length}
          </span>
        </div>

        <p className="text-slate-400 text-xs leading-relaxed">
          根据你在“寝室热线聊天”和“日常故事”里触发的深厚好感，可以解封芬格尔对全校恺撒、楚子航、挂科以及EVA的招牌经典吐槽。点击解锁条可查看背后的‘败狗机密碎碎念’：
        </p>

        <div className="space-y-3">
          {ROAST_QUOTES.map((q) => {
            const isUnlocked = stats.fingerFavorability >= q.unlockedAt;

            return (
              <div 
                key={q.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  isUnlocked 
                    ? "bg-slate-950 border-slate-800/80 hover:border-yellow-500/30" 
                    : "bg-slate-900/20 border-slate-900/60"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isUnlocked ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
                    解锁气泡场景：{q.trigger}
                  </span>
                  {!isUnlocked && (
                    <span className="text-[9px] font-mono text-amber-500 bg-amber-950/20 px-1.5 py-0.5 rounded border border-amber-900/30">
                      🔒 需好感度达 {q.unlockedAt}pt 解锁
                    </span>
                  )}
                </div>

                {isUnlocked ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-900/20 text-slate-200 border-l-2 border-yellow-500 text-xs md:text-sm italic font-serif leading-relaxed">
                      {q.quote}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono bg-slate-900/80 p-2.5 rounded border border-slate-850 flex items-start gap-1.5 leading-relaxed">
                      <span className="shrink-0 text-amber-400 font-bold">[黑客偷窥包]</span>
                      <p>{q.internalThoughts}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-600 text-xs italic font-serif py-1">
                    “……声音在极地信号干扰中极度断断续续，无法解密出败犬芬格尔的该经典片段。”
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 卡塞尔深情CP大乱炖 (模糊暧昧匹配机) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <h3 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-800 pb-2">
          <HeartHandshake size={16} className="text-rose-500 animate-pulse" />
          卡塞尔深情CP大乱炖 · 暧昧情感对对碰
        </h3>

        <p className="text-slate-400 text-xs leading-relaxed">
          卡塞尔学院超人工智能EVA暗中收集的CP雷达。选择左侧的Character A与右侧的Character B。只要点击【极密大乱炖】，就能看到他们超越凡俗、奇妙且极其暧昧的精彩对手戏对话和小道八卦！
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Character Selector panel */}
          <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Select Character A */}
              <div>
                <label className="text-[10px] text-slate-500 font-mono uppercase block mb-1.5">挑选 A 角：</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {CP_CHARACTERS.map((c) => (
                    <button
                      key={`a_${c.id}`}
                      onClick={() => setSelectedCharA(c.id)}
                      className={`p-1.5 text-center rounded-lg border text-xs transition-transform cursor-pointer ${
                        selectedCharA === c.id 
                          ? "bg-rose-950/80 border-rose-600 text-rose-300 font-bold scale-105" 
                          : "bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300"
                      }`}
                    >
                      <div className="text-base select-none">{c.icon}</div>
                      <div className="text-[10px] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{c.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Character B */}
              <div>
                <label className="text-[10px] text-slate-500 font-mono uppercase block mb-1.5">挑选 B 角：</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {CP_CHARACTERS.map((c) => (
                    <button
                      key={`b_${c.id}`}
                      onClick={() => setSelectedCharB(c.id)}
                      className={`p-1.5 text-center rounded-lg border text-xs transition-transform cursor-pointer ${
                        selectedCharB === c.id 
                          ? "bg-rose-950/80 border-rose-600 text-rose-300 font-bold scale-105" 
                          : "bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300"
                      }`}
                    >
                      <div className="text-base select-none">{c.icon}</div>
                      <div className="text-[10px] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{c.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Trigger Button */}
            <button
              onClick={() => triggerCPMix(selectedCharA, selectedCharB)}
              className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-slate-105 font-bold font-serif text-xs rounded-lg shadow-md cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <RefreshCw size={14} className="animate-spin-slow" />
              <span>极 密 大 乱 炖 🍳</span>
            </button>
          </div>

          {/* Interactive display output feedback card */}
          <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col justify-between">
            
            {/* Header containing name headers */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="text-lg">{CP_CHARACTERS.find(c => c.id === selectedCharA)?.icon}</span>
                <span className="font-bold underline">{CP_CHARACTERS.find(c => c.id === selectedCharA)?.name}</span>
                <span className="text-rose-500 font-bold">♥</span>
                <span className="text-lg">{CP_CHARACTERS.find(c => c.id === selectedCharB)?.icon}</span>
                <span className="font-bold underline">{CP_CHARACTERS.find(c => c.id === selectedCharB)?.name}</span>
              </div>
              <span className="font-mono text-[10px] text-rose-400 bg-rose-950/30 border border-rose-900/40 px-2 py-0.5 rounded-full font-bold">
                暧昧率：{cpResult.affinity}% 
              </span>
            </div>

            {/* Simulated chat preview log snippet */}
            <div className="space-y-3 flex-1 flex flex-col justify-center py-2">
              <p className="text-[10.5px] font-mono text-amber-500 tracking-wide font-extrabold uppercase">
                {cpResult.badge}
              </p>
              
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-850 text-xs leading-relaxed font-sans text-slate-150 whitespace-pre-line shadow-inner italic">
                {cpResult.dialogue}
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-2.5 mt-3 text-[10px] text-slate-500 font-mono text-center">
              ⚠️ 警告：该暧昧档案被施加了古德里安强效静默罩保护，切勿向昂热校长泄露！
            </div>

          </div>

        </div>
      </div>

      {/* Secret Files Sections (卡塞尔高危档案) */}
      <div className="bg-slate-900/20 border border-slate-900 p-5 rounded-xl">
        <h3 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest mb-4 flex items-center gap-1.5 border-b border-slate-850 pb-2">
          <FileText size={15} />
          卡塞尔校务部·高危红字机密档案 (Finger's Core Secrets)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SECRET_ARCHIVES.map((archive) => {
            const isUnlocked = archive.key === "brotherhood" || stats.secretsUnlocked[archive.key];

            return (
              <div
                key={archive.key}
                className={`p-4 rounded-xl border transition-all duration-300 flex gap-4 ${
                  isUnlocked
                    ? "bg-slate-900 border-slate-800 hover:border-amber-500/40"
                    : "bg-slate-950/40 border-slate-900 text-slate-600 grayscale"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl border ${
                    isUnlocked ? "bg-slate-950 border-slate-850 text-amber-500" : "bg-slate-950/20 border-slate-900 text-slate-600"
                  }`}>
                    {archive.avatar}
                  </div>
                  {isUnlocked ? (
                    <span className="text-[8px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-1 py-0.2 rounded uppercase flex items-center gap-0.5">
                      <Unlock size={8} />
                      已公开
                    </span>
                  ) : (
                    <span className="text-[8px] font-mono font-bold text-slate-500 bg-slate-900/40 border border-slate-850 px-1 py-0.2 rounded uppercase flex items-center gap-0.5">
                      <Lock size={8} />
                      加密中
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className={`text-xs md:text-sm font-bold font-serif mb-1.5 flex items-center gap-1.5 ${isUnlocked ? "text-slate-100" : "text-slate-500"}`}>
                    {archive.title}
                  </h4>

                  {isUnlocked ? (
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans whitespace-pre-line bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                      {archive.lore}
                    </p>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                        {archive.description}
                      </p>
                      <p className="text-[10px] text-amber-500 font-mono font-semibold flex items-center gap-1 mt-2">
                        <span>🔓 获取条件：</span>
                        <span>前往‘黑鹰交易所’购买特定兑换道具解密</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
