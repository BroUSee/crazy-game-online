/**
 * CRAZY GAME ONLINE — Main JS
 * Features: Search, Nav filters, Game thumbnails, Lazy load
 */
'use strict';

// ── DOM REFS ──────────────────────────────────
const gamesGrid   = document.getElementById('games-grid');
const gamesCount  = document.getElementById('games-count');
const filtersWrap = document.getElementById('filters-wrap');
const searchInput = document.getElementById('search-input');
const noResults   = document.getElementById('no-results');
const backToTop   = document.getElementById('back-to-top');
const hamburger   = document.getElementById('hamburger');
const mobileNav   = document.getElementById('mobile-nav');

// ── STATE ─────────────────────────────────────
let activeFilter = 'all';
let searchQuery  = '';

// ── GAME THUMBNAILS ───────────────────────────
// Each game gets a unique CSS-generated thumbnail design
const THUMBNAILS = {
  // Our original games
  'snake':              { bg: 'linear-gradient(135deg,#052e16,#14532d)', scene: 'snake' },
  '2048':               { bg: 'linear-gradient(135deg,#431407,#7c2d12)', scene: '2048' },
  'memory-match':       { bg: 'linear-gradient(135deg,#1e1b4b,#312e81)', scene: 'memory' },
  'whack-a-mole':       { bg: 'linear-gradient(135deg,#14532d,#166534)', scene: 'wam' },
  'flappy-bird':        { bg: 'linear-gradient(135deg,#0c4a6e,#0369a1)', scene: 'flappy' },
  'brick-breaker':      { bg: 'linear-gradient(135deg,#450a0a,#7f1d1d)', scene: 'brick' },
  'typing-speed':       { bg: 'linear-gradient(135deg,#1e1b4b,#4338ca)', scene: 'typing' },
  'math-quiz':          { bg: 'linear-gradient(135deg,#052e16,#065f46)', scene: 'math' },
  'word-scramble':      { bg: 'linear-gradient(135deg,#431407,#92400e)', scene: 'word' },
  'color-match':        { bg: 'linear-gradient(135deg,#2e1065,#6d28d9)', scene: 'color' },
  'brick-break':        { bg: 'linear-gradient(135deg,#450a0a,#7f1d1d)', scene: 'brick' },
  'number-guess':       { bg: 'linear-gradient(135deg,#0f172a,#1e3a5f)', scene: 'guess' },
  'reaction-time':      { bg: 'linear-gradient(135deg,#1a0533,#4c1d95)', scene: 'reaction' },
  'sudoku':             { bg: 'linear-gradient(135deg,#0f172a,#1e293b)', scene: 'sudoku' },
  'tic-tac-toe':        { bg: 'linear-gradient(135deg,#450a0a,#991b1b)', scene: 'ttt' },
  'pong':               { bg: 'linear-gradient(135deg,#0f172a,#1e293b)', scene: 'pong' },
  'connect-four':       { bg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)', scene: 'c4' },
  'chess':              { bg: 'linear-gradient(135deg,#1c1917,#292524)', scene: 'chess' },
  'battleship':         { bg: 'linear-gradient(135deg,#0c4a6e,#075985)', scene: 'battle' },
  'rock-paper-scissors':{ bg: 'linear-gradient(135deg,#4a044e,#86198f)', scene: 'rps' },
  'quiz-trivia':        { bg: 'linear-gradient(135deg,#14532d,#15803d)', scene: 'quiz' },
  'science-quiz':       { bg: 'linear-gradient(135deg,#042f2e,#134e4a)', scene: 'science' },
  'geography-quiz':     { bg: 'linear-gradient(135deg,#0c4a6e,#0369a1)', scene: 'geo' },
  'battleground':       { bg: 'linear-gradient(135deg,#1c1917,#292524)', scene: 'fps' },
  // iFrame games — real colorful thumbnails
  'subway-surfers':     { bg: 'linear-gradient(135deg,#1d4ed8,#7c3aed)', scene: 'subway' },
  'temple-run':         { bg: 'linear-gradient(135deg,#92400e,#b45309)', scene: 'temple' },
  'minecraft-classic':  { bg: 'linear-gradient(135deg,#14532d,#15803d)', scene: 'minecraft' },
  'slope-game':         { bg: 'linear-gradient(135deg,#1e3a8a,#0369a1)', scene: 'slope' },
  'drift-hunters':      { bg: 'linear-gradient(135deg,#450a0a,#dc2626)', scene: 'drift' },
  'moto-x3m':           { bg: 'linear-gradient(135deg,#431407,#f97316)', scene: 'moto' },
  'stickman-hook':      { bg: 'linear-gradient(135deg,#2e1065,#7c3aed)', scene: 'stickman' },
  'fireboy-watergirl':  { bg: 'linear-gradient(135deg,#7f1d1d,#1d4ed8)', scene: 'fbwg' },
  '8-ball-pool':        { bg: 'linear-gradient(135deg,#14532d,#166534)', scene: 'pool' },
  'basketball-stars':   { bg: 'linear-gradient(135deg,#7c2d12,#c2410c)', scene: 'bball' },
  'geometry-dash':      { bg: 'linear-gradient(135deg,#1e1b4b,#4f46e5)', scene: 'geo-dash' },
  'cut-the-rope':       { bg: 'linear-gradient(135deg,#052e16,#166534)', scene: 'rope' },
  'angry-birds':        { bg: 'linear-gradient(135deg,#7f1d1d,#dc2626)', scene: 'angry' },
  'bloons-td':          { bg: 'linear-gradient(135deg,#0c4a6e,#0284c7)', scene: 'bloons' },
  'happy-wheels':       { bg: 'linear-gradient(135deg,#450a0a,#991b1b)', scene: 'wheels' },
};

// ── SCENE RENDERER — draws unique visuals per game ──
function renderScene(scene, emoji) {
  const scenes = {
    snake: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden">
        <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:18px 18px;"></div>
        <div style="position:absolute;top:30%;left:20%;width:12px;height:12px;background:#4ade80;border-radius:3px;box-shadow:18px 0 0 #4ade80,36px 0 0 #4ade80,54px 0 0 #4ade80,54px -18px 0 #4ade80"></div>
        <div style="position:absolute;top:40%;left:55%;font-size:1.4rem">🍎</div>
        <div style="position:absolute;bottom:20%;right:20%;font-size:2.5rem;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.5))">🐍</div>
      </div>`,
    '2048': `
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:10px;height:100%">
        ${['2','4','8','16','32','64','128','256','512','1024','2048','','4','8','2','4'].map(n=>
          `<div style="background:${n==='2048'?'#edc22e':n?'rgba(255,255,255,0.12)':'rgba(255,255,255,0.05)'};border-radius:4px;display:flex;align-items:center;justify-content:center;font-family:Sora,sans-serif;font-weight:800;font-size:${n==='2048'?'0.55rem':n&&n.length>3?'0.5rem':'0.65rem'};color:${n==='2048'?'#000':'rgba(255,255,255,0.8)'}">${n}</div>`
        ).join('')}
      </div>`,
    memory: `
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:12px;height:100%">
        ${['🐶','?','🐱','?','?','🐶','🐱','?','🦊','?','?','🦊','?','🐼','🐼','?'].map((e,i)=>
          `<div style="background:${e==='?'?'linear-gradient(135deg,#6c63ff,#4f46e5)':'rgba(255,255,255,0.1)'};border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:0.85rem;border:1px solid rgba(255,255,255,0.15)">${e==='?'?'':e}</div>`
        ).join('')}
      </div>`,
    pong: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden">
        <div style="position:absolute;left:50%;top:0;bottom:0;width:2px;background:repeating-linear-gradient(to bottom,rgba(255,255,255,0.3) 0,rgba(255,255,255,0.3) 8px,transparent 8px,transparent 16px)"></div>
        <div style="position:absolute;left:8%;top:25%;width:6px;height:35%;background:#fff;border-radius:3px"></div>
        <div style="position:absolute;right:8%;top:40%;width:6px;height:35%;background:#fff;border-radius:3px"></div>
        <div style="position:absolute;top:45%;left:48%;width:12px;height:12px;background:#fff;border-radius:50%;box-shadow:0 0 10px #fff"></div>
        <div style="position:absolute;top:8px;left:30%;font-family:Sora,sans-serif;font-size:1.2rem;font-weight:800;color:white">5</div>
        <div style="position:absolute;top:8px;right:30%;font-family:Sora,sans-serif;font-size:1.2rem;font-weight:800;color:white">3</div>
      </div>`,
    chess: `
      <div style="display:grid;grid-template-columns:repeat(8,1fr);height:100%;padding:6px;gap:1px">
        ${Array(64).fill(0).map((_,i)=>{
          const row=Math.floor(i/8),col=i%8,light=(row+col)%2===0;
          const pieces={0:'♜',1:'♞',2:'♝',3:'♛',4:'♚',7:'♟',56:'♖',60:'♔',63:'♗',55:'♙',48:'♙'};
          return `<div style="background:${light?'rgba(232,201,154,0.7)':'rgba(181,136,99,0.7)'};display:flex;align-items:center;justify-content:center;font-size:0.5rem;border-radius:1px">${pieces[i]||''}</div>`;
        }).join('')}
      </div>`,
    ttt: `
      <div style="position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0;width:80%;aspect-ratio:1">
          ${['❌','⭕','❌','⭕','❌','','⭕','','⭕'].map(v=>
            `<div style="border:2px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:1.2rem;aspect-ratio:1">${v}</div>`
          ).join('')}
        </div>
      </div>`,
    c4: `
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;padding:8px;height:100%">
        ${Array(42).fill(0).map((_,i)=>{
          const colors=['','','','#ef4444','','','','','','#ffd32a','','#ef4444','','','#ffd32a','#ef4444','#ffd32a','#ef4444','#ffd32a','#ef4444','','#ffd32a','#ef4444','#ffd32a','#ef4444','#ffd32a','#ef4444','#ffd32a','#ef4444','#ffd32a','#ef4444','#ffd32a','#ef4444','#ffd32a','#ef4444','#ffd32a','#ef4444','#ffd32a','#ef4444','#ffd32a','#ef4444','#ffd32a'];
          return `<div style="background:${colors[i]||'rgba(255,255,255,0.08)'};border-radius:50%;aspect-ratio:1;border:1px solid rgba(255,255,255,0.1)"></div>`;
        }).join('')}
      </div>`,
    fps: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden">
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,#0a0f1a 0%,#1a2535 40%,#1a1008 60%,#0a0704 100%)"></div>
        <div style="position:absolute;top:35%;left:50%;transform:translateX(-50%);width:2px;height:25px;background:rgba(255,255,255,0.7)"></div>
        <div style="position:absolute;top:47%;left:50%;transform:translate(-50%,-50%);width:20px;height:2px;background:rgba(255,255,255,0.7)"></div>
        <div style="position:absolute;top:30%;left:35%;font-size:1.8rem;filter:drop-shadow(0 0 8px rgba(239,68,68,0.8))">👾</div>
        <div style="position:absolute;top:25%;right:25%;font-size:1.5rem;filter:drop-shadow(0 0 8px rgba(239,68,68,0.8))">👾</div>
        <div style="position:absolute;bottom:15%;right:10%;font-size:1.2rem">🔫</div>
      </div>`,
    subway: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:linear-gradient(180deg,#1d4ed8,#7c3aed)">
        <div style="position:absolute;bottom:0;left:0;right:0;height:35%;background:#1e293b"></div>
        <div style="position:absolute;bottom:33%;left:15%;width:8px;height:60%;background:#374151;border-radius:2px"></div>
        <div style="position:absolute;bottom:33%;left:45%;width:8px;height:70%;background:#374151;border-radius:2px"></div>
        <div style="position:absolute;bottom:33%;right:15%;width:8px;height:55%;background:#374151;border-radius:2px"></div>
        <div style="position:absolute;bottom:32%;left:50%;transform:translateX(-50%);font-size:2rem;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.5))">🏃</div>
        <div style="position:absolute;top:10%;right:10%;background:#facc15;color:#000;font-family:Sora,sans-serif;font-weight:900;font-size:0.6rem;padding:2px 8px;border-radius:50px">SUBWAY SURFERS</div>
      </div>`,
    temple: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden">
        <div style="position:absolute;inset:0;background:linear-gradient(180deg,#92400e,#78350f)"></div>
        <div style="position:absolute;bottom:0;left:0;right:0;height:30%;background:#451a03"></div>
        <div style="position:absolute;bottom:28%;left:50%;transform:translateX(-50%);width:70%;height:4px;background:rgba(255,255,255,0.2)"></div>
        <div style="position:absolute;bottom:28%;left:50%;transform:translateX(-50%);width:70%;height:4px;background:rgba(255,255,255,0.2);margin-bottom:12px"></div>
        <div style="position:absolute;bottom:30%;left:50%;transform:translateX(-50%);font-size:2.2rem;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.6))">🏃</div>
        <div style="position:absolute;top:15%;left:50%;transform:translateX(-50%);font-size:1.8rem">🏛️</div>
        <div style="position:absolute;top:8%;right:8%;background:#ef4444;color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.55rem;padding:2px 6px;border-radius:50px">TEMPLE RUN</div>
      </div>`,
    minecraft: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;image-rendering:pixelated">
        <div style="position:absolute;inset:0;background:linear-gradient(180deg,#87ceeb 0%,#87ceeb 60%,#228b22 60%,#228b22 70%,#8b4513 70%,#8b4513 100%)"></div>
        <div style="position:absolute;top:58%;left:20%;width:14px;height:14px;background:#228b22;border:2px solid #155724"></div>
        <div style="position:absolute;top:58%;left:40%;width:14px;height:14px;background:#228b22;border:2px solid #155724"></div>
        <div style="position:absolute;top:58%;left:60%;width:14px;height:14px;background:#228b22;border:2px solid #155724"></div>
        <div style="position:absolute;top:35%;left:30%;width:18px;height:22px;background:#8b4513;border:2px solid #5c2d0e"></div>
        <div style="position:absolute;top:30%;left:30%;width:18px;height:8px;background:#228b22;border:2px solid #155724"></div>
        <div style="position:absolute;top:8%;right:8%;background:#facc15;color:#000;font-family:Sora,sans-serif;font-weight:900;font-size:0.55rem;padding:2px 6px;border-radius:50px">MINECRAFT</div>
        <div style="position:absolute;bottom:5%;right:10%;font-size:1.5rem">⛏️</div>
      </div>`,
    slope: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:#0f172a">
        <div style="position:absolute;inset:0;background-image:repeating-linear-gradient(45deg,rgba(59,130,246,0.1) 0,rgba(59,130,246,0.1) 2px,transparent 2px,transparent 20px)"></div>
        <div style="position:absolute;top:20%;left:10%;width:85%;height:5px;background:linear-gradient(90deg,#3b82f6,#8b5cf6);transform:rotate(8deg);border-radius:3px"></div>
        <div style="position:absolute;top:40%;left:5%;width:90%;height:5px;background:linear-gradient(90deg,#3b82f6,#8b5cf6);transform:rotate(-5deg);border-radius:3px"></div>
        <div style="position:absolute;top:32%;left:55%;width:20px;height:20px;background:#3b82f6;border-radius:50%;box-shadow:0 0 15px #3b82f6"></div>
        <div style="position:absolute;top:8%;right:8%;background:#3b82f6;color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.55rem;padding:2px 6px;border-radius:50px">SLOPE</div>
      </div>`,
    drift: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:#1c1917">
        <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 100%,rgba(239,68,68,0.2),transparent 70%)"></div>
        <div style="position:absolute;bottom:20%;left:50%;transform:translateX(-50%);font-size:2.5rem;filter:drop-shadow(0 0 12px rgba(239,68,68,0.7))">🚗</div>
        <div style="position:absolute;bottom:15%;left:10%;right:10%;height:3px;background:rgba(255,255,255,0.15);border-radius:2px"></div>
        <div style="position:absolute;bottom:18%;left:8%;right:8%;height:1px;background:rgba(255,255,255,0.08)"></div>
        <div style="position:absolute;top:8%;right:8%;background:#ef4444;color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.55rem;padding:2px 6px;border-radius:50px">DRIFT HUNTERS</div>
        <div style="position:absolute;bottom:35%;left:15%;width:30px;height:4px;background:rgba(239,68,68,0.6);border-radius:2px;transform:rotate(-20deg)"></div>
      </div>`,
    moto: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:#0c0a00">
        <div style="position:absolute;inset:0;background:linear-gradient(180deg,#1c1400,#0c0a00)"></div>
        <div style="position:absolute;bottom:25%;left:0;right:0;height:3px;background:rgba(245,158,11,0.4)"></div>
        <div style="position:absolute;bottom:25%;left:60%;width:20px;height:20px;background:#374151;border-radius:50%;border:3px solid #6b7280"></div>
        <div style="position:absolute;bottom:28%;left:55%;font-size:2rem;filter:drop-shadow(0 0 10px rgba(245,158,11,0.6))">🏍️</div>
        <div style="position:absolute;top:20%;right:15%;width:8px;height:30%;background:#ef4444;border-radius:2px;transform:rotate(-15deg)"></div>
        <div style="position:absolute;top:8%;right:8%;background:#f59e0b;color:#000;font-family:Sora,sans-serif;font-weight:900;font-size:0.55rem;padding:2px 6px;border-radius:50px">MOTO X3M</div>
      </div>`,
    stickman: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:#1a0533">
        <div style="position:absolute;top:30%;left:50%;width:2px;height:40%;background:rgba(167,139,250,0.4);transform-origin:top center;transform:rotate(15deg)"></div>
        <div style="position:absolute;top:20%;left:48%;font-size:1.8rem">🕷️</div>
        <div style="position:absolute;top:8%;right:8%;background:#7c3aed;color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.5rem;padding:2px 6px;border-radius:50px">STICKMAN HOOK</div>
        <div style="position:absolute;bottom:20%;left:20%;width:60%;height:4px;background:rgba(167,139,250,0.3);border-radius:2px"></div>
        <div style="position:absolute;bottom:15%;right:20%;width:40%;height:4px;background:rgba(167,139,250,0.2);border-radius:2px"></div>
      </div>`,
    fbwg: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden">
        <div style="position:absolute;left:0;width:50%;height:100%;background:linear-gradient(135deg,#7f1d1d,#991b1b)"></div>
        <div style="position:absolute;right:0;width:50%;height:100%;background:linear-gradient(135deg,#1d4ed8,#1e40af)"></div>
        <div style="position:absolute;top:30%;left:20%;font-size:2rem;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.5))">🔥</div>
        <div style="position:absolute;top:30%;right:20%;font-size:2rem;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.5))">💧</div>
        <div style="position:absolute;top:8%;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.5);color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.5rem;padding:2px 8px;border-radius:50px;white-space:nowrap">FIREBOY & WATERGIRL</div>
      </div>`,
    pool: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:#14532d">
        <div style="position:absolute;inset:6px;border:3px solid #166534;border-radius:4px"></div>
        <div style="position:absolute;top:40%;left:45%;width:14px;height:14px;background:#fff;border-radius:50%;box-shadow:0 0 6px rgba(255,255,255,0.5)"></div>
        <div style="position:absolute;top:30%;left:30%;width:11px;height:11px;background:#ef4444;border-radius:50%"></div>
        <div style="position:absolute;top:50%;left:55%;width:11px;height:11px;background:#3b82f6;border-radius:50%"></div>
        <div style="position:absolute;top:45%;left:25%;width:11px;height:11px;background:#facc15;border-radius:50%"></div>
        <div style="position:absolute;top:35%;right:25%;width:11px;height:11px;background:#a855f7;border-radius:50%"></div>
        <div style="position:absolute;top:8%;right:8%;background:#1a1a1a;color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.55rem;padding:2px 6px;border-radius:50px">8 BALL POOL</div>
        <div style="position:absolute;bottom:20%;left:20%;width:55%;height:3px;background:rgba(139,90,43,0.8);border-radius:2px;transform:rotate(-20deg)"></div>
      </div>`,
    bball: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:linear-gradient(180deg,#7c2d12,#1c1917)">
        <div style="position:absolute;top:8%;left:50%;transform:translateX(-50%);width:30px;height:30px;border:3px solid #f97316;border-radius:50%;box-shadow:0 0 10px rgba(249,115,22,0.5)"></div>
        <div style="position:absolute;top:28%;left:50%;transform:translateX(-50%);width:2px;height:20%;background:rgba(255,255,255,0.4)"></div>
        <div style="position:absolute;top:45%;left:50%;transform:translateX(-50%);font-size:1.8rem;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.5))">🏀</div>
        <div style="position:absolute;top:8%;right:8%;background:#f97316;color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.5rem;padding:2px 6px;border-radius:50px">BASKETBALL STARS</div>
      </div>`,
    'geo-dash': `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:#0f0b30">
        <div style="position:absolute;bottom:30%;left:0;right:0;height:2px;background:rgba(99,102,241,0.5)"></div>
        <div style="position:absolute;bottom:30%;left:20%;width:16px;height:16px;background:#6366f1;transform:rotate(45deg);box-shadow:0 0 10px #6366f1"></div>
        <div style="position:absolute;bottom:30%;left:45%;width:14px;height:22px;background:#ef4444;box-shadow:0 0 8px #ef4444"></div>
        <div style="position:absolute;bottom:30%;left:65%;width:18px;height:18px;background:#6366f1;border-radius:50%;box-shadow:0 0 8px #6366f1"></div>
        <div style="position:absolute;top:8%;right:8%;background:#6366f1;color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.5rem;padding:2px 6px;border-radius:50px">GEOMETRY DASH</div>
      </div>`,
    rope: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:#052e16">
        <div style="position:absolute;top:15%;left:50%;width:2px;height:40%;background:rgba(74,222,128,0.5)"></div>
        <div style="position:absolute;top:10%;left:45%;width:12px;height:5px;background:rgba(74,222,128,0.5);border-radius:2px"></div>
        <div style="position:absolute;top:50%;left:46%;font-size:1.8rem">🍬</div>
        <div style="position:absolute;top:8%;right:8%;background:#16a34a;color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.5rem;padding:2px 6px;border-radius:50px">CUT THE ROPE</div>
        <div style="position:absolute;bottom:25%;left:30%;font-size:1.5rem">🐸</div>
      </div>`,
    angry: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:linear-gradient(180deg,#bfdbfe,#93c5fd 60%,#6b7280 60%,#4b5563 100%)">
        <div style="position:absolute;bottom:38%;right:20%;width:20px;height:25px;background:#6b7280;border-radius:3px 3px 0 0"></div>
        <div style="position:absolute;bottom:38%;right:10%;width:15px;height:35px;background:#6b7280;border-radius:3px 3px 0 0"></div>
        <div style="position:absolute;bottom:35%;left:25%;font-size:1.5rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))">🐦</div>
        <div style="position:absolute;top:8%;right:8%;background:#ef4444;color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.5rem;padding:2px 6px;border-radius:50px">ANGRY BIRDS</div>
      </div>`,
    bloons: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:linear-gradient(180deg,#0c4a6e,#075985)">
        <div style="position:absolute;top:15%;left:15%;font-size:1.2rem;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.4))">🎈</div>
        <div style="position:absolute;top:10%;left:40%;font-size:1rem">🎈</div>
        <div style="position:absolute;top:20%;right:20%;font-size:1.4rem">🎈</div>
        <div style="position:absolute;bottom:20%;left:30%;font-size:1.5rem">🐒</div>
        <div style="position:absolute;top:8%;right:8%;background:#0369a1;color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.5rem;padding:2px 6px;border-radius:50px">BLOONS TD</div>
      </div>`,
    wheels: `
      <div style="position:relative;width:100%;height:100%;overflow:hidden;background:#1c0a0a">
        <div style="position:absolute;bottom:25%;left:0;right:0;height:4px;background:rgba(239,68,68,0.4)"></div>
        <div style="position:absolute;bottom:25%;left:30%;font-size:2rem;filter:drop-shadow(0 0 10px rgba(239,68,68,0.5))">🛞</div>
        <div style="position:absolute;top:20%;left:60%;width:12px;height:30%;background:#ef4444;border-radius:2px;transform:rotate(-30deg)"></div>
        <div style="position:absolute;top:8%;right:8%;background:#dc2626;color:#fff;font-family:Sora,sans-serif;font-weight:900;font-size:0.5rem;padding:2px 6px;border-radius:50px">HAPPY WHEELS</div>
      </div>`,
    // Defaults for others
    default: `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3.5rem;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4))">${emoji}</div>`
  };
  return scenes[scene] || `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3.5rem;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4))">${emoji}</div>`;
}

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderFilters();
  renderGames();
  setupSearch();
  setupBackToTop();
  setupHamburger();
  setupNavLinks();
  animateStats();
});

// ── RENDER FILTERS ────────────────────────────
function renderFilters() {
  if (!filtersWrap) return;
  filtersWrap.innerHTML = FILTERS.map(f => `
    <button
      class="filter-btn${f.id === activeFilter ? ' active' : ''}"
      data-filter="${f.id}"
      aria-pressed="${f.id === activeFilter}"
    >${f.label}</button>
  `).join('');

  filtersWrap.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      filtersWrap.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === activeFilter);
        b.setAttribute('aria-pressed', b.dataset.filter === activeFilter);
      });
      renderGames();
    });
  });
}

// ── SETUP NAV LINKS ───────────────────────────
function setupNavLinks() {
  const NAV_MAP = {
    '#all-games':  'all',
    '#single':     'single',
    '#two-player': 'two',
    '#trivia':     'trivia',
  };
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (NAV_MAP[href] !== undefined) {
        e.preventDefault();
        setFilter(NAV_MAP[href]);
        const el = document.getElementById('all-games');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        if (mobileNav) mobileNav.classList.remove('open');
      }
    });
  });
}

function setFilter(filterId) {
  activeFilter = filterId;
  if (filtersWrap) {
    filtersWrap.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === activeFilter);
      b.setAttribute('aria-pressed', b.dataset.filter === activeFilter);
    });
  }
  renderGames();
}

// ── RENDER GAMES ──────────────────────────────
function renderGames() {
  const filtered = GAMES.filter(g => {
    const matchFilter = activeFilter === 'all' || g.tags.includes(activeFilter);
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some(t => t.includes(q));
    return matchFilter && matchSearch;
  });

  if (!gamesGrid) return;

  if (filtered.length === 0) {
    gamesGrid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    if (gamesCount) gamesCount.textContent = '0 games';
    return;
  }

  if (noResults) noResults.style.display = 'none';
  if (gamesCount) gamesCount.textContent = `${filtered.length} game${filtered.length !== 1 ? 's' : ''}`;

  gamesGrid.innerHTML = filtered.map((game, i) => buildCard(game, i)).join('');
}

// ── BUILD CARD ────────────────────────────────
function buildCard(game, index) {
  const tagsHtml = game.tags.slice(0, 3).map(t => {
    const cfg = TAG_CONFIG[t] || { label: t, cls: 'tag-classic' };
    return `<span class="tag ${cfg.cls}">${cfg.label}</span>`;
  }).join('');

  const delay = Math.min(index * 40, 500);
  const thumb = THUMBNAILS[game.id] || { bg: `linear-gradient(135deg,${game.color}44,${game.color}22)`, scene: 'default' };

  return `
    <a
      class="game-card"
      href="${game.file}"
      title="Play ${game.title}"
      aria-label="Play ${game.title}"
      style="animation-delay:${delay}ms"
    >
      <div class="card-thumb" style="background:${thumb.bg};overflow:hidden;position:relative;">
        ${renderScene(thumb.scene, game.emoji)}
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.35));pointer-events:none;"></div>
      </div>
      <div class="card-body">
        <div class="card-title">${game.title}</div>
        <div class="card-desc">${game.description}</div>
        <div class="card-footer">
          <div class="card-tags">${tagsHtml}</div>
          <button class="play-btn" onclick="event.preventDefault();window.location.href='${game.file}'">
            ▶ Play
          </button>
        </div>
      </div>
    </a>
  `;
}

// ── SEARCH ────────────────────────────────────
function setupSearch() {
  if (!searchInput) return;
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = searchInput.value.trim();
      if (searchQuery && activeFilter !== 'all') {
        activeFilter = 'all';
        if (filtersWrap) {
          filtersWrap.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.filter === 'all');
          });
        }
      }
      renderGames();
    }, 200);
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      searchQuery = '';
      renderGames();
    }
  });
}

// ── BACK TO TOP ───────────────────────────────
function setupBackToTop() {
  if (!backToTop) return;
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── HAMBURGER ─────────────────────────────────
function setupHamburger() {
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
  });
}

// ── ANIMATE STATS ─────────────────────────────
function animateStats() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 20);
  });
}

// ── UTILS ─────────────────────────────────────
function saveHighScore(gameId, score) {
  try {
    const key = `cgo_hs_${gameId}`;
    const existing = parseInt(localStorage.getItem(key) || '0', 10);
    if (score > existing) localStorage.setItem(key, score);
  } catch(e) {}
}
function getHighScore(gameId) {
  try { return parseInt(localStorage.getItem(`cgo_hs_${gameId}`) || '0', 10); }
  catch(e) { return 0; }
}
window.CGO = { saveHighScore, getHighScore };
