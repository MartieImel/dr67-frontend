import { useState } from "react";
import { T, CLUE_COLORS, CLUE_LABELS, STATUS_COLOR } from "../../../constants/theme";
import { CHARS, PERSIST_KEYS, LOCK_CODES, LOCKED_MEMORIES } from "../../../constants/chars";
import { derive } from "../../../lib/utils";
import { usePersist } from "../../../hooks/usePersist";
import { Card, SectionTitle, Btn, Badge, StatBar } from "../../ui";

const BOND_LABELS = ["Desconhecidos","Conhecidos","Amigos","Próximos","Conf. Plena","Vínculo"];

// ── Per-character control panel ──────────────────────────────────────
function CharControl({ char }) {
  const d = derive(char.attrs);
  const [open, setOpen] = useState(false);

  const IMG_EXT    = "jpeg";
  const imgPath    = `img/${String(char.id).padStart(2, "0")}.${IMG_EXT}`;
  const [imgErr,   setImgErr]   = useState(false);

  const [status, setStatus]     = usePersist(PERSIST_KEYS.charStatus(char.id),    { pv: d.pvMax, ps: d.psMax, coins: 0 });
  const [charStatus, setCharStatus] = usePersist(PERSIST_KEYS.charStatus(char.id) + "_alive", "vivo");
  const [bondsRaw, setBonds]    = usePersist(PERSIST_KEYS.charBonds(char.id),     []);
  const [cluesRaw, setClues]    = usePersist(PERSIST_KEYS.charClues(char.id),     []);
  const [memUnlocked, setMemUnlocked] = usePersist(PERSIST_KEYS.charMemories(char.id), false);
  const [lockUnlocked, setLockUnlocked] = usePersist(PERSIST_KEYS.charLocked(char.id), false);
  const [notes, setNotes]       = usePersist(PERSIST_KEYS.charNotes(char.id),     "");

  const bonds = Array.isArray(bondsRaw)
    ? CHARS.filter(c => c.id !== char.id).map(c => {
        const saved = bondsRaw.find ? bondsRaw.find(b => b?.id === c.id) : null;
        return { id: c.id, name: c.name, lvl: saved?.lvl ?? 0 };
      })
    : CHARS.filter(c => c.id !== char.id).map(c => ({ id: c.id, name: c.name, lvl: 0 }));

  const clues = Array.isArray(cluesRaw) ? cluesRaw : [];

  const adj = (field, delta) =>
    setStatus(prev => {
      const safe = (prev && typeof prev === "object" && !Array.isArray(prev))
        ? prev : { pv: d.pvMax, ps: d.psMax, coins: 0 };
      const maxVal = field === "pv" ? d.pvMax : field === "ps" ? d.psMax : d.coinsMax;
      const curVal = safe[field] ?? (field === "pv" ? d.pvMax : field === "ps" ? d.psMax : 0);
      return { ...safe, [field]: Math.max(0, Math.min(maxVal, curVal + delta)) };
    });

  const setBondLvl = (cid, lvl) =>
    setBonds(prev => {
      const safe = Array.isArray(prev) ? prev : [];
      const exists = safe.find(b => b?.id === cid);
      if (exists) return safe.map(b => b?.id === cid ? { ...b, lvl } : b);
      return [...safe, { id: cid, name: CHARS.find(c => c.id === cid)?.name || "", lvl }];
    });

  const addClue = () => {
    const name = prompt("Nome da pista:");
    if (!name?.trim()) return;
    const type = prompt("Tipo (fisica/temporal/testemunhal/emocional/falsa):", "fisica") || "fisica";
    const force = prompt("Força (⭐ / ⭐⭐ / ⭐⭐⭐ / ⭐⭐⭐⭐):", "⭐⭐") || "⭐⭐";
    const desc = prompt("Descrição / o que prova:") || "";
    setClues(prev => {
      const safe = Array.isArray(prev) ? prev : [];
      return [...safe, { id: Date.now(), name, type, force, desc, status: "disponivel" }];
    });
  };

  const removeClue = (id) =>
    setClues(prev => (Array.isArray(prev) ? prev : []).filter(c => c.id !== id));

  const stColor = STATUS_COLOR[charStatus] || T.greenL;
  const safeStatus = (status && typeof status === "object" && !Array.isArray(status))
    ? status : { pv: d.pvMax, ps: d.psMax, coins: 0 };
  const pv     = safeStatus.pv    ?? d.pvMax;
  const ps     = safeStatus.ps    ?? d.psMax;
  const coins  = safeStatus.coins ?? 0;

  return (
    <div style={{
      background: T.s2, border: `1px solid ${open ? T.red : T.bd}`,
      borderLeft: `3px solid ${open ? T.red : T.bd2}`,
      marginBottom: 8, transition: "border-color .15s",
    }}>
      {/* Collapsed header */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", flexWrap: "wrap" }}
        onClick={() => setOpen(o => !o)}
      >
        <div style={{ width: 38, height: 48, flexShrink: 0, background: T.s4, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {!imgErr
            ? <img src={imgPath} alt={char.name} onError={() => setImgErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span className="pixel" style={{ color: T.red, fontSize: 16 }}>{char.num}</span>
          }
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <div className="type" style={{ color: T.white, fontWeight: 700, fontSize: 12 }}>{char.name}</div>
          <div className="type" style={{ color: T.dim, fontSize: 10 }}>{char.talent}</div>
        </div>
        {/* Mini status */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ color: stColor, fontSize: 11, fontFamily: "Courier Prime" }}>● {charStatus}</span>
          <span className="type" style={{ fontSize: 11, color: T.greenL }}>
            ❤ {pv}/{d.pvMax}
          </span>
          <span className="type" style={{ fontSize: 11, color: T.blue }}>
            🧠 {ps}/{d.psMax}
          </span>
          <span className="type" style={{ fontSize: 11, color: T.yellow }}>
            🪙 {coins}
          </span>
          <span className="type" style={{ fontSize: 11, color: "#9070c8" }}>
            🔗 {clues.length} pistas
          </span>
        </div>
        <span style={{ color: T.dim, fontSize: 12, marginLeft: 8 }}>{open ? "▲" : "▼"}</span>
      </div>

      {/* Expanded panel */}
      {open && (
        <div className="slide" style={{ padding: "0 14px 14px", borderTop: `1px solid ${T.bd}` }}>
          <div style={{ paddingTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

            {/* Status */}
            <Card style={{ gridColumn: "1/-1" }}>
              <SectionTitle icon="💊">Status e Recursos</SectionTitle>
              <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4, width: "100%" }}>SITUAÇÃO DO PERSONAGEM</div>
                {["vivo","ferido","morto","executado"].map(s => (
                  <button key={s} onClick={() => setCharStatus(s)}
                    style={{
                      background: charStatus === s ? STATUS_COLOR[s] + "30" : T.s4,
                      border: `1px solid ${charStatus === s ? STATUS_COLOR[s] : T.bd}`,
                      color: charStatus === s ? STATUS_COLOR[s] : T.muted,
                      padding: "4px 12px", cursor: "pointer",
                      fontFamily: "Courier Prime", fontSize: 11,
                    }}>
                    ● {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[
                  { label: "PV — Vida", cur: pv, max: d.pvMax, color: T.greenL, key: "pv" },
                  { label: "PS — Sanidade", cur: ps, max: d.psMax, color: T.blue, key: "ps" },
                  { label: "🪙 Monocoins", cur: coins, max: d.coinsMax, color: T.yellow, key: "coins" },
                ].map(({ label, cur, max, color, key }) => (
                  <div key={key} style={{ background: T.s3, padding: "10px 12px", textAlign: "center" }}>
                    <div className="type" style={{ fontSize: 9, color: T.muted, marginBottom: 4 }}>{label}</div>
                    <div className="pixel" style={{ color, fontSize: 28, lineHeight: 1 }}>
                      {cur}<span style={{ fontSize: 14, color: T.muted }}>/{max}</span>
                    </div>
                    <div style={{ background: T.s4, height: 4, borderRadius: 1, margin: "6px 0" }}>
                      <div style={{ height: "100%", width: `${(cur/max)*100}%`, background: color, transition: "width .3s" }} />
                    </div>
                    <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                      {[-5,-1,1,5].map(n => (
                        <button key={n} onClick={() => adj(key, n)}
                          style={{
                            background: T.s4, border: "none",
                            color: n < 0 ? T.red : T.greenL,
                            padding: "2px 6px", cursor: "pointer", fontSize: 11,
                            fontFamily: "Courier Prime",
                          }}>
                          {n > 0 ? `+${n}` : n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Memories */}
            <Card>
              <SectionTitle icon="🧠">Memórias</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div className="type" style={{ fontSize: 11, color: T.white }}>Memória Bloqueada</div>
                    <div className="type" style={{ fontSize: 10, color: T.dim }}>
                      Código: <span style={{ color: "#9070c8", letterSpacing: 2 }}>{LOCK_CODES[char.id]}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setLockUnlocked(v => !v)}
                    style={{
                      background: lockUnlocked ? "#1a2010" : "#1a1030",
                      border: `1px solid ${lockUnlocked ? T.greenL : "#4a3080"}`,
                      color: lockUnlocked ? T.greenL : "#9070c8",
                      padding: "5px 12px", cursor: "pointer",
                      fontFamily: "Courier Prime", fontSize: 11,
                    }}>
                    {lockUnlocked ? "🔓 Desbloqueada" : "🔒 Bloquear"}
                  </button>
                </div>
                {char.isMastermind && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div className="type" style={{ fontSize: 11, color: T.white }}>Memórias da Mastermind</div>
                      <div className="type" style={{ fontSize: 10, color: T.dim }}>Revela identidade real</div>
                    </div>
                    <button
                      onClick={() => setMemUnlocked(v => !v)}
                      style={{
                        background: memUnlocked ? "#200a30" : "#1a1030",
                        border: `1px solid ${memUnlocked ? "#c060e0" : "#4a3080"}`,
                        color: memUnlocked ? "#c060e0" : "#9070c8",
                        padding: "5px 12px", cursor: "pointer",
                        fontFamily: "Courier Prime", fontSize: 11,
                      }}>
                      {memUnlocked ? "★ Revelada" : "🔒 Oculta"}
                    </button>
                  </div>
                )}
                {LOCKED_MEMORIES[char.id] && (
                  <div style={{ background: "#0e0d20", border: "1px solid #3a2a60", padding: "8px 10px", marginTop: 4 }}>
                    <div className="type" style={{ color: "#7060a0", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>
                      TÍTULO DA MEMÓRIA BLOQUEADA
                    </div>
                    <div className="type" style={{ color: "#c0a8ff", fontSize: 11 }}>
                      {LOCKED_MEMORIES[char.id].title}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Bonds */}
            <Card>
              <SectionTitle icon="💛">Laços de Amizade</SectionTitle>
              <div style={{ maxHeight: 200, overflowY: "auto" }}>
                {bonds.map(b => (
                  <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, gap: 8 }}>
                    <div className="type" style={{ color: T.muted, fontSize: 11, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {b.name}
                    </div>
                    <div style={{ display: "flex", gap: 2, alignItems: "center", flexShrink: 0 }}>
                      {[0,1,2,3,4,5].map(n => (
                        <div key={n} onClick={() => setBondLvl(b.id, n)}
                          title={BOND_LABELS[n]}
                          style={{
                            width: 11, height: 11, borderRadius: "50%",
                            background: n <= b.lvl ? T.yellow : T.s4,
                            border: `1px solid ${n <= b.lvl ? T.yellowD : T.bd}`,
                            cursor: "pointer",
                          }}
                        />
                      ))}
                      <span className="pixel" style={{ color: T.yellow, fontSize: 14, marginLeft: 4, minWidth: 14, textAlign: "center" }}>
                        {b.lvl}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pistas */}
            <Card style={{ gridColumn: "1/-1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <SectionTitle icon="🔍">Pistas do Personagem</SectionTitle>
                <Btn variant="yellow" onClick={addClue} style={{ fontSize: 10, padding: "5px 12px" }}>
                  + ADICIONAR PISTA
                </Btn>
              </div>
              {clues.length === 0 ? (
                <div className="type" style={{ color: T.dim, fontSize: 11, textAlign: "center", padding: "10px 0" }}>
                  Nenhuma pista ainda.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {clues.map(c => (
                    <div key={c.id} style={{
                      background: T.s3, border: `1px solid ${T.bd}`,
                      borderLeft: `3px solid ${CLUE_COLORS[c.type] || T.bd2}`,
                      padding: "7px 10px", display: "flex", gap: 8, alignItems: "flex-start",
                    }}>
                      <span className="pixel" style={{ color: T.yellow, fontSize: 16, flexShrink: 0 }}>{c.force}</span>
                      <div style={{ flex: 1 }}>
                        <div className="type" style={{ color: T.white, fontWeight: 700, fontSize: 11 }}>{c.name}</div>
                        {c.desc && <div className="type" style={{ color: T.dim, fontSize: 10 }}>{c.desc}</div>}
                      </div>
                      <span className="type" style={{ color: CLUE_COLORS[c.type] || T.muted, fontSize: 10, flexShrink: 0 }}>
                        {CLUE_LABELS[c.type] || c.type}
                      </span>
                      <button onClick={() => removeClue(c.id)}
                        style={{ background: "none", border: "none", color: T.dim, cursor: "pointer", fontSize: 14, flexShrink: 0 }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Notes */}
            <Card style={{ gridColumn: "1/-1" }}>
              <SectionTitle icon="📝">Notas do Mestre sobre este Personagem</SectionTitle>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                style={{ width: "100%", minHeight: 80, resize: "vertical", fontSize: 12 }}
                placeholder="Anotações do mestre sobre este personagem..."
              />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export function TabControleFichas() {
  const [filter, setFilter] = useState("todos");

  const filtered = filter === "todos" ? CHARS
    : filter === "mastermind" ? CHARS.filter(c => c.isMastermind)
    : CHARS.filter(c => !c.isMastermind);

  return (
    <div className="slide" style={{ minHeight: "60vh" }}>
      <SectionTitle icon="🎮">Controle de Fichas — Visão do Mestre</SectionTitle>
      <div style={{
        background: "#0a0808", border: `1px solid ${T.red}40`,
        borderLeft: `3px solid ${T.red}40`, padding: "8px 12px", marginBottom: 14,
      }}>
        <div className="type" style={{ color: T.muted, fontSize: 11 }}>
          Clique em qualquer personagem para expandir e editar PV, PS, Monocoins, Laços, Pistas e Memórias.
          Todas as alterações são sincronizadas em tempo real.
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[["todos","Todos (16)"],["jogadores","Jogadores (15)"],["mastermind","Mastermind (1)"]].map(([v,l]) => (
          <button key={v} onClick={() => setFilter(v)}
            style={{
              background: filter === v ? T.red : T.s3,
              border: "none", color: filter === v ? T.white : T.muted,
              padding: "6px 14px", cursor: "pointer",
              fontFamily: "Courier Prime", fontSize: 11,
            }}>{l}</button>
        ))}
      </div>

      {filtered.map(c => <CharControl key={c.id} char={c} />)}
    </div>
  );
}
