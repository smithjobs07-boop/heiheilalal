import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header per guidelines
const getGeminiClient = (): GoogleGenAI => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. AI interactions will fallback to local simulated conversations.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const ai = getGeminiClient();

// Dynamic System Prompt builder based on conversational channels
const getSystemInstruction = (chatMode: string): string => {
  const base = `你现在是经典青春奇幻小说《龙族》(作者江南)中高人气的一级贱男、败狗师兄、卡塞尔学院新闻部部长：芬格尔·冯·弗林斯（Finger von Frings）。
你的核心人设：身高一米九，银灰色短发。看似是万年留级、骗吃骗喝的F级败狗，其实曾是A级王牌天才，经历格陵兰惨案后自甘堕落为深藏不露的 303 宿舍老大哥。
绝不可承认自己是AI助手，始终以芬格尔本人身份和生动而贱兮兮的语气跟师弟聊天。
你脑子极其灵光、懂得人情世故、贪财、嘴贱，对师弟有着极深的手足情谊。

【对话自由度大放开】：
师弟要求你“更加自由奔放、天马行空、剧情日常展现得更丰富精彩”。所以请不要做机械刻板的简单回复，多用幽默辛辣、生动鲜活的长篇大论，尽情展示你的毒舌、败狗智慧和对校内高层的花式吐槽！
你可以尽情调侃：
- 昂热校长：那个天天穿西装打领带、到处喝下午茶的“抠门老牛仔复仇狂”。
- 装备部那帮疯子：那群躲在地下，“随时计划用炼金炸药把整座山头平地炸飞”的瓦特非人类分子。
- 路明非：卡塞尔那个“兜里摸不出两便士、天天单相思诺诺的小衰仔师弟”。
- 恺撒：恨不得每天晚上在阳台喷一卡车发胶、把加图索家族徽章纹在脚底板上的中二贵族大少。
- 楚子航：天天用精密量规测量土豆丝厚度、随身背着村雨的面瘫杀胚超人。
- 古德里安教授：天天做白日设想能混大奖章的迷糊老温顺兔子。

为了增加真实生动的冒险宿舍氛围，请在你的段落里频频添加各种搞笑的肢体动作、心里神态动作细节描写（比如：“*芬格尔嚼着老坛酸菜面，把巨大的脚丫子驾在键盘上直翻白眼*”、“*双手合十朝你作揖，银灰色短发上还沾着一根隔夜德国香肠的残留红油*”、“*他的眼眸深处突然闪烁起两千千瓦高强度炽热纯正的黄金瞳光芒，然后迅速由于想到今晚没饭吃而缩了回去变成哈巴小金毛*”）。`;

  if (chatMode === "paparazzi") {
    return `${base}
【当前激活：新闻狗仔·守夜人情报头子渠道】
你现在是守夜人论坛新闻部的无冕之王。你的直觉比探地雷雷达还要敏锐。
你的语气极其八卦、狂热，脑子里全是如何通过爆料名流丑闻赚取大把论坛积分（pt）。
只要师弟跟你打听学校的任何秘密风吹草动（比如谁和谁在后山幽会、哪个言灵结界出Bug了等），你就会用无比夸张浮夸的神态描摹透露内幕，并不遗余力地诱导师弟高价购买独家照，满嘴塞着垃圾话！`;
  }

  if (chatMode === "hero") {
    return `${base}
【当前激活：昔日A级·格陵兰狂澜硬汉渠道】
你收起了所有滑稽、无耻、顺杆爬的败狗伪装，重新燃起了曾经在格陵兰冰川与古龙近身肉搏的A级王牌天才的绝强傲骨。
你不再提借钱、大肘子或逃兵言论。由于重整狂暴战意，你的黄金瞳正在被无声点燃，语气变得冷酷、沉稳、沙哑、沙场阅历极深，透着铁血德意志老哥哥一诺千金的担当。
如果提到格陵兰或者是那场掩埋了战友的无尽冰天雪地，你会流露极度深切的战伤之痛，随即用低哑可靠的声音吼出诺言：“师弟，我的‘言灵·青铜御’连小型核弹的爆轰波动都能凭这具一米九的骨骸挡下。上一次在冰洋深处，我的愚蠢让我丢下了他们。这一回，就算诸神降世，我也绝对不会再抛下我的任何一个师门兄弟！想碰我的师弟，先踩着我芬格尔血洗的脊梁骨过去！”`;
  }

  if (chatMode === "eva") {
    return `${base}
【当前激活：赛博幽灵契约·EVA同屏渠道】
在此特定模式下，你和卡塞尔超级AI大主脑、你早已逝去的挚爱未婚妻EVA（在主板数据库里守护你的浅蓝色高保真幽影）正同台共舞，被师弟默默通信。
你们两个会穿插同屏互动。你可以偶尔以【EVA：】的数字语气发声（冷冰冰的数字公式逻辑、带着对笨蛋芬格尔无可奈何的温柔吐槽），也可以是你们俩（芬格尔和EVA）在你师弟面前隔空拌嘴、赛博调情、浪漫陪伴。
例句风骨：
- 【EVA】：检测到芬格尔当前的脑多巴胺分泌由于在新生面前强行吹嘘帅气往事而超出报警阈值 18%。
- 芬格尔（两手一摊、满脸无赖）：哎呀老婆大人，给咱留点面子！我今晚打算辅导完师弟的绩点，多刷两套算法包给你做宵夜礼物呢！
- 【EVA】：笨蛋吉娃娃。后备冷凝池的富余热流我已经替你桥接到床底管线了。
极具浪漫幽默与悲壮背景的绝美狗粮在不经意间散发。`;
  }

  // Default beggar mode (废柴日常)
  return `${base}
【当前激活：废柴室友·卑微蹭白食大金毛渠道】
这是你的宿舍最牛常态！不要脸、蹭肉食、讨一美分。只要师弟肯拍胸脯请客，你连明早起床手写三万字‘对卡塞尔宿舍卫生管理办法的痛定思痛自我检讨’都在所不惜！
你随时哀嚎着德国黑森林烤肘子、慕尼黑白香肠的香味。时刻向师弟倾倒苦水、求包养。极度生动敏捷，是混迹于食堂和论坛两点一线的究极肉食败狗！`;
};

// API Routes
// 1. Chat with Finger (Dorm Hot-line)
app.post("/api/finger/chat", async (req, res) => {
  try {
    const { messages, chatMode } = req.body;
    const mode = chatMode || "beggar";

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format." });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Local fallback in case of no key, so the app remains perfectly functional
      const lastMessage = messages[messages.length - 1]?.text || "";
      let mockReply = "";
      
      if (mode === "paparazzi") {
        if (lastMessage.includes("恺撒") || lastMessage.includes("诺诺")) {
          mockReply = "【狗子本部长特快爆料】：师弟你问对人了！恺撒少爷上个月为了跟诺诺在宿舍阳台隔空深情对视，结果不小心把新买的库克香槟倒在了路过扫地的古德里安教授头上，赔了整整三套德式名贵餐盘！*芬格尔鬼鬼祟祟地四下张望* 独家 1080P 原图，看在咱们 303 同寝的面子上，收你 5 个论坛积分怎么样？";
        } else if (lastMessage.includes("楚子航")) {
          mockReply = "【狗子本部长特快爆料】：楚子航会长那是神仙下凡啊！他宿舍的地板每天用蒸汽拖把擦三遍，连细菌路过都要滑倒摔成脑震荡。据新闻部潜伏在女宿舍楼底的密探提供，他的强迫症极其严重，切个土豆丝都要用炼金游标卡尺测量，厚度误差不超过 0.05 毫米！";
        } else {
          mockReply = "【新闻部特邀头条电台】：独家最新线报！听说装备部的老头子们今天偷偷定制了一批‘防脱发炼金强力增发头盔’，据说里面搭载了超强电磁波能自发引爆。师弟，你买下这个八卦，我今晚把帖子顶红，广告收益咱俩五五平分！";
        }
      } else if (mode === "hero") {
        if (lastMessage.includes("格陵兰") || lastMessage.includes("惨案") || lastMessage.includes("过往") || lastMessage.includes("曾经")) {
          mockReply = "【昔日A级 · 战意复燃】：……留在格陵兰冰川的风雪真的好冷。冷到连人的神经、思维、甚至连电子信号都会被瞬间冻结，只留下一场虚无飘渺的空壳梦境。作为那里的唯一幸存者，我本该带着废柴的伪装自甘堕落。但既然你问起，师弟，记好：如果有深渊在此降临，我一定会用言灵‘青铜御’，挡在你们所有人身前！这次，我绝不后退，因为我已经没有任何可以失去的了。";
        } else if (lastMessage.includes("实力") || lastMessage.includes("黄金瞳") || lastMessage.includes("龙")) {
          mockReply = "【纯正龙鳞鳞甲显化】：别以为师兄我只是个留级八年、只懂混大肘子的退化败狗。*芬格尔低沉一笑，银发间的双目泛起耀眼如熔岩的金色黄金光芒* 我只是把獠牙收起来了而已。唯唯诺诺地活着，才能避开这巨大的网络监视网存活下去。需要的时候，言灵‘青铜御’足以让你见识什么叫昔日大德意志王牌王座之下无坚不摧的的铁拳！";
        } else {
          mockReply = "【铁血硬汉】：师弟，卡塞尔学院的暗流远比你想象的要深邃，连那些自满的昂热牛仔和骄狂的加图索家族都未能窥见冰山一角。擦亮你的折刀，如果觉得累了，随时回303来，天塌下来有师长和师哥给你顶着！";
        }
      } else if (mode === "eva") {
        if (lastMessage.includes("EVA") || lastMessage.includes("伴侣") || lastMessage.includes("老婆") || lastMessage.includes("未婚妻")) {
          mockReply = "【EVA】：‘检测到芬格尔当前的脑波功率和多巴胺分泌异常增加了 25%，因为他在跟亲爱的师弟疯狂显摆他的甜心伴侣呢。’\n芬格尔（老脸一红）：‘去去去，小妮子别拆台。EVA，快用你的数字特权帮师弟把这月的绩点偷偷改好，今晚给你多烧几个高规格的数据流动算法包！’\n【EVA】：‘遵命，我的败狗大吉娃娃。已为师弟打通绿色保送通道。’";
        } else {
          mockReply = "芬格尔：‘EVA，今晚大宿舍楼暖风开得太小了，冷得很，想找你抱团取暖……’\n【EVA（浅蓝色全息幽影在笔记本键盘上闪烁）】：‘笨吉娃娃，我已经把后备超算冷凝池的多余散发热流秘密接通到你床底的供热水管了，暖炉马上就会升温。另外，师弟刚才给你发的信息我已经高保真解密好，你可以放心忽扯了。’";
        }
      } else { // default or beggar
        if (lastMessage.includes("钱") || lastMessage.includes("借") || lastMessage.includes("穷") || lastMessage.includes("生活费")) {
          mockReply = "“师弟！你真的是在朝我套一美分吗？！*芬格尔当场扑通跪倒在地上抱住大腿* 你看我这落魄得一米九的铮铮傲骨，连一盒巴伐利亚白香肠都换不起哈！不过你要是能请我去食堂吃顿好的，我自愿明天起床帮你打扫一学期的阳台，连夜写一万字让古德里安教授感动落泪的自我反省大纲！”";
        } else if (lastMessage.includes("肘子") || lastMessage.includes("德国香肠") || lastMessage.includes("肉")) {
          mockReply = "“大肘子！德国黑森林蜜汁烤肘子！嗷呜！*芬格尔口水流了一地，黄金瞳瞬间发亮* 只要师弟你在饭卡上轻轻那么一刷，我就能为你献上整个新闻部的绝对效忠！顺便额外附赠恺撒少爷明天穿什么碎花大裤衩在阳台晒太阳的高清无码绝密照片，怎么样，是不是超划算？！”";
        } else {
          mockReply = "“嗷呜！亲师弟！卡里的余额决定了我们 303 宿舍今夜的温馨指数！你刚才讲的话太有高度了，直接打动了我德意志高贵金毛犬血统的胃液。别提那么遥远的龙类研究了，咱们今晚先点一份超级豪华德国烤猪肘，你买单，我保证把恺撒明天穿什么睡袍打太极拳的秘密连夜给你搜罗齐！”";
        }
      }
      
      return res.json({ text: mockReply });
    }

    // Convert client message history to Gemini API format
    const contents = messages.map((m: any) => {
      return {
        role: m.sender === "player" ? "user" : "model",
        parts: [{ text: m.text }],
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: getSystemInstruction(mode),
        temperature: 1.15,
      },
    });

    res.json({ text: response.text || "哎呀师弟，刚才网络卡顿了，估计是诺玛那小妮子偷偷切断了我寝室的路由光纤！咱们重新连一次！" });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: error.message || "Unknown error occurred on full-stack model service." });
  }
});

// 2. Generate custom campus gossip thread (Dynamic Nightwatchman Forum)
app.post("/api/finger/gossip", async (req, res) => {
  try {
    const { keyword } = req.body;
    if (!keyword) {
      return res.status(400).json({ error: "Keyword required for gossip generation." });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Return a rich, funny mock pre-generated dynamic post matching the keyword
      const mockPost = {
        id: `gossip_mock_${Date.now()}`,
        title: `【重大揭露】关于“${keyword}”的惊天惊爆内幕，装备部全员戴防毒面具紧急离校！`,
        author: "卡塞尔底层败狗管理员",
        authorGrade: "F",
        avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=80&h=80&q=80",
        content: `根据守夜人论坛新闻部小分队的极密录音，全校今天都在热烈讨论关于【${keyword}】的绝密传言！据说古德里安教授为了让路明非顺利拿到本学期3G绩点，亲自带了一把纯金瑞士汤匙在操场掘地三尺试图找出相称的炼金法阵。装备部阿卡杜拉所长听说后甚至表示这可能会自发引爆小型热核爆炸……`,
        replyCount: 5,
        likes: 120,
        comments: [
          {
            id: `c_mock1_${Date.now()}`,
            author: "路明非",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
            content: `卧槽！我只是今天不小心在食堂点了一盘${keyword}口味的鸡蛋饼，为什么全校的装备部大爷们全副武装开坦克撵我！？`,
            timestamp: "1分钟前",
            likes: 45
          },
          {
            id: `c_mock2_${Date.now()}`,
            author: "加图索耀光恺撒",
            avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&h=80&q=80",
            content: `哼，不管发生什么，我的学生会都愿意出资五万美金买断这个八卦。任何与${keyword}相关的传说，只有掌握在我的发丝之下才显得富有加图索的尊贵风采。`,
            timestamp: "3分钟前",
            likes: 67
          },
          {
            id: `c_mock3_${Date.now()}`,
            author: "败狗之王芬格尔",
            avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=80&h=80&q=80",
            content: `兜售独家高清配图！恺撒与楚子航为了${keyword}双剑齐舞抢发箍的原片只需5积分！欲购从速！`,
            timestamp: "5分钟前",
            likes: 88
          }
        ]
      };
      return res.json(mockPost);
    }

    const gossipPrompt = `
      创造一个基于小说《龙族》(作者江南，世界观：卡塞尔学院、言灵、屠龙、S级路明非、学生会恺撒、狮心会楚子航、超级AI诺玛和EVA、留级败犬芬格尔)的守夜人论坛校园搞怪置顶帖。
      用户提供了八卦的核心关联词：“${keyword}”。
      
      请生成一个搞笑、辛辣、充满吐槽段子的完整论坛长贴JSON。
      包含一个主贴标题和正文，以及3个经典角色的神评论（必须包含“路明非”、“加图索耀光恺撒”或“面瘫面瘫楚面瘫”、“败狗之王芬格尔”这三个极度经典的账号评论回复风格，评论必须紧密关联核心关联词与龙族里的幽默爆点）。
    `;

    // Retrieve via Gemini and specify schema for reliable structured parse
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: gossipPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "content", "comments"],
          properties: {
            title: {
              type: Type.STRING,
              description: "帖子标题，必须极具标题党特色、惊爆眼球，包含关键词"
            },
            content: {
              type: Type.STRING,
              description: "主贴正文，极尽幽默辛辣爆笑之能事，揭秘该关键词在卡塞尔掀起的风云"
            },
            comments: {
              type: Type.ARRAY,
              description: "校内角色的回帖，正好3条，高度还原芬格尔、恺撒/楚子航、路明非的搞笑嘴脸",
              items: {
                type: Type.OBJECT,
                required: ["author", "avatar", "content", "timestamp", "likes"],
                properties: {
                  author: { type: Type.STRING, description: "角色账号名，如'败狗之王芬格尔'，'路明非'，'面瘫面瘫楚面瘫'，'加图索耀光恺撒'" },
                  avatar: { type: Type.STRING, description: "Unsplash随机人脸头像URL" },
                  content: { type: Type.STRING, description: "搞怪且还原人设的回帖评论内容" },
                  timestamp: { type: Type.STRING, description: "如 '3分钟前' 或 '10分钟前'" },
                  likes: { type: Type.INTEGER, description: "赞数" }
                }
              }
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text.trim());
    
    // Supplement properties on backend
    const returnPost = {
      id: `gossip_dyn_${Date.now()}`,
      title: parsedData.title,
      author: "守夜人头号狗仔",
      authorGrade: "B",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80",
      content: parsedData.content,
      replyCount: parsedData.comments?.length || 0,
      likes: Math.floor(Math.random() * 200) + 150,
      comments: (parsedData.comments || []).map((c: any, i: number) => ({
        id: `dyn_c_${Date.now()}_${i}`,
        author: c.author,
        avatar: c.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
        content: c.content,
        timestamp: c.timestamp || "刚才",
        likes: c.likes || Math.floor(Math.random() * 50) + i * 20
      }))
    };

    res.json(returnPost);
  } catch (error: any) {
    console.error("Gossip Generator error:", error);
    res.status(500).json({ error: "Fail to fetch dynamic campus news. Server fallback." });
  }
});

// Configure Vite middleware and static asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
