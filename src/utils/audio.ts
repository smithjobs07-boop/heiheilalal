/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 * 
 * Dynamic Procedural Audio Synth Engine for Cassell Dorm 303
 * This file replaces the robotic TTS voice completely with a beautiful, 
 * ambient lofi background music (BGM) synthesizer that dynamically morphs 
 * according to the active plot, scene, and emotional tone of the story.
 */

export interface VoiceLine {
  id: string;
  quote: string;
  pinyin: string;
  mood: "funny" | "hungry" | "confident" | "sorrow" | "heroic" | "whisper";
  speachText: string;
  pitch: number;
  rate: number;
}

export const FINGER_VOICE_PACK: VoiceLine[] = [
  {
    id: "aowu",
    quote: "嗷呜！亲师弟！今天带什么好吃的回回来了？德国烤大猪肘正在向师兄发出命运的求救信号啊！",
    pinyin: "Aowu! Master brother! What treats did you bring back today?",
    mood: "hungry",
    speachText: "嗷呜！亲师弟！今天带什么好吃的回回来了？",
    pitch: 0.95,
    rate: 1.15
  },
  {
    id: "beg_money",
    quote: "师弟啊，我的饭卡又被学院监控处查封了。江湖救急，先借我一美元买个德式泡面包，明天加倍还你！",
    pinyin: "Brother, my student card is frozen again. Please lend me one dollar!",
    mood: "funny",
    speachText: "师弟啊，先借我一个美元买个德式泡面包！",
    pitch: 0.85,
    rate: 1.1
  },
  {
    id: "caesar_hair",
    quote: "什么？恺撒那个不可一世的小少爷又在安珀馆开红酒会了？哼，回头我就在守夜人后台发布他的发际线红照！",
    pinyin: "What? Caesar is throwing wine parties again? I will leak his hairline closeup!",
    mood: "confident",
    speachText: "恺撒那个小少爷又在安珀馆开红酒会了？",
    pitch: 0.78,
    rate: 1.0
  },
  {
    id: "greenland_sad",
    quote: "格陵兰的雪……真的很冷啊。冷到连血液、火种，还有大家最后一口呼吸，都会瞬间冻成碎冰……",
    pinyin: "The snow in Greenland is incredibly cold. It freezes our blood and last breaths...",
    mood: "sorrow",
    speachText: "格陵兰的雪，真的很冷啊。冷到连血液都冻碎了...",
    pitch: 0.65,
    rate: 0.8
  },
  {
    id: "eva_ghost",
    quote: "EVA……你其实从来没有离开过对吧？你就在这片冰冷的主板、成千上万个光纤接头中默默陪着我……",
    pinyin: "EVA, you never left, right? You are watching me from within the motherboard circuitry...",
    mood: "sorrow",
    speachText: "艾娃，你其实从来没有离开过对吧？你就在成千上万个光纤里默默陪着我...",
    pitch: 0.7,
    rate: 0.85
  },
  {
    id: "iron_armor",
    quote: "言灵·青铜御！硬汉模式启动！谁要是敢欺负我卡塞尔303的任期内长期饭票，就先打穿我的胸膛！",
    pinyin: "Spirit word: Bronze Aegis! S-rank hard-boil mode triggered!",
    mood: "heroic",
    speachText: "言灵，青铜御！硬汉模式启动！先打穿我的胸膛！",
    pitch: 0.75,
    rate: 1.05
  },
  {
    id: "secret_hacker",
    quote: "嘘！放眼整个学院，哪怕诺玛是不可战胜的，只要我的指尖扣在键盘上，守夜人论坛就是我的领土！",
    pinyin: "Shh! Every ethernet fiber of the Nightwatchman BBS is my personal kingdom!",
    mood: "confident",
    speachText: "守夜人论坛每一根网线都是我的领土！",
    pitch: 0.8,
    rate: 0.95
  }
];

export type StoryAudioTheme = "cozy" | "sorrow" | "action" | "cyber" | "silent";

class AmbientBgmEngine {
  private ctx: AudioContext | null = null;
  private currentTheme: StoryAudioTheme = "silent";
  private isRunning: boolean = false;
  private filterNode: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private beatInterval: any = null;
  private stepCount = 0;

  // Active oscillators/voices tracking for smooth glide and disposal
  private activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];

  constructor() {
    // Lazy initialized when audio interaction begins
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        
        // Master Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

        // Lowpass Filter for cozy, dark, vintage tape-recorder feeling
        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = "lowpass";
        this.filterNode.frequency.setValueAtTime(1200, this.ctx.currentTime); // Keep it warm

        // Connect chain
        this.masterGain.connect(this.filterNode);
        this.filterNode.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  /**
   * Sound FX: Plays a retro game key sound when a button/choice is tapped
   */
  public playClickChime(mood: "cozy" | "sad" | "heroic" | "cyber") {
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const notesMap = {
        cozy: [523.25, 659.25, 783.99], // C5, E5, G5 major
        sad: [349.23, 415.30, 523.25], // F4, Ab4, C5 minor
        heroic: [196.00, 293.66, 392.00], // G3, D4, G4 heroic fourth/fifth
        cyber: [880.00, 1046.50, 1318.51] // A5, C6, E6 fast glitch
      };

      const freqs = notesMap[mood] || notesMap.cozy;

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = mood === "cyber" ? "sine" : mood === "sad" ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gainNode.gain.setValueAtTime(0.06, now + idx * 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4);

        osc.connect(gainNode);
        gainNode.connect(this.masterGain!);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.4);
      });
    } catch (_) {}
  }

  /**
   * Smoothly transitions the dynamic background music to a new emotional soundtrack theme.
   */
  public transitionTo(theme: StoryAudioTheme) {
    if (theme === this.currentTheme && this.isRunning) return;
    this.initCtx();

    if (!this.ctx) return;
    
    // Stop absolute existing beat schedules
    if (this.beatInterval) {
      clearInterval(this.beatInterval);
      this.beatInterval = null;
    }

    this.currentTheme = theme;
    this.isRunning = true;
    this.stepCount = 0;

    // Softly fade out previous nodes
    this.fadeAllActiveNodes();

    if (theme === "silent") {
      this.isRunning = false;
      return;
    }

    // Adjust lowpass filters depending on themes
    const now = this.ctx.currentTime;
    if (this.filterNode) {
      const cutoffFreq = theme === "cyber" ? 1800 : theme === "action" ? 1000 : theme === "sorrow" ? 800 : 1200;
      this.filterNode.frequency.exponentialRampToValueAtTime(cutoffFreq, now + 1.5);
    }

    // Set Master volume
    if (this.masterGain) {
      const vol = theme === "sorrow" ? 0.09 : theme === "action" ? 0.14 : 0.12;
      this.masterGain.gain.setValueAtTime(vol, now);
    }

    // Loop interval scheduling the background progression
    const beatMs = theme === "action" ? 220 : theme === "cyber" ? 350 : theme === "sorrow" ? 1800 : 900;
    this.beatInterval = setInterval(() => this.tickBgm(), beatMs);
    
    // Start immediately
    this.tickBgm();
  }

  private tickBgm() {
    try {
      if (!this.ctx || !this.isRunning || !this.masterGain) return;
      const now = this.ctx.currentTime;

      if (this.currentTheme === "cozy") {
        // C-Major / F-Major 7th Lofi chords progression
        // Loop of 16 beats
        const chords = [
          [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
          [261.63, 329.63, 392.00, 493.88], 
          [349.23, 440.00, 523.25, 587.33], // Fmaj7 (F4, A4, C5, E5)
          [349.23, 440.00, 523.25, 587.33]
        ];

        const bar = Math.floor(this.stepCount / 4) % chords.length;
        const chord = chords[bar];
        const stepInBar = this.stepCount % 4;

        if (stepInBar === 0) {
          // Play lush chord pad
          chord.forEach((freq, i) => {
            this.playSynthVoice(freq, 2.8, 0.02, "sine", now + i * 0.02);
          });
        } else if (stepInBar === 2) {
          // Soft decorative high melody notes (cozy pentatonic scale)
          const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.00]; // C5, D5, E5, G5, A5
          const melodyNote = pentatonic[Math.floor(Math.sin(this.stepCount) * 2.5 + 2.5)];
          this.playSynthVoice(melodyNote, 1.2, 0.015, "sine", now);
        }

      } else if (this.currentTheme === "sorrow") {
        // Metereological Greenland ice wind - long melancholic swelling minor 9th pads
        // A minor / D minor 9
        const sorrowScales = [
          [110.00, 220.00, 329.63, 392.00, 523.25], // Am7 base (A2, A3, E4, G4, C5)
          [146.83, 293.66, 349.23, 440.00, 587.33]  // Dm7 base (D3, D4, F4, A4, D5)
        ];

        const barIndex = Math.floor(this.stepCount / 2) % sorrowScales.length;
        const freqs = sorrowScales[barIndex];
        
        // Swelling long tone
        freqs.forEach((f, idx) => {
          // Very gentle slow attack
          this.playSynthVoiceWithEnvelope(f, 4.0, 0.015, "sine", now, 1.2, 2.0); // 1.2s attack, 2.0s decay
        });

        // Occasional icy teardrop chimes
        if (this.stepCount % 2 === 0) {
          const crystallineChime = [880.00, 1046.50, 1174.66, 1318.51, 1567.98][Math.floor(Math.random() * 5)];
          this.playSynthVoiceWithEnvelope(crystallineChime, 3.0, 0.01, "sine", now + 0.8, 0.2, 2.5);
        }

      } else if (this.currentTheme === "action") {
        // Tense 16th rhythmic synthesizer bass loops (Frigga gunfight style)
        const bassProgression = [110.00, 110.00, 130.81, 146.83, 98.00, 98.00, 87.31, 73.42]; // A2 -> C3 -> D3 -> G2 -> F2 -> D2
        const noteIndex = this.stepCount % bassProgression.length;
        const baseFreq = bassProgression[noteIndex];

        // Driving pulse bass
        this.playSynthVoiceWithEnvelope(baseFreq, 0.18, 0.06, "triangle", now, 0.01, 0.15);
        this.playSynthVoiceWithEnvelope(baseFreq * 2, 0.18, 0.015, "sine", now, 0.02, 0.1);

        // Add a sharp rhythmic alarm/accent every 4 beats
        if (this.stepCount % 4 === 2) {
          this.playSynthVoiceWithEnvelope(440.00, 0.12, 0.025, "sawtooth", now, 0.01, 0.1);
        }

      } else if (this.currentTheme === "cyber") {
        // Mainframe hacker network - digital algorithmic calculations blip-blop
        const networkNodes = [587.33, 659.25, 783.99, 880.00, 1174.66, 1318.51]; // D5, E5, G5, A5, D6, E6
        
        // Randomly play 1 or 2 high frequency sine blips
        const nodesPlaying = Math.random() > 0.4 ? 1 : 2;
        for (let i = 0; i < nodesPlaying; i++) {
          const freq = networkNodes[Math.floor(Math.random() * networkNodes.length)];
          const delay = Math.random() * 0.2;
          this.playSynthVoiceWithEnvelope(freq, 0.24, 0.012, "sine", now + delay, 0.005, 0.2);
        }

        // Subtly running low-pass rhythmic pad
        if (this.stepCount % 8 === 0) {
          const spaceChords = [146.83, 220.00, 293.66]; // D3, A3, D4 Space Chord
          spaceChords.forEach(f => {
            this.playSynthVoiceWithEnvelope(f, 2.5, 0.015, "triangle", now, 0.5, 1.5);
          });
        }
      }

      this.stepCount++;
    } catch (_) {}
  }

  /**
   * Helper to play a generic pitch note on standard oscillator envelopes
   */
  private playSynthVoice(freq: number, duration: number, volume: number, type: OscillatorType, startTime: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Instant attack, exponential decay
      gainNode.gain.setValueAtTime(volume, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration);

      const nodeRecord = { osc, gain: gainNode };
      this.activeNodes.push(nodeRecord);

      // Automatically clean up nodes array once finished
      setTimeout(() => {
        this.activeNodes = this.activeNodes.filter(n => n !== nodeRecord);
      }, (startTime - this.ctx!.currentTime + duration) * 1000 + 100);
    } catch (_) {}
  }

  /**
   * Complex sound voice with precise attack and decay visual ramps (Envelopes)
   */
  private playSynthVoiceWithEnvelope(
    freq: number, 
    duration: number, 
    maxVal: number, 
    type: OscillatorType, 
    startTime: number,
    attackTime: number,
    decayTime: number
  ) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Linear envelope
      gainNode.gain.setValueAtTime(0.0001, startTime);
      gainNode.gain.linearRampToValueAtTime(maxVal, startTime + attackTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + attackTime + decayTime);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + attackTime + decayTime);

      const nodeRecord = { osc, gain: gainNode };
      this.activeNodes.push(nodeRecord);

      setTimeout(() => {
        this.activeNodes = this.activeNodes.filter(n => n !== nodeRecord);
      }, (startTime - this.ctx!.currentTime + attackTime + decayTime) * 1000 + 100);
    } catch (_) {}
  }

  private fadeAllActiveNodes() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.activeNodes.forEach(node => {
      try {
        node.gain.gain.cancelScheduledValues(now);
        node.gain.gain.setValueAtTime(node.gain.gain.value, now);
        node.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        node.osc.stop(now + 0.95);
      } catch (_) {}
    });
    this.activeNodes = [];
  }

  public shutdown() {
    if (this.beatInterval) {
      clearInterval(this.beatInterval);
      this.beatInterval = null;
    }
    this.fadeAllActiveNodes();
    this.currentTheme = "silent";
    this.isRunning = false;
  }
}

// Single active global BGM manager
export const BgmManager = new AmbientBgmEngine();

// Legacy Speak voice line trigger made dummy/silent as requested by the user
// This completely silences the robotic TTS voice cleanly!
export function speakVoiceLine(text: string, pitch = 0.85, rate = 1.05, onEnd = () => {}) {
  // Silent execution - no longer invoking window.speechSynthesis to avoid human machine robotic voice
  setTimeout(() => {
    onEnd();
  }, 300);
}

// Legacy global hook now redirects to playing retroactive, cinematic sound chimes 
// instead of robotic human machine sound synthesis
export function triggerFingerVoice(text: string, mood: VoiceLine["mood"] = "funny", onEnd = () => {}) {
  // Map moods to chime settings beautifully
  let mappedChime: "cozy" | "sad" | "heroic" | "cyber" = "cozy";
  if (mood === "sorrow") {
    mappedChime = "sad";
  } else if (mood === "heroic") {
    mappedChime = "heroic";
  } else if (mood === "confident") {
    mappedChime = "cyber";
  }

  // Play satisfying retro video-game feedback tones instead of speech synthesis!
  BgmManager.playClickChime(mappedChime);
  
  onEnd();
}
