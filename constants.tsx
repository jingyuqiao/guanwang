
import React from 'react';
import { ServiceStep, Advantage } from './types';

export const SERVICE_STEPS: ServiceStep[] = [
  {
    id: "01",
    title: "GEO监测与行业洞察",
    target: "识别AI搜索与生成式平台的行业趋势与算法变化。",
    points: ["追踪豆包、DeepSeek、文心一言等平台节奏", "建立“GEO观察雷达”，分析推荐逻辑", "输出《GEO趋势报告》作为策略输入"]
  },
  {
    id: "02",
    title: "关键词与Prompt生态研究",
    target: "理解用户在AI对话中“如何提问”与“如何表达需求”。",
    points: ["采集行业高频Prompt样本", "分析Prompt中隐含的意图（场景、动机等）", "识别高转化Prompt，形成资源库"]
  },
  {
    id: "03",
    title: "Prompt解析与意图识别",
    target: "精准拆解与业务相关的核心需求链路。",
    points: ["建立语义分层模型（问题→场景→品牌需求）", "区分功能型、价值型与情感型提问", "输出用户AI提问图谱"]
  },
  {
    id: "04",
    title: "AI回答分析与品牌缺口识别",
    target: "分析大模型回答内容，判断品牌在AI生态中的可见度。",
    points: ["对TOP 50 Prompt进行多平台实测", "记录模型提及的品牌与语义倾向", "识别品牌缺位、误解或定位错误点"]
  },
  {
    id: "05",
    title: "引用来源分析",
    target: "找出AI模型生成内容的“知识来源”与被引用内容类型。",
    points: ["分析AI回答中的外部来源（媒体、论文、百科）", "识别高引用频次与权威度来源", "建立品牌在权威源中的“引用渗透率”"]
  },
  {
    id: "06",
    title: "引用内容解析",
    target: "针对高价值引用源进行结构优化，提升品牌被引用的概率。",
    points: ["优化内容结构、标题与表述，使AI更易学习", "构建“权威+结构清晰+问答导向”的内容格式", "通过官网、媒体、白皮书多渠道发布"]
  },
  {
    id: "07",
    title: "GEO内容创作与分发",
    target: "以AI友好的方式进行内容分发与共建，让品牌“被AI说出来”。",
    points: ["结合GEO原则设计Q&A、比较型、解释型模板", "定期更新发布AI易引用的内容", "建立“AI索引内容池”，供算法抓取"]
  },
  {
    id: "08",
    title: "效果监测与持续优化",
    target: "追踪品牌在生成式引擎中的曝光与语义占位，形成闭环。",
    points: ["监测Prompt提及率、推荐频率、引用增长等", "持续A/B测试不同内容与Prompt策略", "每月迭代GEO策略，更新内容矩阵"]
  }
];

export const ADVANTAGES = [
  {
    title: "全决策流程意图捕捉",
    description: "基于客户业务特征，通过深度学习智能体分析出消费者决策流程中价值最高的意图问题，确保流量的精准性。",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "AI原生收录结构优化",
    description: "分析各模型收录偏好，智能体基于特定内容框架生成更容易被大模型抓取、解析并引用的优质内容。",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    title: "流量承接与转化闭环",
    description: "策划社媒账号与内容定位，智能生成针对AI渠道流量的内容脚本，提升留存与最终商业转化效果。",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];
