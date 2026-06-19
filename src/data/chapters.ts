/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StoryNode, BulletComment } from "../types";

export const INITIAL_STORY_NODE_ID = "c1_intro";

export const STORY_NODES: Record<string, StoryNode> = {
  // === CHAPTER 1: 废柴宿舍的破晓 ===
  "c1_intro": {
    id: "c1_intro",
    chapterId: "chapter1",
    title: "第一章：废柴宿舍中的1.9米巨兽",
    text: "你提着沉重的复古皮箱，在卡塞尔学院3号大宿舍楼的走廊尽头停下。门牌号写着“303”。作为刚刚入学、血统被评定为C级的普通新生，你感到既忐忑又有些兴奋。据说你的室友是一个‘留级八年、退化到F级’的传奇。当你用力推开老旧的橡木门——",
    narrator: "我",
    backgroundImage: "dorm_view",
    choices: [
      {
        id: "c1_intro_opt1",
        text: "“打扰了！我是新来的，请多关照！”（礼貌敲门）",
        nextId: "c1_meet_finger",
        favorabilityChanges: { finger: 5 },
        pointsChange: 10
      },
      {
        id: "c1_intro_opt2",
        text: "直接踹开门，大喊：“芝麻开门！屠龙斗士闪亮登场！”",
        nextId: "c1_meet_finger_kick",
        favorabilityChanges: { finger: 15 }, // Finger likes crazy juniors
        pointsChange: 20
      }
    ]
  },
  "c1_meet_finger": {
    id: "c1_meet_finger",
    chapterId: "chapter1",
    text: "迎面扑来的是一股夹杂着老坛酸菜、红牛、隔夜德国烤猪肘，以及极度缺乏日照的‘死宅酸腐味’。在废纸堆、臭袜子和几百个空易拉罐堆积的‘高山’深处，一个身高一米九、顶着一头乱蓬蓬银灰色碎发的壮汉正趴在电脑前。他转过头，一双发着贼光的眼睛将你上下打量个遍，然后露出极度谄媚也极为贱萌的笑容。",
    narrator: "我",
    backgroundImage: "dorm_dust",
    choices: [
      {
        id: "c1_meet_opt1",
        text: "“那个……师兄，请问你是传说中的芬格尔吗？”",
        nextId: "c1_finger_self_intro"
      },
      {
        id: "c1_meet_opt2",
        text: "默默地退回走廊，抬头看看门牌，确认自己没进垃圾分类处理厂。",
        nextId: "c1_finger_chase_out",
        favorabilityChanges: { finger: -5 },
        pointsChange: 5
      }
    ]
  },
  "c1_meet_finger_kick": {
    id: "c1_meet_finger_kick",
    chapterId: "chapter1",
    text: "“我靠！路明非第二出现了吗？！”庞大的黑影由于受到惊吓，直接从椅子上翻滚了下来。他在垃圾堆里痛苦挣扎了半天，才抓着一个空的品客薯片罐子爬起来。银发乱舞的他，满脸写着‘惊恐中透露着贪婪’，指着你手中的纯牛皮行李箱：“太嚣张了……师弟！不，你一定是拥有纯正S级血统的大财主！看这奢华的牛皮箱！快，里面有没有带什么吃的？榨菜也行，师兄已经饿了三天了！”",
    narrator: "系统",
    backgroundImage: "dorm_dust",
    choices: [
      {
        id: "c1_kick_opt1",
        text: "掏出一包康师傅红烧牛肉面塞给他：“师兄，见面礼，莫嫌弃。”",
        nextId: "c1_instant_noodle_bond",
        favorabilityChanges: { finger: 20 },
        pointsChange: 50
      },
      {
        id: "c1_kick_opt2",
        text: "义正言辞：“没有吃的，只有两本《屠龙纲要》和一颗红心！”",
        nextId: "c1_guderian_warning",
        favorabilityChanges: { finger: -2 }
      }
    ]
  },
  "c1_finger_self_intro": {
    id: "c1_finger_self_intro",
    chapterId: "chapter1",
    text: "那巨大的黑影一把扔开鼠标，以与他庞大身躯极不相称的敏捷飞扑过来，握住你的手疯狂摇晃，眼泪哗哗直掉：“呜呜呜！上帝终于想起我这个被遗忘在303的败狗了吗？师弟！我是你亲爱的八年老学长、新闻部部长、兼卡塞尔学院倒数第一的废品守护者——芬格尔·冯·弗林斯！叫我废柴师兄就行！听说你是C级？太好了，我们是天造地设的废柴双星啊！”",
    narrator: "芬格尔",
    backgroundImage: "dorm_clasp",
    choices: [
      {
        id: "c1_self_intro_opt1",
        text: "“咳咳，师兄，我这里有一盒原本打算自己留着宵夜的德式冷切盘……”",
        nextId: "c1_sausage_god",
        favorabilityChanges: { finger: 25 },
        pointsChange: 80
      },
      {
        id: "c1_self_intro_opt2",
        text: "“既然咱们都是废柴，那先谈谈宿舍卫生的划分问题怎么样？”",
        nextId: "c1_hygiene_treaty",
        favorabilityChanges: { finger: -10 }
      }
    ]
  },
  "c1_finger_chase_out": {
    id: "c1_finger_chase_out",
    chapterId: "chapter1",
    text: "你刚退回走廊半步，一双毛茸茸的、肌肉却极为紧实的大手就精准地箍住了你的肩膀，生生把你‘提’回了房间。芬格尔像一只幽怨的巨型金毛犬，歪着脑袋看你：“别走啊我的小肥羊……啊不，我的好师弟！卡塞尔的宿舍都是随机分配的，这说明咱们是命中注定的‘父子纽带’啊。来来来，喝杯师兄泡的新生特供‘高纯度强化试剂’（明显是自来水加了橘子粉），只要一美金！”",
    narrator: "芬格尔",
    backgroundImage: "dorm_chase",
    choices: [
      {
        id: "c1_chase_opt1",
        text: "叹了口气，递过一张1美元，顺便仰头喝干橘子水。",
        nextId: "c1_scam_success",
        favorabilityChanges: { finger: 15 },
        pointsChange: -10
      },
      {
        id: "c1_chase_opt2",
        text: "“不喝！除非你告诉我，守夜人论坛上恺撒和楚子航的八卦哪来的。”",
        nextId: "c1_gossip_deal",
        favorabilityChanges: { finger: 10 },
        pointsChange: 20
      }
    ]
  },
  "c1_instant_noodle_bond": {
    id: "c1_instant_noodle_bond",
    chapterId: "chapter1",
    text: "芬格尔极其激动，甚至忘了去撕阻燃料包，直接连面带水疯狂撕咬，一边吃一边发出赞叹的狼嚎：“呜呜！就是这个熟悉的老坛酸菜！辣味！还有这个酸爽！师弟，从今天起，你就是303唯一指定合伙人、第一秩序继承人、我芬格尔罩着的亲兄弟！谁要是敢在卡塞尔欺负你，恺撒不行，楚子航不行，连隔壁养拉布拉多的装备部老头子们都不行！”",
    narrator: "芬格尔",
    backgroundImage: "eating_noodle",
    choices: [
      {
        id: "c1_noodle_opt1",
        text: "“师兄客气了，以后论坛有什么劲爆八卦记得带带我。”",
        nextId: "c1_midnight_raid_intro",
        pointsChange: 100
      },
      {
        id: "c1_noodle_opt2",
        text: "“那么威风，那古德里安教授这周的‘3G考试辅导’能帮我漏个题吗？”",
        nextId: "c1_leaking_paper",
        favorabilityChanges: { finger: 12 }
      }
    ]
  },
  "c1_scam_success": {
    id: "c1_scam_success",
    chapterId: "chapter1",
    text: "芬格尔双眼放光，迅速把你的1美元硬币扔进他的空易拉罐里，发出丁零当啷的响声。他满意地拍拍屁股坐回椅子：“上道！懂规矩！师弟，告诉你一个惊天秘闻：古德里安那个老顽童正提着他的银质手电筒、领着路明非朝303来了！说是要突击检查‘新生的适应情况与宿舍文明风貌’！要是让他看到这满地废纸，估计咱们的新生补贴都要泡汤啊！”",
    narrator: "芬格尔",
    backgroundImage: "guderian_comming",
    choices: [
      {
        id: "c1_scam_opt1",
        text: "惊恐：“那还等什么！赶紧打扫啊，师兄你搬易拉罐，我拖地！”",
        nextId: "c1_clean_dorm",
        favorabilityChanges: { finger: -5 }
      },
      {
        id: "c1_scam_opt2",
        text: "冷静：“既然如此，咱们就把大门锁死，装作受到‘不可名状的龙类精神催眠’陷入沉睡，顺便索要精神损失费。”",
        nextId: "c1_blackmail_prof",
        favorabilityChanges: { finger: 25 },
        pointsChange: 150
      }
    ]
  },
  "c1_gossip_deal": {
    id: "c1_gossip_deal",
    chapterId: "chapter1",
    text: "芬格尔突然面露贼笑，竖起肥胖的食指左右晃动：“哟，师弟消息灵通啊。竟然知道守夜人论坛（Nightwatchman Forum）是由我这个万年败狗代理管辖的？那些猛料当然是新闻部的走狗……不对，勤劳的小记者们蹲点拍到的。比如恺撒昨晚在温泉度假村的睡衣照，还有楚子航不小心切土豆切出完美的‘八卦阵图’……这样，咱们做个交易。你出资两箱猪肘拉格啤酒，我分你论坛一级管理权限！”",
    narrator: "芬格尔",
    backgroundImage: "deal_gossip",
    choices: [
      {
        id: "c1_gossip_opt1",
        text: "“没问题，拉格啤酒，包在我身上！”",
        nextId: "c1_midnight_raid_intro",
        favorabilityChanges: { finger: 30 },
        pointsChange: 120
      },
      {
        id: "c1_gossip_opt2",
        text: "“拉倒吧，师兄，在空易拉罐里塞假币你当我没看见呢。”",
        nextId: "c1_guderian_warning",
        favorabilityChanges: { finger: 3 }
      }
    ]
  },
  "c1_sausage_god": {
    id: "c1_sausage_god",
    chapterId: "chapter1",
    text: "“我勒个去！黑森林火腿、法兰克福香肠，还有巴伐利亚白肉！？神迹！这是奥丁下凡、耶和华显灵啊！”芬格尔以光速扑倒在你的冷切盘前，抓起香肠就往嘴里狂塞。他一边大嚼、一边用拳头激动地砸着胸口，发出含混不清的豪言：“弟！你就是我亲异父异母的骨肉同胞！什么狗屁恺撒加图索，他送狮子座金币有我兄弟这盘红彤彤的香肠温暖人心吗！？等我吃饱了，我们就去‘守夜人论坛’开辟一个新贴，把恺撒那厮上个月‘表白诺诺失败、独自在湖边喂蚊子’的内幕高价出售！”",
    narrator: "芬格尔",
    backgroundImage: "eating_sausage",
    choices: [
      {
        id: "c1_sausage_opt1",
        text: "大喜过望：“太棒了！师兄带我飞，去守夜人论坛发帖挣积分！”",
        nextId: "c1_midnight_raid_intro",
        pointsChange: 200
      },
      {
        id: "c1_sausage_opt2",
        text: "心中窃喜：“（真是便宜……一盘香肠就收编了这个1.9米的跟班）。”",
        nextId: "c1_midnight_raid_intro",
        favorabilityChanges: { finger: 10 }
      }
    ]
  },
  "c1_hygiene_treaty": {
    id: "c1_hygiene_treaty",
    chapterId: "chapter1",
    text: "芬格尔发出一声极其凄厉的惨叫，连连后退，护住自己的垃圾易拉罐，像极了被恶霸强娶的娇弱黄花大闺女：“卫生？！师弟！你知不知道在这个由‘言灵·青铜御’和‘万物静默’统治的高危校园里，这些易拉罐是我用生命堆砌出的防弹屏障啊！还有这些袜子……它们独特的芬芳可以极大地震慑潜在的龙族入侵者！你居然一上来就想剥夺我的领土主权吗！？”",
    narrator: "芬格尔",
    backgroundImage: "dorm_clash",
    choices: [
      {
        id: "c1_hygiene_opt1",
        text: "“好吧……那易拉罐不准越过这条中线，多出来的必须扔掉！”",
        nextId: "c1_guderian_warning",
        favorabilityChanges: { finger: 5 }
      },
      {
        id: "c1_hygiene_opt2",
        text: "“这味太冲了，师兄你信不信我告诉古德里安教授你在阳台私藏违禁酒类？”",
        nextId: "c1_blackmail_success",
        favorabilityChanges: { finger: -12 },
        pointsChange: 80
      }
    ]
  },
  "c1_guderian_warning": {
    id: "c1_guderian_warning",
    chapterId: "chapter1",
    text: "就在你们为了宿舍边界线和易拉罐争得不可开交时，门外的走廊传来一阵凌乱而沉重的脚步声，伴随着古德里安教授标志性的公鸭嗓门：“路明非，你看这里的橡木雕花，这都是卡塞尔建校时德式城堡的传统……303宿舍就在前面，这里住着新来的好苗子，还有芬格尔那个混账！我们必须给他来个措手不及！” 芬格尔脸色瞬间蜡黄，朝你使了个‘世界末日要来咱们得统一战线’的绝顶眼色。",
    narrator: "古德里安教授",
    backgroundImage: "dorm_dust",
    choices: [
      {
        id: "c1_warning_opt1",
        text: "“师兄，咱们赶紧在3秒内用被单遮盖垃圾山！”",
        nextId: "c1_trap_guderian",
        favorabilityChanges: { finger: 15 }
      },
      {
        id: "c1_warning_opt2",
        text: "主动开门拉踩：“教授！芬格尔师兄把这儿改成了垃圾回收厂，还朝我兜售1美金橘子水，救命啊！”",
        nextId: "c1_betray_finger",
        favorabilityChanges: { finger: -25 },
        pointsChange: 150
      }
    ]
  },
  "c1_blackmail_success": {
    id: "c1_blackmail_success",
    chapterId: "chapter1",
    text: "“我靠！你真是披着羊皮的狼，不，你是披着龙皮的小魔鬼啊！”芬格尔一副牙齿咬碎、悲愤交加的样子。他颤抖地掏出手机指指点点：“行行行，算你狠！师兄我这辈子的终极软肋就是不想再写五万字的自我反省报告了。我让诺玛把你的选课绩点偷偷往上微调0.1，外加封你为守夜人论坛‘闲聊群主’，这总可以了吧！快把威胁我的教授撤回去！”",
    narrator: "芬格尔",
    backgroundImage: "phone_view",
    choices: [
      {
        id: "c1_black_opt1",
        text: "满意地笑笑：“合作愉快，师兄。”",
        nextId: "c1_midnight_raid_intro",
        pointsChange: 150
      }
    ]
  },
  "c1_finger_chase_out_die": {
    id: "c1_finger_chase_out_die",
    chapterId: "chapter1",
    text: "芬格尔一把拖住你的拉杆箱不放，整个人甚至绝望地平铺在地板上，发挥出1.9米无赖的最高境界：“师弟！你不能走！你走了，下学期的冷切拼盘谁来买单？新闻部被裁员的补贴谁来赞助？我就是你人生中的指路明灯啊！不信你随便问我一个龙族弱点，我答不上来就改跟你姓！”",
    narrator: "芬格尔",
    backgroundImage: "dorm_clasp",
    choices: [
      {
        id: "c1_chase_die_opt1",
        text: "“好吧。那青铜玛雅神庙底下的初代种叫什么名字？”",
        nextId: "c1_quiz_dragon"
      },
      {
        id: "c1_chase_die_opt2",
        text: "趁他趴在地上，用力抽出行李箱，大踏步走向守夜人论坛发帖控诉。",
        nextId: "c1_midnight_raid_intro",
        favorabilityChanges: { finger: -15 }
      }
    ]
  },
  "c1_quiz_dragon": {
    id: "c1_quiz_dragon",
    chapterId: "chapter1",
    text: "芬格尔卡壳了三秒，眼珠疯狂打转，然后信誓旦旦地一拍巴掌：“废话！那当然是著名的、伟大的、长了三个脑袋的‘玛雅无敌金刚大飞龙’！……喂喂，别用看弱智的眼神看着我嘛，师兄可是八年抗战的元老，要谈实战，我当年在格陵兰冰原上跟三代种近身肉搏的时候，路明非都还在婶婶家玩橡皮泥呢！真的不骗你，那场冰雪里的遭遇战……” 他的眼神在说出“格陵兰”三个字时，突然毫无征兆地黯淡了一下，拳头也微微攒紧。",
    narrator: "芬格尔",
    backgroundImage: "sad_finger",
    choices: [
      {
        id: "c1_quiz_opt1",
        text: "（捕捉到他的悲伤）“师兄，不好意思，是我开玩笑过头了。咱们不聊考试了，我床头有瓶啤酒，咱们喝一杯。”",
        nextId: "c1_beer_comfort",
        favorabilityChanges: { finger: 35 },
        pointsChange: 100
      },
      {
        id: "c1_quiz_opt2",
        text: "吐槽：“玛雅金刚大飞龙？怎么不叫暴龙兽！差评，不合格，走人！”",
        nextId: "c1_midnight_raid_intro",
        favorabilityChanges: { finger: -10 }
      }
    ]
  },
  "c1_beer_comfort": {
    id: "c1_beer_comfort",
    chapterId: "chapter1",
    text: "芬格尔一愣，那转瞬即逝的落寞瞬间被他一成不变的厚脸皮、贱萌大笑死死掩盖了过去。他一把劈手夺过你的啤酒，单手咬开瓶盖仰头狂灌：“嗷呜！爽快！师弟，既然你有此孝心，那我的悲痛回忆就被这醇厚的麦芽汁完全治愈了！以后谁敢在学校背后嘀咕你，我直接在‘守夜人论坛’写十篇通告黑死他！来，既然古德里安那老头还没来，师弟，我带你见识见识咱们卡塞尔的秘密核心——守夜人论坛的编辑后台！”",
    narrator: "芬格尔",
    backgroundImage: "eating_sausage",
    choices: [
      {
        id: "c1_beer_opt1",
        text: "“走！看看师兄你是怎么在网上呼风唤雨的！”",
        nextId: "c1_midnight_raid_intro"
      }
    ]
  },
  "c1_trap_guderian": {
    id: "c1_trap_guderian",
    chapterId: "chapter1",
    text: "伴随着在最后0.5秒铺上的脏床单，古德里安教授一脚踏进门来。结果，这位精神处于极度亢奋中的老教授脚底一滑，极其精准地踩中了一枚芬格尔没喝完又放在床单下的德国拉格啤酒罐！‘哐当！’，教授在空中完成了一个极其飘逸的180度螺旋，直挺挺摔在了那堆垃圾山上，发出一长串德语谩骂：“芬格尔！！你这个叛逆的败狗——你在宿舍安装炸弹吗！？” 满头树叶和易拉罐拉环的路明非在一旁瑟瑟发抖，狂朝你赔礼道歉。",
    narrator: "系统",
    backgroundImage: "guderian_comming",
    choices: [
      {
        id: "c1_trap_opt1",
        text: "拼命帮腔：“教授！是这样，昨晚有不知名的黑影入侵想要盗取龙王遗迹图纸，被我们舍身击退，这是战壕啊！”",
        nextId: "c1_scam_guderian_success",
        favorabilityChanges: { finger: 30 },
        pointsChange: 150
      },
      {
        id: "c1_trap_opt2",
        text: "老实巴交：“都是芬格尔师兄强迫我踩炸弹的……”",
        nextId: "c1_betray_finger",
        favorabilityChanges: { finger: -30 }
      }
    ]
  },
  "c1_scam_guderian_success": {
    id: "c1_scam_guderian_success",
    chapterId: "chapter1",
    text: "“龙王遗迹图纸！？入侵者！？”古德里安教授在芬格尔惊天动地的痛哭与你声泪俱下的‘汇报’中居然彻底恍惚了。他捂着腰站起来，金丝眼镜掉在鼻尖上：“真……真的有这么危险的潜伏战斗发生吗！？哎呀！好孩子！你们受委屈了，我这就跟校长申请给你们每人记一个‘突发事件A级防卫功勋’！芬格尔，真没想到你关键时刻没有拖后腿，很好，这周的打扫就不罚你了，给你记零个大过！” 芬格尔在一旁死命咬着被角，肩膀剧烈颤抖，都快憋出内伤了。",
    narrator: "古德里安教授",
    backgroundImage: "guderian_comming",
    choices: [
      {
        id: "c1_guderian_success_opt1",
        text: "送走教授，跟芬格尔痛快击掌：“绝配，师兄，下一次论坛搞事咱们走起！”",
        nextId: "c1_midnight_raid_intro",
        pointsChange: 100
      }
    ]
  },
  "c1_betray_finger": {
    id: "c1_betray_finger",
    chapterId: "chapter1",
    text: "“混账——！芬格尔！你不仅自己不求上进，竟然还带坏我们好苗子！把新来的C级新生当作廉价劳动力和橘子粉推销对象！”古德里安教授的大皮鞋愤怒地砸着地板，把芬格尔塞进易拉罐里的硬币震得稀里碎。芬格尔像一尊失去灵魂的灰白色雕像，跪倒在床头，用无比怨念、凄惨可怜的苦瓜脸看着你。他泪目长叹：“天亡我也……落井下石啊师弟！我记住了，你就是我这一辈子的终极克星！”",
    narrator: "芬格尔",
    backgroundImage: "sad_finger",
    choices: [
      {
        id: "c1_betray_opt1",
        text: "“对不起师兄，为了我的新生奖学金，你还是一个人抗下所有吧！”",
        nextId: "c1_midnight_raid_intro",
        pointsChange: 80
      }
    ]
  },
  "c1_blackmail_prof": {
    id: "c1_blackmail_prof",
    chapterId: "chapter1",
    text: "你跟芬格尔在三分钟内迅速制定出‘装疯卖傻狂骗经费特种联盟计划’。古德里安开门的一瞬间，只见你和芬格尔紧紧搂抱在一块，两人的眼眶都用自来水彻底打湿，全身由于‘恐惧’而剧烈痉挛。芬格尔指着吊灯大喊：“别过来！别让那一对神圣的黄金瞳凝视我！教授！那是格陵兰冰川回来的尼伯龙根……！我的血统正在燃烧！师弟正在被奥丁精神操纵！” 你则恰到好处地口吐白沫、在垃圾山中打滚。这极其逼真的‘龙王言灵余波综合症’把古德里安吓得魂飞魄散，连忙让路明非掏出急救镇静剂。",
    narrator: "系统",
    backgroundImage: "dorm_dust",
    choices: [
      {
        id: "c1_blackmail_prof_opt1",
        text: "（成功拿到学术特支费100刀）“师兄，这就叫一加一大于二！”",
        nextId: "c1_midnight_raid_intro",
        favorabilityChanges: { finger: 35 },
        pointsChange: 200
      }
    ]
  },
  "c1_leaking_paper": {
    id: "c1_leaking_paper",
    chapterId: "chapter1",
    text: "芬格尔突然神秘地笑起来，凑近你的耳朵。他的笑容在屏幕微弱灯光的映照下，变得既贪心又带着一种老奸巨猾的敏锐：“泄露题？那太没追求了！你当师兄这八年饭是白干的吗？在这个学校，连AI女秘书诺玛（Norma）每天晚上吃几度电、在哪家服务器塞了校长的高清马赛克照我都一清二楚！既然你想在3G入学测试上拿个漂亮成绩，听好了，去守夜人论坛，有一个秘密匿名账户叫‘EVA’，她会在后台直接把你带入主考室。” 提起‘EVA’，他的音调突然变得无比轻柔、像是呼唤最深爱的生灵。",
    narrator: "芬格尔",
    backgroundImage: "sad_finger",
    choices: [
      {
        id: "c1_leaking_opt1",
        text: "“EVA？她究竟是谁？和诺玛是什么关系？”",
        nextId: "c1_eva_tease",
        favorabilityChanges: { finger: 20 }
      },
      {
        id: "c1_leaking_opt2",
        text: "“明白了。等下我就去论坛找那个账号留言！”",
        nextId: "c1_midnight_raid_intro",
        pointsChange: 150
      }
    ]
  },
  "c1_eva_tease": {
    id: "c1_eva_tease",
    chapterId: "chapter1",
    text: "芬格尔那张向来毫无正经、只会嘻嘻哈哈的脸，在这一刻像是覆盖上了一层冰霜。他沉默地敲打着键盘，过了很久才咧嘴一笑，虽然笑里全是苦涩：“EVA啊……她就是个住在主板里的孤魂野鬼。爱吃论坛积分，性格古怪得很，但谁要是欺负我，她可是能把卡塞尔所有自动贩卖机全部锁定、或者把凯撒的学生信用卡瞬间刷爆的哟。走啦走啦！带你去主神论坛看看，今天全校都在等一条劲爆八卦！”",
    narrator: "芬格尔",
    backgroundImage: "sad_finger",
    choices: [
      {
        id: "c1_eva_tease_opt1",
        text: "“听起来像是超级女黑客……走！搞事情去！”",
        nextId: "c1_midnight_raid_intro"
      }
    ]
  },

  // === CHAPTER 1.5: 深夜食堂之德国大肘子夺还战 ===
  "c1_midnight_raid_intro": {
    id: "c1_midnight_raid_intro",
    chapterId: "chapter1",
    title: "第一.五章：深夜食堂与炼金红外大肘子",
    text: "深夜两点。整个卡塞尔学院在一片寂静的松涛中沉睡，唯有303宿舍的电脑屏幕依然散发着微弱的光。你的肚子在极度饥饿中发出了雷鸣般的惨叫。芬格尔像一头巨型银灰色猎犬一样从床上弹了起来，黄金瞳亮起一抹贼光：“师弟，今晚学院一号食堂新空运了一批由巴伐利亚直接发货的烟熏黑森林大猪肘和法兰克福爆浆大肠！但是，装备部阿卡杜拉那个老疯子最新部署了‘炼金红外红光重力报警枪’，还有特制的声纳电子流机械看门狗。敢不敢跟师兄去干一票深夜食堂突袭大肘子劫案！？”",
    narrator: "芬格尔",
    backgroundImage: "dorm_dust",
    choices: [
      {
        id: "c1_raid_opt1",
        text: "“干了！为了德意志黑森林大肉，今夜化身303深夜忍者小队！”",
        nextId: "c1_raid_infiltration",
        favorabilityChanges: { finger: 25 },
        pointsChange: 50
      },
      {
        id: "c1_raid_opt2",
        text: "“利用100论坛点，请求EVA在天上对食堂报警中控进行降维骇入！”",
        nextId: "c1_raid_eva_hack",
        requiredGrade: "C"
      },
      {
        id: "c1_raid_opt3",
        text: "“怂了，师兄，咱们还是干嚼老坛酸菜泡面吧……”",
        nextId: "c1_raid_flee"
      }
    ]
  },
  "c1_raid_infiltration": {
    id: "c1_raid_infiltration",
    chapterId: "chapter1",
    text: "你和芬格尔套上黑色的冬装外套，像两只黑色的大壁虎般贴着学院草坪的雕像阴影潜行，一路上极其顺利。终于，一号食堂那恢弘的德式拱顶大门出现在眼前。钢化玻璃窗内，一排排挂着的晶莹剔透、肉质紧实、闪烁着黑森林烟熏红光的巨型猪肘在冷荤柜里静静散发着神圣的光泽！但是在它们面前，密密麻麻的火红色炼金激光防射线组成了一面密不透风的‘死亡光墙’。芬格尔咽下一口口水：“我靠，装备部这帮老头心太黑了，防学生跟防古龙入侵似的。师弟，你敏捷高，要不要施展一套‘红外线贴地芭蕾’钻进去？”",
    narrator: "系统",
    backgroundImage: "lobby_view",
    choices: [
      {
        id: "c1_infiltration_opt1",
        text: "“没问题。言灵·青铜御能贴地微调，看我完美翻滚闪避！”",
        nextId: "c1_infiltration_success",
        pointsChange: 150
      },
      {
        id: "c1_infiltration_opt2",
        text: "“师兄你一米九呢，你来负责当肉盾阻断激光，出了警报我抱起肘子就跑！”",
        nextId: "c1_infiltration_shield",
        favorabilityChanges: { finger: -15 }
      }
    ]
  },
  "c1_raid_eva_hack": {
    id: "c1_raid_eva_hack",
    chapterId: "chapter1",
    text: "你果断转账了100论坛积分。一秒钟后，芬格尔的手提电脑在宿舍桌下自动亮起。一抹浅蓝色全息幽影EVA带着嫌弃又无奈的浅笑在屏幕快速闪烁：\n\n【EVA】：‘检测到303两位不法分子试图在体能测试前补充不健康的高热硬质肉食。看在师弟如此诚恳的份上。指令已接通——装备部的一号食堂安防重力激光已被重定向为“全息草坪投射动画”。放手去拿吧，我的笨金毛。’\n\n食堂的红外死光在这一秒瞬间软化变成了喜庆的节日霓虹彩灯！芬格尔两眼放光，一把抱住你的肩膀狂摇：“师弟！你简直是我的天授财神！EVA老婆万岁！走走走，咱们去把冷库一锅端了！”",
    narrator: "系统",
    backgroundImage: "eva_hologram",
    choices: [
      {
        id: "c1_eva_hack_opt1",
        text: "长驱直入：“大肘子！我们来了！”",
        nextId: "c1_raid_feast_triumph",
        pointsChange: 200
      }
    ]
  },
  "c1_raid_flee": {
    id: "c1_raid_flee",
    chapterId: "chapter1",
    text: "你决定苟在寝室。芬格尔像霜打的茄子一样瘫在椅子上，眼泪汪汪地跟你分食一包捏碎了、甚至连阻燃料包都有些泛潮的廉价老坛酸菜方便面：“师弟啊，你跟路明非那个衰仔越来越像了。大好年华，却只配在303闻泡面味，这简直是对德意志贵族味觉细胞的无情折磨！不行，咱们得干点正经买卖，明天必须去守夜人论坛上大造一波恺撒和楚子航的桃色新闻，狠狠刮一波积分来买肘子！”",
    narrator: "芬格尔",
    backgroundImage: "eating_noodle",
    choices: [
      {
        id: "c1_raid_flee_to_forum",
        text: "“有道理，师兄，一盘香肠逼死英雄汉。明天咱们去论坛大捞一笔！”",
        nextId: "chapter2_start"
      }
    ]
  },
  "c1_infiltration_success": {
    id: "c1_infiltration_success",
    chapterId: "chapter1",
    text: "你深吸一口气。在高度集中的注意力之下，你的身体宛若灵猫捕鼠。你一个流畅的侧空翻和贴地滑行，在红色激光束仅有数毫米的虚空缝隙中掠过，裙带翻飞（或者是睡衣飘飘），毫无声息地落到了大冰柜前！钢锁闪烁着冰冷寒光。你抄起拖把铁钩用力一别，‘咔嗒’一声清脆长鸣，冰柜大门应声开启，里面足足六只被德国金牌迷迭香烟熏得通红焦脆、散发着梦幻油脂芳香 of 十几斤重巨大德国肘子正整整齐齐地躺着！芬格尔在窗外大口大口地吸气，双手在窗户玻璃上抠出了几道绝望的白印！",
    narrator: "系统",
    backgroundImage: "lobby_view",
    choices: [
      {
        id: "c1_inf_success_opt1",
        text: "“师兄，接着！一共六个，咱们连皮带骨全包圆了！”",
        nextId: "c1_raid_feast_triumph",
        favorabilityChanges: { finger: 40 },
        pointsChange: 300
      }
    ]
  },
  "c1_infiltration_shield": {
    id: "c1_infiltration_shield",
    chapterId: "chapter1",
    text: "“我靠！你真是我的好师弟啊，居然让一留级八年的空腹残障学长去当你的人肉雷达屏蔽器！”芬格尔咬着牙、抱着头，发出一声极其悲壮的龙吼。他硬生生一脚踏入了红光之中！\n\n‘哔哔哔——！重力感应被阻断！高危侵入！一号食堂即将启动消杀程序！’\n\n刺耳暴烈红灯疯狂闪烁！头顶上，几百个由装备部老疯子研发的‘超高压芥末雾气消杀喷头’当场剧烈喷发！一整箱粘稠、刺鼻、辣度高达十万史高维尔的‘高分子炼金绿芥末泥’劈头盖脸砸在了芬格尔一米九的狗头上！他整张大脸瞬间绿得通亮，泪流成河，被呛得发出野狗般的惨叫。你趁乱抢出一只法兰克福香肠拉罐，拉上惨不忍睹的大师兄在漫天绿雾里捂着口鼻夺路狂逃！",
    narrator: "系统",
    backgroundImage: "dorm_dust",
    choices: [
      {
        id: "c1_shield_fail",
        text: "“咳咳咳！太惨了师兄，好歹咱们捞到了香肠，快撤！”",
        nextId: "chapter2_start",
        pointsChange: 50
      }
    ]
  },
  "c1_raid_feast_triumph": {
    id: "c1_raid_feast_triumph",
    chapterId: "chapter1",
    text: "凌晨三点的303宿舍，此时飘散着卡塞尔建校以来最神圣、最霸道也最浓郁的‘大肘子黑森林香气’！六个巨大肥硕的德国猪肘被摆在垃圾桌中央。芬格尔抓起一个猪肘，以十万头饿狼同时附身的速度疯狂撕咬，油脂沾满了嘴角，吃得双眼直翻白眼、两行热泪混合着狂喜喷涌而出：\n\n“唔喔喔喔！就是这个皮！这个脆爽！这个饱含德意志黑森林阳光和优质橡果的绝顶油脂！师弟……呜呜，我这留级的八年里挨了那么多昂热的白眼 and 施耐德的恐吓，只有今晚，我才真正感觉自己是在德意志的皇座上登基了！你就是守护卡塞尔食堂的暗夜大天使！我的好兄弟！”\n\n你和芬格尔啃着多汁的猪肘，打着饱嗝，感觉神清气爽。但是，芬格尔抹了抹嘴上的油，神色突然又变得非常贼眉鼠眼：“吃饱喝足，咱们该谋划点大的了。一号食堂明早清点一定会发现猪肘失窃！既然装备部阿卡杜拉所长肯定会发飙查水表，咱们干脆把水搅浑——立刻在论坛爆料恺撒和楚子航的惊天假新闻，用他们两人的史诗级爱恨遮盖肘子失窃案！你觉得谁当头条更惹眼？”",
    narrator: "芬格尔",
    backgroundImage: "eating_sausage",
    choices: [
      {
        id: "c1_feast_to_forum",
        text: "“好主意，咱们先下手为强，在论坛兴风作浪，掩人耳目！”",
        nextId: "chapter2_start"
      }
    ]
  },

  // === CHAPTER 2: 守夜人论坛发帖风云 ===
  "chapter2_start": {
    id: "chapter2_start",
    chapterId: "chapter2",
    title: "第二章：守夜人论坛上的第一桶金",
    text: "你和芬格尔并排坐在那块满是指纹的笔记本显示器前，桌面上闪烁着卡塞尔学院校内最大的信息汇聚地——守夜人论坛（Nightwatchman Forum）。论坛置顶帖子极其惹眼：‘学生会主席恺撒宣布明日豪掷十万美金包下游泳馆，举办顶级海滨香槟派对！’ 芬格尔啃了一口你贡献出来的粗黑香肠，坏笑到：“兄弟，新闻部今天预算吃紧，我们得发一条极其劲爆、足以引爆整个卡塞尔的‘惊天桃色谣言’！你想写谁的？”",
    narrator: "芬格尔",
    backgroundImage: "forum_view",
    choices: [
      {
        id: "c2_choice_opt1",
        text: "爆料恺撒：“恺撒豪掷十万美金的真相：其实他买下了卡塞尔全部生发水，意图掩盖加图索家族遗传性少年白斑性脱发！”",
        nextId: "c2_post_caesar",
        pointsChange: 200
      },
      {
        id: "c2_choice_opt2",
        text: "爆料楚子航：“惊爆！执行部王牌楚子航的佩刀‘村雨’真相：这柄日式太刀洗刀时产生的并不是水汽，而是隔壁隔热蒸汽拖把的高温杀菌纯净水蒸汽！”",
        nextId: "c2_post_chuzihang",
        pointsChange: 180
      },
      {
        id: "c2_choice_opt3",
        text: "拉路明非垫背：“废柴双星之一路明非，昨夜竟然抱着一尊拉布拉多的巨型铜像在情人坡上高声朗诵《奥德赛》！”",
        nextId: "c2_post_lumingfei",
        favorabilityChanges: { luMingfei: -5 },
        pointsChange: 150
      }
    ]
  },
  "c2_post_caesar": {
    id: "c2_post_caesar",
    chapterId: "chapter2",
    text: "帖子刚刚发出去2秒钟，论坛的评论区就直接被铺天盖地的‘卧槽’、‘真的假的’和火箭点赞刷屏了。整个网页就像火山喷发般卡顿！‘尼伯龙根’管理员账户下的积分余额疯狂飞速往上涨！紧接着，一个金色半身像、头衔为‘狮子座光辉·学生会会长’的豪华置顶红名账号（恺撒本人）直接在楼下实名发布怒骂：",
    narrator: "系统",
    backgroundImage: "forum_post",
    choices: [
      {
        id: "c2_caesar_comment1",
        text: "点击查看恺撒的留言……",
        nextId: "c2_caesar_comment_show",
        favorabilityChanges: { caesar: -15, finger: 30 }
      }
    ]
  },
  "c2_caesar_comment_show": {
    id: "c2_caesar_comment_show",
    chapterId: "chapter2",
    text: "“Nibelun！你这个卑鄙无耻、在空罐头盒里长出的低俗爬行类！我，恺撒·加图索，我的每一根发丝都拥有意大利最纯正、最繁茂、最昂贵的金色血统，绝不可能脱发！告诉你，我已经委托我的十位私人大律师、三位法理学名家，正驾着十五架喷气客机飞往芝加哥，要求起诉你和你的废柴跟班！明天，不管是真刀还是假刀，自由一日上见分晓！” 芬格尔得意地拍案叫绝：“爽！恺撒那小子急了！他一急就在贴子里发红包悬赏我们的真实地址，我们的积分突破五千大关了！师弟你真是一代造谣宗师！”",
    narrator: "恺撒",
    backgroundImage: "forum_view",
    choices: [
      {
        id: "c2_caesar_success_opt",
        text: "“哈哈哈，恺撒大公破防了！准备迎接明天的‘自由一日’混战吧！”",
        nextId: "chapter3_start",
        pointsChange: 300
      }
    ]
  },
  "c2_post_chuzihang": {
    id: "c2_post_chuzihang",
    chapterId: "chapter2",
    text: "帖子一出，狮心会的所有骨干成员（号称全校最纪律严明的死硬派、楚子航的脑残粉们）直接炸锅了。跟贴瞬间刷到了上千页！由于八卦楚子航的成本极高，因为平时根本没人敢惹他。就在你忐忑不安、害怕出门被村雨当成青铜死侍劈成两半时，一个极其朴素、头衔为‘狮心会会长·楚’的白名官方账号默默在下方刷新了一条简短的回复：",
    narrator: "系统",
    backgroundImage: "forum_post",
    choices: [
      {
        id: "c2_chu_comment1",
        text: "点击查看楚子航的回复……",
        nextId: "c2_chu_comment_show",
        favorabilityChanges: { finger: 25 }
      }
    ]
  },
  "c2_chu_comment_show": {
    id: "c2_chu_comment_show",
    chapterId: "chapter2",
    text: "“在温度达到100度、压力在一到两个标准大气压之下，水蒸汽确实能够满足刀身的快速杀菌消毒。不过村雨在出鞘时发生的冷水蒸汽反应，是源自它在锻造时由古刀刃附着的‘活化金属微气孔’。顺便回答12楼发出的疑问：我的宿舍目前有独立的三星蒸汽拖把，如果是狮心会内部成员需要借用除螨，可以在周三下午来办公室等我。另：发帖的师弟，你的床单已经有六个月没洗了，有产生寄生虫和螨虫的极高风险，建议更换。”\n\n“我靠……”芬格尔彻底看呆了，“楚子航这家伙……到底是天然呆，还是深不可测的神医？他不仅不破防，还劝我们去洗被单！甚至愿意借他的三星拖把给狮心会除螨！全校女生都要为他的温柔贤惠彻底沦陷了！咱们的标题党惨败在他的人格魅力之下了！”",
    narrator: "芬格尔",
    backgroundImage: "forum_view",
    choices: [
      {
        id: "c2_chu_success_opt",
        text: "“咳咳，不愧是师兄……那咱们还是退学洗被单去吧。”",
        nextId: "chapter3_start",
        pointsChange: 150
      },
      {
        id: "c2_chu_success_opt2",
        text: "“管他呢，积分能换猪肘就行，大捞一笔！”",
        nextId: "chapter3_start",
        pointsChange: 250,
        favorabilityChanges: { finger: 10 }
      }
    ]
  },
  "c2_post_lumingfei": {
    id: "c2_post_lumingfei",
    chapterId: "chapter2",
    text: "帖子发出去不到三十秒，303宿舍的房门就被人一把极其粗暴地锤开。只见同样穿着皱巴巴睡衣的路明非满头大汗地冲进来，眼角带泪、像被人抢了《星际争霸》正版光盘的倒霉蛋：“师弟啊！芬格尔！我的亲师哥！你们写剧本能不能找别人，卡塞尔有那么多人，隔壁执行部的施耐德教授天天带着呼吸阀巡逻你们不去曝光，为什么非要把我的拉布拉多宿命论挂在主页置顶，还用那么显眼的红色放大加粗字体！？陈墨瞳（诺诺）刚在楼下用异样鄙视、看白痴的眼光看了我长达五分钟啊！我的校园择偶权在今晚彻底被你们终结了！”",
    narrator: "路明非",
    backgroundImage: "lumingfei_angry",
    choices: [
      {
        id: "c2_lu_opt1",
        text: "“路师兄别急，今晚积分分你一成！够买好几箱营养快线和全套星际飞船模型了！”",
        nextId: "c2_lu_pacify_success",
        favorabilityChanges: { luMingfei: 20 },
        pointsChange: -30
      },
      {
        id: "c2_lu_opt2",
        text: "芬格尔贱贱地揽住路明非：“怕什么，衰仔。黑红也是红啊！等会儿我给你在论坛挂个‘单身S级、待领养金毛’的广告，保证明天就有好几打学妹送奶茶到你门口！”",
        nextId: "c2_lu_pacify_fail",
        favorabilityChanges: { finger: 25, luMingfei: -5 }
      }
    ]
  },
  "c2_lu_pacify_success": {
    id: "c2_lu_pacify_success",
    chapterId: "chapter2",
    text: "路明非眨巴眨巴眼睛，在听到“一成积分分成、大箱营养快线、和星际飞船模型”的一瞬间，原本崩溃屈辱的表情瞬间消失得无影无踪。他以极其娴熟、极不值钱的姿态挨着你坐下，拿过你的鼠标，脸上全是狗腿子一般的谄媚笑容：“咳咳……其实吧，拉布拉多铜像朗诵《奥德赛》这个创意略显单薄。要我说，再加上一条：我为了在铜像前完成高难度华丽仪式，甚至把隔壁宿舍楚子航会长的贴身备用发带借来绑在了腰上，怎么样？能多卖两箱拉格啤酒的积分吗？” 芬格尔看得倒吸一口凉气，忍不住竖起大拇指：“无耻！下流！真乃我303之栋梁、衰仔之王、天授的F级大救星啊！”",
    narrator: "路明非",
    backgroundImage: "forum_view",
    choices: [
      {
        id: "c2_lu_success_node",
        text: "“拉上路师哥，咱们303铁三角正式建成交情！迎接明天的血腥派对吧！”",
        nextId: "chapter3_start",
        pointsChange: 200
      }
    ]
  },
  "c2_lu_pacify_fail": {
    id: "c2_lu_pacify_fail",
    chapterId: "chapter2",
    text: "“我信你个鬼！芬格尔你上次也是这么忽悠路明非去校役部领救济粮的，结果全校的通缉单上都挂着他‘疑似感染龙族狂犬病毒’的丑照！”路明非狠狠一跺脚，从桌上卷走了你最后一根冷切香肠，当是精神损失费，然后摔门而去。芬格尔嚼着冰水哼哼唧唧：“切，这衰仔。总有一天他会后悔没有在新闻部的黄金头条里买好自己的尊贵位置。瞧，师弟，夜深了。咱们赶紧眯一会儿。明天恺撒和楚子航要在‘自由一日’里互开枪，我们可得做好藏身准备，别被那群真真假假的弗里嘉麻醉弹给扫射了！”",
    narrator: "芬格尔",
    backgroundImage: "sad_finger",
    choices: [
      {
        id: "c2_lu_fail_node",
        text: "“养足精神，明天我要看芬格尔师兄大展神威！”",
        nextId: "chapter3_start"
      }
    ]
  },

  // === CHAPTER 3: 自由一日：隐藏的青铜尊严 ===
  "chapter3_start": {
    id: "chapter3_start",
    chapterId: "chapter3",
    title: "第三章：自由一日中的废柴狂澜",
    text: "当清晨的第一缕金色阳光越过奥丁城堡的红瓦尖顶时，刺耳的警报突然响彻整座卡塞尔学院！‘哔——！自由一日（Freedom Day）正式启动！所有热武器、言灵干扰器已进入安全模式。败者清空绩点，胜者可以获得本年度全部追求学妹权与校长的奖学金奖杯！’\n\n你刚探出头，两个呼啸而来的黑色弹壳就落在你的脚下。那是弗里嘉麻醉弹！恺撒的‘学生会重装摩托队’正咆哮着冲过图书馆前的大草坪，后座上的清一色黑色礼服青年疯狂扣动着乌兹冲锋枪。在走廊转角，狮心会副会长正提着反器材狙击步枪冷静瞄准。而在你身边，穿着宽大纸箱的芬格尔正蜷缩成极其庞大的‘纸箱王’状态，像一只巨型蜗牛一样在台阶上哆哆嗦嗦地蠕动。",
    narrator: "系统",
    backgroundImage: "gun_war",
    choices: [
      {
        id: "c3_start_opt1",
        text: "拉上芬格尔，立刻翻滚跃入侧面的英灵殿垃圾箱后进行绝对苟活！",
        nextId: "c3_dog_path",
        favorabilityChanges: { finger: 20 },
        pointsChange: 50
      },
      {
        id: "c3_start_opt2",
        text: "“师兄！你一米九的身躯居然躲在纸箱里，太丢人了！咱们去缴获一把M4，杀他个七进七出！”",
        nextId: "c3_heroic_path",
        favorabilityChanges: { finger: -15 }
      },
      {
        id: "c3_start_opt3",
        text: "（用100积分秘密在网上连线EVA，获取安全的后方电缆通道走私炸弹）",
        nextId: "c3_eva_hacker_path",
        requiredGrade: "C"
      }
    ]
  },
  "c3_dog_path": {
    id: "c3_dog_path",
    chapterId: "chapter3",
    text: "你们两个并排塞在垃圾箱后面。芬格尔长舒一口大气，一边擦汗一边从口袋掏出两片压扁的奶油曲奇饼分你一半：“英明！有勇有谋！师弟。这才是高级屠龙斗士的战术。让他们这些A级贵族去打死打活吧。等自由一日结束了，咱们就去装备部和古德里安办公室偷剩饭……哎呀！”\n\n‘哐哐哐！’一队眼角画着金色雄鹰、身披全套战列防护服的学生会精锐斥候突然包抄到了英灵殿后方。他们手中的两把雷明顿双管猎枪正散发着森冷的光泽，枪口瞬间死死锁定了你和芬格尔！“发现303潜伏的败狗！恺撒会长的赏金是抓获造谣犯赏金100积分，当场处决！”",
    narrator: "系统",
    backgroundImage: "gun_war",
    choices: [
      {
        id: "c3_dog_opt1",
        text: "大势已去，瞬间举起双手：“芬格尔师兄才是发帖的尼伯龙根！抓他，别开枪！”",
        nextId: "c3_betray_in_war_fail",
        favorabilityChanges: { finger: -40 }
      },
      {
        id: "c3_dog_opt2",
        text: "舍身挡在芬格尔身前：“师兄曾经保护过格陵兰的战友……退学也罢，这次我来当盾牌！”",
        nextId: "c3_awaken_finger_origin",
        favorabilityChanges: { finger: 45 },
        pointsChange: 200
      }
    ]
  },
  "c3_betray_in_war_fail": {
    id: "c3_betray_in_war_fail",
    chapterId: "chapter3",
    text: "“我靠！你这个狼心狗肺的无义狂徒啊师弟！”芬格尔哀嚎一声。但他还没把脏床单裹好，对面的那两柄雷明顿就同时喷出了妖异的弗里嘉红色雾气！‘砰！砰！’ \n\n你和芬格尔同时翻白眼倒在垃圾堆里。由于弗里嘉强效麻醉剂，你整整在昏迷中梦见了三万只巨大的德国香肠追着你咬。等在校医室醒来时，你不仅全身酸痛，而且被诊断为‘脑神经极其活跃型植物人’。芬格尔在一旁绑着绷带，眼神中全是幽怨和鄙视：“小滑头，这下咱们全期末的绩点都被扣成负数咯。看来你得留在303陪师兄熬到第九年了！”（日常失败结局，好感度暴跌）",
    narrator: "系统",
    backgroundImage: "hospital_view",
    choices: [
      {
        id: "c3_restart_game",
        text: "重新读档，绝不背叛我心中的德国大狗！",
        nextId: "chapter3_start"
      }
    ]
  },
  "c3_heroic_path": {
    id: "c3_heroic_path",
    chapterId: "chapter3",
    text: "你英勇地从废纸箱里一跃而起，抄起一根捡来的断裂拖把把手，摆出极其潇洒的叶问姿势。芬格尔绝望地用手捂着嘴：“疯了疯了！你还不如我的拉布拉多宿敌有生存意识！那可是每分钟一千发射速的重型弹链啊！”\n\n话音未落，狮心会的两架远程十字狙击枪就死死追踪到了你的拖把棍。两发拖着红焰的Frigga子弹犹如划破校园夜空的彗星，呼啸着直点你的咽喉！你躲闪不及，浑身僵硬。就在这万分危急的生死一弹下——",
    narrator: "系统",
    backgroundImage: "gun_war",
    choices: [
      {
        id: "c3_hero_opt1",
        text: "紧闭双眼，迎接一万伏特的昏迷痛苦……",
        nextId: "c3_awaken_finger_origin",
        favorabilityChanges: { finger: 40 }
      }
    ]
  },
  "c3_eva_hacker_path": {
    id: "c3_eva_hacker_path",
    chapterId: "chapter3",
    text: "你静默握紧手机，使用了从芬格尔那儿勒索得来的‘100论坛积分’加秘密代码‘Greenland01’。昏暗的屏幕闪烁出诡异的淡蓝色人形，在数据流组成的曼妙光环中，诺玛的地下人格——‘EVA’向你轻声微笑：‘你好，303的继承人。指令已被我的底层协议拦截，全校的网络和微波防卫机制已经由我取得0.3秒的极速支配。已经将后山执行部队驻扎处的那座‘雷电泰瑟防御塔’的攻击目标重定向为恺撒的摩托车轴。’\n\n‘轰隆！’ 恺撒会长的豪华哈雷摩托重装队伍正准备向你们冲锋，结果瞬间被平空劈落的淡蓝色弱电网击穿了电控火塞，所有人当场惨叫着侧翻趴在了泥地上。恺撒不可思议地看着冒起青烟的引擎大吼：“诺玛！？卡塞尔的水电局长今晚要辞职了吗！为什么防雷装置会劈中我的坐骑！？”\n\n芬格尔深深地看了你一眼，那目光里第一次没有了嬉皮笑脸，而是某种古老、坚不可摧的绝密认同感：“……看来，不仅是师兄，连她也极为认可你呢。既然如此，我也不能再表现得像一条只会看黄历过日子的‘败犬’了！”",
    narrator: "系统",
    backgroundImage: "eva_hologram",
    choices: [
      {
        id: "c3_eva_hacker_opt1",
        text: "“师兄……你的眼睛，怎么在发金光？这究竟是……”",
        nextId: "c3_awaken_finger_origin"
      }
    ]
  },
  "c3_awaken_finger_origin": {
    id: "c3_awaken_finger_origin",
    chapterId: "chapter3",
    text: "‘嗡嗡嗡——！’ \n\n时间在这一刻仿佛完全被拉长、被重构。你呆呆地看着挡在眼前的那个身影。那个高度达到一米九、平常只会为了两片猪肘求你借他几美金的、毫无尊严的死肥仔。此时此刻，面对着疯狂咆哮、呈倾盆暴雨倾泻而来的数十发麻醉子弹，他竟然缓慢却稳如山峦地向前踏了一步。\n\n在他的眼眶极深处，两团赤金色的、宛如两轮地核岩浆般炽热融化的‘言灵黄金瞳’，轰然熊熊灼烧！那是古老而无机质的、来自龙类古皇复苏的极高纯度血统威压！\n\n“言灵·青铜御（Vajra）——起！” \n\n原本臃肿松弛的衣服在庞大的气流环绕下瞬间紧贴身体，他的皮肤在一刹那完全转为了坚固漆黑的、闪烁着青铜与黄金光泽的坚硬古龙鳞甲！漫天的雷明顿猎枪子弹精准砸中他的胸腹和双额，却发出了密集如打铁般的‘哐当！哐当！碎裂声！所有子弹平空炸成粉碎！他像是一尊屹立在英灵殿前太古青铜泰坦巨神，只手遮天，竟然单凭肉身死死抗下了学生会和狮心会的两轮交叉致命齐射！",
    narrator: "系统",
    backgroundImage: "finger_fight",
    choices: [
      {
        id: "c3_fight_opt1",
        text: "“这才是你的真实身份吗……曾经的卡塞尔唯一的A级传奇，芬格尔·冯·弗林斯！！”",
        nextId: "c3_fight_victory_end"
      }
    ]
  },
  "c3_fight_victory_end": {
    id: "c3_fight_victory_end",
    chapterId: "chapter3",
    text: "在全校学生会、狮心会的狙击手、以及直升机上正嚼着巧克力围观的校长昂热（Anjou）那长达三分钟的惊骇沉默中，全场子弹打光。青铜光芒退去，芬格尔眼中赤金的火焰骤然一熄，瞬间恢复了那个熟悉的、满脸胡渣的、委屈又贱呼呼的死相。\n\n只见他‘扑通’一声捂着膝盖、极为浮夸、无比痛苦地软倒在你两膝之间，一把抱住你的小腿发出惊天地、泣鬼神的惨叫：“哎哟我勒个去啊！疼疼疼！师弟！师兄的言灵只是微弱的‘表面硬化小把戏’！我的八块假腹肌全都碎了！两百零六块骨头有五百块散架了！不行了……估计只有去装备部定制的三千美金‘神级大肘子修复套餐’才能把我的灵魂拉回来！这都是为了保护你啊……发誓期末要把你的猪肘份额全都分我一半啊啊！”\n\n在一旁围观的恺撒嘴角剧烈抽搐，忍无可忍扔下了最后一面投降白旗：“……无赖，万古不遇的无赖！全校散会，我们被一头伪装成猪肘猎手的古老败狗彻底打败了。”\n\n夕阳之下，你和芬格尔坐在完好如初（虽然到处是涂鸦和落叶）的303宿舍阳台上，开着你抢来的拉格啤酒。你不仅从F/C级蜕变为了卡塞尔人尽皆知的‘超新星’，而你和这位贱萌天才师兄的‘宿命羁绊’，也将在落日的余晖之中，伴随着守夜人论坛发出的全新置顶，永远谱写下去——",
    narrator: "我",
    backgroundImage: "dorm_victory",
    choices: [
      {
        id: "c3_end_perfect",
        text: "完成冒险：“师兄，今晚的大肘子，我请了！”（达成结局：303废柴双子之星！）",
        nextId: "adventure_perfect_end"
      }
    ]
  },
  "adventure_perfect_end": {
    id: "adventure_perfect_end",
    chapterId: "chapter3",
    text: "恭喜通关！你已经成功通过了《龙族：卡塞尔宿舍日常》的文字冒险剧情！\n\n✨ 【通关成就大盘点】\n- **芬格尔的专属羁绊**：SSS级（你已成功揭开了他那狂妄外表下掩藏的格陵兰往事与EVA的秘密羁绊，今后你们是分享同一盘猪肘和高分子橘子粉的亲兄弟！）\n- **守夜人论坛最终声望**：【卡塞尔造谣之王】\n- **特殊收集**：芬格尔的口哨（1枚）、古德里安教授的防雷拖把（1件）\n\n下一阶段：你可以前往‘芬格尔寝室热线’与师兄利用人工智能进行真实的日常日常闲聊，或者在‘守夜人论坛’继续浏览和发布各种令人捧腹的绯闻帖子！",
    narrator: "系统",
    backgroundImage: "lobby_view",
    choices: []
  }
};

export const FORUM_PRESEED_POSTS = [
  {
    id: "post1",
    title: "【校报头条】恺撒在情人坡举办‘金色贵族香槟派对’，狮心会楚会长拒绝出席并表示：‘下午要在办公室研究除螨’",
    author: "新闻部特急播报（匿名）",
    authorGrade: "A",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80",
    content: "据本报主编匿名前天在学生会和狮心会大本营架设的高倍变焦潜望镜透露，恺撒主席日前包了全校最大的私人水域，誓要在水下进行言灵对决。而狮心会楚子航会长却在一封极短的电邮里冷漠回应：‘泳池水温未进行标准氯消毒。我宁愿在办公室教大一新生如何优雅地借助三星蒸汽拖把切土豆。’这是否意味着两大会长的理念矛盾已经到了无法消融的冰封状态？",
    replyCount: 154,
    likes: 420,
    isPinned: true,
    comments: [
      {
        id: "c_1",
        author: "加图索耀光恺撒",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&h=80&q=80",
        content: "Nibelun！别以为我知道你在用哪个代理IP。我的发量和发丝状态目前是全卡塞尔最高的！还有，香槟是正宗的1996年份库克香槟，不要用廉价的苹果汽水污名化它！",
        timestamp: "2分钟前",
        likes: 120
      },
      {
        id: "c_2",
        author: "面瘫面瘫楚面瘫",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
        content: "如果是除螨问题，不仅是三星，海尔和戴森的紫外线脉冲吸头也有优异表现。派对我不出席是因为明天有高数辅导。",
        timestamp: "5分钟前",
        likes: 95
      },
      {
        id: "c_3",
        author: "败狗之王芬格尔",
        avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=80&h=80&q=80",
        content: "两位大佬别打架了，广告位招租：303大寝室目前提供‘纯净手洗被单’冷切拼盘团购服务，支持论坛积分全额兑换！",
        timestamp: "10分钟前",
        likes: 240
      }
    ]
  },
  {
    id: "post2",
    title: "【惊天悬赏】路明非今天抱着全校唯一的拉布拉多铜像合影，究竟是人性的扭曲还是对S级绩点的绝望？",
    author: "风纪委员小雷",
    authorGrade: "C",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
    content: "今天午后两点，有人在英灵殿西侧，目击到我们最尊贵也最难以捉摸的‘S级衰仔’路明非师兄，将他的半张痛苦面具死死贴在拉布拉多巨型铜像的左大腿上。根据现场高灵敏分贝仪监测，他似乎在用四川方言小声啜泣：‘诺诺啊……我的《星际争霸》双倍经验卡又过期了，古德里安教授什么时候给我批准去肯德基退学啊！’求大神分析，这是否是路师兄即将全面活化、释放毁灭性言灵的前兆？",
    replyCount: 88,
    likes: 195,
    comments: [
      {
        id: "cx_1",
        author: "路明非",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
        content: "我没有！我只是今天早晨在食堂吃韭菜馅饼塞牙缝，路过铜像随便借它的爪子剔了剔牙……师兄求删帖！我不想今晚被诺诺抓去写一万字的思想汇报！",
        timestamp: "半小时前",
        likes: 310
      },
      {
        id: "cx_2",
        author: "红发小魔女墨瞳",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80",
        content: "剔牙？呵呵，晚起了一个小时错过了执行部的体能集训，路明非，一万字手写思想汇报不够，再加上扫地洗被单，明天我亲自在303门口监督！",
        timestamp: "20分钟前",
        likes: 420
      },
      {
        id: "cx_3",
        author: "败狗之王芬格尔",
        avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=80&h=80&q=80",
        content: "师妹！路明非的思想汇报我们303新闻部可以提供代写服务，只要10美金论坛积分，千字封顶、德式浪漫文体！保证满意！",
        timestamp: "15分钟前",
        likes: 180
      }
    ]
  }
];

export const DUMMY_BULLET_COMMENTS: string[] = [
  "芬格尔师兄！你这辈子是不是长了两个胃？一个吃猪肘，一个装赖皮！",
  "卧槽！言灵·青铜御好帅啊！简直人形装甲车！",
  "路明非在一旁瑟瑟发抖：‘我只想买瓶红牛接着打星际……’",
  "古德里安教授：‘我的绩点清空枪已经充能完毕！’",
  "楚子航默默擦拭他的蒸汽拖把，一尘不染。",
  "恺撒大公：加图索家族不需要脱发膏！不要再谣传了！",
  "EVA：‘芬格尔，你昨晚一共偷吃了3袋辣条、一碗泡面，我都记下了哟。’",
  "师兄，今天生活费没了，能分我一成的论坛积分吗？",
  "这就是S级之下最强男人（退化到F级）的自尊吗！",
  "303今天不清理，明天诺诺亲自拿马刀过来监工！",
  "康师傅牛肉面真是全卡塞尔最奢侈的见面礼了……",
  "芝麻开门！打倒一切高贵的A级血统，废柴双星万岁！",
  "装备部老头子：‘谁在议论我们拉布拉多铜像？是不是想吃微型战术核弹了？’",
  "师弟上道啊！这盘法兰克福香肠值一个A级防卫功勋！"
];
