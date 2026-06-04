import { useState } from "react";
import { T, ROLE_BADGE } from "../../../constants/theme";
import { PERSIST_KEYS } from "../../../constants/chars";
import { derive } from "../../../lib/utils";
import { usePersist } from "../../../hooks/usePersist";
import { Btn, Badge, StatBar } from "../../ui";
import { TabFicha }    from "./TabFicha";
import { TabPistas }   from "./TabPistas";
import { TabTribunal } from "./TabTribunal";
import { TabNotas }    from "./TabNotas";

const TABS = [
  { id: "ficha",    label: "📋 FICHA" },
  { id: "clues",    label: "🔍 PISTAS" },
  { id: "tribunal", label: "⚖️ TRIBUNAL" },
  { id: "notas",    label: "📝 NOTAS" },
];

export function CharacterScreen({ char, onBack }) {
  const d = derive(char.attrs);
  const [tab, setTab] = useState("ficha");
  const rb = ROLE_BADGE.player;

  const [statusRaw, setStatus] = usePersist(
    PERSIST_KEYS.charStatus(char.id),
    { pv: d.pvMax, ps: d.psMax, coins: 0 }
  );
  // Guard: server may return null
  const status = (statusRaw && typeof statusRaw === "object" && !Array.isArray(statusRaw))
    ? statusRaw
    : { pv: d.pvMax, ps: d.psMax, coins: 0 };

  // Mastermind memories state is lifted here so TabFicha can receive it
  const [memoriesUnlocked] = usePersist(PERSIST_KEYS.charMemories(char.id), false);

  const adjStatus = (field, delta) => {
    setStatus(prev => ({
      ...prev,
      [field]: Math.max(
        0,
        Math.min(
          field === "pv" ? d.pvMax : field === "ps" ? d.psMax : d.coinsMax,
          (prev[field] ?? 0) + delta
        )
      ),
    }));
  };

  return (
    <div className="fade" style={{ minHeight: "100vh", background: T.bg }}>
      {/* STICKY HEADER */}
      <div style={{ background: T.s1, borderBottom: `3px solid ${T.red}`, padding: "12px 20px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span className="pixel" style={{ color: T.red, fontSize: 28 }}>{char.num}</span>
              <div>
                <div className="title" style={{ fontSize: 22, color: T.white, letterSpacing: 2, lineHeight: 1 }}>{char.name}</div>
                <div className="type" style={{ color: T.muted, fontSize: 10 }}>{char.talent}</div>
              </div>
              <Badge bg={rb.bg} color={rb.text}>{rb.label}</Badge>
              {char.age && <span className="type" style={{ color: T.dim, fontSize: 11 }}>{char.age} anos • {char.pro}</span>}
            </div>
          </div>
          <Btn variant="ghost" onClick={onBack} style={{ fontSize: 11 }}>← SAIR</Btn>
        </div>

        {/* STATUS BARS */}
        <div style={{ display: "flex", gap: 20, marginTop: 12, flexWrap: "wrap" }}>
          <StatBar label="PV — Pontos de Vida" cur={status.pv ?? d.pvMax} max={d.pvMax} color={T.greenL}
            onPlus={() => adjStatus("pv", 1)} onMinus={() => adjStatus("pv", -1)} />
          <StatBar label="PS — Pontos de Sanidade" cur={status.ps ?? d.psMax} max={d.psMax} color={T.blue}
            onPlus={() => adjStatus("ps", 1)} onMinus={() => adjStatus("ps", -1)} />
          <div style={{ minWidth: 120 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span className="type" style={{ fontSize: 10, color: T.muted, letterSpacing: 1, textTransform: "uppercase" }}>🪙 Monocoins</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button onClick={() => adjStatus("coins", -1)} style={{ background: T.s4, border: "none", color: T.white, width: 20, height: 20, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: 1 }}>−</button>
                <span className="pixel" style={{ color: T.yellow, fontSize: 22, lineHeight: 1 }}>
                  {status.coins ?? 0}<span style={{ color: T.muted, fontSize: 12 }}>/{d.coinsMax}</span>
                </span>
                <button onClick={() => adjStatus("coins", 1)} style={{ background: T.s4, border: "none", color: T.white, width: 20, height: 20, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: 1 }}>+</button>
              </div>
            </div>
            <div style={{ background: T.s4, height: 6, borderRadius: 1 }}>
              <div style={{ height: "100%", width: `${((status.coins ?? 0) / d.coinsMax) * 100}%`, background: T.yellow, transition: "width .3s" }} />
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 2, marginTop: 14 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? T.red : T.s3,
                color: tab === t.id ? T.white : T.muted,
                border: "none", padding: "7px 16px", fontSize: 11,
                letterSpacing: .5, transition: "all .15s", cursor: "pointer",
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT — key forces full remount on tab change, preventing stale state */}
      <div style={{ padding: "20px", maxWidth: 900, margin: "0 auto" }}>
        {tab === "ficha"    && <TabFicha    key="ficha"    char={char} d={d} memoriesUnlocked={memoriesUnlocked} />}
        {tab === "clues"    && <TabPistas   key="clues"    char={char} />}
        {tab === "tribunal" && <TabTribunal key="tribunal" char={char} />}
        {tab === "notas"    && <TabNotas    key="notas"    char={char} />}
      </div>
    </div>
  );
}
