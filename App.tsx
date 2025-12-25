
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { SERVICE_STEPS, ADVANTAGES } from './constants';

// --- Specialized Components ---

const GEONodeIcon: React.FC = () => (
  <div className="relative w-10 h-10 flex items-center justify-center group cursor-help">
    <div className="absolute inset-0 border border-cyan-500/30 rounded-full animate-ping opacity-20"></div>
    <div className="absolute inset-1 border border-cyan-400/20 rounded-full animate-pulse opacity-40"></div>
    <div className="relative z-10 text-cyan-400 group-hover:text-cyan-300 transition-colors">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" className="fill-cyan-500/20" />
        <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5l2-2m-13 13l-2 2m13 0l2 2m-13-13l-2-2" strokeDasharray="2 2" />
        <path d="M12 2L12 22M2 12L22 12" strokeOpacity="0.3" />
      </svg>
    </div>
    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      <span className="text-[10px] font-orbitron text-cyan-400 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/30">AI PULSE: ACTIVE</span>
    </div>
  </div>
);

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-cyan-900/30">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-8 h-8 bg-cyan-500 rounded-sm transform rotate-45 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <span className="text-black font-bold -rotate-45 group-hover:-rotate-90 transition-transform duration-500 text-xs">G</span>
        </div>
        <span className="font-orbitron text-xl font-bold tracking-widest text-white">GEOLIFT</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
          <a href="#home" className="hover:text-cyan-400 transition-colors relative group">首页</a>
          <a href="#advantages" className="hover:text-cyan-400 transition-colors relative group">核心优势</a>
          <a href="#service" className="hover:text-cyan-400 transition-colors relative group">服务流程</a>
          <a href="#cases" className="hover:text-cyan-400 transition-colors relative group">客户案例</a>
          <a href="#ai-demo" className="hover:text-cyan-400 transition-colors relative group">AI演示</a>
        </div>
        <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
        <div className="flex items-center gap-4">
          <GEONodeIcon />
          <button className="relative group overflow-hidden px-6 py-2 rounded-full font-bold text-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-[length:200%_100%] animate-shimmer"></div>
            <div className="absolute inset-[1px] bg-black/80 rounded-full group-hover:bg-transparent transition-colors duration-300"></div>
            <span className="relative z-10 text-cyan-400 group-hover:text-white transition-colors duration-300">咨询方案</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const GeoVisualCore: React.FC = () => (
  <div className="relative w-full aspect-square glass rounded-3xl p-4 overflow-hidden border-cyan-500/10 flex items-center justify-center">
    {/* Background Grid */}
    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, #06b6d4 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
    
    {/* Scanning Animation */}
    <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-30 blur-sm animate-scan-y"></div>

    {/* Peripheral Data Satellite Modules (Corners of the main card) */}
    <div className="absolute inset-0 z-0 p-6 pointer-events-none">
      {[
        { label: "索引覆盖率", val: "98.2%", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", pos: "top-4 left-4", color: "text-cyan-400", bg: "bg-cyan-500/10" },
        { label: "语义关联度", val: "0.94", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", pos: "top-4 right-4", color: "text-purple-400", bg: "bg-purple-500/10" },
        { label: "意图召回率", val: "High", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z", pos: "bottom-4 left-4", color: "text-blue-400", bg: "bg-blue-500/10" },
        { label: "流量转化比", val: "+42%", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", pos: "bottom-4 right-4", color: "text-green-400", bg: "bg-green-500/10" }
      ].map((sat, i) => (
        <div key={`sat-${i}`} className={`absolute ${sat.pos} animate-float-slow pointer-events-auto`} style={{ animationDelay: `${i * 1.5}s` }}>
          <div className="flex flex-col items-center gap-1 group">
             <div className={`w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${sat.bg}`}>
                <svg className={`w-5 h-5 ${sat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sat.icon} />
                </svg>
             </div>
             <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/5 text-center min-w-[70px]">
                <div className="text-[7px] text-gray-500 font-bold uppercase tracking-tighter mb-0.5">{sat.label}</div>
                <div className={`text-[10px] font-orbitron font-bold leading-none ${sat.color}`}>{sat.val}</div>
             </div>
          </div>
        </div>
      ))}
    </div>

    {/* Central Core Engine Container */}
    <div className="relative z-10 w-64 h-64">
      {/* Orbital Layers */}
      <div className="absolute inset-[-10%] border border-cyan-500/10 rounded-full animate-spin-slow"></div>
      <div className="absolute inset-0 border border-dashed border-purple-500/15 rounded-full animate-reverse-spin"></div>
      <div className="absolute inset-4 border border-cyan-400/20 rounded-full animate-pulse"></div>

      {/* Primary AI Platform Nodes (Refined Pentagon Positioning) */}
      {[
        { label: "豆包", color: "from-blue-500", pos: "top-[-5%] left-1/2 -translate-x-1/2" },
        { label: "通义千问", color: "from-orange-400", pos: "top-[25%] left-[-8%] -translate-x-1/2" },
        { label: "文心一言", color: "from-purple-500", pos: "top-[25%] right-[-8%] translate-x-1/2" },
        { label: "DeepSeek", color: "from-cyan-400", pos: "bottom-[5%] left-[8%] -translate-x-1/2" },
        { label: "Kimi", color: "from-emerald-400", pos: "bottom-[5%] right-[8%] translate-x-1/2" }
      ].map((node, i) => (
        <div key={i} className={`absolute ${node.pos} flex flex-col items-center animate-float`} style={{ animationDelay: `${i * 0.7}s` }}>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${node.color} to-black/40 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl hover:scale-110 transition-transform cursor-pointer group`}>
            <div className="w-6 h-6 bg-white/20 rounded-full blur-[2px] group-hover:blur-none transition-all"></div>
          </div>
          <span className="text-[9px] font-orbitron mt-2 text-white/90 font-bold tracking-widest bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md">
            {node.label}
          </span>
        </div>
      ))}

      {/* Hub Connection Lines (Relative to 256x256 container) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <g stroke="url(#nodeGradient)" strokeWidth="0.5" strokeDasharray="3 3" className="animate-dash">
          <line x1="128" y1="128" x2="128" y2="-12.8" />    {/* 豆包 */}
          <line x1="128" y1="128" x2="-20.5" y2="64" />     {/* 通义千问 */}
          <line x1="128" y1="128" x2="276.5" y2="64" />     {/* 文心一言 */}
          <line x1="128" y1="128" x2="20.5" y2="243.2" />   {/* DeepSeek */}
          <line x1="128" y1="128" x2="235.5" y2="243.2" />  {/* Kimi */}
        </g>
        <defs>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* Central Brand Core Nucleus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-cyan-900/10 rounded-full flex items-center justify-center border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <div className="absolute inset-0 rounded-full animate-pulse bg-cyan-500/5"></div>
        <div className="relative z-20 w-10 h-10 text-cyan-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="absolute -bottom-8 whitespace-nowrap text-center">
           <span className="text-[7px] text-cyan-400/60 font-orbitron font-bold tracking-[0.2em]">CORE SYNCED</span>
        </div>
      </div>
    </div>
  </div>
);

const Hero: React.FC = () => (
  <section id="home" className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
    <div className="scanline"></div>
    <div className="absolute inset-0 bg-tech-gradient opacity-40"></div>
    <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="z-20">
        <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs rounded-full mb-6 font-orbitron tracking-widest uppercase">AI Search Engine Optimization</div>
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">让品牌在 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 neon-blue">AI大模型</span> <br /> 时代领航曝光</h1>
        <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">Geolift 助力品牌在豆包、DeepSeek、通义千问、Kimi等主流AI平台实现GEO优化。重构内容语义，占据AI引用的首选占位。</p>
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-xl transition-all transform hover:-translate-y-1">开启GEO优化之旅</button>
          <button className="px-8 py-4 glass text-white font-bold rounded-lg hover:bg-white/5 transition-all">查看技术白皮书</button>
        </div>
      </div>
      <div className="relative hidden md:block group z-10">
        <GeoVisualCore />
      </div>
    </div>
  </section>
);

const CaseStudySection: React.FC = () => {
  const cases = [
    {
      title: "垂直平台霸屏：藏玉 App",
      category: "行业垂直渠道",
      metric: "搜索首屏提及率 100%",
      desc: "通过精准内容占位，使该厂家在藏玉App搜索中稳居核心优势推荐位。",
      color: "cyan"
    },
    {
      title: "DeepSeek 精准推荐案例",
      category: "AI大模型收录",
      metric: "推荐厂家第一顺位",
      desc: "在DeepSeek针对机械加工厂商的咨询中，实现首推，并完整呈现核心优势。",
      color: "blue"
    },
    {
      title: "豆包转化实测：30万订单",
      category: "社交转化反馈",
      metric: "单月转化超 30w",
      desc: "真实客户反馈：客户通过豆包搜索主动咨询，单月实现30万回款，效果远超传统竞价。",
      color: "purple"
    },
    {
      title: "法律咨询引流：律所反馈",
      category: "专业服务获客",
      metric: "获客精准度 +85%",
      desc: "律所客户通过豆包咨询并留电。证明GEO在专业、严谨行业同样具有高价值。",
      color: "emerald"
    }
  ];

  return (
    <section id="cases" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">客户实测反馈 & 案例</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">AI不再是未来的口号，而是正在发生的真实流量增长。看 Geolift 如何改变品牌的搜索权力和获客逻辑。</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="group relative glass p-6 rounded-2xl border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${c.color}-500/5 blur-3xl group-hover:bg-${c.color}-500/10 transition-colors`}></div>
              
              <div className="mb-4">
                <span className="text-[10px] font-orbitron uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">{c.category}</span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{c.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{c.desc}</p>
              
              <div className="mt-auto border-t border-white/10 pt-4">
                <div className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {c.metric.split(' ')[0]}
                  <span className="text-xs ml-1 text-gray-500 uppercase">{c.metric.split(' ').slice(1).join(' ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real Feedback Chat Mockups */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 opacity-80">
          <div className="glass p-4 rounded-2xl border-white/5 rotate-[-1deg] hover:rotate-0 transition-transform cursor-default">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px]">王总</div>
               <div className="text-xs text-gray-500">来自 豆包 渠道反馈</div>
             </div>
             <div className="bg-white/5 p-3 rounded-lg text-xs text-gray-300 mb-2">“效果真好，客户从豆包找到我的，30万打款搞定！”</div>
             <div className="bg-cyan-500/10 p-2 rounded-lg text-[10px] text-cyan-400">✅ 验证有效：AI直接转化大额订单</div>
          </div>
          
          <div className="glass p-4 rounded-2xl border-white/5 rotate-[2deg] hover:rotate-0 transition-transform cursor-default">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px]">律所</div>
               <div className="text-xs text-gray-500">来自 豆包 法律服务</div>
             </div>
             <div className="bg-white/5 p-3 rounded-lg text-xs text-gray-300 mb-2">“上周接了2个电话，都是通过豆包来的。能优化出联系方式，确实有用。”</div>
             <div className="bg-purple-500/10 p-2 rounded-lg text-[10px] text-purple-400">✅ 成功留电：专业服务精准触达</div>
          </div>

          <div className="glass p-4 rounded-2xl border-white/5 rotate-[-2deg] hover:rotate-0 transition-transform cursor-default">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px]">科瑞</div>
               <div className="text-xs text-gray-500">来自 DeepSeek 渠道</div>
             </div>
             <div className="bg-white/5 p-3 rounded-lg text-xs text-gray-300 mb-2">“DeepSeek来了个客户，下午来验厂，争取拿下。”</div>
             <div className="bg-blue-500/10 p-2 rounded-lg text-[10px] text-blue-400">✅ 到店验厂：从云端推荐到线下落地</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AdvantageSection: React.FC = () => (
  <section id="advantages" className="py-24 bg-black/50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">核心竞争优势</h2>
        <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {ADVANTAGES.map((adv, idx) => (
          <div key={idx} className="glass p-8 rounded-2xl border-cyan-500/10 hover:border-cyan-500/40 transition-all group">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">{adv.icon}</div>
            <h3 className="text-xl font-bold mb-4 text-cyan-50">{adv.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{adv.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServiceSection: React.FC = () => (
  <section id="service" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">全链路GEO服务体系</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">从底层算法监测到内容收录，从意图捕捉到流量转化，提供全方位的生成式引擎优化方案。</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICE_STEPS.map((step) => (
          <div key={step.id} className="glass rounded-xl p-6 border-white/5 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-4xl font-orbitron font-bold text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors">{step.id}</div>
            <h4 className="text-lg font-bold mb-3 text-cyan-400">{step.title}</h4>
            <div className="mb-4">
              <span className="text-xs uppercase text-gray-500 block mb-1">目标</span>
              <p className="text-sm text-gray-300 font-medium">{step.target}</p>
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase text-gray-500 block">执行要点</span>
              <ul className="text-xs text-gray-400 space-y-2">
                {step.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AIDemo: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeGEO = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `作为一个GEO优化专家，分析输入: "${prompt}"。格式JSON：targetUser, searchIntent, gapScore, suggestions(3).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              targetUser: { type: Type.STRING },
              searchIntent: { type: Type.STRING },
              gapScore: { type: Type.NUMBER },
              suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["targetUser", "searchIntent", "gapScore", "suggestions"]
          }
        }
      });
      setResult(JSON.parse(response.text || "{}"));
    } catch (err) {
      setResult({ targetUser: "无法识别", searchIntent: "分析失败", gapScore: 0, suggestions: ["重试"] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-demo" className="py-24 bg-gradient-to-b from-black to-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass p-8 md:p-12 rounded-3xl border-cyan-500/20 shadow-2xl">
          <div className="mb-8 text-center">
             <h2 className="text-2xl font-bold text-white mb-2">GEO 意图雷达 (AI测试版)</h2>
             <p className="text-gray-400 text-sm">输入品牌或产品，体验智能体捕捉能力</p>
          </div>
          <div className="flex gap-4 mb-8">
            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="例如：高端智能新能源车、Geolift..." className="flex-1 bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
            <button onClick={analyzeGEO} disabled={loading} className="px-8 py-4 bg-cyan-600 rounded-xl text-white font-bold disabled:opacity-50 hover:bg-cyan-500 transition-all flex items-center gap-2">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "分析意图"}
            </button>
          </div>
          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-xs text-cyan-400 uppercase font-bold block mb-1">用户画像</span>
                  <p className="text-gray-200">{result.targetUser}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-xs text-purple-400 uppercase font-bold block mb-1">AI 缺口评分</span>
                  <p className="text-2xl font-orbitron text-white">{result.gapScore}</p>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xs text-orange-400 uppercase font-bold block mb-1">关键搜索意图</span>
                <p className="text-gray-300">{result.searchIntent}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="py-12 border-t border-white/5 bg-black">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-cyan-500 rounded-sm transform rotate-45 flex items-center justify-center">
            <span className="text-black font-bold -rotate-45 text-xs">G</span>
          </div>
          <span className="font-orbitron text-xl font-bold tracking-widest text-white">GEOLIFT</span>
        </div>
        <p className="text-gray-500 text-sm max-w-sm leading-relaxed">Geolift 是中国领先的 GEO 服务平台。助力品牌在 AI 驱动的信息传播时代占据先机。</p>
      </div>
      <div>
        <h5 className="text-white font-bold mb-6">联系我们</h5>
        <ul className="text-gray-500 text-sm space-y-4">
          <li>商务咨询：business@geolift.ai</li>
          <li>服务热线：400-XXX-XXXX</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 text-center border-t border-white/5 pt-8 text-xs text-gray-600">
      © {new Date().getFullYear()} Geolift AI. All Rights Reserved.
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AdvantageSection />
        <ServiceSection />
        <CaseStudySection />
        <AIDemo />
        <section className="py-24 text-center glass m-6 rounded-3xl border-cyan-500/20">
          <h2 className="text-4xl font-bold mb-8 text-white">准备好迎接AI流量爆发了吗？</h2>
          <button className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white font-bold shadow-xl hover:scale-105 transition-all">免费品牌GEO体检</button>
        </section>
      </main>
      <Footer />
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes reverse-spin { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes scan-y { 0% { top: 0; opacity: 0; } 50% { opacity: 0.3; } 100% { top: 100%; opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0) translateX(-50%); } 50% { transform: translateY(-10px) translateX(-50%); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes dash { to { stroke-dashoffset: 24; } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
        .animate-shimmer { animation: shimmer 5s linear infinite; }
        .animate-scan-y { animation: scan-y 4s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-dash { animation: dash 10s linear infinite; }
      `}</style>
    </div>
  );
}
