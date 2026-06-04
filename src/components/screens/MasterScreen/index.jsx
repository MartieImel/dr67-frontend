import React, { useState } from "react";
import { T, ROLE_BADGE, STATUS_COLOR } from "../../../constants/theme";
import { CHARS, PERSIST_KEYS } from "../../../constants/chars";
import { derive } from "../../../lib/utils";
import { usePersist } from "../../../hooks/usePersist";
import { Btn, Badge, Card, SectionTitle } from "../../ui";
import { TabTurma }          from "./TabTurma";
import { TabSegredos }       from "./TabSegredos";
import { TabCrimes }         from "./TabCrimes";
import { TabMonokuma }       from "./TabMonokuma";
import { TabReferencia }     from "./TabReferencia";
import { TabSenhas }         from "./TabSenhas";
import { TabControleFichas } from "./TabControleFichas";
import { TabExportar }       from "./TabExportar";

const TABS = [
  { id: "turma",     label: "👥 TURMA" },
  { id: "fichas",    label: "🎮 FICHAS" },
  { id: "segredos",  label: "🔒 SEGREDOS" },
  { id: "crimes",    label: "🔪 CRIMES" },
  { id: "monokuma",  label: "🐻 MONOKUMA" },
  { id: "senhas",    label: "🔑 SENHAS" },
  { id: "exportar",  label: "💾 BACKUP" },
  { id: "referencia",label: "📖 REFERÊNCIA" },
];

export function MasterScreen({ onBack }) {
  const [tab, setTab] = useState("turma");
  const [selectedChar, setSelectedChar] = useState(null);

  const [charStatusesRaw, setCharStatuses] = usePersist(PERSIST_KEYS.charStatuses, {});
  const [globalRaw]                        = usePersist(PERSIST_KEYS.global, { hope: 25, despair: 0, round: 1 });

  // Guards: server may return null for these keys
  const charStatuses = (charStatusesRaw && typeof charStatusesRaw === "object" && !Array.isArray(charStatusesRaw))
    ? charStatusesRaw : {};
  const gst = (globalRaw && typeof globalRaw === "object" && !Array.isArray(globalRaw))
    ? globalRaw : { hope: 25, despair: 0, round: 1 };

  return (
    <div className="fade" style={{ minHeight: "100vh", background: T.bg }}>
      {/* STICKY HEADER */}
      <div style={{
        background: T.s1, borderBottom: `3px solid ${T.red}`,
        padding: "12px 20px", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>⚠</span>
            <div>
              <div className="title" style={{ color: T.red, fontSize: 20, letterSpacing: 3, lineHeight: 1 }}>PAINEL DO MESTRE</div>
              <div className="type" style={{ color: T.dim, fontSize: 10 }}>TURMA 67 — ACESSO RESTRITO</div>
            </div>
            <div style={{ display: "flex", gap: 16, marginLeft: 16 }}>
              {[
                { label: "☀️ ESPERANÇA", value: gst.hope ?? 25,  color: T.greenL },
                { label: "💀 DESESPERO", value: gst.despair ?? 0, color: T.red },
                { label: "📅 RODADA",    value: `R${gst.round ?? 1}`, color: T.yellow },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div className="type" style={{ fontSize: 9, color: T.muted }}>{label}</div>
                  <div className="pixel" style={{ color, fontSize: 22 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
          <Btn variant="ghost" onClick={onBack} style={{ fontSize: 11 }}>← SAIR</Btn>
        </div>

        {/* TAB BAR */}
        <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? T.red : T.s3,
                color: tab === t.id ? T.white : T.muted,
                border: "none", padding: "7px 14px", fontSize: 11,
                letterSpacing: .5, transition: "all .15s", cursor: "pointer",
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT — key forces remount on tab change, preventing stale state */}
      <div style={{ padding: "20px", maxWidth: 1100, margin: "0 auto" }}>
        {tab === "turma"      && <TabTurma          key="turma"      charStatuses={charStatuses} setCharStatuses={setCharStatuses} onSelectChar={setSelectedChar} />}
        {tab === "fichas"     && <TabControleFichas key="fichas" />}
        {tab === "segredos"   && <TabSegredos        key="segredos" />}
        {tab === "crimes"     && <TabCrimes          key="crimes" />}
        {tab === "monokuma"   && <TabMonokuma        key="monokuma" />}
        {tab === "senhas"     && <TabSenhas          key="senhas" />}
        {tab === "exportar"   && <TabExportar        key="exportar" />}
        {tab === "referencia" && <TabReferencia      key="referencia" />}
      </div>

      {/* CHARACTER DETAIL MODAL (from turma tab click) */}
      {selectedChar && (
        <CharDetailModal char={selectedChar} onClose={() => setSelectedChar(null)} />
      )}
    </div>
  );
}

// ── Small portrait component ─────────────────────────────────────────
const IMG_EXT = "jpeg"; // ← mesma extensão de TabFicha.jsx

function CharPortrait({ char, size = 48 }) {
  const [err, setErr] = React.useState(false);
  const src = `img/${String(char.id).padStart(2, "0")}.${IMG_EXT}`;
  return (
    <div style={{
      width: size, height: Math.round(size * 1.25),
      background: T.s3, overflow: "hidden", flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      border: `1px solid ${T.bd}`,
    }}>
      {!err
        ? <img src={src} alt={char.name} onError={() => setErr(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : <span className="pixel" style={{ color: T.red, fontSize: Math.round(size * 0.4) }}>{char.num}</span>
      }
    </div>
  );
}

// ── Quick character modal (from Turma tab) ───────────────────────────
function CharDetailModal({ char, onClose }) {
  const d = derive(char.attrs);
  const rb = ROLE_BADGE.player;
  const [statusRaw, setStatus] = usePersist(
    PERSIST_KEYS.charStatus(char.id),
    { pv: d.pvMax, ps: d.psMax, coins: 0 }
  );
  const status = (statusRaw && typeof statusRaw === "object" && !Array.isArray(statusRaw))
    ? statusRaw : { pv: d.pvMax, ps: d.psMax, coins: 0 };

  const adj = (field, n) =>
    setStatus(prev => {
      const safe = (prev && typeof prev === "object" && !Array.isArray(prev))
        ? prev : { pv: d.pvMax, ps: d.psMax, coins: 0 };
      return {
        ...safe,
        [field]: Math.max(
          0,
          Math.min(
            field === "pv" ? d.pvMax : field === "ps" ? d.psMax : d.coinsMax,
            (safe[field] ?? 0) + n
          )
        ),
      };
    });

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 11000, overflowY: "auto", padding: 20 }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="slide"
        style={{
          background: T.s2, border: `1px solid ${T.red}`,
          borderTop: `3px solid ${T.red}`,
          maxWidth: 720, margin: "0 auto", padding: 24,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <CharPortrait char={char} size={64} />
            <div>
              <div className="title" style={{ color: T.white, fontSize: 22, letterSpacing: 2 }}>{char.name}</div>
              <div className="type" style={{ color: T.muted, fontSize: 11 }}>{char.talent}</div>
            </div>
            <Badge bg={rb.bg} color={rb.text}>{rb.label}</Badge>
            {char.isMastermind && (
              <span style={{
                background: "#2a0a3e", color: "#c060e0",
                border: "1px solid #6030a0",
                fontSize: 9, padding: "2px 8px",
                fontFamily: "Courier Prime", letterSpacing: 1,
              }}>★ MASTERMIND</span>
            )}
          </div>
          <Btn variant="dark" onClick={onClose}>✕ FECHAR</Btn>
        </div>

        {/* Live status controls */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "PV — Vida",      cur: (status||{}).pv    ?? d.pvMax,   max: d.pvMax,    color: T.greenL, key: "pv" },
            { label: "PS — Sanidade",  cur: (status||{}).ps    ?? d.psMax,   max: d.psMax,    color: T.blue,   key: "ps" },
            { label: "🪙 Monocoins",   cur: (status||{}).coins ?? 0,          max: d.coinsMax, color: T.yellow, key: "coins" },
          ].map(({ label, cur, max, color, key }) => (
            <div key={key} style={{ background: T.s3, padding: "10px 12px", textAlign: "center" }}>
              <div className="type" style={{ fontSize: 9, color: T.muted, marginBottom: 2 }}>{label}</div>
              <div className="pixel" style={{ color, fontSize: 28, lineHeight: 1 }}>
                {cur}<span style={{ fontSize: 14, color: T.muted }}>/{max}</span>
              </div>
              <div style={{ background: T.s4, height: 4, borderRadius: 1, margin: "6px 0" }}>
                <div style={{ height: "100%", width: `${(cur/max)*100}%`, background: color, transition: "width .3s" }} />
              </div>
              <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                {[-5, -1, 1, 5].map(n => (
                  <button key={n} onClick={() => adj(key, n)}
                    style={{
                      background: T.s4, border: "none",
                      color: n < 0 ? T.red : T.greenL,
                      padding: "2px 6px", cursor: "pointer",
                      fontSize: 11, fontFamily: "Courier Prime",
                    }}>{n > 0 ? `+${n}` : n}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Attributes */}
        <Card style={{ marginBottom: 12 }}>
          <SectionTitle icon="⚡">Atributos & Derivados</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6, marginBottom: 10 }}>
            {Object.entries(char.attrs).map(([k, v]) => (
              <div key={k} style={{ background: T.s3, padding: "6px 8px", textAlign: "center" }}>
                <div className="type" style={{ fontSize: 9, color: T.muted }}>{k}</div>
                <div className="pixel" style={{ color: T.yellow, fontSize: 24 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[["PVMax",d.pvMax],["PSMax",d.psMax],["Init",d.init],["Def",d.def],["Coins",d.coinsMax]].map(([l,v]) => (
              <div key={l} style={{ background: T.s4, padding: "4px 10px" }}>
                <span className="type" style={{ color: T.dim, fontSize: 9 }}>{l} </span>
                <span className="pixel" style={{ color: T.yellow, fontSize: 16 }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Ability + Weakness */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <Card style={{ borderLeft: `3px solid ${T.yellow}` }}>
            <div className="type" style={{ fontSize: 9, color: T.muted, marginBottom: 4 }}>✨ HABILIDADE</div>
            <div className="type" style={{ color: T.yellow, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{char.ability.name}</div>
            <div className="type" style={{ color: T.muted, fontSize: 11, lineHeight: 1.6 }}>{char.ability.desc}</div>
          </Card>
          <Card style={{ borderLeft: `3px solid ${T.red}` }}>
            <div className="type" style={{ fontSize: 9, color: T.muted, marginBottom: 4 }}>⚠️ FRAQUEZA</div>
            <div className="type" style={{ color: T.muted, fontSize: 11, lineHeight: 1.6 }}>{char.weakness}</div>
          </Card>
        </div>

        {/* Secret + Arc */}
        <Card style={{ borderLeft: `3px solid ${T.red}`, background: "#120808", marginBottom: 10 }}>
          <div className="type" style={{ fontSize: 9, color: "#a04040", letterSpacing: 1.5, marginBottom: 4 }}>🔒 SEGREDO</div>
          <div className="type" style={{ color: T.muted, fontSize: 12, lineHeight: 1.7 }}>{char.secret}</div>
        </Card>

        <Card style={{ borderLeft: `3px solid ${T.yellow}`, background: "#12100a" }}>
          <div className="type" style={{ fontSize: 9, color: "#a08020", letterSpacing: 1.5, marginBottom: 4 }}>🎭 ARCO NARRATIVO</div>
          <div className="type" style={{ color: T.muted, fontSize: 12, lineHeight: 1.7 }}>{char.arc}</div>
        </Card>

        {/* Mastermind extra */}
        {char.isMastermind && (
          <div style={{ marginTop: 12, background: "#150520", border: "1px solid #6030a0", padding: "14px 16px" }}>
            <div className="title" style={{ color: "#c060e0", fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>★ GUIA DO MASTERMIND</div>
            <div className="type" style={{ color: "#d0a0f0", fontSize: 12, lineHeight: 1.8, whiteSpace: "pre-line" }}>{char.masterNote}</div>
          </div>
        )}
      </div>
    </div>
  );
}
