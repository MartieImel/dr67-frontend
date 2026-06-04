import { useState } from "react";
import { T } from "../../constants/theme";
import { CHAPTERS } from "../../constants/rules";
import { Btn } from "../ui";

export function RulesScreen({ onBack }) {
  const [activeChapter, setActiveChapter] = useState("c1");
  const [dice, setDice] = useState(null);
  const [attr, setAttr] = useState(10);

  const chapter = CHAPTERS.find(c => c.id === activeChapter);

  const rollDice = () => {
    const r = Math.floor(Math.random() * 20) + 1;
    setDice({ roll: r, total: r + attr, nat: r === 1 || r === 20 });
  };

  return (
    <div className="fade" style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" }}>
      {/* TOP BAR */}
      <div style={{
        background: T.s1, borderBottom: `1px solid ${T.bd}`,
        padding: "10px 20px", display: "flex", alignItems: "center", gap: 16,
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <Btn variant="ghost" onClick={onBack} style={{ fontSize: 11 }}>← VOLTAR</Btn>
        <div>
          <span className="title" style={{ color: T.red, fontSize: 20, letterSpacing: 3 }}>MANUAL DE REGRAS</span>
          <span className="type" style={{ color: T.muted, fontSize: 10, marginLeft: 10 }}>DANGANRONPA: O JULGAMENTO SUPREMO v1.0</span>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", height: "calc(100vh - 52px)" }}>
        {/* SIDEBAR */}
        <div style={{ width: 200, background: T.s1, borderRight: `1px solid ${T.bd}`, padding: "16px 0", overflowY: "auto", flexShrink: 0 }}>
          {CHAPTERS.map(c => (
            <div key={c.id} onClick={() => setActiveChapter(c.id)}
              style={{
                padding: "10px 16px", cursor: "pointer", display: "flex", gap: 8, alignItems: "center",
                borderLeft: `3px solid ${activeChapter === c.id ? T.red : "transparent"}`,
                background: activeChapter === c.id ? T.s2 : "transparent",
                color: activeChapter === c.id ? T.white : T.muted,
                transition: "all .15s",
              }}
            >
              <span style={{ fontSize: 14 }}>{c.icon}</span>
              <span className="type" style={{ fontSize: 11, letterSpacing: .5 }}>{c.title}</span>
            </div>
          ))}

          {/* DICE ROLLER */}
          <div style={{ margin: "20px 12px 0", background: T.s2, border: `1px solid ${T.bd}`, padding: "12px", borderRadius: 2 }}>
            <div className="title" style={{ color: T.yellow, fontSize: 12, letterSpacing: 2, marginBottom: 10 }}>🎲 ROLAR DADO</div>
            <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>Valor do Atributo:</div>
            <input type="number" min={1} max={20} value={attr} onChange={e => setAttr(+e.target.value)}
              style={{ width: "100%", marginBottom: 8, textAlign: "center" }} />
            <Btn onClick={rollDice} style={{ width: "100%", marginBottom: 8, textAlign: "center" }}>ROLAR 1d20</Btn>
            {dice && (
              <div style={{ textAlign: "center" }}>
                <div className="pixel" style={{
                  fontSize: 36, lineHeight: 1,
                  color: dice.nat && dice.roll === 20 ? T.yellow : dice.nat && dice.roll === 1 ? T.red : T.white,
                }}>
                  {dice.roll}
                </div>
                <div className="type" style={{ fontSize: 10, color: T.muted }}>1d20</div>
                <div className="pixel" style={{ fontSize: 24, color: T.yellow }}>={dice.total}</div>
                {dice.roll === 20 && <div style={{ color: T.yellow, fontSize: 10, marginTop: 4 }}>★ CRÍTICO!</div>}
                {dice.roll === 1  && <div style={{ color: T.red,    fontSize: 10, marginTop: 4 }}>💀 CATASTRÓFICO!</div>}
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div className="slide">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ fontSize: 28 }}>{chapter.icon}</span>
              <div>
                <div className="title" style={{ fontSize: 28, color: T.white, letterSpacing: 3 }}>{chapter.title}</div>
                <div style={{ borderBottom: `2px solid ${T.red}`, width: 60, marginTop: 4 }} />
              </div>
            </div>

            {chapter.content.map((sec, i) => (
              <div key={i} style={{ marginBottom: 24 }}>
                <div className="title" style={{ color: T.yellow, fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>{sec.head}</div>
                {sec.text && (
                  <div className="type" style={{
                    color: T.muted, fontSize: 12, lineHeight: 1.8, whiteSpace: "pre-line",
                    background: T.s2, border: `1px solid ${T.bd}`, padding: "12px 14px",
                    borderLeft: `3px solid ${T.bd2}`,
                  }}>
                    {sec.text}
                  </div>
                )}
                {sec.table && (
                  <div style={{ overflowX: "auto" }}>
                    <table>
                      <thead>
                        <tr>{sec.table[0].map((h, j) => <th key={j}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {sec.table.slice(1).map((row, j) => (
                          <tr key={j}>
                            {row.map((cell, k) => (
                              <td key={k} className="type" style={{ color: k === 0 ? T.white : T.muted, fontWeight: k === 0 ? 700 : 400 }}>{cell}</td>
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
    </div>
  );
}
