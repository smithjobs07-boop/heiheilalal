/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AcademicGrade = "S" | "A" | "B" | "C" | "D" | "E" | "F";

export interface PlayerStats {
  fingerFavorability: number; // 0 to 120 (Max Level: SSS)
  luMingfeiFavorability: number;
  caesarFavorability: number;
  academicGrade: AcademicGrade;
  forumPoints: number; // Nightwatchman forum points used as currency
  secretsUnlocked: {
    greenlandIncident: boolean; // 格陵兰暗影
    evaConnection: boolean; // 诺玛与EVA
    prodigyPast: boolean; // 曾经的A级天才
    brotherhood: boolean; // 废柴双星的盟约
  };
  purchasedItems: string[]; // Store item ids
}

export interface StoryChoice {
  id: string;
  text: string;
  nextId: string;
  effect?: (stats: PlayerStats) => { stats: PlayerStats; feedback: string };
  favorabilityChanges?: {
    finger?: number;
    luMingfei?: number;
    caesar?: number;
  };
  pointsChange?: number;
  requiredGrade?: AcademicGrade;
}

export interface StoryNode {
  id: string;
  title?: string;
  chapterId: string;
  text: string;
  narrator: "我" | "芬格尔" | "路明非" | "恺撒" | "诺诺" | "古德里安教授" | "系统" | "EVA";
  backgroundImage?: string;
  choices: StoryChoice[];
}

export interface BulletComment {
  id: string;
  author: string;
  text: string;
  color: string;
  yOffset: number; // Percentage offset on screen
}

export interface ForumComment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  authorGrade: string;
  avatar: string;
  content: string;
  replyCount: number;
  likes: number;
  hasLiked?: boolean;
  comments: ForumComment[];
  isPinned?: boolean;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  iconName: string;
  secretKey?: "greenlandIncident" | "evaConnection" | "prodigyPast" | "brotherhood";
}

export interface ChatMessage {
  id: string;
  sender: "player" | "finger" | "eva";
  text: string;
  timestamp: string;
}
