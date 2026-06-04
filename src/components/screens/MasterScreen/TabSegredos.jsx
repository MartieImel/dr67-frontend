import { T } from "../../../constants/theme";
import { CHARS } from "../../../constants/chars";
import { Card, SectionTitle } from "../../ui";

export function TabSegredos() {
  return (
    <div className="slide">
      <SectionTitle icon="🔒">Segredos da Turma 67 — Visão do Mestre</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CHARS.map(c => (
          <Card key={c.id} style={{ borderLeft: `3px solid ${c.isMastermind ? "#c060e0" : T.bd2}` }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span className="pixel" style={{ color: T.red, fontSize: 20, flexShrink: 0 }}>{c.num}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                  <span className="type" style={{ color: T.white, fontWeight: 700, fontSize: 12 }}>{c.name}</span>
                  <span className="type" style={{ color: T.dim, fontSize: 10 }}>— {c.talent}</span>
                  {c.isMastermind && (
                    <span style={{ background: "#2a0a3e", color: "#c060e0", border: "1px solid #6030a0", fontSize: 9, padding: "1px 6px", letterSpacing: 1, fontFamily: "Courier Prime" }}>★ MASTERMIND</span>
                  )}
                </div>
                <div style={{ background: T.s3, padding: "8px 12px", borderLeft: `2px solid ${T.red}60`, marginBottom: 6 }}>
                  <div className="type" style={{ color: "#a04040", fontSize: 9, letterSpacing: 1.5, marginBottom: 3 }}>SEGREDO</div>
                  <div className="type" style={{ color: T.muted, fontSize: 12, lineHeight: 1.7 }}>{c.secret}</div>
                </div>
                <div style={{ background: T.s3, padding: "8px 12px", borderLeft: `2px solid ${T.yellow}60` }}>
                  <div className="type" style={{ color: "#a08020", fontSize: 9, letterSpacing: 1.5, marginBottom: 3 }}>ARCO NARRATIVO</div>
                  <div className="type" style={{ color: T.muted, fontSize: 12, lineHeight: 1.7 }}>{c.arc}</div>
                </div>
                {c.masterNote && (
                  <div style={{ background: "#1a0020", padding: "8px 12px", borderLeft: "2px solid #c060e0", marginTop: 6 }}>
                    <div className="type" style={{ color: "#c060e0", fontSize: 9, letterSpacing: 1.5, marginBottom: 3 }}>NOTA DO MESTRE</div>
                    <div className="type" style={{ color: "#d0a0f0", fontSize: 12, lineHeight: 1.7 }}>{c.masterNote}</div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
