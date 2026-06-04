export const injectStyles = () => {
  if (document.getElementById("dng-s")) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=VT323&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap";
  document.head.appendChild(l);
  const s = document.createElement("style");
  s.id = "dng-s";
  s.textContent = `
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:#08080f!important;color:#f0ede8;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#08080f;}::-webkit-scrollbar-thumb{background:#c41e3a;border-radius:2px;}
    @keyframes flicker{0%,100%{opacity:1}48%{opacity:1}50%{opacity:.6}52%{opacity:1}73%{opacity:.9}75%{opacity:1}}
    @keyframes glitch{0%,85%,100%{clip-path:none;transform:none}86%{clip-path:inset(10% 0 85% 0);transform:translate(-3px)}88%{clip-path:inset(60% 0 30% 0);transform:translate(3px,-2px)}90%{clip-path:none;transform:none}}
    @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes fadeOut{from{opacity:1}to{opacity:0}}
    @keyframes pulseRed{0%,100%{box-shadow:0 0 6px #c41e3a20}50%{box-shadow:0 0 22px #c41e3a60}}
    @keyframes scanline{0%{top:-4px}100%{top:100%}}
    @keyframes hopePulse{0%,100%{opacity:.7}50%{opacity:1}}
    @keyframes crtExpand{0%{transform:scaleY(0.01) scaleX(1);opacity:1}30%{transform:scaleY(0.01) scaleX(1)}60%{transform:scaleY(1) scaleX(1.01)}80%{transform:scaleY(1) scaleX(1.01)}100%{transform:scaleY(1) scaleX(1)}}
    @keyframes crtCollapse{0%{transform:scaleY(1);opacity:1}40%{transform:scaleY(0.02) scaleX(1.04);opacity:1}60%{transform:scaleY(0.02) scaleX(0);opacity:.6}100%{transform:scaleY(0) scaleX(0);opacity:0}}
    @keyframes staticNoise{0%{background-position:0 0}10%{background-position:-5% -10%}20%{background-position:-15% 5%}30%{background-position:7% -25%}40%{background-position:20% 25%}50%{background-position:-25% 10%}60%{background-position:15% 5%}70%{background-position:0% 15%}80%{background-position:25% 35%}90%{background-position:-10% 10%}100%{background-position:0 0}}
    @keyframes scanSweep{0%{top:-8px;opacity:1}100%{top:110%;opacity:.4}}
    @keyframes typewriter{from{width:0}to{width:100%}}
    @keyframes charLoad{0%{opacity:0;transform:translateY(30px) scale(.9)}60%{opacity:1;transform:translateY(-4px) scale(1.02)}100%{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes bootFlash{0%{opacity:0}50%{opacity:.3}100%{opacity:0}}
    @keyframes screenOn{0%{filter:brightness(3) blur(8px);opacity:0}40%{filter:brightness(2) blur(2px);opacity:1}70%{filter:brightness(1.3) blur(0px)}100%{filter:brightness(1) blur(0)}}
    .flicker{animation:flicker 5s infinite;}
    .glitch{animation:glitch 8s infinite;}
    .slide{animation:slideUp .3s ease-out;}
    .fade{animation:fadeIn .4s ease;}
    .pulse{animation:pulseRed 2.5s infinite;}
    .title{font-family:'Bebas Neue',sans-serif!important;letter-spacing:3px;}
    .pixel{font-family:'VT323',monospace!important;}
    .type{font-family:'Courier Prime',monospace!important;}
    input,textarea,select{font-family:'Courier Prime',monospace!important;background:#10101e!important;color:#f0ede8!important;border:1px solid #2a2a3e!important;border-radius:2px!important;padding:6px 10px!important;}
    input:focus,textarea:focus{border-color:#c41e3a!important;outline:none!important;box-shadow:0 0 10px #c41e3a25!important;}
    button{font-family:'Courier Prime',monospace!important;cursor:pointer;}
    button:hover{opacity:.85;}
    table{border-collapse:collapse;width:100%;}
    th{background:#12121e;color:#c41e3a;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;padding:7px 10px;text-align:left;border-bottom:1px solid #2a2a3e;}
    td{padding:6px 10px;border-bottom:1px solid #1a1a28;font-size:12px;vertical-align:middle;}
    tr:hover td{background:#141426;}
    .scrollbar-hide::-webkit-scrollbar{display:none;}
    .scanline-overlay{pointer-events:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:9998;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.04) 2px,rgba(0,0,0,.04) 4px);}
    .crt-screen{animation:crtExpand .55s cubic-bezier(.22,1,.36,1) forwards;}
    .crt-off{animation:crtCollapse .45s ease-in forwards;}
    .screen-on{animation:screenOn .8s ease-out forwards;}
    .static-bg{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E");background-size:128px;animation:staticNoise .08s steps(1) infinite;}
  `;
  document.head.appendChild(s);
};
