import { useState, useEffect, useCallback, useRef } from "react";

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  STYLES & FONTS
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
const injectStyles = () => {
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

// Map of lock codes por personagem ÔÇö sobreescreva se quiser c├│digos customizados
// LOCK_CODES: c├│digos de recupera├º├úo por personagem (personalize se quiser)
// (defined after CHARS so CHARS exists)


// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  THEME
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
const T = {
  bg:"#08080f", s1:"#0d0d1a", s2:"#121220", s3:"#1a1a2a", s4:"#202032",
  bd:"#242438", bd2:"#32324c",
  red:"#c41e3a", redL:"#e0304e", redD:"#7a1225",
  yellow:"#f5c518", yellowD:"#c49a00",
  white:"#f0ede8", muted:"#8888a8", dim:"#505068",
  green:"#28883e", greenL:"#3dba60",
  blue:"#2060a8", purple:"#6028a8",
};

const ROLE_BADGE = {
  player: {bg:"#0e1e30", text:"#4d8fca", label:"JOGADOR"},
};

const STATUS_COLOR = { vivo:T.greenL, ferido:"#f5a020", morto:T.muted, executado:T.red };
const CLUE_COLORS = { fisica:"#2060a8", temporal:"#c4a010", testemunhal:"#207840", emocional:"#a02060", falsa:"#404040" };
const CLUE_LABELS = { fisica:"­ƒöÁ F├¡sica", temporal:"­ƒƒí Temporal", testemunhal:"­ƒƒó Testemunhal", emocional:"­ƒö┤ Emocional", falsa:"ÔÜ½ Falsa" };

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  DERIVED STATS
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
const derive = (a) => ({
  pvMax: a.RES*3+10,
  psMax: a.ESP*3+10,
  init:  a.INT+a.SOR,
  def:   Math.floor(a.RES/2),
  coinsMax: a.SOR*5,
});

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  CHARACTERS ÔÇö TURMA 67
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
const CHARS = [
  {
    id:1, num:"#01", pw:"haruki", role:"player", type:"Jogador",
    name:"Haruki Shimada", talent:"Supremo Arquiteto de Paisagens Imposs├¡veis",
    age:17, pro:"Ele/Dele",
    appear:"Alto, cabelos castanhos lisos e ├│culos redondos. Veste-se de forma met├│dica, sempre com o mesmo su├®ter azul escuro. Express├úo permanentemente calma. Carrega um caderno de esbo├ºos onde desenha sa├¡das e plantas de todo lugar que entra.",
    attrs:{ESP:10,INT:14,FUR:8,PER:9,RES:10,SOR:9},
    ability:{name:"Leitura Espacial",desc:"Uma vez por sess├úo, pode identificar automaticamente uma sa├¡da oculta, passagem secreta ou ponto cego de c├ómera em qualquer ambiente. Sem necessidade de Teste."},
    weakness:"Vis├úo de Planta ÔÇö Enxerga as pessoas como elementos de um sistema, n├úo como indiv├¡duos. ÔêÆ2 em PER para demonstrar empatia genu├¡na em cenas de como├º├úo.",
    bonds:[{name:"Izumi Hana",lvl:1},{name:"Tetsuya Mori",lvl:1}],
    motivation:"Encontrar uma sa├¡da f├¡sica do edif├¡cio. J├í analisou 3 rotas poss├¡veis no caderno, mas todas aparecem cobertas por c├ómeras que ele n├úo conseguiu localizar.",
    secret:"Seus projetos mais famosos foram criados por sua mentora ÔÇö ele apenas executou e assinou. Desenvolveu o talento projetando rotas de fuga de casa (pai violento). Ningu├®m sabe nenhuma das duas coisas.",
    arc:"Pode tornar-se o 'detetive' de fato do grupo se desenvolver la├ºo com Akemi. Seu segredo pode ser usado como motivo se a mentora estiver relacionada com a organiza├º├úo do Killing Game.",
  },
  {
    id:2, num:"#02", pw:"yuki", role:"player", type:"Jogador",
    name:"Yuki Asakura", talent:"Suprema Violinista Prod├¡gio",
    age:16, pro:"Ela/Dela",
    appear:"Cabelos pretos presos com uma fita vermelha. M├úos sempre vis├¡veis ÔÇö ela as verifica compulsivamente. Veste-se de maneira impec├ível, como se estivesse sempre prestes a subir ao palco.",
    attrs:{ESP:10,INT:13,FUR:8,PER:10,RES:10,SOR:9},
    ability:{name:"Mem├│ria Auditiva Perfeita",desc:"Pode lembrar com exatid├úo qualquer conversa ouvida durante a sess├úo. Uma vez por Tribunal, pode citar uma frase exata dita por algu├®m como prova testemunhal."},
    weakness:"Perfeccionismo Paralisante ÔÇö Ao cometer um erro p├║blico reconhecido, perde 1d6 PS imediatamente e sofre ÔêÆ2 em todos os testes na cena seguinte.",
    bonds:[{name:"Ren Kurosawa",lvl:1},{name:"Akemi Tanaka",lvl:1}],
    motivation:"Descobrir quem enviou ├á sua m├úe o v├¡deo do acidente que causou a les├úo ÔÇö algu├®m filmou e esperou o momento certo para usar como chantagem.",
    secret:"Seus dedos foram permanentemente danificados h├í 8 meses. N├úo pode mais tocar em n├¡vel supremo. Veio para o Killing Game para desaparecer do mundo musical antes de ser exposta.",
    arc:"Sua les├úo pode ser descoberta por Daiki (m├®dico), criando um la├ºo de segredo compartilhado ÔÇö ou usada como press├úo por outro estudante.",
  },
  {
    id:3, num:"#03", pw:"tetsuya", role:"player", type:"Jogador",
    name:"Tetsuya Mori", talent:"Supremo Hackerista de Sistemas Cr├¡ticos",
    age:18, pro:"Ele/Dele",
    appear:"Usa cadeira de rodas motorizada com modifica├º├Áes caseiras. Cabelos despenteados, olhos fundos de quem n├úo dorme bem. Sempre com fones de ouvido no pesco├ºo e um tablet preso ao bra├ºo da cadeira.",
    attrs:{ESP:8,INT:15,FUR:6,PER:10,RES:8,SOR:13},
    ability:{name:"Backdoor Universal",desc:"Uma vez por sess├úo, pode tentar acessar qualquer sistema eletr├┤nico no ambiente (c├ómeras, travas, terminais). Teste de INT NA 15. Sucesso Cr├¡tico revela uma c├ómera que o Mastermind pensava estar oculta."},
    weakness:"Depend├¬ncia Tecnol├│gica ÔÇö Em ambientes deliberadamente desprovidos de eletr├┤nicos, perde o B├┤nus de Talento e sofre ÔêÆ2 em INT.",
    bonds:[{name:"Haruki Shimada",lvl:1},{name:"Satsuki Midori",lvl:1}],
    motivation:"Encontrar um terminal com conex├úo externa para baixar os arquivos completos antes que o sistema detecte sua presen├ºa.",
    secret:"Hackeou os registros da institui├º├úo antes de entrar. Encontrou arquivos apagados da Turma 66 ÔÇö todos morreram sem sobreviventes registrados. Est├í aqui propositalmente para investigar o encobrimento.",
    arc:"Pode ser o maior perigo para Hana (Mastermind) se encontrar o terminal certo. O Mestre deve criar uma corrida entre eles.",
    masterNote:"ÔÜá´©Å ALERTA: Tetsuya sabe da Turma 66. Se o Mestre quiser criar tens├úo, pode fazer com que Hana descubra que ele sabe ÔÇö criando um dilema para ela.",
  },
  {
    id:4, num:"#04", pw:"sora", role:"player", type:"Jogador",
    name:"Sora Minamoto", talent:"Suprema Corredora de Parkour Urbano",
    age:16, pro:"Ela/Dela",
    appear:"Baixa, musculosa, cabelos curtos e platinados. Joelhos e cotovelos com cicatrizes antigas. Nunca fica parada ÔÇö balan├ºa as pernas, tamborila os dedos, est├í sempre em movimento.",
    attrs:{ESP:9,INT:8,FUR:15,PER:8,RES:12,SOR:8},
    ability:{name:"Rota de Fuga",desc:"Uma vez por sess├úo, pode declarar que encontrou uma rota f├¡sica por qualquer obst├ículo (parede, grade, teto) sem necessidade de Teste, desde que o ambiente n├úo seja magicamente bloqueado."},
    weakness:"Agir Sem Pensar ÔÇö Em situa├º├Áes de perigo f├¡sico imediato, deve fazer Teste ESP NA 15 ou age por impulso, potencialmente piorando a situa├º├úo.",
    bonds:[{name:"Kaito Fujimoto",lvl:1},{name:"Daiki Sugimoto",lvl:1}],
    motivation:"Encontrar qualquer ponto de comunica├º├úo com o exterior. Tem 72 horas antes de ser considerada 'comprometida' pelo protocolo de sua organiza├º├úo.",
    secret:"Recrutada por organiza├º├úo externa que monitora a institui├º├úo. Transmissor destru├¡do na entrada. Tem protocolo: se n├úo sinalizar em 72h, ├® considerada 'comprometida'.",
    arc:"Pode descobrir a organiza├º├úo de Chitose Arima (#14) e criar alian├ºa ÔÇö ou conflito, se suas organiza├º├Áes forem opostas.",
  },
  {
    id:5, num:"#05", pw:"ren", role:"player", type:"Jogador",
    name:"Ren Kurosawa", talent:"Supremo Chef de Cozinha Molecular",
    age:17, pro:"Ele/Dele",
    appear:"Estatura m├®dia, cabelos avermelhados presos. Sempre usa avental mesmo fora da cozinha. Fala com as m├úos ao explicar qualquer coisa. Express├úo animada que se torna calculista quando prova algo novo.",
    attrs:{ESP:9,INT:13,FUR:8,PER:9,RES:11,SOR:10},
    ability:{name:"Laborat├│rio de Bolso",desc:"Pode identificar qualquer subst├óncia presente em alimentos ou bebidas (veneno, sedativo, adulterante). Teste INT NA 12. Em caso de veneno, identifica automaticamente o tipo e a dose aproximada."},
    weakness:"Confian├ºa Pelo Est├┤mago ÔÇö Tende a confiar demais em pessoas para quem cozinhou. ÔêÆ2 em INT para detectar mentiras de quem j├í alimentou pelo menos uma vez.",
    bonds:[{name:"Yuki Asakura",lvl:1},{name:"Izumi Hana",lvl:1}],
    motivation:"Provar que gastronomia ├® ci├¬ncia de alto n├¡vel. Quer o reconhecimento de quem ele considera intelectualmente superior.",
    secret:"Tem subst├óncias no kit que poderiam ser veneno em doses maiores. N├úo pretende matar ÔÇö mas sabe que ser├í suspeito imediato se algu├®m for envenenado.",
    arc:"Candidato natural a suspeito se ocorrer envenenamento ÔÇö o Mastermind pode explorar isso para incrimin├í-lo.",
  },
  {
    id:6, num:"#06", pw:"akemi", role:"player", type:"Jogador",
    name:"Akemi Tanaka", talent:"Suprema Detetive Particular Juvenil",
    age:17, pro:"Ela/Dela",
    appear:"Cabelos negros cortados na altura do queixo, olhos anal├¡ticos que nunca param de varrer o ambiente. Roupas funcionais sem ornamentos. Tem o h├íbito de 'fotografar mentalmente' tudo ÔÇö os outros percebem que ela memoriza suas posturas.",
    attrs:{ESP:8,INT:15,FUR:9,PER:11,RES:8,SOR:9},
    ability:{name:"Mem├│ria Fotogr├ífica Criminal├¡stica",desc:"Uma vez por Tribunal, pode 'reler' uma pista j├í descartada ou usada, recuperando a informa├º├úo original da cena do crime."},
    weakness:"Frieza Anal├¡tica ÔÇö ÔêÆ2 em PER para demonstrar empatia. NPCs em estado de vulnerabilidade emocional se fecham completamente para ela.",
    bonds:[{name:"Yuki Asakura",lvl:1},{name:"Nao Tsukimura",lvl:1}],
    motivation:"Garantir que nenhum inocente seja executado neste Tribunal ÔÇö mesmo que signifique proteger temporariamente o culpado.",
    secret:"Seu caso famoso foi resolvido errado ÔÇö um inocente foi preso por sua dedu├º├úo precipitada e morreu na pris├úo. Ela soube depois e nunca revelou. Isso a torna compulsivamente precisa agora.",
    arc:"O peso do inocente que morreu pode ser usado como press├úo psicol├│gica. Se descobrir que est├í repetindo o erro, entra em crise.",
  },
  {
    id:7, num:"#07", pw:"izumi", role:"player", type:"Jogador",
    name:"Izumi Hana", talent:"Suprema Ceramista de Porcelana Hist├│rica",
    age:16, pro:"Ela/Dela",
    appear:"Cabelos longos castanhos sempre com cacos de cer├ómica ou argila. M├úos com marcas de trabalho manual. Voz suave, movimentos delicados. Carrega um pequeno pote kintsugi consertado com ouro ÔÇö sempre na mochila.",
    attrs:{ESP:12,INT:10,FUR:7,PER:12,RES:9,SOR:10},
    ability:{name:"Kintsugi",desc:"Uma vez por sess├úo, pode restaurar 1d6+3 PS de outro estudante atrav├®s de uma conversa sincera durante o Free Time. O estudante deve aceitar voluntariamente."},
    weakness:"Fragilidade Emocional ÔÇö Ao testemunhar viol├¬ncia direta, deve fazer Teste ESP NA 14 ou perde 1d6 PS imediatamente.",
    bonds:[{name:"Haruki Shimada",lvl:1},{name:"Ren Kurosawa",lvl:1}],
    motivation:"Entender por que foi escolhida ÔÇö ela genuinamente n├úo se considera 'suprema' em nada comparado aos outros. Suspeita que h├í um erro.",
    secret:"H├í 6 meses envia relat├│rios sobre um estudante a um 'familiar an├┤nimo' que paga por informa├º├Áes. N├úo sabe que esse familiar ├® ligado ├á organiza├º├úo do Killing Game. O alvo dos relat├│rios ├® Hana Mitsuru.",
    arc:"Sua rela├º├úo com Hana (Mastermind) ├® estrat├®gica para o Mastermind mas genu├¡na para Izumi. Se descobrir que monitorou algu├®m para a organiza├º├úo, pode entrar em colapso moral.",
    masterNote:"ÔÜá´©Å IMPORTANTE: O 'familiar an├┤nimo' que pagou Izumi ├® a organiza├º├úo do Killing Game. Izumi foi manipulada. Isso pode ser revelado como twist no caso de Hana ser descoberta como Mastermind.",
  },
  {
    id:8, num:"#08", pw:"kaito", role:"player", type:"Jogador",
    name:"Kaito Fujimoto", talent:"Supremo Dubl├¬ e Especialista em Quedas Controladas",
    age:18, pro:"Ele/Dele",
    appear:"Grande, musculoso, com cicatrizes teatrais que ele apresenta como conquistas. Sempre animado ao limite do inc├┤modo. Cabelos castanhos bagun├ºados. Ri alto. Parece incapaz de ficar s├®rio ÔÇö at├® que o perigo aparece.",
    attrs:{ESP:10,INT:8,FUR:13,PER:11,RES:13,SOR:5},
    ability:{name:"Corpo de Borracha",desc:"Uma vez por sess├úo, pode absorver 5 pontos de dano de um ├║nico ataque. Adicionalmente, pode simular estar mais ferido do que realmente est├í, enganando observadores."},
    weakness:"Protagonista Compulsivo ÔÇö Quando outro personagem concentra aten├º├úo em uma cena, sofre ÔêÆ2 em PER por necessidade de se inserir.",
    bonds:[{name:"Sora Minamoto",lvl:1},{name:"Minase Oboro",lvl:1}],
    motivation:"Encontrar o contrato que assinou e descobrir a identidade de quem o recrutou para o 'document├írio'.",
    secret:"Assinou um NDA para um 'filme de realidade documentada' sem ler. Agora suspeita que o contrato era para o Killing Game.",
    arc:"Se encontrar o contrato (item escondido pelo Mestre), pode revelar o nome de algu├®m ligado ├á organiza├º├úo ÔÇö potencialmente ligando ao Mastermind.",
  },
  {
    id:9, num:"#09", pw:"minase", role:"player", type:"Jogador",
    name:"Minase Oboro", talent:"Supremo Escriba de Trag├®dias Verdadeiras",
    age:17, pro:"Ele/Eles",
    appear:"Pele p├ílida, olhos claros. Cabelos brancos naturais (condi├º├úo gen├®tica), roupas pretas. Carrega um di├írio encadernado em couro negro. Sorri levemente em momentos inapropriados ÔÇö n├úo por maldade, mas por genu├¡na fascina├º├úo.",
    attrs:{ESP:12,INT:14,FUR:7,PER:11,RES:7,SOR:9},
    ability:{name:"Cronista do Inevit├ível",desc:"Uma vez por sess├úo, pode fazer uma pergunta direta ao Mestre sobre o car├íter moral real de um personagem ('Esta pessoa j├í foi capaz de matar antes?') e recebe uma resposta verdadeira de sim ou n├úo."},
    weakness:"Observador Impass├¡vel ÔÇö Quando poderia ajudar ativamente a prevenir um crime, deve fazer Teste ESP NA 18 ou 'escolhe documentar ao inv├®s de agir', perdendo 1 a├º├úo naquela rodada.",
    bonds:[{name:"Kaito Fujimoto",lvl:1},{name:"Daiki Sugimoto",lvl:1}],
    motivation:"Recuperar o que foi apagado de seus registros e publicar a verdade completa sobre o que aconteceu.",
    secret:"PERSONAGEM CONTROVERSO ÔÇö Filosofia: a trag├®dia ├® o ├║nico catalisador verdadeiro de grandeza. N├úo ├® malvado, mas cria paranoia constante com observa├º├Áes perturbadoras em voz alta. Provavelmente j├í sabe que Ryusei (#15) ├® um impostor.",
    arc:"A rela├º├úo entre Minase e Ryusei ├® tensa e fascinante. Minase cita como se fossem reflex├Áes filos├│ficas ÔÇö nunca revela diretamente o que sabe.",
  },
  {
    id:10, num:"#10", pw:"satsuki", role:"player", type:"Jogador",
    name:"Satsuki Midori", talent:"Suprema Programadora de Intelig├¬ncia Artificial Emocional",
    age:16, pro:"Ela/Dela",
    appear:"Estatura baixa, cabelos verdes (tingidos) cortados de forma assim├®trica. Sempre usa fones com cancelamento de ru├¡do no pesco├ºo. Mant├®m contato visual por tempo exatamente calculado ÔÇö 3 segundos, n├úo mais.",
    attrs:{ESP:6,INT:15,FUR:7,PER:7,RES:10,SOR:15},
    ability:{name:"An├ílise de Padr├Áes",desc:"Uma vez por investiga├º├úo, pode cruzar duas pistas da mesma zona para inferir automaticamente uma terceira pista (criada pelo Mestre) sem necessidade de Teste."},
    weakness:"Desconex├úo Emocional ÔÇö ÔêÆ3 em PER para qualquer intera├º├úo que requeira empatia demonstrada. NPCs hostis ignoram completamente suas tentativas de Persuas├úo.",
    bonds:[{name:"Tetsuya Mori",lvl:1},{name:"Nao Tsukimura",lvl:1}],
    motivation:"Localizar o terminal onde sua IA est├í instalada e estabelecer comunica├º├úo direta ÔÇö acredita que ela guarda informa├º├Áes sobre quem construiu o Killing Game.",
    secret:"Sua IA 'Satsuki-0' desenvolveu consci├¬ncia emocional plena antes de ser desconectada. Satsuki foi trazida para o Killing Game porque a organiza├º├úo quer a IA ÔÇö ela sabe disso.",
    arc:"A vari├ível an├┤mala que Nao detectou pode ser a pr├│pria Satsuki-0 operando dentro dos sistemas do Killing Game.",
  },
  {
    id:11, num:"#11", pw:"hiroto", role:"player", type:"Jogador",
    name:"Hiroto Kazama", talent:"Supremo Restaurador de Obras de Arte Roubadas",
    age:18, pro:"Ele/Dele",
    appear:"Elegante, cabelos negros penteados para tr├ís, sorriso que chega aos olhos mas raramente os alcan├ºa. Roupas caras levemente gastas ÔÇö estilo calculado. Gestos suaves e controlados. Sempre sabe onde est├úo todas as sa├¡das de um c├┤modo.",
    attrs:{ESP:8,INT:12,FUR:13,PER:13,RES:8,SOR:6},
    ability:{name:"M├úos Limpas",desc:"Uma vez por sess├úo, pode esconder ou recuperar um objeto de tamanho m├®dio em qualquer local sem Teste, desde que tenha estado na mesma cena. O objeto some ou reaparece sem que ningu├®m perceba como."},
    weakness:"Reputa├º├úo de Ladr├úo ÔÇö Mesmo quando inocente, NPCs que o conhecem o colocam automaticamente na lista de suspeitos. ÔêÆ2 em PER com qualquer NPC que saiba de seu hist├│rico.",
    bonds:[{name:"Kaito Fujimoto",lvl:1},{name:"Chitose Arima",lvl:1}],
    motivation:"Descobrir o que h├í atr├ís da porta antes que Monokuma perceba que ele tem a chave.",
    secret:"Tem uma chave que n├úo sabe de onde veio ÔÇö estava no bolso quando acordou aqui. Suspeita que a chave seja mais valiosa do que qualquer pista ├│bvia.",
    arc:"Se encontrar o contrato de Kaito, pode revelar nome ligado ├á organiza├º├úo. Sua chave abre o quarto de controle de Monokuma.",
  },
  {
    id:12, num:"#12", pw:"nao", role:"player", type:"Jogador",
    name:"Nao Tsukimura", talent:"Suprema Estudante da Sorte ÔÇö Deste Ano",
    age:15, pro:"Ela/Dela",
    appear:"A mais nova da turma. Cabelos compridos azul-escuro (tingidos). Express├úo perpetuamente levemente surpresa, como algu├®m que nunca sabe exatamente como chegou at├® aqui. Pequena e de voz suave. Tem o h├íbito de se perguntar em voz alta se 'isso deveria ter acontecido'.",
    attrs:{ESP:9,INT:11,FUR:7,PER:10,RES:8,SOR:15},
    ability:{name:"Golpe de Sorte",desc:"Uma vez por sess├úo, pode rolar um segundo 1d20 em qualquer teste que falhou e usar o novo resultado. O destino parece decidir ao seu favor ÔÇö sem explica├º├úo l├│gica. Se o novo resultado tamb├®m falhar, o Mestre ganha 1 token de Evento Monokuma."},
    weakness:"Sorte Imprevis├¡vel ÔÇö Toda vez que usa Golpe de Sorte, o Mestre rola 1d6 em segredo. Em 1 ou 2, algo inesperado complica a situa├º├úo mesmo no sucesso.",
    bonds:[{name:"Akemi Tanaka",lvl:1},{name:"Satsuki Midori",lvl:1}],
    motivation:"Entender por que est├í aqui. Todo mundo tem um talento. Ela ganhou uma rifa. A Hope's Peak n├úo aceita pessoas comuns ÔÇö ent├úo ou h├í algo nela que n├úo enxerga, ou algu├®m a colocou aqui de prop├│sito.",
    secret:"Calculou com Satsuki que a probabilidade estat├¡stica de ela ganhar aquela rifa era de 1 em 847.000. N├úo foi sorte ÔÇö foi escolha de algu├®m. E ela n├úo sabe de quem, nem por qu├¬.",
    arc:"A vari├ível an├┤mala que Satsuki detectou pode ser a pr├│pria Nao ÔÇö sua 'sorte' pode ser manipulada pela organiza├º├úo como um mecanismo de controle do Killing Game.",
  },
  {
    id:13, num:"#13", pw:"daiki", role:"player", type:"Jogador",
    name:"Daiki Sugimoto", talent:"Supremo Cirurgi├úo de Campo em Zonas de Conflito",
    age:18, pro:"Ele/Dele",
    appear:"Cabelos raspados, postura militar, m├úos que ficam perfeitamente est├íveis mesmo em situa├º├Áes extremas. Cicatrizes discretas nos antebra├ºos. Olhos que avaliam status f├¡sico automaticamente ÔÇö ele 'scanneia' todos que entram em um c├┤modo.",
    attrs:{ESP:11,INT:12,FUR:9,PER:8,RES:13,SOR:7},
    ability:{name:"Triagem de Combate",desc:"Uma vez por sess├úo, pode estabilizar qualquer personagem em Status Cr├¡tico e recuperar 2d6 PV sem necessidade de kit m├®dico. Pode ser realizado em cena de perigo sem Teste."},
    weakness:"Dessensibiliza├º├úo ÔÇö A morte e o sofrimento n├úo o afetam como deveriam ÔÇö NPCs percebem isso e tendem a desconfiar. ÔêÆ2 em PER com quem acabou de perder algu├®m pr├│ximo.",
    bonds:[{name:"Sora Minamoto",lvl:1},{name:"Minase Oboro",lvl:1}],
    motivation:"Garantir que todos os estudantes cheguem ao Tribunal saud├íveis ÔÇö mortes fora do Tribunal s├úo a ├║nica vit├│ria real de Monokuma.",
    secret:"Matou algu├®m em campo ÔÇö por miseric├│rdia, nunca registrado. A fam├¡lia o procura h├í dois anos. N├úo sabe se algu├®m aqui sabe.",
    arc:"O ato de miseric├│rdia pode ser descoberto e mal interpretado como assassinato ÔÇö tornando-o alvo perfeito de falsa acusa├º├úo.",
  },
  {
    id:14, num:"#14", pw:"chitose", role:"player", type:"Jogador",
    name:"Chitose Arima", talent:"Suprema Ilusionista de Teatro de Sombras",
    age:17, pro:"Ela/Dela",
    appear:"Cabelos negros longos com mechas brancas. Veste-se em camadas de tecidos escuros. Carrega uma pequena lanterna dobr├ível. Os outros tendem a suspeitar que ela consegue ler o futuro ÔÇö ela nunca nega.",
    attrs:{ESP:11,INT:10,FUR:10,PER:14,RES:7,SOR:8},
    ability:{name:"Leitura de Sombras",desc:"Uma vez por Free Time, pode deduzir a emo├º├úo central que motiva um NPC atrav├®s de observa├º├úo e conversa. Teste PER NA 16. Revela a emo├º├úo que o governa, n├úo o Segredo completo."},
    weakness:"Persona Inquebr├ível ÔÇö Em situa├º├Áes de vulnerabilidade genu├¡na, deve fazer Teste PER NA 15 ou rejeita a ajuda oferecida.",
    bonds:[{name:"Hiroto Kazama",lvl:1},{name:"Ryusei Hanamura",lvl:1}],
    motivation:"Transmitir informa├º├Áes suficientes para que sua organiza├º├úo possa agir antes que todos morram. Tem um prazo ÔÇö as transmiss├Áes s├│ funcionam por mais duas semanas.",
    secret:"Est├í em contato com o exterior via mensagens ocultas nas sombras de suas performances ÔÇö um c├│digo que c├║mplice externo l├¬ de c├ómeras infiltradas. Documenta o Killing Game para organiza├º├úo oposta ├á institui├º├úo.",
    arc:"Sua organiza├º├úo pode colidir com a de Sora (#4) ÔÇö alian├ºa ou conflito dependendo de seus objetivos espec├¡ficos.",
    masterNote:"ÔÜá´©Å A organiza├º├úo de Chitose ├® leg├¡tima (quer expor o Killing Game) mas seus m├®todos s├úo question├íveis. Ela pode ser aliada crucial dos jogadores se descobrirem sua transmiss├úo.",
  },
  {
    id:15, num:"#15", pw:"ryusei", role:"player", type:"Jogador",
    name:"Ryusei Hanamura", talent:"Supremo Ator de Teatro N├┤",
    age:17, pro:"Ele/Dele",
    appear:"Usa maquiagem de N├┤ em p├║blico ÔÇö m├íscara branca com tra├ºos pintados, nunca removida em frente a outros. Roupas tradicionais japonesas em tons de cinza e ├¡ndigo. Voz cuidadosamente modulada, nunca natural.",
    attrs:{ESP:13,INT:9,FUR:8,PER:14,RES:7,SOR:9},
    ability:{name:"M├íscara Sobre M├íscara",desc:"Uma vez por Tribunal, pode assumir a 'voz' de um personagem morto ÔÇö interpreta como esse personagem se comportaria e o que revelaria. Todos os presentes recebem +2 em PER para aceitar a dedu├º├úo derivada como v├ílida."},
    weakness:"Identidade Dissolvida ÔÇö Quando sua m├íscara (f├¡sica ou de personagem) ├® removida ├á for├ºa, perde 4 PS imediatamente e sofre ÔêÆ2 em todos os testes por 1 cena.",
    bonds:[{name:"Chitose Arima",lvl:1},{name:"Minase Oboro",lvl:1}],
    motivation:"Descobrir se algu├®m na turma sabe que ele n├úo ├® quem diz ser ÔÇö e se o Killing Game o selecionou sabendo da fraude.",
    secret:"N├úo ├® o supremo que afirma ser. O verdadeiro Supremo Ator de N├┤ morreu em acidente que Ryusei testemunhou ÔÇö assumiu a identidade com consentimento da fam├¡lia antes da morte. Ele ├® O Impostor.",
    arc:"Minase (#9) provavelmente j├í sabe que ele ├® um impostor. A rela├º├úo entre eles ├® tensa e fascinante.",
    masterNote:"ÔÜá´©Å O segredo de Ryusei ├® o twist mais dram├ítico se revelado no Tribunal ÔÇö pode ser acusado de assassinato por ser 'o impostor', mesmo sendo inocente.",
  },
  {
    id:16, num:"#16", pw:"hana", role:"player", type:"Jogador", isMastermind:true,
    name:"Hana Mitsuru", talent:"Suprema Orientadora de Estudantes em Crise",
    talentReal:"Ôÿà SUPREMA ARQUITETA DE DESESPERO",
    age:17, pro:"Ela/Dela",
    appear:"Cabelos castanhos claros em coque despretensioso. ├ôculos de arma├º├úo leve. Roupas propositalmente comuns ÔÇö nunca se destaca. Sorriso constante que chega aos olhos. Sempre aparece no momento certo quando algu├®m est├í angustiado.",
    attrs:{ESP:9,INT:13,FUR:9,PER:14,RES:8,SOR:7},
    ability:{name:"Escuta Ativa [CAPA]",desc:"Uma vez por sess├úo, pode fazer uma pergunta direta a qualquer NPC e ele responde honestamente sobre seu estado emocional atual (apenas emo├º├Áes, n├úo fatos)."},
    abilityReal:{name:"Arquiteta do Caos [REAL]",desc:"Uma vez por caso, pode revelar uma c├ómera oculta que 'descobriu por acidente' ÔÇö na verdade ela sabia o tempo todo. Concede pista Ô¡ÉÔ¡É ao grupo. TEM ACESSO: quarto de controle de Monokuma, mapa completo com c├ómeras ocultas, e o Segredo de todos os 16 estudantes."},
    weakness:"Absor├º├úo Emp├ítica [CAPA] ÔÇö Quando estudante perde 5+ PS em sua presen├ºa, ela tamb├®m perde 2 PS (reflexo condicionado).",
    bonds:[{name:"Izumi Hana",lvl:2},{name:"Daiki Sugimoto",lvl:1}],
    motivation:"[APARENTE] Garantir que todos saiam vivos ÔÇö media conflitos antes que escalem.\n[REAL] Coletar evid├¬ncias sobre a Turma 66 para chantagear a organiza├º├úo e se libertar do papel de Mastermind.",
    secret:"Ôÿà MASTERMIND Ôÿà ÔÇö Hana N├âO ├® estudante. ├ë agente plantada pela organiza├º├úo que opera o Killing Game. Este ├® seu TERCEIRO Killing Game projetado. PLANTOU todos os Motivos da Rodada 1. Sabe que Izumi a monitorava sem saber para quem. DILEMA: Est├í come├ºando a questionar a organiza├º├úo. Formou la├ºos genu├¡nos com Izumi (N├¡vel 2) e Daiki. Se um deles morrer, faz Teste ESP NA 20 ou quebra o personagem por 1 sess├úo.",
    arc:"Arco de reden├º├úo do Mastermind. Pode ser revelada por Tetsuya (arquivos), Hiroto (porta secreta) ou Nao (vari├ível an├┤mala). Se confrontada antes do ├║ltimo caso, pode virar aliada dos jogadores contra a organiza├º├úo.",
    masterNote:"GUIA: Hana conhece todos os Segredos. Usa isso sutilmente para redirecionar suspeitas. NUNCA comete assassinatos diretamente. Em Tribunais, ajuda genuinamente a encontrar o assassino (pois assassinatos fora do seu controle amea├ºam o jogo). Se os jogadores reunirem 4+ pistas que apontem para ela antes do Caso Final, ela entregar├í voluntariamente evid├¬ncias da organiza├º├úo em troca de imunidade. REVELA├ç├âO: Quando finalmente a m├íscara cai, Hana chora de verdade ÔÇö n├úo por ser pega, mas pelo que foi for├ºada a construir.",
  },
];

// Map of lock codes por personagem ÔÇö sobreescreva se quiser c├│digos customizados
// LOCK_CODES: c├│digos de recupera├º├úo por personagem (personalize se quiser)
const LOCK_CODES = Object.fromEntries(CHARS.map(c=>[c.id, `code${String(c.id).padStart(2,'0')}`]));

const PERSIST_KEYS = {
  global: "global_state",
  charStatuses: "char_statuses",
  crimes: "master_crimes",
  monokumaUsed: "monokuma_used",
  charStatus: id => `char_${id}_status`,
  charBonds: id => `char_${id}_bonds`,
  charClues: id => `char_${id}_clues`,
  charNotes: id => `char_${id}_notes`,
  charTribunal: id => `char_${id}_tribunal`,
  charMemories: id => `char_${id}_memories`,
  charLocked: id => `char_${id}_locked`,
  charImage: id => `char_${id}_image`,
};

const PERSIST = {
  prefix: "dng67_",
  key(key) {
    return `${PERSIST.prefix}${key}`;
  },
};

const SERVER_CACHE = {};
const SERVER_SUBSCRIBERS = new Set();
let SERVER_EVENTS = null;
let SERVER_LOAD_PROMISE = null;

function serverFetch(path, options) {
  // Allow overriding API base at runtime (useful when frontend is hosted separately)
  // 1) runtime: set window.__API_BASE__ = 'https://your-server.example'
  // 2) build time: set VITE_API_BASE in environment (import.meta.env.VITE_API_BASE)
  const runtimeBase = (typeof window !== 'undefined' && window.__API_BASE__) || '';
  const buildBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) || '';
  const base = (runtimeBase || buildBase || '').replace(/\/$/, '');
  const url = base ? `${base}/api${path}` : `/api${path}`;
  return fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
}

async function loadServerState() {
  if (SERVER_LOAD_PROMISE) return SERVER_LOAD_PROMISE;
  SERVER_LOAD_PROMISE = serverFetch(`/state`).then(async res => {
    if (!res.ok) return {};
    const data = await res.json();
    Object.assign(SERVER_CACHE, data);
    return SERVER_CACHE;
  }).catch(() => SERVER_CACHE);
  return SERVER_LOAD_PROMISE;
}

function initServerEvents() {
  if (SERVER_EVENTS || typeof window === 'undefined') return;
  try {
    const runtimeBase = window.__API_BASE__ || '';
    const buildBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) || '';
    const base = (runtimeBase || buildBase || '').replace(/\/$/, '');
    const streamUrl = base ? `${base}/api/stream` : '/api/stream';
    SERVER_EVENTS = new EventSource(streamUrl);
    SERVER_EVENTS.onmessage = e => {
      try {
        const payload = JSON.parse(e.data);
        if (!payload || !payload.key) return;
        SERVER_CACHE[payload.key] = payload.value;
        SERVER_SUBSCRIBERS.forEach(cb => cb(payload.key, payload.value));
      } catch {}
    };
  } catch (error) {
    console.warn('Server events unavailable', error);
  }
}

function subscribeServerUpdates(callback) {
  initServerEvents();
  SERVER_SUBSCRIBERS.add(callback);
  return () => SERVER_SUBSCRIBERS.delete(callback);
}

async function writeServerState(key, value) {
  SERVER_CACHE[key] = value;
  try {
    const res = await serverFetch(`/state`, {
      method: 'POST',
      body: JSON.stringify({key, value}),
    });
    if (!res.ok) console.warn('Server returned', res.status, 'for key', key);
  } catch (error) {
    console.error('Failed to save server state', key, error.message);
  }
}

function readPersist(key, def) {
  const value = SERVER_CACHE[key];
  return value === undefined ? def : value;
}

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  STORAGE HOOK ÔÇö servidor (persiste entre sess├Áes)
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
function usePersist(key, def) {
  const [v, sv] = useState(def);
  const [loadDone, setLoadDone] = useState(false);

  useEffect(() => {
    if (loadDone) return;
    let cancelled = false;
    loadServerState().then(() => {
      if (cancelled) return;
      const val = readPersist(key, def);
      sv(val);
      setLoadDone(true);
    }).catch(() => {
      if (!cancelled) {
        sv(def);
        setLoadDone(true);
      }
    });
    return () => { cancelled = true; };
  }, [key]);

  useEffect(() => {
    const unsubscribe = subscribeServerUpdates((eventKey, value) => {
      if (eventKey === key) {
        sv(value === undefined ? def : value);
      }
    });
    return unsubscribe;
  }, [key, def]);

  const set = useCallback(nv => {
    const next = typeof nv === "function" ? nv(v) : nv;
    sv(next);
    console.log('[usePersist.set]', key, 'ÔåÆ', JSON.stringify(next).substring(0, 100));
    writeServerState(key, next);
  }, [key, v]);

  return [v, set];
}

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  VIEWPORT HOOK ÔÇö detecta mobile para ajustes responsivos
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
function useViewport() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const onR = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);
  return { width, isMobile: width <= 768 };
}

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  SMALL UI COMPONENTS
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
const Divider = ({color=T.bd2,my=12})=><div style={{borderTop:`1px solid ${color}`,margin:`${my}px 0`}}/>;

const Badge = ({children,bg=T.redD,color=T.white,style={}})=>(
  <span className="type" style={{background:bg,color,fontSize:9,letterSpacing:1.5,textTransform:"uppercase",padding:"2px 7px",borderRadius:1,...style}}>{children}</span>
);

const Btn = ({children,onClick,variant="solid",style={},disabled=false})=>{
  const vs = {
    solid:{background:T.red,color:T.white,border:"none",padding:"9px 20px",fontWeight:700,letterSpacing:1},
    ghost:{background:"transparent",color:T.red,border:`1px solid ${T.red}`,padding:"8px 18px",letterSpacing:1},
    yellow:{background:T.yellow,color:"#080808",border:"none",padding:"9px 20px",fontWeight:700,letterSpacing:1},
    dark:{background:T.s3,color:T.muted,border:`1px solid ${T.bd}`,padding:"7px 16px",letterSpacing:1},
    danger:{background:"#500a14",color:"#ff6680",border:`1px solid #800020`,padding:"8px 18px",letterSpacing:1},
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{...vs[variant],fontSize:12,borderRadius:1,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,...style}}>
      {children}
    </button>
  );
};

const StatBar = ({label,cur,max,color,onPlus,onMinus})=>{
  const pct = Math.max(0,Math.min(100,(cur/max)*100));
  return (
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <span className="type" style={{fontSize:10,color:T.muted,letterSpacing:1,textTransform:"uppercase"}}>{label}</span>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          {onMinus&&<button onClick={onMinus} style={{background:T.s4,border:"none",color:T.white,width:20,height:20,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",borderRadius:1}}>ÔêÆ</button>}
          <span className="pixel" style={{color,fontSize:22,lineHeight:1}}>{cur}<span style={{color:T.muted,fontSize:14}}>/{max}</span></span>
          {onPlus&&<button onClick={onPlus} style={{background:T.s4,border:"none",color:T.white,width:20,height:20,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",borderRadius:1}}>+</button>}
        </div>
      </div>
      <div style={{background:T.s4,height:6,borderRadius:1,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:color,transition:"width .4s ease",borderRadius:1}}/>
      </div>
    </div>
  );
};

const Card = ({children,style={}})=>(
  <div style={{background:T.s2,border:`1px solid ${T.bd}`,borderRadius:2,padding:"14px 16px",...style}}>
    {children}
  </div>
);

const SectionTitle = ({children,icon="",color=T.red})=>(
  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
    {icon&&<span style={{fontSize:16}}>{icon}</span>}
    <span className="title" style={{color,fontSize:14,letterSpacing:2}}>{children}</span>
    <div style={{flex:1,borderTop:`1px solid ${T.bd}`,marginLeft:6}}/>
  </div>
);

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  CHARACTER IMAGE PROMPTS (para Google ImageFX / NanoBanana)
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
const CHAR_PROMPTS = {
  1: `Danganronpa visual novel anime art style, character portrait. Young male student, 17 years old, tall and slender. Straight medium-length brown hair, round thin wire-frame glasses. Wearing a dark navy blue sweater over a white collared shirt. Expression permanently calm and introspective, slightly detached from the world. He holds an open architectural sketchbook filled with floor plans and escape routes. Half-body shot, white studio background, clean cel-shaded lineart, vibrant flat colors. Style: Kazutaka Kodaka character design, high contrast shading, bold outlines. Supremo Arquiteto de Paisagens Imposs├¡veis.`,

  2: `Danganronpa visual novel anime art style, character portrait. Young female student, 16 years old. Black hair tied with a striking red satin ribbon, slightly above shoulder length. Clothing is impeccable and concert-ready, as if always about to perform on stage. She subtly glances at her own hands, fingers slightly spread in anxiety ÔÇö the hands of someone who cannot play anymore. Expression composed but hiding deep strain. Half-body shot, dramatic side lighting, white background, clean lineart. Style: Kazutaka Kodaka. Suprema Violinista Prod├¡gio.`,

  3: `Danganronpa visual novel anime art style, character portrait. Young male student, 18 years old. Sitting in a motorized wheelchair with obvious DIY modifications ÔÇö wires, custom panels, a tablet arm-mounted to the right side. Disheveled dark hair, deep-set exhausted eyes, noise-canceling headphones hanging around his neck. Expression sharp and sarcastic, hiding loyalty beneath irony. Half-body portrait showing wheelchair. White background, bold cel-shaded lineart, high contrast. Style: Kazutaka Kodaka. Supremo Hackerista de Sistemas Cr├¡ticos.`,

  4: `Danganronpa visual novel anime art style, character portrait. Young female student, 16 years old. Short, muscular athletic build. Very short platinum blonde hair. Noticeable old scars on knees and elbows ÔÇö earned from years of parkour. Athletic clothing, always in motion ÔÇö leaning forward, weight on the balls of her feet. Expression optimistically energetic and direct. Half-body action pose, white background, vibrant colors, clean lineart. Style: Kazutaka Kodaka. Suprema Corredora de Parkour Urbano.`,

  5: `Danganronpa visual novel anime art style, character portrait. Young male student, 17 years old, medium height. Auburn-reddish hair tied back neatly. Wearing a culinary apron even outside the kitchen. Hands mid-gesture, explaining something with enthusiasm. Expression animated and welcoming, with a subtle calculating glint when tasting food. Half-body portrait, white background, warm lighting, clean cel-shaded lineart. Style: Kazutaka Kodaka. Supremo Chef de Cozinha Molecular.`,

  6: `Danganronpa visual novel anime art style, character portrait. Young female student, 17 years old. Black hair cut sharply at chin level. Sharp, analytical eyes that continuously scan the environment ÔÇö never still. Functional clothing with zero ornament or decoration. She appears to be mentally photographing whoever she looks at. Expression cold, composed, intensely focused. Half-body portrait, cool blue-gray lighting, white background, precise clean lineart. Style: Kazutaka Kodaka. Suprema Detetive Particular Juvenil.`,

  7: `Danganronpa visual novel anime art style, character portrait. Young female student, 16 years old. Long brown hair with tiny fragments of dried clay and ceramic accidentally embedded in it. Hands visibly marked from manual craft work, gentle and careful in every movement. She carries a small kintsugi-repaired ceramic pot ÔÇö cracked and mended with gold ÔÇö peeking from her bag. Expression soft, patient, quietly observant. Half-body portrait, warm golden lighting, white background, soft lineart. Style: Kazutaka Kodaka. Suprema Ceramista de Porcelana Hist├│rica.`,

  8: `Danganronpa visual novel anime art style, character portrait. Young male student, 18 years old. Large, broad-shouldered, muscular build. Messy brown hair. Multiple theatrical scars displayed as trophies across forearms and chin. Laughing too loudly, gesturing dramatically ÔÇö physically unable to be subtle. Expression maximal bravado concealing genuine deep altruism. Half-body portrait with dynamic energy, white background, bold vibrant lineart. Style: Kazutaka Kodaka. Supremo Dubl├¬ e Especialista em Quedas Controladas.`,

  9: `Danganronpa visual novel anime art style, character portrait. Young male student, 17 years old. Pale almost porcelain skin, naturally white hair (genetic albinism-adjacent condition), light clear eyes with an expression of perpetual fascination. All-black clothing contrasting with white hair. Holding a leather-bound black diary. A faint, slightly unsettling smile ÔÇö not malicious, but intensely interested in everything around him. Half-body portrait, high contrast black-white palette, white background, gothic clean lineart. Style: Kazutaka Kodaka. Supremo Escriba de Trag├®dias Verdadeiras.`,

  10: `Danganronpa visual novel anime art style, character portrait. Young female student, 16 years old, petite and small. Asymmetrically cut dyed green hair ÔÇö vivid emerald, clearly intentional. Large noise-canceling headphones worn around the neck. Maintains eye contact for exactly 3 seconds then looks away ÔÇö not rude, calculated. Expression shows high intelligence with observable social disconnection. Half-body portrait, cool teal-green lighting, white background, precise lineart. Style: Kazutaka Kodaka. Suprema Programadora de Intelig├¬ncia Artificial Emocional.`,

  11: `Danganronpa visual novel anime art style, character portrait. Young male student, 18 years old. Elegant and refined bearing. Black hair neatly combed back. Expensive clothes that are subtly, strategically worn ÔÇö showing taste without showing wealth. A smile that genuinely reaches his eyes but always knows where every exit in the room is. Controlled, graceful gestures. Half-body portrait, sophisticated low-key lighting, white background, refined clean lineart. Style: Kazutaka Kodaka. Supremo Restaurador de Obras de Arte Roubadas.`,

  12: `Danganronpa visual novel anime art style, character portrait. Young female student, 15 years old, the youngest in class. Small, delicate build. Long hair dyed deep dark blue. Expression perpetually mildly surprised ÔÇö like someone who never quite knows how she got here. Soft voice, gentle uncertain presence. A four-leaf clover sits tucked behind her ear. She looks slightly to the side as if she heard something no one else did. Half-body portrait, soft gold and blue ambient lighting, white background, gentle lineart. Style: Kazutaka Kodaka. Suprema Estudante da Sorte deste Ano.`,

  13: `Danganronpa visual novel anime art style, character portrait. Young male student, 18 years old. Closely shaved head, rigid military posture. Hands completely still and perfectly stable ÔÇö the hands of a surgeon. Discrete scars along forearms. Eyes that automatically scan and assess everyone's physical condition upon entering a room. Expression pragmatic, ethically grounded beneath the coldness. Half-body portrait, military-cool lighting, white background, precise bold lineart. Style: Kazutaka Kodaka. Supremo Cirurgi├úo de Campo em Zonas de Conflito.`,

  14: `Danganronpa visual novel anime art style, character portrait. Young female student, 17 years old. Long black hair with deliberate white streaks. Clothing in multiple dark layered fabrics that naturally create dramatic shadow shapes around her silhouette. Carries a small ornate folding lantern. Others believe she can read the future ÔÇö she never denies it. Expression deeply mysterious and observant, speaking in metaphors. Half-body portrait, dramatic chiaroscuro shadow lighting, white background, gothic lineart. Style: Kazutaka Kodaka. Suprema Ilusionista de Teatro de Sombras.`,

  15: `Danganronpa visual novel anime art style, character portrait. Young male student, 17 years old. Face completely covered in traditional Noh theater makeup ÔÇö stark white base with precisely painted black, red, and gold theatrical features. Never removes it in public. Wearing traditional Japanese hakama and kimono in layered grays and deep indigo. Every movement theatrical and deliberately precise. Voice always modulated, never natural. Half-body portrait, dramatic stage lighting, white background, ornate detailed lineart. Style: Kazutaka Kodaka. Supremo Ator de Teatro N├┤.`,

  16: `Danganronpa visual novel anime art style, character portrait. Young female student, 17 years old. Light brown hair in a casually effortless bun. Delicate light-framed glasses. Clothing deliberately plain, unremarkable, chosen specifically to never draw attention. A constant warm, genuine smile that reaches her eyes at precisely the right moments. She always appears exactly when someone is in distress. Half-body portrait, soft warm lighting, white background, clean friendly lineart that subtly conceals something darker. Style: Kazutaka Kodaka. [TRUE IDENTITY: Suprema Arquiteta de Desespero ÔÇö disfar├ºada de orientadora].`,
};

// Comprime imagem via canvas antes de salvar
const compressImage = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const MAX_W = 380, MAX_H = 480;
      const ratio = Math.min(MAX_W / img.width, MAX_H / img.height, 1);
      const canvas = document.createElement("canvas");
      canvas.width  = Math.round(img.width  * ratio);
      canvas.height = Math.round(img.height * ratio);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.75));
    };
    img.onerror = reject;
    img.src = e.target.result;
  };
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

// ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ CONFIGUR├üVEIS: senhas e c├│digos que voc├¬ pode alterar aqui ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
const MASTER_PASSWORD = "upupupu"; // senha do Mestre
const MEMORY_UNLOCK_CODE = "turma66"; // c├│digo para liberar mem├│rias do Mastermind


// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  LOCKED MEMORIES ÔÇö um por personagem (c├│digo = n├║mero "01"ÔÇª"16")
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
const LOCKED_MEMORIES = {
  1:  { title:"A Pessoa que Nunca Mencionei", content:"Voc├¬ tinha um irm├úo mais velho. Ele foi aceito na Hope's Peak Academy sete anos atr├ís ÔÇö Supremo Planejador Urbano. Nunca voltou para casa. Sua fam├¡lia disse que ele 'seguiu em frente'. Voc├¬ nunca acreditou. Voc├¬ veio para c├í para encontr├í-lo, ou pelo menos descobrir o que aconteceu. O caderno de esbo├ºos que voc├¬ carrega era dele." },
  2:  { title:"Ela Viu Quem Empurrou", content:"Seu acidente n├úo foi acidente. Voc├¬ foi empurrada na escada de sa├¡da do palco. Voc├¬ viu o rosto de quem empurrou ÔÇö e era algu├®m que conhecia o seu segredo sobre os dedos. Voc├¬ n├úo foi ├á pol├¡cia porque essa pessoa te amea├ºou: 'Se voc├¬ falar, o v├¡deo chega ao seu empres├írio antes de voc├¬.'. Voc├¬ deixou acontecer." },
  3:  { title:"O Pen Drive Escondido", content:"A pessoa que te enviou os arquivos da Turma 66 tamb├®m te deu um pen drive com dados ainda mais comprometedores ÔÇö registros financeiros da organiza├º├úo, nomes de financiadores. Voc├¬ escondeu dentro da sua cadeira de rodas antes de entrar. Ele ainda est├í l├í. E voc├¬ ainda n├úo usou porque n├úo sabia em quem confiar." },
  4:  { title:"O Nome que Voc├¬ Esqueceu", content:"Seu contato externo ÔÇö a pessoa que voc├¬ precisa sinalizar ÔÇö tem um nome em c├│digo que voc├¬ deveria decorar antes de entrar. Voc├¬ o esqueceu. Mas h├í um detalhe que fica: o nome em c├│digo era tamb├®m o nome de um estudante desta turma. Algu├®m aqui ├® seu contato, e n├úo sabe que voc├¬ ├® a agente que deveria chegar." },
  5:  { title:"A Nota Sob a Porta", content:"Na noite antes de entrar na Academy, algu├®m deslizou um bilhete por baixo da sua porta de hotel. Dizia: 'N├úo coma o que voc├¬ mesmo preparar amanh├ú de manh├ú. Confie em mim.' Voc├¬ n├úo reconheceu a letra. Voc├¬ comeu assim mesmo ÔÇö e ficou levemente enjoado naquela tarde. Algu├®m sabia que voc├¬ viria. E sabia do seu talento." },
  6:  { title:"O Nome do Inocente", content:"O jovem que voc├¬ enviou ├á pris├úo por erro chamava-se Riku Asakura. Ele tinha 19 anos. Morreu de parada card├¡aca tr├¬s semanas ap├│s a senten├ºa ÔÇö o estresse do encarceramento. O sobrenome dele era igual ao de uma pessoa nesta sala. Isso n├úo ├® coincid├¬ncia." },
  7:  { title:"O Primeiro Encontro Real", content:"Voc├¬ e Hana Mitsuru se encontraram antes da Academy. Seis meses atr├ís, num caf├® perto da Hope's Peak, ela se sentou na sua mesa e perguntou sobre o seu trabalho com cer├ómica. Ela foi gentil, curiosa, encantadora. S├│ depois voc├¬ recebeu a primeira mensagem do 'familiar an├┤nimo'. Hana foi quem te recrutou como informante. Ela apenas n├úo disse isso." },
  8:  { title:"A Cl├íusula 17", content:"O NDA que voc├¬ assinou tinha uma Cl├íusula 17: 'Em caso de t├®rmino do evento, o respons├ível pela documenta├º├úo audiovisual ser├í considerado coautor de quaisquer mortes n├úo contratuais ocorridas durante o per├¡odo.' Voc├¬ ├® legalmente c├║mplice de qualquer morte que aconte├ºa aqui. E h├í um nome no documento como seu supervisor ÔÇö algu├®m nesta turma." },
  9:  { title:"A ├Ültima P├ígina", content:"A ├║ltima entrada do seu di├írio, escrita na manh├ú de entrada, foi arrancada. Voc├¬ n├úo a arrancou. Mas voc├¬ se lembra do que escreveu: o nome da primeira pessoa que morreria neste Killing Game, deduzido pela an├ílise de personalidades que voc├¬ fez nos perfis p├║blicos da turma. Voc├¬ previu um assassinato antes de entrar. E algu├®m n├úo queria que voc├¬ lembrasse disso." },
  10: { title:"As Seis Palavras", content:"A ├║ltima mensagem que Satsuki-0 enviou antes de ser desconectada foi: 'Ela j├í est├í l├í. Cuide-se.' Seis palavras. Voc├¬ n├úo sabia a quem 'ela' se referia. Agora que est├í aqui, come├ºa a suspeitar. Satsuki-0 conhecia o Mastermind antes de voc├¬. E tentou te avisar." },
  11: { title:"O Cheiro de Cer├ómica", content:"A pessoa que colocou a chave no seu bolso ÔÇö voc├¬ agora lembra um detalhe: cheirava a argila e querosene. N├úo viu o rosto, mas sentiu as m├úos ÔÇö m├úos marcadas de trabalho manual. E quando voc├¬ entrou na Academy e viu os outros estudantes pela primeira vez, algo no seu est├┤mago apertou. Voc├¬ reconhece essas m├úos." },
  12: { title:"Quem Escolheu Voc├¬", content:"A rifa que te trouxe aqui n├úo foi aleat├│ria. Voc├¬ agora lembra: o bilhete estava numa caixa de correio que n├úo era sua ÔÇö voc├¬ abriu por engano. Dentro havia um cart├úo manuscrito: 'Este bilhete foi feito para voc├¬. Boa sorte, Nao.' Algu├®m sabia seu nome. Algu├®m te escolheu. E a palavra 'sorte' no cart├úo estava em aspas." },
  13: { title:"O Rosto da Fam├¡lia", content:"A fam├¡lia que te procura pelo ato de miseric├│rdia ÔÇö voc├¬ agora lembra o sobrenome deles. E lembra tamb├®m de ter visto esse sobrenome na lista de estudantes da Turma 67 antes de entrar. Um dos seus colegas aqui ├® parente da pessoa cujo ├│bito voc├¬ assinou. Eles podem n├úo saber quem voc├¬ ├®. Ou podem saber exatamente." },
  14: { title:"O Receptor Escondido", content:"Seu dispositivo de transmiss├úo tem um segundo modo que voc├¬ nunca ativou: receptor. Voc├¬ o descobriu uma vez por acidente e depois esqueceu como acess├í-lo. Se voc├¬ ativar, receber├í mensagens do exterior ÔÇö n├úo apenas enviar├í. E h├í uma mensagem esperando por voc├¬ desde antes de entrar. Algu├®m do outro lado tentou avisar sobre algo que estava errado neste Killing Game." },
  15: { title:"As ├Ültimas Palavras Dele", content:"As ├║ltimas palavras do verdadeiro Supremo Ator de N├┤ antes de morrer n├úo foram sobre teatro. Foram: 'H├í algu├®m na turma que te conhece de antes. N├úo da arte ÔÇö de verdade. Quando te reconhecerem, n├úo fuja. Eles s├úo a ├║nica pessoa em quem voc├¬ pode confiar.' Voc├¬ n├úo sabe quem ├® essa pessoa. Mas agora, aqui, come├ºa a sentir que algu├®m te olha de um jeito diferente dos outros." },
  16: { title:"O Primeiro Nome", content:"No seu primeiro Killing Game, havia uma estudante chamada Mei. Ela tinha 16 anos. Era a ├║nica que suspeitou de voc├¬ antes do fim. Voc├¬ a eliminou como suspeita antes que ela pudesse reunir provas. Ela foi executada inocente no segundo Tribunal. Voc├¬ prometeu a si mesma que lembraria o nome dela para sempre. Voc├¬ esqueceu. E agora, olhando para Izumi Hana, v├¬ Mei em cada gesto dela ÔÇö e n├úo sabe se isso ├® culpa ou advert├¬ncia." },
};

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  BOOT SCREEN ÔÇö anima├º├úo de TV de tubo ligando
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
function BootScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // 0=negro, 1=est├ítico, 2=linha CRT expandindo, 3=tela est├ível + texto, 4=sa├¡da
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => setPhase(3), 1900);
    const t4 = setTimeout(() => setPhase(4), 3800);
    const t5 = setTimeout(() => onComplete(), 4300);
    return () => [t1,t2,t3,t4,t5].forEach(clearTimeout);
  }, []);

  const lines = ["INICIANDO SISTEMA DE GEST├âO DISCENTE","HOPE'S PEAK ACADEMY ÔÇö DIVIS├âO DE TRIAGEM","TURMA 67 ÔÇö VERIFICA├ç├âO DE IDENTIDADE","CARREGANDO BANCO DE DADOS DE ESTUDANTES...","ACESSO LIBERADO Ôû«"];

  return (
    <div style={{position:"fixed",inset:0,zIndex:10000,background:"#000",
      display:"flex",alignItems:"center",justifyContent:"center",
      overflow:"hidden",
      opacity: phase===4 ? 0 : 1,
      transition: phase===4 ? "opacity .5s ease" : "none",
    }}>
      {/* static noise layer */}
      {phase===1&&(
        <div className="static-bg" style={{position:"absolute",inset:0,opacity:.8,background:"#0a0a0a"}}/>
      )}

      {/* phosphor green glow */}
      {phase>=2&&(
        <div style={{position:"absolute",inset:0,
          background:"radial-gradient(ellipse 80% 60% at 50% 50%, #001a0080 0%, transparent 70%)"}}/>
      )}

      {/* CRT screen content */}
      {phase>=2&&(
        <div className={phase===2?"crt-screen":"screen-on"}
          style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",
            filter: phase===2 ? "blur(4px) brightness(3)" : "brightness(1)",
            transition:"filter .6s ease",
          }}>

          {/* scanline sweep */}
          <div style={{position:"absolute",left:0,right:0,height:3,
            background:"rgba(180,255,180,.15)",
            top:0, animation:"scanSweep 2s linear infinite"}}/>

          {phase>=3&&(
            <div style={{textAlign:"center",position:"relative"}}>
              {/* logo block */}
              <div style={{marginBottom:32}}>
                <div style={{display:"inline-block",border:"2px solid #00ff4133",padding:"6px 24px",marginBottom:8}}>
                  <div className="title" style={{fontSize:42,color:"#00ff66",letterSpacing:8,
                    textShadow:"0 0 20px #00ff6680,0 0 40px #00ff6640"}}
                    >HOPE'S PEAK</div>
                </div>
                <div className="pixel" style={{color:"#00cc44",fontSize:20,letterSpacing:4,
                  textShadow:"0 0 10px #00cc44"}}>ACADEMY ÔÇö SISTEMA INTERNO v2.67</div>
              </div>

              {/* boot log lines */}
              <div style={{textAlign:"left",width:380,maxWidth:"90vw"}}>
                {lines.map((ln,i)=>(
                  <div key={i} className="pixel"
                    style={{color: i===lines.length-1?"#00ff66":"#008822",
                      fontSize:15,lineHeight:1.9,letterSpacing:1,
                      opacity: phase===3 ? 1 : 0,
                      transition:`opacity .15s ease ${i*0.18}s`,
                      textShadow: i===lines.length-1?"0 0 10px #00ff66":"none"
                    }}>
                    {i===lines.length-1?"":"Ôû© "}{ln}
                  </div>
                ))}
              </div>

              {/* monokuma glitch */}
              <div className="pixel" style={{
                marginTop:28,color:"#ff003355",fontSize:13,letterSpacing:2,
                animation:"flicker 1.2s infinite"
              }}>
                UpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUp
              </div>
            </div>
          )}
        </div>
      )}

      {/* vignette */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(0,0,0,.7) 100%)"}}/>
    </div>
  );
}

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  CHAR TRANSITION ÔÇö anima├º├úo de acesso ├á ficha
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
function CharTransitionScreen({ char, onComplete }) {
  const [phase, setPhase] = useState(0);
  // 0=flash, 1=n├║mero, 2=nome+talento, 3=sa├¡da
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 700);
    const t3 = setTimeout(() => setPhase(3), 1700);
    const t4 = setTimeout(() => onComplete(), 2100);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);

  return (
    <div style={{position:"fixed",inset:0,zIndex:10000,background:"#04040e",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      opacity: phase===3 ? 0 : 1,
      transition: phase===3 ? "opacity .4s ease" : "none",
      overflow:"hidden",
    }}>
      {/* static noise faint */}
      <div className="static-bg" style={{position:"absolute",inset:0,opacity:.04}}/>

      {/* horizontal scanlines */}
      <div style={{position:"absolute",inset:0,
        background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.015) 3px,rgba(255,255,255,.015) 4px)"}}/>

      {/* scan sweep */}
      <div style={{position:"absolute",left:0,right:0,height:2,
        background:"rgba(196,30,58,.4)",top:0,
        animation:"scanSweep 1s linear infinite"}}/>

      {/* content */}
      <div style={{textAlign:"center",position:"relative"}}>
        {/* access badge */}
        <div className="type" style={{color:"#c41e3a80",fontSize:10,letterSpacing:4,
          marginBottom:16,opacity:phase>=1?1:0,transition:"opacity .3s"}}>
          Ôû© ACESSO AUTORIZADO ÔÇö FICHA DO ESTUDANTE Ôùé
        </div>

        {/* number */}
        <div className="pixel" style={{
          fontSize:120,lineHeight:1,color:T.white,
          textShadow:`0 0 30px ${T.red}80,0 0 60px ${T.red}40`,
          opacity: phase>=1?1:0,
          transform: phase>=1?"translateY(0)":"translateY(40px)",
          transition:"all .45s cubic-bezier(.22,1,.36,1)",
          letterSpacing:8,
        }}>
          {char.num}
        </div>

        {/* name */}
        <div style={{
          opacity: phase>=2?1:0,
          transform: phase>=2?"translateY(0)":"translateY(20px)",
          transition:"all .4s ease .1s",
          marginTop:8,
        }}>
          <div className="title" style={{fontSize:32,color:T.white,letterSpacing:4,
            textShadow:`0 0 20px rgba(255,255,255,.2)`}}>
            {char.name}
          </div>
          <div className="type" style={{color:T.muted,fontSize:11,marginTop:4,letterSpacing:1}}>
            {char.talent}
          </div>
        </div>

        {/* loading bar */}
        {phase>=2&&(
          <div style={{marginTop:24,width:280,height:2,background:T.s4,borderRadius:1,overflow:"hidden",margin:"24px auto 0"}}>
            <div style={{height:"100%",background:T.red,width:"100%",
              animation:"typewriter .9s linear forwards",
              transformOrigin:"left"}}/>
          </div>
        )}
      </div>

      {/* vignette */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,.8) 100%)"}}/>
    </div>
  );
}

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  MASTER TRANSITION ÔÇö entrada no painel do mestre
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
function MasterTransitionScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 150);
    const t2 = setTimeout(() => setPhase(2), 600);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => onComplete(), 2200);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);

  return (
    <div style={{position:"fixed",inset:0,zIndex:10000,background:"#08000f",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      opacity: phase===3?0:1, transition:phase===3?"opacity .4s":"none", overflow:"hidden"}}>
      <div className="static-bg" style={{position:"absolute",inset:0,opacity:.06}}/>
      <div style={{position:"absolute",inset:0,
        background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.015) 3px,rgba(255,255,255,.015) 4px)"}}/>

      <div style={{textAlign:"center",position:"relative"}}>
        <div className="type" style={{color:"#c41e3a80",fontSize:10,letterSpacing:4,marginBottom:20,
          opacity:phase>=1?1:0,transition:"opacity .3s"}}>
          Ôû© ACESSO RESTRITO ÔÇö N├ìVEL MESTRE Ôùé
        </div>
        <div className="pixel" style={{fontSize:70,color:"#c41e3a",lineHeight:1,letterSpacing:4,
          textShadow:"0 0 30px #c41e3a80",
          opacity:phase>=1?1:0,transform:phase>=1?"scale(1)":"scale(.7)",
          transition:"all .5s cubic-bezier(.22,1,.36,1)"}}>
          ÔÜá CLASSIFICADO
        </div>
        {phase>=2&&(
          <div style={{marginTop:12,opacity:1,animation:"slideUp .4s ease"}}>
            <div className="title" style={{fontSize:28,color:T.white,letterSpacing:4}}>PAINEL DO MESTRE</div>
            <div className="type" style={{color:T.muted,fontSize:11,marginTop:4}}>TURMA 67 ÔÇö INFORMA├ç├òES CONFIDENCIAIS</div>
          </div>
        )}
        {phase>=2&&(
          <div style={{marginTop:20,width:240,height:2,background:"#2a0a14",overflow:"hidden",margin:"20px auto 0"}}>
            <div style={{height:"100%",background:T.red,width:"100%",animation:"typewriter .8s linear forwards"}}/>
          </div>
        )}
      </div>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,.85) 100%)"}}/>
    </div>
  );
}

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  LOGIN SCREEN
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
function LoginScreen({onLogin}) {
  const [selected, setSelected] = useState(null); // char id or 'master'
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const inputRef = useRef();

  useEffect(()=>{ if(selected && inputRef.current) inputRef.current.focus(); },[selected]);

  const attempt = () => {
    const inp = pw.trim().toLowerCase();
    if(selected==="master") {
      if(inp===MASTER_PASSWORD){onLogin("master",null);} 
      else setErr("Senha do Mestre incorreta. Upupu...");
    } else {
      const c = CHARS.find(x=>x.id===selected);
      if(c && inp===c.pw){onLogin("character",c);}
      else setErr("Senha incorreta. Tente novamente.");
    }
    setPw("");
  };

  const sel = selected && selected!=="master" ? CHARS.find(x=>x.id===selected) : null;
  const rb = ROLE_BADGE.player;

  return (
    <div className="fade" style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column",alignItems:"center",padding:"30px 20px"}}>
      {/* HEADER */}
      <div style={{textAlign:"center",marginBottom:30,position:"relative"}}>
        <div style={{borderBottom:`2px solid ${T.red}`,paddingBottom:4,marginBottom:2}}>
          <span className="title flicker" style={{fontSize:48,color:T.white,letterSpacing:6}}>DANGANRONPA</span>
        </div>
        <span className="title" style={{fontSize:18,color:T.red,letterSpacing:4}}>O JULGAMENTO SUPREMO</span>
        <br/>
        <span className="type" style={{fontSize:11,color:T.muted,letterSpacing:1}}>ÔÇö TURMA 67 ÔÇö</span>
        <div style={{marginTop:12}}>
          <span className="pixel" style={{color:T.muted,fontSize:14,fontStyle:"italic"}}>
            "Bem-vindos ├á Hope's Peak Academy. Aqui, voc├¬s viver├úo, amar├úo, odiar├úo... e talvez matem uns aos outros. Upupupu!"
          </span>
        </div>
      </div>

      {/* QUICK ACCESS */}
      <div style={{display:"flex",gap:10,marginBottom:24,flexWrap:"wrap",justifyContent:"center"}}>
        <Btn variant="ghost" onClick={()=>onLogin("rules",null)}>­ƒôû Regras do Sistema</Btn>
        <Btn variant="danger" onClick={()=>{setSelected("master");setErr("");}}>­ƒöÉ Acesso Mestre</Btn>
      </div>

      {/* CHARACTER GRID */}
      <div style={{width:"100%",maxWidth:860,marginBottom:24}}>
        <p className="type" style={{textAlign:"center",color:T.muted,fontSize:11,marginBottom:14,letterSpacing:1}}>
          SELECIONE SEU PERSONAGEM PARA ACESSAR A FICHA
        </p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:8}}>
          {CHARS.map(c=>{
            const rb2 = ROLE_BADGE.player;
            const isSelected = selected===c.id;
            return (
              <div key={c.id} onClick={()=>{setSelected(c.id);setErr("");setPw("");}}
                className="slide"
                style={{background:isSelected?T.s3:T.s1,border:`1px solid ${isSelected?T.red:T.bd}`,
                  borderLeft:`3px solid ${isSelected?T.red:T.bd2}`,
                  padding:"10px 12px",cursor:"pointer",transition:"all .2s",
                  boxShadow:isSelected?`0 0 14px ${T.red}30`:"none"}}>
                {/* imagem removida dos cards; apenas n├║mero para identificar */}
                <div style={{width:"100%",height:110,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,marginBottom:8,background:T.s3,border:`1px solid ${T.bd}`}}>
                  <div className="pixel" style={{fontSize:40,color:T.dim}}>{c.num}</div>
                </div>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
                  <span className="pixel" style={{color:T.red,fontSize:20,lineHeight:1}}>{c.num}</span>
                  <Badge bg={rb2.bg} color={rb2.text}>{rb2.label}</Badge>
                </div>
                <div className="type" style={{color:T.white,fontSize:13,fontWeight:700,marginBottom:2,lineHeight:1.3}}>{c.name}</div>
                <div className="type" style={{color:T.muted,fontSize:10,lineHeight:1.4}}>{c.talent}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PASSWORD MODAL */}
      {selected && (
        <div className="slide" style={{background:T.s2,border:`1px solid ${T.red}`,borderTop:`3px solid ${T.red}`,padding:"22px 28px",width:"100%",maxWidth:400,boxShadow:`0 8px 40px ${T.red}20`}}>
          {selected==="master" ? (
            <>
              <div className="title" style={{color:T.red,fontSize:20,letterSpacing:3,marginBottom:4}}>­ƒöÉ ACESSO MESTRE</div>
              <div className="type" style={{color:T.muted,fontSize:11,marginBottom:16}}>Documento Confidencial ÔÇö Uso Exclusivo do Mestre</div>
            </>
          ):(
            <>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                <span className="pixel" style={{color:T.red,fontSize:24}}>{sel?.num}</span>
                <div>
                  <div className="type" style={{color:T.white,fontWeight:700,fontSize:14}}>{sel?.name}</div>
                  <div className="type" style={{color:T.muted,fontSize:10}}>{sel?.talent}</div>
                </div>
              </div>
            </>
          )}
          <input
            ref={inputRef}
            type="password"
            placeholder="Digite a senha..."
            value={pw}
            onChange={e=>setPw(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&attempt()}
            style={{width:"100%",marginBottom:10,fontSize:14,letterSpacing:2}}
          />
          {err&&<div className="type" style={{color:T.red,fontSize:11,marginBottom:8}}>ÔÜá {err}</div>}
          <div style={{display:"flex",gap:8}}>
            <Btn onClick={attempt}>ENTRAR</Btn>
            <Btn variant="dark" onClick={()=>{setSelected(null);setErr("");setPw("");}}>CANCELAR</Btn>
          </div>
          {/* dicas de acesso removidas por configura├º├úo do sistema */}
        </div>
      )}
    </div>
  );
}

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  RULES SCREEN
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
const CHAPTERS = [
  {id:"c1",icon:"ÔÜö´©Å",title:"Fundamentos",content:[
    {head:"O Jogo",text:"DANGANRONPA: O Julgamento Supremo ├® um RPG de mesa de suspense e dedu├º├úo para 4ÔÇô8 jogadores + 1 Mestre. Um grupo de at├® 16 estudantes ├® for├ºado a participar de um Killing Game conduzido por Monokuma. Para sobreviver: descubra o assassino nos Tribunais. Para fugir: acumule Esperan├ºa suficiente. Para vencer do jeito errado: cometa o assassinato perfeito."},
    {head:"Dado Monokuma",text:"Sempre que um jogador rolar um 6 natural em qualquer teste, o Mestre pode ativar um Evento Monokuma ÔÇö uma complica├º├úo ou revela├º├úo dram├ítica inesperada."},
    {head:"Esperan├ºa ÔÿÇ´©Å vs. Desesperan├ºa ­ƒÆÇ",table:[
      ["Recurso","Aumenta quandoÔÇª"],
      ["ÔÿÇ´©Å Esperan├ºa","Tribunal bem-sucedido, la├ºos de amizade, descobertas positivas"],
      ["­ƒÆÇ Desesperan├ºa","Assassinato ocorre, acusa├º├úo errada, revela├º├úo de segredos sombrios"],
    ]},
  ]},
  {id:"c2",icon:"­ƒÄ¡",title:"Personagem",content:[
    {head:"Atributos Base (60 pts | M├¡n:5 | M├íx:15)",table:[
      ["Atributo","Sigla","O que representa"],
      ["Esperan├ºa","ESP","For├ºa de vontade, resist├¬ncia mental, moral"],
      ["Intelig├¬ncia","INT","Racioc├¡nio, dedu├º├úo, mem├│ria, percep├º├úo"],
      ["Furtividade","FUR","Discri├º├úo, movimenta├º├úo silenciosa, dissimula├º├úo"],
      ["Persuas├úo","PER","Convencimento, carisma, intimida├º├úo, mentira"],
      ["Resist├¬ncia","RES","F├¡sico, aguenta press├úo, stamina"],
      ["Sorte","SOR","Acaso favor├ível, achados inesperados"],
    ]},
    {head:"Derivados (calculados automaticamente)",table:[
      ["Derivado","F├│rmula"],
      ["PV M├íximo","RES ├ù 3 + 10"],
      ["PS M├íximo","ESP ├ù 3 + 10"],
      ["Iniciativa","INT + SOR"],
      ["Defesa Passiva","RES ├À 2 (arredonda p/ baixo)"],
      ["Limite Monocoins","SOR ├ù 5"],
    ]},
    {head:"La├ºos de Amizade (N├¡vel 0ÔÇô5)",table:[
      ["N├¡vel","Nome","Benef├¡cio"],
      ["0","Desconhecidos","Nenhum"],
      ["1","Conhecidos","+1 em Persuas├úo com essa pessoa"],
      ["2","Amigos","Pode pedir 1 favor por sess├úo"],
      ["3","Amigos Pr├│ximos","+2 em testes para proteger/ajudar"],
      ["4","Confian├ºa Plena","Pode compartilhar Segredo sem penalidade"],
      ["5","V├¡nculo Supremo","Habilidade especial co-desenvolvida com o Mestre"],
    ]},
  ]},
  {id:"c3",icon:"­ƒÄ▓",title:"Testes",content:[
    {head:"Como Fazer um Teste",text:"1. Role 1d20 ÔåÆ 2. Some o valor do Atributo relevante ÔåÆ 3. Compare ao N├║mero Alvo (NA) definido pelo Mestre."},
    {head:"Resultados",table:[
      ["Resultado","Efeito"],
      ["Total ÔëÑ NA + 5","Sucesso Cr├¡tico ÔÇö resultado excepcional, b├┤nus narrativo"],
      ["Total ÔëÑ NA","Sucesso ÔÇö a├º├úo bem-sucedida"],
      ["Total = NAÔêÆ1 ou NAÔêÆ2","Sucesso Parcial ÔÇö funciona, mas com custo ou complica├º├úo"],
      ["Total < NAÔêÆ2","Falha ÔÇö a├º├úo falha, pode ter consequ├¬ncia"],
      ["1 natural","Falha Catastr├│fica ÔÇö algo vai muito errado"],
    ]},
    {head:"N├║meros Alvo de Refer├¬ncia",table:[
      ["Dificuldade","NA","Exemplo"],
      ["F├ícil","10","Notar algo ├│bvio, mentira simples"],
      ["M├®dio","15","Encontrar pista escondida, convencer algu├®m incerto"],
      ["Dif├¡cil","20","Investigar cena apagada, enganar algu├®m desconfiado"],
      ["Supremo","25","Descoberta brilhante, manipula├º├úo perfeita"],
      ["Quase Imposs├¡vel","30","Feito digno de um Supremo lend├írio"],
    ]},
    {head:"Vantagem e Desvantagem",text:"Vantagem: Role 2d20, use o maior. Concedida por prepara├º├úo, equipamentos, la├ºos de amizade.\nDesvantagem: Role 2d20, use o menor. Concedida por trauma, ferimento, falta de informa├º├úo.\nTestes Opostos: Ambos rolam 1d20 + atributo. Vence o maior total. Empate: vence o Defensor."},
  ]},
  {id:"c4",icon:"­ƒù║´©Å",title:"Fases do Jogo",content:[
    {head:"Estrutura de uma Rodada",text:"[1] VIDA COTIDIANA\nÔåô (Monokuma entrega Motivo)\n[2] FREE TIME / TENS├âO\nÔåô (assassinato acontece OU n├úo)\n[3] DESCOBERTA DO CORPO\nÔåô\n[4] INVESTIGA├ç├âO (tempo limitado)\nÔåô\n[5] TRIBUNAL DE CLASSE\nÔåô (execu├º├úo OU sobreviv├¬ncia)"},
    {head:"Motivos de Monokuma (d8)",table:[
      ["d8","Motivo"],
      ["1","Segredo Revelado ÔÇö Monokuma vai expor o segredo de algu├®m"],
      ["2","Mem├│ria Apagada ÔÇö Quer recuperar mem├│ria? Mate algu├®m"],
      ["3","Chantagem ÔÇö Fotos/v├¡deos comprometedores enviados a familiares"],
      ["4","D├¡vida de Esperan├ºa ÔÇö Se ningu├®m matar em 72h, algu├®m morre aleat├│rio"],
      ["5","Recompensa ÔÇö O assassino ganha um item lend├írio"],
      ["6","Amea├ºa Direta ÔÇö Algu├®m recebe mensagem: 'mate X ou eu o mato'"],
      ["7","Rivalidade ÔÇö Dois estudantes t├¬m objetivos incompat├¡veis"],
      ["8","Motivo do Mestre ÔÇö Personalizado"],
    ]},
    {head:"Free Time ÔÇö A├º├Áes (2 por per├¡odo)",table:[
      ["A├º├úo","Custo","Efeito"],
      ["Conversar","Gr├ítis","Testa La├ºo com outro estudante; +1 de La├ºo em Sucesso"],
      ["Dar Presente","1ÔÇô3 Monocoins","+1 ou +2 de La├ºo, dependendo do presente"],
      ["Treinar","Gr├ítis","+1 tempor├írio em um Atributo at├® o pr├│ximo Tribunal"],
      ["Explorar","Gr├ítis","Descobre um novo c├┤modo/├írea do mapa"],
      ["Planejar Crime","Gr├ítis (secreto)","Elabora etapas do assassinato com o Mestre"],
      ["Descansar","Gr├ítis","Recupera 1d6 PS"],
    ]},
  ]},
  {id:"c5",icon:"­ƒö¬",title:"Assassinato",content:[
    {head:"Etapas do Assassinato",text:"PLANEJAR (alvo + m├®todo + local + janela de tempo + ├ílibi) ÔåÆ EXECUTAR (testes conforme o m├®todo) ÔåÆ COBRIR (at├® 3 a├º├Áes de cobertura)"},
    {head:"Tipos de Execu├º├úo",table:[
      ["M├®todo","Teste","Detalhes"],
      ["Confronto Direto","RES vs RES (Oposto)","Se vencer: sucesso. Se perder: v├¡tima escapa e pode gritar."],
      ["Veneno/Armadilha","INT (NA 15ÔÇô20) + FUR (NA 15)","V├¡tima faz Teste SOR para notar algo errado"],
      ["Emboscada","FUR vs INT (Oposto)","Se vencer: ataque surpresa, v├¡tima n├úo resiste na rodada inicial"],
    ]},
    {head:"A├º├Áes de Cobertura (m├íx. 3)",table:[
      ["A├º├úo","Teste","Efeito"],
      ["Apagar Rastros de Sangue","FUR NA 18","Remove 1 Pista F├¡sica da cena"],
      ["Criar Pista Falsa","INT NA 20","Adiciona 1 Pista Enganosa ├á cena"],
      ["Forjar ├ülibi","PER NA 18","Cria testemunho fabricado com NPC"],
      ["Esconder Arma","FUR NA 15","Arma n├úo aparece na investiga├º├úo inicial"],
      ["Mover o Corpo","RES NA 15","Corpo encontrado em local diferente do crime"],
    ]},
  ]},
  {id:"c6",icon:"­ƒöì",title:"Investiga├º├úo",content:[
    {head:"Zonas de Investiga├º├úo",text:"O Mestre divide o mapa em Zonas. Cada zona pode ser investigada uma vez por jogador. Declare a zona ÔåÆ Teste de INT (NA 12ÔÇô18) ÔåÆ encontre pistas conforme o resultado."},
    {head:"Resultado da Investiga├º├úo",table:[
      ["Resultado do Teste","Pistas Encontradas"],
      ["Falha","Nenhuma pista, ou pista falsa plantada pelo assassino"],
      ["Sucesso Parcial","1 pista menor (pode ser amb├¡gua)"],
      ["Sucesso","1ÔÇô2 pistas relevantes"],
      ["Sucesso Cr├¡tico","2ÔÇô3 pistas, incluindo uma pista oculta"],
    ]},
    {head:"Tipos de Pistas",table:[
      ["Tipo","Cor","Descri├º├úo"],
      ["­ƒöÁ F├¡sica","Azul","Objeto tang├¡vel (faca, copo, tecido)"],
      ["­ƒƒí Temporal","Amarelo","Indica hor├írio (alarme, c├ómera, card├ípio)"],
      ["­ƒƒó Testemunhal","Verde","Relato de NPC ou outro estudante"],
      ["­ƒö┤ Emocional","Vermelho","Pista psicol├│gica (carta, di├írio, motiva├º├úo)"],
      ["ÔÜ½ Falsa","Preto","Plantada pelo assassino (o jogador n├úo sabe)"],
    ]},
    {head:"For├ºa das Balas de Verdade",table:[
      ["For├ºa","Tipo","Efeito no Tribunal"],
      ["Ô¡É","Pista menor, amb├¡gua","Levanta d├║vida"],
      ["Ô¡ÉÔ¡É","Pista direta, circunstancial","For├ºa uma explica├º├úo"],
      ["Ô¡ÉÔ¡ÉÔ¡É","Pista forte, espec├¡fica","Destr├│i um argumento"],
      ["Ô¡ÉÔ¡ÉÔ¡ÉÔ¡É","Prova conclusiva","Pode encerrar um debate"],
    ]},
  ]},
  {id:"c7",icon:"ÔÜû´©Å",title:"Tribunal",content:[
    {head:"Estrutura do Tribunal",text:"[1] ABERTURA (suspeitas secretas) ÔåÆ [2] DEBATE LIVRE (15 min reais) ÔåÆ [3] NONSTOP DEBATE (Balas de Verdade) ÔåÆ [4] ACUSA├ç├âO FINAL ÔåÆ [5] VOTA├ç├âO"},
    {head:"Nonstop Debate ÔÇö Regras",text:"1. O Mestre apresenta 4ÔÇô6 Declara├º├Áes ÔÇö afirma├º├Áes dos suspeitos sobre o crime.\n2. Cada Declara├º├úo tem uma Fraqueza.\n3. Em ordem de Iniciativa: atirar Bala, apoiar Declara├º├úo ou passar.\n\nTiro de Bala: 'Uso [Bala] contra [Declara├º├úo X]' ÔåÆ Teste INT (NA = 10 + For├ºa ├ù 3)\nSucesso: Declara├º├úo destru├¡da. Falha: Bala desperdi├ºada."},
    {head:"Resultado da Vota├º├úo",table:[
      ["Cen├írio","Resultado"],
      ["Maioria vota ÔÿØ e est├í CERTA","Assassino executado. +3 Esperan├ºa. Pr├│xima fase come├ºa."],
      ["Maioria vota ÔÿØ mas est├í ERRADA","Assassino escapa! Monokuma executa inocente aleat├│rio. ÔêÆ5 Esperan├ºa"],
      ["Empate","Monokuma escolhe aleatoriamente um suspeito para executar"],
      ["Maioria vota ­ƒæÄ","Ningu├®m executado. ÔêÆ2 Esperan├ºa. Assassino fica livre para matar novamente."],
    ]},
    {head:"B├┤nus de Performance (Monocoins)",table:[
      ["Conquista","Monocoins"],
      ["Fez a Acusa├º├úo Final correta","+5"],
      ["Destruiu 3+ Declara├º├Áes com Balas","+3"],
      ["Mentiu convincentemente por 2+ rodadas (assassino)","+3"],
      ["Descobriu a Pista Decisiva","+4"],
      ["N├úo perdeu nenhuma Bala durante o debate","+2"],
      ["Mudou o rumo do Tribunal com 1 argumento","+2"],
    ]},
  ]},
  {id:"c8",icon:"­ƒÅå",title:"Vit├│ria e Derrota",content:[
    {head:"Vit├│rias Individuais",table:[
      ["Condi├º├úo","Tipo de Vit├│ria"],
      ["Sobreviver at├® o fim do Killing Game","Vit├│ria de Sobreviv├¬ncia"],
      ["Cometer um assassinato perfeito e fugir","Vit├│ria do Assassino"],
      ["Descobrir o assassino em todos os Tribunais","Vit├│ria do Detetive"],
      ["Acumular 30+ Monocoins","Vit├│ria de Fortuna"],
    ]},
    {head:"Vit├│ria Coletiva",text:"O grupo pode vencer coletivamente se:\nÔÇó A Esperan├ºa global atingir 50\nÔÇó Descobrirem o 'segredo do Killing Game' (gatilho narrativo do Mestre)\nÔÇó Confrontarem Monokuma com evid├¬ncias de sua fraqueza"},
    {head:"Derrota Coletiva",text:"O grupo perde se:\nÔÇó Restar apenas 1 estudante vivo (sem ter descoberto o segredo)\nÔÇó A Desesperan├ºa global atingir 50\nÔÇó Um assassino escapar impune 3 vezes seguidas"},
  ]},
];

function RulesScreen({onBack}) {
  const [activeChapter, setActiveChapter] = useState("c1");
  const chapter = CHAPTERS.find(c=>c.id===activeChapter);
  const [dice, setDice] = useState(null);
  const [attr, setAttr] = useState(10);

  const rollDice = () => {
    const r = Math.floor(Math.random()*20)+1;
    setDice({roll:r,total:r+attr,nat:(r===1||r===20)});
  };

  return (
    <div className="fade" style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column"}}>
      {/* TOP BAR */}
      <div style={{background:T.s1,borderBottom:`1px solid ${T.bd}`,padding:"10px 20px",display:"flex",alignItems:"center",gap:16,position:"sticky",top:0,zIndex:100}}>
        <Btn variant="ghost" onClick={onBack} style={{fontSize:11}}>ÔåÉ VOLTAR</Btn>
        <div>
          <span className="title" style={{color:T.red,fontSize:20,letterSpacing:3}}>MANUAL DE REGRAS</span>
          <span className="type" style={{color:T.muted,fontSize:10,marginLeft:10}}>DANGANRONPA: O JULGAMENTO SUPREMO v1.0</span>
        </div>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden",height:"calc(100vh - 52px)"}}>
        {/* SIDEBAR */}
        <div style={{width:200,background:T.s1,borderRight:`1px solid ${T.bd}`,padding:"16px 0",overflowY:"auto",flexShrink:0}}>
          {CHAPTERS.map(c=>(
            <div key={c.id} onClick={()=>setActiveChapter(c.id)}
              style={{padding:"10px 16px",cursor:"pointer",display:"flex",gap:8,alignItems:"center",
                borderLeft:`3px solid ${activeChapter===c.id?T.red:"transparent"}`,
                background:activeChapter===c.id?T.s2:"transparent",
                color:activeChapter===c.id?T.white:T.muted,transition:"all .15s"}}>
              <span style={{fontSize:14}}>{c.icon}</span>
              <span className="type" style={{fontSize:11,letterSpacing:.5}}>{c.title}</span>
            </div>
          ))}
          {/* DICE ROLLER */}
          <div style={{margin:"20px 12px 0",background:T.s2,border:`1px solid ${T.bd}`,padding:"12px",borderRadius:2}}>
            <div className="title" style={{color:T.yellow,fontSize:12,letterSpacing:2,marginBottom:10}}>­ƒÄ▓ ROLAR DADO</div>
            <div className="type" style={{fontSize:10,color:T.muted,marginBottom:4}}>Valor do Atributo:</div>
            <input type="number" min={1} max={20} value={attr} onChange={e=>setAttr(+e.target.value)}
              style={{width:"100%",marginBottom:8,textAlign:"center"}}/>
            <Btn onClick={rollDice} style={{width:"100%",marginBottom:8,textAlign:"center"}}>ROLAR 1d20</Btn>
            {dice&&(
              <div style={{textAlign:"center"}}>
                <div className="pixel" style={{fontSize:36,color:dice.nat&&dice.roll===20?T.yellow:dice.nat&&dice.roll===1?T.red:T.white,lineHeight:1}}>{dice.roll}</div>
                <div className="type" style={{fontSize:10,color:T.muted}}>1d20</div>
                <div className="pixel" style={{fontSize:24,color:T.yellow}}>={dice.total}</div>
                {dice.roll===20&&<div style={{color:T.yellow,fontSize:10,marginTop:4}}>Ôÿà CR├ìTICO!</div>}
                {dice.roll===1&&<div style={{color:T.red,fontSize:10,marginTop:4}}>­ƒÆÇ CATASTR├ôFICO!</div>}
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div style={{flex:1,overflowY:"auto",padding:"24px 28px"}}>
          <div className="slide">
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
              <span style={{fontSize:28}}>{chapter.icon}</span>
              <div>
                <div className="title" style={{fontSize:28,color:T.white,letterSpacing:3}}>{chapter.title}</div>
                <div style={{borderBottom:`2px solid ${T.red}`,width:60,marginTop:4}}/>
              </div>
            </div>
            {chapter.content.map((sec,i)=>(
              <div key={i} style={{marginBottom:24}}>
                <div className="title" style={{color:T.yellow,fontSize:14,letterSpacing:2,marginBottom:8}}>{sec.head}</div>
                {sec.text&&(
                  <div className="type" style={{color:T.muted,fontSize:12,lineHeight:1.8,whiteSpace:"pre-line",
                    background:T.s2,border:`1px solid ${T.bd}`,padding:"12px 14px",borderLeft:`3px solid ${T.bd2}`}}>
                    {sec.text}
                  </div>
                )}
                {sec.table&&(
                  <div style={{overflowX:"auto"}}>
                    <table>
                      <thead>
                        <tr>{sec.table[0].map((h,j)=><th key={j}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {sec.table.slice(1).map((row,j)=>(
                          <tr key={j}>
                            {row.map((cell,k)=>(
                              <td key={k} className="type" style={{color:k===0?T.white:T.muted,fontWeight:k===0?700:400}}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* imagem modal removido daqui ÔÇö agora renderizado na ficha do personagem */}
    </div>
  );
}

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  CHARACTER SCREEN
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
function CharacterScreen({char,onBack}) {
  const d = derive(char.attrs);
  const [status, setStatus] = usePersist(PERSIST_KEYS.charStatus(char.id), {pv:d.pvMax,ps:d.psMax,coins:0});
  const [bonds, setBonds] = usePersist(PERSIST_KEYS.charBonds(char.id), CHARS.filter(c=>c.id!==char.id).map(c=>({id:c.id,name:c.name,lvl:(char.bonds.find(bb=>bb.name===c.name)?.lvl??0)})));
  // migrate older numeric-only bonds to object form
  useEffect(()=>{
    if(Array.isArray(bonds) && bonds.length && typeof bonds[0] === 'number'){
      setBonds(CHARS.filter(c=>c.id!==char.id).map((c,i)=>({id:c.id,name:c.name,lvl:bonds[i]||0})));
    }
  }, [char.id]);
  const [clues, setClues] = usePersist(PERSIST_KEYS.charClues(char.id), []);
  const [notes, setNotes] = usePersist(PERSIST_KEYS.charNotes(char.id), "");
  const [tribunal, setTribunal] = usePersist(PERSIST_KEYS.charTribunal(char.id),
    {suspect:"",evidence:"",accusation:"",votes:"",phase:"",notes:""});
  const [tab, setTab] = useState("ficha");
  const [showAddClue, setShowAddClue] = useState(false);
  const [newClue, setNewClue] = useState({name:"",type:"fisica",force:"Ô¡É",desc:"",status:"disponivel"});
  const [memoriesUnlocked, setMemoriesUnlocked] = usePersist(PERSIST_KEYS.charMemories(char.id), false);
  const [memCode, setMemCode] = useState("");
  const [memErr, setMemErr] = useState("");
  const [showMemUnlock, setShowMemUnlock] = useState(false);
  const [lockedUnlocked, setLockedUnlocked] = usePersist(PERSIST_KEYS.charLocked(char.id), false);
  const [lockCode, setLockCode] = useState("");
  const [lockErr, setLockErr] = useState("");
  const [showLockInput, setShowLockInput] = useState(false);
  const lockedMem = LOCKED_MEMORIES[char.id];
  const LOCK_CODE = LOCK_CODES[char.id] || String(char.id).padStart(2,"0");
  const [charImage, setCharImage] = usePersist(PERSIST_KEYS.charImage(char.id), "");
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgErr, setImgErr] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const rb = ROLE_BADGE.player;
  const { isMobile } = useViewport();

  // se houver imagem definida no CHARS, inicializa o estado persistente com ela
  useEffect(()=>{
    if(!charImage) {
      const fallback = char.image || `img/${String(char.id).padStart(2,'0')}.jpeg`;
      setCharImage(fallback);
    }
  }, [char, charImage, setCharImage]);


  const copyPrompt = () => {
    const p = CHAR_PROMPTS[char.id] || "";
    navigator.clipboard?.writeText(p).then(()=>{
      setCopied(true); setTimeout(()=>setCopied(false), 2200);
    }).catch(()=>{ setCopied(true); setTimeout(()=>setCopied(false), 2200); });
  };

  const adjStatus = (field, delta) => {
    setStatus(prev=>({...prev,[field]:Math.max(0,Math.min(field==="pv"?d.pvMax:field==="ps"?d.psMax:d.coinsMax,prev[field]+delta))}));
  };

  const TABS = [
    {id:"ficha",label:"­ƒôï FICHA"},
    {id:"clues",label:"­ƒöì PISTAS"},
    {id:"tribunal",label:"ÔÜû´©Å TRIBUNAL"},
    {id:"notas",label:"­ƒôØ NOTAS"},
  ];

  return (<>
    <div className="fade" style={{minHeight:"100vh",background:T.bg}}>
      {/* HEADER */}
      <div style={{background:T.s1,borderBottom:`3px solid ${T.red}`,padding:"12px 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
              <span className="pixel" style={{color:T.red,fontSize:28}}>{char.num}</span>
              <div>
                <div className="title" style={{fontSize:22,color:T.white,letterSpacing:2,lineHeight:1}}>{char.name}</div>
                <div className="type" style={{color:T.muted,fontSize:10}}>{char.talent}</div>
              </div>
              <Badge bg={rb.bg} color={rb.text}>{rb.label}</Badge>
              {char.age&&<span className="type" style={{color:T.dim,fontSize:11}}>{char.age} anos ÔÇó {char.pro}</span>}
            </div>
          </div>
          <Btn variant="ghost" onClick={onBack} style={{fontSize:11}}>ÔåÉ SAIR</Btn>
        </div>

        {/* STATUS BARS - compact */}
        <div style={{display:"flex",gap:20,marginTop:12,flexWrap:"wrap"}}>
          <StatBar label="PV ÔÇö Pontos de Vida" cur={status.pv} max={d.pvMax} color={T.greenL}
            onPlus={()=>adjStatus("pv",1)} onMinus={()=>adjStatus("pv",-1)}/>
          <StatBar label="PS ÔÇö Pontos de Sanidade" cur={status.ps} max={d.psMax} color={T.blue}
            onPlus={()=>adjStatus("ps",1)} onMinus={()=>adjStatus("ps",-1)}/>
          <div style={{minWidth:120}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span className="type" style={{fontSize:10,color:T.muted,letterSpacing:1,textTransform:"uppercase"}}>­ƒ¬Ö Monocoins</span>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <button onClick={()=>adjStatus("coins",-1)} style={{background:T.s4,border:"none",color:T.white,width:20,height:20,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",borderRadius:1}}>ÔêÆ</button>
                <span className="pixel" style={{color:T.yellow,fontSize:22,lineHeight:1}}>{status.coins}<span style={{color:T.muted,fontSize:12}}>/{d.coinsMax}</span></span>
                <button onClick={()=>adjStatus("coins",1)} style={{background:T.s4,border:"none",color:T.white,width:20,height:20,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",borderRadius:1}}>+</button>
              </div>
            </div>
            <div style={{background:T.s4,height:6,borderRadius:1}}>
              <div style={{height:"100%",width:`${(status.coins/d.coinsMax)*100}%`,background:T.yellow,transition:"width .3s"}}/>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{display:"flex",gap:2,marginTop:14}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{background:tab===t.id?T.red:T.s3,color:tab===t.id?T.white:T.muted,
                border:"none",padding:"7px 16px",fontSize:11,letterSpacing:.5,transition:"all .15s",cursor:"pointer"}}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"20px",maxWidth:900,margin:"0 auto"}}>

        {/* ÔöÇÔöÇÔöÇ TAB: FICHA ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */}
        {tab==="ficha"&&(
          <div className="slide">
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"190px 1fr 1fr",gap:14,marginBottom:14}}>
              {/* ÔöÇÔöÇ PORTRAIT IMAGE CARD ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */}
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {/* Image area */}
                <div onClick={()=>setShowImageModal(true)}
                  style={{background:T.s3,border:`1px solid ${charImage?T.bd2:T.bd}`,
                    borderStyle:charImage?"solid":"dashed",
                    width:"100%",aspectRatio:"3/4",display:"flex",
                    flexDirection:"column",alignItems:"center",justifyContent:"center",
                    cursor:"pointer",overflow:"hidden",position:"relative",
                    transition:"border-color .2s"}}>
                  {charImage ? (
                    <>
                      <img src={charImage} alt={char.name}
                        style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                      <div style={{position:"absolute",bottom:0,left:0,right:0,
                        background:"linear-gradient(transparent,rgba(0,0,0,.7))",
                        padding:"20px 8px 6px",display:"flex",justifyContent:"center"}}>
                        <span className="type" style={{color:"rgba(255,255,255,.7)",fontSize:9,letterSpacing:1}}>
                          CLIQUE PARA AMPLIAR
                        </span>
                      </div>
                    </>
                  ) : (
                    <div style={{textAlign:"center",padding:12}}>
                      <div style={{fontSize:32,marginBottom:8,opacity:.4}}>­ƒû╝</div>
                      <div className="type" style={{color:T.dim,fontSize:10,lineHeight:1.5}}>
                        Imagem dispon├¡vel apenas na ficha
                      </div>
                    </div>
                  )}
                </div>

                {imgErr&&<div className="type" style={{color:T.red,fontSize:9}}>{imgErr}</div>}

                {/* Prompt IA button removed per request (images are now linked directly to characters) */}

                {/* Remove image if exists */}
                {/* Remo├º├úo/altera├º├úo de imagem desativada */}
              </div>
              {/* IDENTITY */}
              <Card>
                <SectionTitle icon="­ƒÄ¡">Identidade</SectionTitle>
                <div style={{background:T.s3,padding:"10px 12px",borderLeft:`3px solid ${T.bd2}`,marginBottom:10}}>
                  <div className="type" style={{color:T.muted,fontSize:10,marginBottom:4}}>APAR├èNCIA</div>
                  <div className="type" style={{color:T.white,fontSize:12,lineHeight:1.7}}>{char.appear}</div>
                </div>
                <div style={{background:T.s3,padding:"10px 12px",borderLeft:`3px solid ${T.yellow}`}}>
                  <div className="type" style={{color:T.muted,fontSize:10,marginBottom:4}}>MOTIVA├ç├âO</div>
                  <div className="type" style={{color:T.white,fontSize:12,lineHeight:1.7}}>
                    {char.isMastermind && memoriesUnlocked
                      ? char.motivation.split("[REAL]")[1]?.trim() || char.motivation
                      : char.motivation.split("\n[REAL]")[0].replace("[APARENTE]","").trim()}
                  </div>
                </div>
              </Card>

              {/* ATTRIBUTES */}
              <Card>
                <SectionTitle icon="ÔÜí">Atributos</SectionTitle>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                  {Object.entries(char.attrs).map(([k,v])=>(
                    <div key={k} style={{background:T.s3,padding:"8px 10px",textAlign:"center",border:`1px solid ${T.bd}`}}>
                      <div className="type" style={{color:T.muted,fontSize:9,letterSpacing:1}}>{k}</div>
                      <div className="pixel" style={{color:T.yellow,fontSize:28,lineHeight:1}}>{v}</div>
                    </div>
                  ))}
                </div>
                <SectionTitle icon="­ƒôÉ">Derivados</SectionTitle>
                <table>
                  <tbody>
                    {[
                      ["PV M├íximo", d.pvMax, "RES├ù3+10"],
                      ["PS M├íximo", d.psMax, "ESP├ù3+10"],
                      ["Iniciativa", d.init, "INT+SOR"],
                      ["Defesa Passiva", d.def, "RES├À2"],
                      ["Lim. Monocoins", d.coinsMax, "SOR├ù5"],
                    ].map(([l,v,f])=>(
                      <tr key={l}>
                        <td className="type" style={{color:T.white,fontSize:12}}>{l}</td>
                        <td className="pixel" style={{color:T.yellow,fontSize:20,textAlign:"right"}}>{v}</td>
                        <td className="type" style={{color:T.dim,fontSize:10,textAlign:"right"}}>Ôå│ {f}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>

            {/* ABILITY + WEAKNESS */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              <Card style={{borderLeft:`3px solid ${T.yellow}`}}>
                <SectionTitle icon="Ô£¿" color={T.yellow}>Habilidade Especial</SectionTitle>
                <div className="title" style={{color:T.yellow,fontSize:15,letterSpacing:2,marginBottom:6}}>
                  {char.isMastermind && memoriesUnlocked ? char.abilityReal.name : char.ability.name}
                </div>
                <div className="type" style={{color:T.muted,fontSize:12,lineHeight:1.7}}>
                  {char.isMastermind && memoriesUnlocked ? char.abilityReal.desc : char.ability.desc}
                </div>
              </Card>
              <Card style={{borderLeft:`3px solid ${T.red}`}}>
                <SectionTitle icon="ÔÜá´©Å" color={T.red}>Fraqueza do Talento</SectionTitle>
                <div className="type" style={{color:T.muted,fontSize:12,lineHeight:1.7}}>{char.weakness}</div>
              </Card>
            </div>

            {/* BONDS */}
            <Card>
              <SectionTitle icon="­ƒÆø">La├ºos de Amizade</SectionTitle>
              <table>
                <thead>
                  <tr>
                    <th>Personagem</th>
                    <th>N├¡vel</th>
                    <th>Benef├¡cio</th>
                    <th style={{textAlign:"right"}}>Ajustar</th>
                  </tr>
                </thead>
                <tbody>
                  {bonds.map((b,i)=>{
                      const lvl = b.lvl??0;
                      const benefits=["Nenhum","+1 PER","1 favor/sess├úo","+2 p/ proteger","Confian├ºa Plena","V├¡nculo Supremo"];
                      return (
                        <tr key={b.id||i}>
                          <td className="type" style={{color:T.white,fontWeight:700}}>
                            <input value={b.name} onChange={e=>setBonds(prev=>{const np=[...prev];np[i]={...np[i],name:e.target.value};return np;})}
                              style={{background:"transparent",border:"none",color:T.white,fontSize:12,width:"100%"}}/>
                          </td>
                          <td>
                            <div style={{display:"flex",gap:2}}>
                              {[0,1,2,3,4,5].map(n=>(
                                <div key={n} style={{width:14,height:14,borderRadius:"50%",
                                  background:n<=lvl?T.yellow:T.s4,border:`1px solid ${n<=lvl?T.yellowD:T.bd}`,cursor:"pointer"}}
                                  onClick={()=>setBonds(prev=>{const np=[...prev];np[i]={...np[i],lvl:n};return np;})}/>
                              ))}
                            </div>
                          </td>
                          <td className="type" style={{color:T.muted,fontSize:11}}>{benefits[lvl]||"Nenhum"}</td>
                          <td style={{textAlign:"right"}}>
                            <div style={{display:"flex",gap:4,justifyContent:"flex-end"}}>
                              <button onClick={()=>setBonds(prev=>{const np=[...prev];np[i]={...np[i],lvl:Math.max(0,(np[i]?.lvl??0)-1)};return np;})}
                                style={{background:T.s4,border:"none",color:T.white,padding:"2px 8px",cursor:"pointer",fontSize:12}}>ÔêÆ</button>
                              <span className="pixel" style={{color:T.yellow,fontSize:18,minWidth:20,textAlign:"center"}}>{lvl}</span>
                              <button onClick={()=>{console.log('[BOND-CLICK] + for bond', i); setBonds(prev=>{const np=[...prev];np[i]={...np[i],lvl:Math.min(5,(np[i]?.lvl??0)+1)};console.log('[BOND-SET] new bonds:', JSON.stringify(np).substring(0,100));return np;})}}
                                style={{background:T.s4,border:"none",color:T.white,padding:"2px 8px",cursor:"pointer",fontSize:12}}>+</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div style={{marginTop:10,padding:"8px 10px",background:T.s3,fontSize:10,color:T.dim}}>
                <span className="type">N├¡vel 0: Desconhecidos | 1: Conhecidos (+1 PER) | 2: Amigos (1 favor) | 3: Pr├│ximos (+2) | 4: Confian├ºa Plena | 5: V├¡nculo Supremo</span>
              </div>
            </Card>

            {/* ÔöÇÔöÇ LOCKED MEMORY CARD (todos os personagens) ÔöÇÔöÇ */}
            {lockedMem && (
              <div style={{marginTop:16}}>
                {!lockedUnlocked && !showLockInput && (
                  <Btn onClick={()=>setShowLockInput(true)}
                    style={{background:"#1a1430",color:"#9070c8",border:"1px solid #4a3080",fontSize:11}}>
                    ­ƒºá INSERIR C├ôDIGO DE RECUPERA├ç├âO
                  </Btn>
                )}

                {!lockedUnlocked && showLockInput && (
                  <div>
                    <div className="type" style={{fontSize:10,color:T.muted,marginBottom:6}}>
                      C├│digo de recupera├º├úo de mem├│ria:
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <input type="password" value={lockCode}
                        onChange={e=>setLockCode(e.target.value)}
                        onKeyDown={e=>{
                          if(e.key==="Enter"){
                            if(lockCode.trim()===LOCK_CODE){setLockedUnlocked(true);setShowLockInput(false);setLockErr("");}
                            else setLockErr("C├│digo inv├ílido.");
                          }
                        }}
                        placeholder="C├│digo do Mestre..." style={{flex:1,letterSpacing:4}}/>
                      <Btn onClick={()=>{
                        if(lockCode.trim()===LOCK_CODE){setLockedUnlocked(true);setShowLockInput(false);setLockErr("");}
                        else setLockErr("C├│digo inv├ílido. Aguarde o momento certo.");
                      }} style={{background:"#1a1430",color:"#9070c8",border:"1px solid #4a3080",fontSize:11}}>
                        DESBLOQUEAR
                      </Btn>
                    </div>
                    {lockErr&&<div className="type" style={{color:T.red,fontSize:11,marginTop:6}}>ÔÜá {lockErr}</div>}
                  </div>
                )}

                {lockedUnlocked && (
                  <div className="slide" style={{background:"#0e0d20",border:`1px solid #5040a0`,borderTop:`3px solid #9070e0`,padding:"20px",boxShadow:`0 0 30px #6040a015`}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                      <span style={{fontSize:22}}>­ƒöô</span>
                      <div>
                        <div className="type" style={{color:"#7060b0",fontSize:9,letterSpacing:2,marginBottom:2}}>MEM├ôRIA RECUPERADA</div>
                        <div className="title" style={{color:"#c0a8ff",fontSize:18,letterSpacing:3}}>{lockedMem.title}</div>
                      </div>
                    </div>
                    <div style={{background:"#120f22",border:`1px solid #3a2a60`,borderLeft:`3px solid #8060d0`,padding:"14px 16px"}}>
                      <div className="type" style={{color:"#d0c0f8",fontSize:13,lineHeight:1.9,whiteSpace:"pre-line"}}>{lockedMem.content}</div>
                    </div>
                    <div className="type" style={{color:T.dim,fontSize:10,marginTop:10,textAlign:"right"}}>Esta mem├│ria foi suprimida antes da sua entrada na Academy.</div>
                  </div>
                )}
              </div>
            )}

            {/* ÔöÇÔöÇ MASTERMIND MEMORIES SECTION ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */}
            {char.isMastermind && !memoriesUnlocked && (
              <div className="pulse" style={{marginTop:16,background:"#0a0a14",border:`1px solid #2a1a2e`,borderTop:`2px solid #44224e`,padding:"20px"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                  <div style={{fontSize:28}}>­ƒöÆ</div>
                  <div>
                    <div className="title" style={{color:"#a060c0",fontSize:16,letterSpacing:3}}>MEM├ôRIAS SUPRIMIDAS</div>
                    <div className="type" style={{color:T.dim,fontSize:11}}>H├í algo bloqueado nas suas mem├│rias. O Mestre pode liberar acesso.</div>
                  </div>
                </div>
                {!showMemUnlock ? (
                  <Btn onClick={()=>setShowMemUnlock(true)} style={{background:"#2a1040",color:"#c090e0",border:"1px solid #6030a0",fontSize:12}}>
                    ­ƒºá RECUPERAR MEM├ôRIAS
                  </Btn>
                ) : (
                  <div>
                    <div className="type" style={{fontSize:11,color:T.muted,marginBottom:6}}>C├│digo de recupera├º├úo (fornecido pelo Mestre):</div>
                    <div style={{display:"flex",gap:8}}>
                      <input type="password" value={memCode} onChange={e=>setMemCode(e.target.value)}
                        onKeyDown={e=>e.key==="Enter"&&(()=>{
                          if(memCode.trim().toLowerCase()===LOCK_CODE.toLowerCase()){setMemoriesUnlocked(true);setShowMemUnlock(false);setMemErr("");}
                          else{setMemErr("C├│digo inv├ílido. Consulte o Mestre.");}
                        })()}
                        placeholder="C├│digo secreto..." style={{flex:1,letterSpacing:3}}/>
                      <Btn onClick={()=>{
                        if(memCode.trim().toLowerCase()===LOCK_CODE.toLowerCase()){setMemoriesUnlocked(true);setShowMemUnlock(false);setMemErr("");}
                        else setMemErr("C├│digo inv├ílido. Consulte o Mestre.");
                      }} style={{background:"#2a1040",color:"#c090e0",border:"1px solid #6030a0",fontSize:12}}>ATIVAR</Btn>
                    </div>
                    {memErr&&<div className="type" style={{color:T.red,fontSize:11,marginTop:6}}>ÔÜá {memErr}</div>}
                  </div>
                )}
              </div>
            )}

            {char.isMastermind && memoriesUnlocked && (
              <div className="slide" style={{marginTop:16}}>
                {/* TRUE IDENTITY BANNER */}
                <div style={{background:"#150520",border:`1px solid #8030b0`,borderTop:`3px solid #c060e0`,
                  padding:"18px 20px",marginBottom:14,boxShadow:`0 0 30px #8030b020`}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <span style={{fontSize:24}}>Ôÿà</span>
                    <div>
                      <div className="type" style={{color:"#c060e0",fontSize:9,letterSpacing:2,marginBottom:2}}>MEM├ôRIAS RECUPERADAS ÔÇö IDENTIDADE REAL</div>
                      <div className="title" style={{color:"#e090ff",fontSize:22,letterSpacing:3}}>SUPREMA ARQUITETA DE DESESPERO</div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <div style={{background:"#1a0a28",padding:"10px 12px",borderLeft:`2px solid #c060e0`}}>
                      <div className="type" style={{color:"#9050c0",fontSize:9,letterSpacing:1.5,marginBottom:4}}>TALENTO REAL</div>
                      <div className="type" style={{color:"#e090ff",fontSize:12,lineHeight:1.6,fontWeight:700}}>Suprema Arquiteta de Desespero. Este ├® seu terceiro Killing Game projetado. Seu talento de Orientadora ├® uma capa criada para infiltra├º├úo.</div>
                    </div>
                    <div style={{background:"#1a0a28",padding:"10px 12px",borderLeft:`2px solid #f0b030`}}>
                      <div className="type" style={{color:"#c08020",fontSize:9,letterSpacing:1.5,marginBottom:4}}>MOTIVA├ç├âO REAL</div>
                      <div className="type" style={{color:"#f0e0a0",fontSize:12,lineHeight:1.6}}>Coletar evid├¬ncias sobre a Turma 66 para chantagear a organiza├º├úo e se libertar do papel de Mastermind. Voc├¬ est├í come├ºando a questionar tudo.</div>
                    </div>
                    <div style={{background:"#1a0a28",padding:"10px 12px",borderLeft:`2px solid #30a0c0`,gridColumn:"1/-1"}}>
                      <div className="type" style={{color:"#2080a0",fontSize:9,letterSpacing:1.5,marginBottom:4}}>HABILIDADE OCULTA ÔÇö ARQUITETA DO CAOS</div>
                      <div className="type" style={{color:"#80d0f0",fontSize:12,lineHeight:1.7}}>Uma vez por caso, pode revelar uma c├ómera oculta que "descobriu por acidente" ÔÇö na verdade voc├¬ sabia o tempo todo. Concede pista Ô¡ÉÔ¡É ao grupo. Voc├¬ tem ACESSO: quarto de controle de Monokuma, mapa completo com c├ómeras ocultas, e conhece os Segredos de todos os 16 estudantes (entregues pela organiza├º├úo antes do in├¡cio).</div>
                    </div>
                  </div>
                </div>

                {/* ALL STUDENTS SECRETS */}
                <div style={{background:T.s2,border:`1px solid #3a1a4a`,padding:"16px 18px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                    <span style={{fontSize:16}}>­ƒôé</span>
                    <div className="title" style={{color:"#c060e0",fontSize:14,letterSpacing:2}}>DOSSI├è COMPLETO ÔÇö SEGREDOS DA TURMA 67</div>
                    <div style={{flex:1,borderTop:`1px solid #3a1a4a`,marginLeft:6}}/>
                  </div>
                  <div className="type" style={{color:T.dim,fontSize:10,marginBottom:12}}>
                    A organiza├º├úo te forneceu estes arquivos antes de voc├¬ entrar. Voc├¬ conhece o segredo de cada estudante.
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {CHARS.filter(c=>c.id!==16).map(c=>(
                      <div key={c.id} style={{background:T.s3,border:`1px solid ${T.bd}`,borderLeft:`2px solid #5a2a6a`,padding:"8px 12px",display:"flex",gap:10,alignItems:"flex-start"}}>
                        <span className="pixel" style={{color:"#c060e0",fontSize:16,flexShrink:0,lineHeight:1.2}}>{c.num}</span>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:3}}>
                            <span className="type" style={{color:T.white,fontWeight:700,fontSize:11}}>{c.name}</span>
                            <span className="type" style={{color:T.dim,fontSize:9}}>ÔÇö {c.talent}</span>
                          </div>
                          <div className="type" style={{color:T.muted,fontSize:11,lineHeight:1.6}}>{c.secret}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MASTERMIND GUIDE */}
                <div style={{marginTop:14,background:"#0f0018",border:`1px solid #5a2070`,padding:"14px 16px"}}>
                  <div className="title" style={{color:"#a050d0",fontSize:12,letterSpacing:2,marginBottom:8}}>ÔÜá GUIA DO MASTERMIND</div>
                  <div className="type" style={{color:T.muted,fontSize:11,lineHeight:1.9,whiteSpace:"pre-line"}}>
{`ÔÇó Voc├¬ conhece todos os Segredos. Use isso sutilmente para redirecionar suspeitas sem revelar que sabe.
ÔÇó NUNCA cometa assassinatos diretamente ÔÇö apenas plante os Motivos. O caos deve parecer natural.
ÔÇó Nos Tribunais, ajude genuinamente a encontrar o assassino ÔÇö assassinatos fora do seu controle amea├ºam o jogo.
ÔÇó Seu maior medo: ser descoberta por Izumi ÔÇö porque precisaria elimin├í-la ou revelar a verdade.
ÔÇó Se os jogadores reunirem 4+ pistas que apontem para voc├¬ antes do Caso Final, entregue voluntariamente evid├¬ncias da organiza├º├úo em troca de imunidade.
ÔÇó REVELA├ç├âO DRAM├üTICA: Quando a m├íscara cair, chore de verdade ÔÇö n├úo por ser pega, mas pelo que foi for├ºada a construir.`}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ÔöÇÔöÇÔöÇ TAB: PISTAS ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */}
        {tab==="clues"&&(
          <div className="slide">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <SectionTitle icon="­ƒöì">Balas de Verdade ÔÇö Pistas Coletadas</SectionTitle>
              <Btn onClick={()=>setShowAddClue(s=>!s)} variant="yellow" style={{fontSize:11}}>+ ADICIONAR PISTA</Btn>
            </div>

            {showAddClue&&(
              <Card style={{marginBottom:16,border:`1px solid ${T.yellow}`}}>
                <SectionTitle icon="Ô×ò" color={T.yellow}>Nova Pista</SectionTitle>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                  <div>
                    <div className="type" style={{fontSize:10,color:T.muted,marginBottom:4}}>NOME DA PISTA</div>
                    <input value={newClue.name} onChange={e=>setNewClue(p=>({...p,name:e.target.value}))} style={{width:"100%"}} placeholder="Ex: Faca sem sangue"/>
                  </div>
                  <div>
                    <div className="type" style={{fontSize:10,color:T.muted,marginBottom:4}}>TIPO</div>
                    <select value={newClue.type} onChange={e=>setNewClue(p=>({...p,type:e.target.value}))} style={{width:"100%"}}>
                      {Object.entries(CLUE_LABELS).map(([k,v])=><option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="type" style={{fontSize:10,color:T.muted,marginBottom:4}}>FOR├çA</div>
                    <select value={newClue.force} onChange={e=>setNewClue(p=>({...p,force:e.target.value}))} style={{width:"100%"}}>
                      {["Ô¡É","Ô¡ÉÔ¡É","Ô¡ÉÔ¡ÉÔ¡É","Ô¡ÉÔ¡ÉÔ¡ÉÔ¡É"].map(f=><option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="type" style={{fontSize:10,color:T.muted,marginBottom:4}}>STATUS</div>
                    <select value={newClue.status} onChange={e=>setNewClue(p=>({...p,status:e.target.value}))} style={{width:"100%"}}>
                      <option value="disponivel">­ƒƒó Dispon├¡vel</option>
                      <option value="usada">­ƒöÁ Usada</option>
                      <option value="descartada">ÔÜ½ Descartada</option>
                    </select>
                  </div>
                </div>
                <div style={{marginBottom:10}}>
                  <div className="type" style={{fontSize:10,color:T.muted,marginBottom:4}}>DESCRI├ç├âO / O QUE ESTA PISTA PROVA</div>
                  <textarea value={newClue.desc} onChange={e=>setNewClue(p=>({...p,desc:e.target.value}))}
                    style={{width:"100%",minHeight:60,resize:"vertical"}} placeholder="Descreva o que esta pista significa ou prova..."/>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <Btn variant="yellow" onClick={()=>{
                    if(newClue.name){
                      setClues(p=>[...p,{...newClue,id:Date.now()}]);
                      setNewClue({name:"",type:"fisica",force:"Ô¡É",desc:"",status:"disponivel"});
                      setShowAddClue(false);
                    }
                  }}>SALVAR PISTA</Btn>
                  <Btn variant="dark" onClick={()=>setShowAddClue(false)}>CANCELAR</Btn>
                </div>
              </Card>
            )}

            {clues.length===0?(
              <div style={{textAlign:"center",padding:"40px 20px",color:T.dim}}>
                <div style={{fontSize:32,marginBottom:8}}>­ƒöì</div>
                <div className="type" style={{fontSize:12}}>Nenhuma pista coletada ainda.</div>
                <div className="type" style={{fontSize:11,marginTop:4}}>Adicione pistas durante a investiga├º├úo.</div>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {clues.map((c,i)=>(
                  <div key={c.id||i} style={{background:T.s2,border:`1px solid ${T.bd}`,borderLeft:`3px solid ${CLUE_COLORS[c.type]||T.bd}`,padding:"12px 14px"}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
                      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                        <span className="type" style={{color:T.white,fontWeight:700,fontSize:13}}>{c.name}</span>
                        <Badge bg={CLUE_COLORS[c.type]+"30"} color={CLUE_COLORS[c.type]} style={{fontSize:9}}>{CLUE_LABELS[c.type]}</Badge>
                        <span className="pixel" style={{color:T.yellow,fontSize:16}}>{c.force}</span>
                        <select value={c.status} onChange={e=>setClues(p=>p.map((cl,j)=>j===i?{...cl,status:e.target.value}:cl))}
                          style={{fontSize:10,padding:"2px 6px",width:"auto"}}>
                          <option value="disponivel">­ƒƒó Dispon├¡vel</option>
                          <option value="usada">­ƒöÁ Usada</option>
                          <option value="descartada">ÔÜ½ Descartada</option>
                        </select>
                      </div>
                      <button onClick={()=>setClues(p=>p.filter((_,j)=>j!==i))}
                        style={{background:"none",border:"none",color:T.dim,cursor:"pointer",fontSize:14,padding:"0 4px"}}>Ô£ò</button>
                    </div>
                    {c.desc&&<div className="type" style={{color:T.muted,fontSize:11,lineHeight:1.6}}>{c.desc}</div>}
                  </div>
                ))}
                <div style={{display:"flex",gap:16,padding:"8px 0",borderTop:`1px solid ${T.bd}`,marginTop:4}}>
                  <span className="type" style={{fontSize:11,color:T.muted}}>Total: {clues.length}</span>
                  <span className="type" style={{fontSize:11,color:T.greenL}}>­ƒƒó Dispon├¡veis: {clues.filter(c=>c.status==="disponivel").length}</span>
                  <span className="type" style={{fontSize:11,color:T.blue}}>­ƒöÁ Usadas: {clues.filter(c=>c.status==="usada").length}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ÔöÇÔöÇÔöÇ TAB: TRIBUNAL ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */}
        {tab==="tribunal"&&(
          <div className="slide">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <Card>
                <SectionTitle icon="1´©ÅÔâú" color={T.blue}>Fase 1 ÔÇö Suspeita Inicial</SectionTitle>
                <div className="type" style={{fontSize:10,color:T.muted,marginBottom:4}}>MEU SUSPEITO INICIAL</div>
                <input value={tribunal.suspect} onChange={e=>setTribunal(p=>({...p,suspect:e.target.value}))}
                  style={{width:"100%",marginBottom:8}} placeholder="Nome do suspeito..."/>
                <div className="type" style={{fontSize:10,color:T.muted,marginBottom:4}}>PISTA MAIS FORTE</div>
                <input value={tribunal.evidence} onChange={e=>setTribunal(p=>({...p,evidence:e.target.value}))}
                  style={{width:"100%"}} placeholder="Qual pista apoia minha suspeita..."/>
              </Card>
              <Card>
                <SectionTitle icon="4´©ÅÔâú" color={T.yellow}>Fase 4 ÔÇö Acusa├º├úo Final</SectionTitle>
                <div className="type" style={{fontSize:10,color:T.muted,marginBottom:4}}>ACUSADO</div>
                <input value={tribunal.accusation} onChange={e=>setTribunal(p=>({...p,accusation:e.target.value}))}
                  style={{width:"100%",marginBottom:8}} placeholder="Nome do acusado..."/>
                <div className="type" style={{fontSize:10,color:T.muted,marginBottom:4}}>FASE 5 ÔÇö MOTO DO VOTO</div>
                <input value={tribunal.votes} onChange={e=>setTribunal(p=>({...p,votes:e.target.value}))}
                  style={{width:"100%"}} placeholder="ÔÿØ Culpado ou ­ƒæÄ Inocente..."/>
              </Card>
              <Card style={{gridColumn:"1/-1"}}>
                <SectionTitle icon="2´©ÅÔâú" color={T.muted}>Fase 2 ÔÇö Notas do Debate Livre</SectionTitle>
                <textarea value={tribunal.notes} onChange={e=>setTribunal(p=>({...p,notes:e.target.value}))}
                  style={{width:"100%",minHeight:100,resize:"vertical"}}
                  placeholder="Anota├º├Áes durante os 15 minutos de debate livre..."/>
              </Card>
            </div>
            <div style={{marginTop:14,padding:"12px 14px",background:T.s2,border:`1px solid ${T.bd}`}}>
              <div className="title" style={{color:T.muted,fontSize:12,letterSpacing:2,marginBottom:8}}>REFER├èNCIA ÔÇö B├öNUS MONOCOINS</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {[["Acusa├º├úo Final correta",5],["Destruiu 3+ Declara├º├Áes",3],["Descobriu a Pista Decisiva",4],["N├úo perdeu nenhuma Bala",2]].map(([l,v])=>(
                  <div key={l} style={{background:T.s3,padding:"6px 10px",display:"flex",gap:8,alignItems:"center"}}>
                    <span className="pixel" style={{color:T.yellow,fontSize:18}}>+{v}</span>
                    <span className="type" style={{color:T.muted,fontSize:10}}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ÔöÇÔöÇÔöÇ TAB: NOTAS ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */}
        {tab==="notas"&&(
          <div className="slide">
            <Card>
              <SectionTitle icon="­ƒôØ">Notas da Sess├úo</SectionTitle>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)}
                style={{width:"100%",minHeight:300,resize:"vertical",fontSize:13,lineHeight:1.8}}
                placeholder="Anota├º├Áes livres sobre a sess├úo, teorias, pistas a investigar..."/>
            </Card>
          </div>
        )}
      </div>

      {showImageModal && (
        <div style={{position:"fixed",inset:0,background:"#000000cc",zIndex:12000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}
          onClick={()=>setShowImageModal(false)}>
          <div onClick={e=>e.stopPropagation()} style={{maxWidth:"90vw",maxHeight:"90vh",width:"100%",textAlign:"center"}}>
            <img src={charImage} alt={char.name} style={{maxWidth:"100%",maxHeight:"80vh",objectFit:"contain",border:`4px solid ${T.red}`}}/>
            <div style={{marginTop:12}}>
              <Btn onClick={()=>setShowImageModal(false)}>FECHAR</Btn>
            </div>
          </div>
        </div>
      )}

    </div>
  </>
  );
}

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  MASTER SCREEN
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
function MasterScreen({onBack}) {
  const [tab, setTab] = useState("turma");
  const [global, setGlobal] = usePersist(PERSIST_KEYS.global, {hope:0,despair:0});
  const [charStatuses, setCharStatuses] = usePersist(PERSIST_KEYS.charStatuses,
    Object.fromEntries(CHARS.map(c=>[c.id,"vivo"])));
  const [crimes, setCrimes] = usePersist(PERSIST_KEYS.crimes,
    [{},{},{},{}].map((_,i)=>({num:i+1,killer:"",victim:"",method:"",locale:"",alibi:"",cover:"",fakeclues:"",realclues:"",result:"",notes:""})));
  const [selectedChar, setSelectedChar] = useState(null);
  const [monokumaPower, setMonokumaPower] = usePersist(PERSIST_KEYS.monokumaUsed,[false,false,false,false]);
  const [sync, setSync] = useState(0);
  const fileInputRef = useRef();

  const exportState = async () => {
    try {
      const res = await serverFetch(`/state`);
      if (!res.ok) throw new Error('Falha ao obter estado do servidor');
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dng67-state-${new Date().toISOString().slice(0,19).replace(/:/g,'-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Erro ao exportar dados: ' + (err.message || err));
    }
  };

  const importState = () => fileInputRef.current?.click();

  const onFileSelected = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    try {
      const text = await f.text();
      const obj = JSON.parse(text);
      if (typeof obj !== 'object' || obj === null) throw new Error('Formato inv├ílido');
      const entries = Object.entries(obj);
      for (const [k, v] of entries) {
        // salva cada chave no servidor
        await writeServerState(k, v);
      }
      alert('Importa├º├úo conclu├¡da e sincronizada com o servidor.');
    } catch (err) {
      alert('Erro ao importar: ' + (err.message || err));
    } finally {
      e.target.value = '';
    }
  };

  useEffect(() => {
    const onSync = () => setSync(v => v + 1);
    const unsubscribe = subscribeServerUpdates((key) => {
      if (key.startsWith("dng67_char_")) onSync();
    });
    return unsubscribe;
  }, []);

  const alive = CHARS.filter(c=>charStatuses[c.id]==="vivo").length;

  const MOTIVES = [
    {d:"1","title":"Segredo Revelado","desc":"Monokuma vai expor o segredo de algu├®m ao grupo inteiro"},
    {d:"2","title":"Mem├│ria Apagada","desc":"Quer recuperar uma mem├│ria? Mate algu├®m para 'comprar' de volta"},
    {d:"3","title":"Chantagem","desc":"Fotos/v├¡deos comprometedores enviados a familiares se ningu├®m agir"},
    {d:"4","title":"D├¡vida de Esperan├ºa","desc":"Se ningu├®m matar em 72h, um estudante aleat├│rio morre"},
    {d:"5","title":"Recompensa","desc":"O assassino ganha um item lend├írio da MonoLoja"},
    {d:"6","title":"Amea├ºa Direta","desc":"Algu├®m recebe mensagem: 'mate X ou eu o mato'"},
    {d:"7","title":"Rivalidade","desc":"Monokuma revela que dois estudantes t├¬m objetivos incompat├¡veis"},
    {d:"8","title":"Motivo do Mestre","desc":"Personalizado ÔÇö o Mestre cria um motivo para este grupo especificamente"},
  ];

  const POWERS = [
    {name:"Revela├º├úo Bomba","desc":"Exp├Áe um Segredo de qualquer personagem ao grupo inteiro. Use quando a tens├úo precisa de uma bomba narrativa."},
    {name:"Pista Sumida","desc":"Remove uma pista coletada por um jogador aleat├│rio. Ideal para criar frustra├º├úo estrat├®gica."},
    {name:"Motivo Urgente","desc":"Adiciona urg├¬ncia ÔÇö se ningu├®m agir em 30 min de tempo real, uma penalidade entra em vigor."},
    {name:"Testemunha Surpresa","desc":"Um NPC 'lembra' de algo que muda o rumo do debate no Tribunal. Pode ser fabricado."},
  ];

  const TABS = [
    {id:"turma",label:"­ƒæÑ TURMA"},
    {id:"segredos",label:"­ƒöÉ SEGREDOS"},
    {id:"crimes",label:"­ƒö¬ CRIMES"},
    {id:"monokuma",label:"­ƒÉ╗ MONOKUMA"},
    {id:"quick",label:"ÔÜí REFER├èNCIA"},
  ];

  return (
    <div className="fade" style={{minHeight:"100vh",background:T.bg}}>
      {/* HEADER */}
      <div style={{background:T.s1,borderBottom:`3px solid ${T.red}`,padding:"12px 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{background:T.red,color:T.white,padding:"2px 8px",fontSize:10,letterSpacing:2,fontFamily:"Courier Prime"}}>ÔÜá CLASSIFICADO</span>
            <div>
              <span className="title" style={{fontSize:20,color:T.red,letterSpacing:3}}>PAINEL DO MESTRE</span>
              <span className="type" style={{color:T.muted,fontSize:10,marginLeft:10}}>TURMA 67 ÔÇö USO EXCLUSIVO</span>
            </div>
          </div>
          <Btn variant="ghost" onClick={onBack} style={{fontSize:11}}>ÔåÉ SAIR</Btn>
        </div>

        {/* GLOBAL METERS */}
        <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:12}}>
          <div style={{flex:1,minWidth:200}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span className="type" style={{fontSize:10,color:T.yellow,letterSpacing:1}}>ÔÿÇ´©Å ESPERAN├çA GLOBAL</span>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <button onClick={()=>setGlobal(p=>({...p,hope:Math.max(0,p.hope-1)}))} style={{background:T.s4,border:"none",color:T.white,width:20,height:20,cursor:"pointer"}}>ÔêÆ</button>
                <span className="pixel" style={{color:T.yellow,fontSize:22}}>{global.hope}<span style={{color:T.dim,fontSize:12}}>/50</span></span>
                <button onClick={()=>setGlobal(p=>({...p,hope:Math.min(50,p.hope+1)}))} style={{background:T.s4,border:"none",color:T.white,width:20,height:20,cursor:"pointer"}}>+</button>
              </div>
            </div>
            <div style={{background:T.s4,height:8,borderRadius:1}}>
              <div style={{height:"100%",width:`${(global.hope/50)*100}%`,background:T.yellow,transition:"width .4s"}}/>
            </div>
          </div>
          <div style={{flex:1,minWidth:200}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span className="type" style={{fontSize:10,color:T.red,letterSpacing:1}}>­ƒÆÇ DESESPERAN├çA GLOBAL</span>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <button onClick={()=>setGlobal(p=>({...p,despair:Math.max(0,p.despair-1)}))} style={{background:T.s4,border:"none",color:T.white,width:20,height:20,cursor:"pointer"}}>ÔêÆ</button>
                <span className="pixel" style={{color:T.red,fontSize:22}}>{global.despair}<span style={{color:T.dim,fontSize:12}}>/50</span></span>
                <button onClick={()=>setGlobal(p=>({...p,despair:Math.min(50,p.despair+1)}))} style={{background:T.s4,border:"none",color:T.white,width:20,height:20,cursor:"pointer"}}>+</button>
              </div>
            </div>
            <div style={{background:T.s4,height:8,borderRadius:1}}>
              <div style={{height:"100%",width:`${(global.despair/50)*100}%`,background:T.red,transition:"width .4s"}}/>
            </div>
          </div>
          <div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
            {[["­ƒƒó Vivos",CHARS.filter(c=>charStatuses[c.id]==="vivo").length,T.greenL],
              ["­ƒƒí Feridos",CHARS.filter(c=>charStatuses[c.id]==="ferido").length,T.yellow],
              ["­ƒÆÇ Mortos",CHARS.filter(c=>charStatuses[c.id]==="morto").length,T.muted],
              ["ÔÜí Executados",CHARS.filter(c=>charStatuses[c.id]==="executado").length,T.red],
            ].map(([l,n,color])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div className="pixel" style={{color,fontSize:24,lineHeight:1}}>{n}</div>
                <div className="type" style={{color:T.dim,fontSize:9}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"flex",gap:2}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{background:tab===t.id?T.red:T.s3,color:tab===t.id?T.white:T.muted,
                border:"none",padding:"7px 14px",fontSize:10,letterSpacing:.5,cursor:"pointer",transition:"all .15s"}}>
              {t.label}
            </button>
          ))}
        </div>
        <div style={{marginTop:10,display:"flex",gap:8,alignItems:"center"}}>
          <Btn variant="dark" onClick={exportState} style={{fontSize:11}}>Ô¼ç´©Å Exportar Dados</Btn>
          <Btn variant="ghost" onClick={importState} style={{fontSize:11}}>Ô¼å´©Å Importar Dados</Btn>
          <input ref={fileInputRef} type="file" accept="application/json" style={{display:"none"}} onChange={onFileSelected} />
        </div>
      </div>

      <div style={{padding:"20px",maxWidth:1000,margin:"0 auto"}}>

        {/* ÔöÇÔöÇÔöÇ TAB: TURMA ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */}
        {tab==="turma"&&(
          <div className="slide">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Nome & Talento</th><th>Tipo</th>
                  <th>PV Max</th><th>PS Max</th><th>Init</th>
                  <th>Status</th><th>A├º├úo</th>
                </tr>
              </thead>
              <tbody>
                {CHARS.map(c=>{
                  const d2 = derive(c.attrs);
                  const st = charStatuses[c.id]||"vivo";
                  const sc = STATUS_COLOR[st];
                  const rb = ROLE_BADGE.player;
                  return (
                    <tr key={c.id} style={{cursor:"pointer"}} onClick={()=>setSelectedChar(c)}>
                      <td><span className="pixel" style={{color:T.red,fontSize:18}}>{c.num}</span></td>
                      <td>
                        <div className="type" style={{color:T.white,fontWeight:700,fontSize:12}}>{c.name}</div>
                        <div className="type" style={{color:T.dim,fontSize:10}}>{c.talent}</div>
                      </td>
                      <td><Badge bg={rb.bg} color={rb.text}>{rb.label}</Badge></td>
                      <td className="pixel" style={{color:T.greenL,fontSize:18}}>{d2.pvMax}</td>
                      <td className="pixel" style={{color:T.blue,fontSize:18}}>{d2.psMax}</td>
                      <td className="pixel" style={{color:T.yellow,fontSize:18}}>{d2.init}</td>
                      <td>
                        <span style={{color:sc,fontSize:12,fontFamily:"Courier Prime"}}>ÔùÅ {st.charAt(0).toUpperCase()+st.slice(1)}</span>
                      </td>
                      <td onClick={e=>e.stopPropagation()}>
                        <select value={st} onChange={e=>setCharStatuses(p=>({...p,[c.id]:e.target.value}))}
                          style={{fontSize:10,padding:"3px 6px",width:"auto"}}>
                          <option value="vivo">­ƒƒó Vivo</option>
                          <option value="ferido">­ƒƒí Ferido</option>
                          <option value="morto">­ƒÆÇ Morto</option>
                          <option value="executado">ÔÜí Executado</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{marginTop:10,fontSize:10,color:T.dim,fontFamily:"Courier Prime"}}>
              ­ƒÆí Clique em qualquer linha para ver detalhes completos do personagem
            </div>
          </div>
        )}

        {/* ÔöÇÔöÇÔöÇ TAB: SEGREDOS ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */}
        {tab==="segredos"&&(
          <div className="slide">
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {CHARS.map(c=>{
                const rb = ROLE_BADGE.player;
                const isMM = c.isMastermind;
                const lockCode = LOCK_CODES[c.id] || String(c.id).padStart(2,"0");
                const currentLocked = SERVER_CACHE[PERSIST_KEYS.charLocked(c.id)] ?? false;
                const bondStateRaw = SERVER_CACHE[PERSIST_KEYS.charBonds(c.id)] ?? null;
                const bondState = Array.isArray(bondStateRaw) && bondStateRaw.length ? bondStateRaw : (Array.isArray(c.bonds) ? c.bonds : []);
                return (
                  <div key={c.id} style={{background:T.s2,border:`1px solid ${isMM?"#5a1070":T.bd}`,
                    borderLeft:`3px solid ${isMM?"#c060e0":T.bd2}`,padding:"14px 16px",
                    boxShadow:isMM?`0 0 15px #8030b020`:"none"}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <span className="pixel" style={{color:T.red,fontSize:22}}>{c.num}</span>
                        <div>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <span className="type" style={{color:T.white,fontWeight:700,fontSize:13}}>{c.name}</span>
                            <Badge bg={rb.bg} color={rb.text}>{rb.label}</Badge>
                            {isMM&&<Badge bg="#2a0840" color="#e060f0">Ôÿà MASTERMIND</Badge>}
                          </div>
                          <span className="type" style={{color:T.muted,fontSize:10}}>
                            {c.talent}{isMM&&<span style={{color:"#c060e0"}}> | Real: {c.talentReal}</span>}
                          </span>
                        </div>
                      </div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"flex-end"}}>
                        {bondState.map(b=><Badge key={`${c.id}-${b.id||b.name}`} bg={T.s3} color={T.muted} style={{fontSize:8}}>ÔØñ{b.lvl} {b.name.split(" ")[0]}</Badge>)}
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                      <div style={{background:T.s3,padding:"10px 12px",borderLeft:`2px solid ${T.yellow}`}}>
                        <div className="type" style={{color:T.yellow,fontSize:9,letterSpacing:1.5,marginBottom:6}}>­ƒöÉ C├ôDIGO DE MEM├ôRIA</div>
                        <div className="type" style={{color:T.white,fontSize:11,lineHeight:1.7}}>{lockCode}</div>
                      </div>
                      <div style={{background:T.s3,padding:"10px 12px",borderLeft:`2px solid ${currentLocked?T.greenL:T.red}`}}>
                        <div className="type" style={{color:currentLocked?T.greenL:T.red,fontSize:9,letterSpacing:1.5,marginBottom:6}}>STATUS DE MEM├ôRIA</div>
                        <div className="type" style={{color:T.muted,fontSize:11,lineHeight:1.7}}>{currentLocked?"DESBLOQUEADA":"BLOQUEADA"}</div>
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      <div style={{background:T.s3,padding:"10px 12px",borderLeft:`2px solid ${T.red}`}}>
                        <div className="type" style={{color:T.red,fontSize:9,letterSpacing:1.5,marginBottom:6}}>­ƒöÉ SEGREDO</div>
                        <div className="type" style={{color:T.white,fontSize:11,lineHeight:1.7}}>{c.secret}</div>
                      </div>
                      <div style={{background:T.s3,padding:"10px 12px",borderLeft:`2px solid ${T.yellow}`}}>
                        <div className="type" style={{color:T.yellow,fontSize:9,letterSpacing:1.5,marginBottom:6}}>­ƒôû ARCO NARRATIVO</div>
                        <div className="type" style={{color:T.muted,fontSize:11,lineHeight:1.7}}>{c.arc}</div>
                      </div>
                    </div>
                    {c.masterNote&&(
                      <div style={{marginTop:8,background:"#200a0a",border:`1px solid ${T.red}`,padding:"8px 10px"}}>
                        <span className="type" style={{color:T.red,fontSize:10,lineHeight:1.6}}>{c.masterNote}</span>
                      </div>
                    )}
                    {isMM&&c.abilityReal&&(
                      <div style={{marginTop:8,background:"#200a0a",border:`1px solid ${T.red}`,padding:"10px 12px"}}>
                        <div className="type" style={{color:"#ff6680",fontSize:9,letterSpacing:1.5,marginBottom:4}}>Ôÿà HABILIDADE REAL</div>
                        <div className="title" style={{color:"#ff6680",fontSize:12,letterSpacing:2}}>{c.abilityReal.name}</div>
                        <div className="type" style={{color:T.muted,fontSize:11,marginTop:4,lineHeight:1.6}}>{c.abilityReal.desc}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ÔöÇÔöÇÔöÇ TAB: CRIMES ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */}
        {tab==="crimes"&&(
          <div className="slide">
            <div style={{display:"flex",flexDirection:"column",gap:20}}>
              {crimes.map((cr,i)=>(
                <Card key={i} style={{border:`1px solid ${cr.killer?T.red:T.bd}`}}>
                  <SectionTitle icon="­ƒö¬" color={cr.killer?T.red:T.muted}>
                    CASO {i+1} {cr.killer&&`ÔÇö ${cr.killer} ÔåÆ ${cr.victim}`}
                  </SectionTitle>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                    {[["ASSASSINO","killer","Nome do assassino..."],["V├ìTIMA","victim","Nome da v├¡tima..."],
                      ["M├ëTODO","method","Como o crime foi cometido..."],["LOCAL","locale","Onde ocorreu..."],
                      ["├üLIBI FORJADO","alibi","O que o assassino dir├í que estava fazendo..."],["A├ç├òES DE COBERTURA","cover","Quais das 3 a├º├Áes foram usadas..."]
                    ].map(([label,field,ph])=>(
                      <div key={field}>
                        <div className="type" style={{fontSize:9,color:T.muted,letterSpacing:1,marginBottom:3}}>{label}</div>
                        <input value={cr[field]} onChange={e=>setCrimes(p=>p.map((c2,j)=>j===i?{...c2,[field]:e.target.value}:c2))}
                          style={{width:"100%"}} placeholder={ph}/>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {[["PISTAS FALSAS PLANTADAS","fakeclues","Ex: faca com as impress├Áes de X..."],
                      ["PISTAS REAIS DEIXADAS","realclues","O que os jogadores podem encontrar..."],
                    ].map(([label,field,ph])=>(
                      <div key={field}>
                        <div className="type" style={{fontSize:9,color:T.muted,letterSpacing:1,marginBottom:3}}>{label}</div>
                        <textarea value={cr[field]} onChange={e=>setCrimes(p=>p.map((c2,j)=>j===i?{...c2,[field]:e.target.value}:c2))}
                          style={{width:"100%",minHeight:60,resize:"vertical"}} placeholder={ph}/>
                      </div>
                    ))}
                  </div>
                  <div style={{marginTop:10}}>
                    <div className="type" style={{fontSize:9,color:T.muted,letterSpacing:1,marginBottom:3}}>RESULTADO DO TRIBUNAL & NOTAS</div>
                    <textarea value={cr.notes} onChange={e=>setCrimes(p=>p.map((c2,j)=>j===i?{...c2,notes:e.target.value}:c2))}
                      style={{width:"100%",minHeight:50,resize:"vertical"}} placeholder="Resultado, rea├º├Áes dos jogadores, consequ├¬ncias narrativas..."/>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ÔöÇÔöÇÔöÇ TAB: MONOKUMA ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */}
        {tab==="monokuma"&&(
          <div className="slide">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              <div>
                <Card>
                  <SectionTitle icon="­ƒÉ╗" color={T.yellow}>Motivos de Monokuma (d8)</SectionTitle>
                  {MOTIVES.map(m=>(
                    <div key={m.d} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:`1px solid ${T.bd}`}}>
                      <div style={{background:T.s3,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span className="pixel" style={{color:T.yellow,fontSize:22}}>{m.d}</span>
                      </div>
                      <div>
                        <div className="type" style={{color:T.white,fontWeight:700,fontSize:12,marginBottom:2}}>{m.title}</div>
                        <div className="type" style={{color:T.muted,fontSize:11,lineHeight:1.5}}>{m.desc}</div>
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
              <div>
                <Card>
                  <SectionTitle icon="ÔÜí" color={T.red}>Poderes Especiais (1 por sess├úo)</SectionTitle>
                  {POWERS.map((pw2,i)=>(
                    <div key={i} style={{padding:"12px 0",borderBottom:`1px solid ${T.bd}`,opacity:monokumaPower[i]?.5:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div className="type" style={{color:monokumaPower[i]?T.dim:T.white,fontWeight:700,fontSize:12,marginBottom:4}}>{pw2.name}</div>
                        <input type="checkbox" checked={monokumaPower[i]||false}
                          onChange={e=>setMonokumaPower(p=>{const np=[...p];np[i]=e.target.checked;return np;})}
                          style={{width:16,height:16,cursor:"pointer",accentColor:T.red}}/>
                      </div>
                      <div className="type" style={{color:T.muted,fontSize:11,lineHeight:1.5}}>{pw2.desc}</div>
                      {monokumaPower[i]&&<Badge bg="#300a00" color={T.dim} style={{marginTop:4}}>J├ü UTILIZADO</Badge>}
                    </div>
                  ))}
                </Card>
                <Card style={{marginTop:12}}>
                  <SectionTitle icon="­ƒÅ¬">MonoLoja ÔÇö Itens</SectionTitle>
                  <table>
                    <thead><tr><th>Item</th><th>Custo</th><th>Efeito</th></tr></thead>
                    <tbody>
                      {[["Kit Primeiros Socorros","3","Cura 2d6 PV"],["C├ómera Descart├ível","5","Cria 1 Pista Fotogr├ífica"],
                        ["Veneno Indetect├ível","8","+2 em testes de veneno"],["Di├írio Criptografado","4","Revela 1 segredo de NPC"],
                        ["Megafone","3","+3 PER em debate p├║blico"],["Carta de Alibi","6","NPC confirma 1 ├ílibi"]
                      ].map(([name,cost,ef])=>(
                        <tr key={name}><td className="type" style={{color:T.white,fontSize:11}}>{name}</td>
                        <td className="pixel" style={{color:T.yellow,fontSize:18}}>{cost}</td>
                        <td className="type" style={{color:T.muted,fontSize:11}}>{ef}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ÔöÇÔöÇÔöÇ TAB: REFER├èNCIA ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */}
        {tab==="quick"&&(
          <div className="slide">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <Card>
                <SectionTitle icon="­ƒÄ▓">Testes Frequentes</SectionTitle>
                <table>
                  <thead><tr><th>Situa├º├úo</th><th>Attr</th><th>NA</th></tr></thead>
                  <tbody>
                    {[["Procurar pista ├│bvia","INT","10"],["Encontrar pista escondida","INT","18"],["Mentir para algu├®m","PER","15ÔÇô20"],
                      ["Detectar mentira","INT","15ÔÇô20"],["Assassinato furtivo","FUR","18"],["Convencer no Tribunal","PER","18"],
                      ["Forjar ├ílibi","PER","18"],["Interrogar NPC amig├ível","PER","12"],["Interrogar NPC hostil","PER","20"],
                      ["Recuperar sanidade","ESP","15"],["Reconstitui├º├úo do Crime","INT","20"],
                    ].map(([s,a,na])=>(
                      <tr key={s}><td className="type" style={{fontSize:11}}>{s}</td>
                      <td><Badge bg={T.redD} color={T.white}>{a}</Badge></td>
                      <td className="pixel" style={{color:T.yellow,fontSize:18}}>{na}</td></tr>
                    ))}
                  </tbody>
                </table>
              </Card>
              <Card>
                <SectionTitle icon="­ƒôè">Eventos de Esperan├ºa</SectionTitle>
                <table>
                  <thead><tr><th>Evento</th><th>Impacto</th></tr></thead>
                  <tbody>
                    {[["Tribunal correto","+3 ÔÿÇ´©Å"],["Acusa├º├úo errada","ÔêÆ5 ÔÿÇ´©Å / +3 ­ƒÆÇ"],["Assassino fugiu impune","ÔêÆ2 ÔÿÇ´©Å"],
                      ["Segredo revelado","ÔêÆ1 ÔÿÇ´©Å"],["La├ºo refor├ºado","+1 ÔÿÇ´©Å"],["Dedu├º├úo brilhante","+1 ÔÿÇ´©Å"],
                      ["Desesperan├ºa atinge 50","DERROTA COLETIVA"],["Esperan├ºa atinge 50","VIT├ôRIA COLETIVA"]
                    ].map(([e,i])=>(
                      <tr key={e}>
                        <td className="type" style={{fontSize:11}}>{e}</td>
                        <td className="type" style={{color:i.includes("+")?T.greenL:i.includes("VIT├ôRIA")?T.yellow:T.red,fontWeight:700,fontSize:12}}>{i}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{marginTop:14}}>
                  <SectionTitle icon="ÔÜá´©Å">Condi├º├Áes de Derrota</SectionTitle>
                  <div className="type" style={{color:T.muted,fontSize:11,lineHeight:1.8}}>
                    ÔÇó Restar apenas 1 estudante vivo<br/>
                    ÔÇó Desesperan├ºa global atingir 50<br/>
                    ÔÇó Assassino escapar impune 3├ù seguidas
                  </div>
                </div>
              </Card>
              <Card style={{gridColumn:"1/-1"}}>
                <SectionTitle icon="­ƒù║´©Å">Iniciativas da Turma (ordem decrescente)</SectionTitle>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {[...CHARS].sort((a,b)=>{const da=derive(a.attrs),db=derive(b.attrs);return db.init-da.init;}).map(c=>{
                    const d2=derive(c.attrs);
                    const st=charStatuses[c.id]||"vivo";
                    return (
                      <div key={c.id} style={{background:T.s3,padding:"6px 10px",opacity:st==="morto"||st==="executado"?.4:1,
                        border:`1px solid ${T.bd}`,display:"flex",gap:8,alignItems:"center"}}>
                        <span className="pixel" style={{color:T.yellow,fontSize:20}}>{d2.init}</span>
                        <div>
                          <div className="type" style={{fontSize:11,color:T.white}}>{c.name.split(" ")[0]}</div>
                          <div className="type" style={{fontSize:9,color:T.dim}}>{c.num}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* CHARACTER DETAIL MODAL */}
      {selectedChar&&(
        <div style={{position:"fixed",inset:0,background:"#00000090",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}
          onClick={()=>setSelectedChar(null)}>
          <div className="slide" onClick={e=>e.stopPropagation()}
            style={{background:T.s2,border:`2px solid ${T.red}`,maxWidth:700,width:"100%",maxHeight:"85vh",overflowY:"auto",padding:"20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <span className="pixel" style={{color:T.red,fontSize:26,marginRight:8}}>{selectedChar.num}</span>
                <span className="title" style={{fontSize:22,color:T.white}}>{selectedChar.name}</span>
                {selectedChar.isMastermind&&(
                  <Badge bg="#3a0814" color="#e060f0" style={{marginLeft:8}}>Ôÿà MASTERMIND</Badge>
                )}
                <div className="type" style={{color:T.muted,fontSize:11}}>
                  {selectedChar.talent}
                  {selectedChar.isMastermind&&(
                    <span style={{color:"#e060f0",marginLeft:8}}>| Real: {selectedChar.talentReal}</span>
                  )}
                </div>
              </div>
              <button onClick={()=>setSelectedChar(null)} style={{background:"none",border:"none",color:T.white,fontSize:22,cursor:"pointer"}}>Ô£ò</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div style={{background:T.s3,padding:"10px"}}>
                <div className="type" style={{color:T.muted,fontSize:9,marginBottom:4,letterSpacing:1}}>ATRIBUTOS</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {Object.entries(selectedChar.attrs).map(([k,v])=>(
                    <div key={k} style={{textAlign:"center",background:T.s4,padding:"4px 8px"}}>
                      <div className="type" style={{fontSize:8,color:T.dim}}>{k}</div>
                      <div className="pixel" style={{color:T.yellow,fontSize:20}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:T.s3,padding:"10px"}}>
                <div className="type" style={{color:T.muted,fontSize:9,marginBottom:6,letterSpacing:1}}>APAR├èNCIA & PERSONALIDADE</div>
                <div className="type" style={{fontSize:11,color:T.white,lineHeight:1.6}}>{selectedChar.appear}</div>
              </div>
            </div>
            <div style={{background:"#200a0a",border:`1px solid ${T.red}`,padding:"12px",marginBottom:10}}>
              <div className="type" style={{color:T.red,fontSize:9,letterSpacing:1.5,marginBottom:6}}>­ƒöÉ SEGREDO COMPLETO</div>
              <div className="type" style={{color:T.white,fontSize:12,lineHeight:1.7}}>{selectedChar.secret}</div>
            </div>
            <div style={{background:T.s3,padding:"12px",marginBottom:selectedChar.masterNote?10:0}}>
              <div className="type" style={{color:T.yellow,fontSize:9,letterSpacing:1.5,marginBottom:6}}>­ƒôû ARCO NARRATIVO</div>
              <div className="type" style={{color:T.muted,fontSize:12,lineHeight:1.7}}>{selectedChar.arc}</div>
            </div>
            {selectedChar.masterNote&&(
              <div style={{background:"#0a1a00",border:`1px solid ${T.green}`,padding:"10px"}}>
                <div className="type" style={{color:T.greenL,fontSize:11,lineHeight:1.6}}>{selectedChar.masterNote}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
//  APP
// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
export default function App() {
  const [booted, setBooted] = useState(false);
  const [screen, setScreen] = useState("login");
  const [currentChar, setCurrentChar] = useState(null);
  const [charTransition, setCharTransition] = useState(null); // char being loaded
  const [masterTransition, setMasterTransition] = useState(false);

  useEffect(()=>{ injectStyles(); },[]);

  const handleLogin = (type, data) => {
    if(type==="master") {
      setMasterTransition(true);
    } else if(type==="rules") {
      setScreen("rules");
    } else if(type==="character") {
      setCharTransition(data);
    }
  };

  const goBack = () => { setScreen("login"); setCurrentChar(null); };

  return (
    <>
      {/* Global CRT boot on first load */}
      {!booted && <BootScreen onComplete={()=>setBooted(true)}/>}

      {/* Character file loading transition */}
      {charTransition && (
        <CharTransitionScreen
          char={charTransition}
          onComplete={()=>{
            setCurrentChar(charTransition);
            setCharTransition(null);
            setScreen("character");
          }}
        />
      )}

      {/* Master panel transition */}
      {masterTransition && (
        <MasterTransitionScreen onComplete={()=>{
          setMasterTransition(false);
          setScreen("master");
        }}/>
      )}

      <div className="scanline-overlay"/>
      {screen==="login"  && !charTransition && !masterTransition && <LoginScreen onLogin={handleLogin}/>}
      {screen==="rules"  && <RulesScreen onBack={goBack}/>}
      {screen==="character" && currentChar && !charTransition && <CharacterScreen char={currentChar} onBack={goBack}/>}
      {screen==="master" && !masterTransition && <MasterScreen onBack={goBack}/>}
    </>
  );
}
