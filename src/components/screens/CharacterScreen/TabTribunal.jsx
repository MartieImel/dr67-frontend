import { T } from "../../../constants/theme";
import { PERSIST_KEYS } from "../../../constants/chars";
import { Card, SectionTitle } from "../../ui";
import { usePersist } from "../../../hooks/usePersist";

export function TabTribunal({ char }) {
  const [tribunalRaw, setTribunal] = usePersist(
    PERSIST_KEYS.charTribunal(char.id),
    { suspect: "", evidence: "", accusation: "", votes: "", phase: "", notes: "" }
  );
  const EMPTY_TRIBUNAL = { suspect: "", evidence: "", accusation: "", votes: "", phase: "", notes: "" };
  // Guard: server may return null
  const tribunal = (tribunalRaw && typeof tribunalRaw === "object" && !Array.isArray(tribunalRaw))
    ? { ...EMPTY_TRIBUNAL, ...tribunalRaw }
    : EMPTY_TRIBUNAL;

  const field = (label, key, placeholder, multiline = false) => (
    <Card key={key}>
      <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>{label}</div>
      {multiline ? (
        <textarea value={tribunal[key]} onChange={e => setTribunal(p => ({ ...p, [key]: e.target.value }))}
          style={{ width: "100%", minHeight: 80, resize: "vertical" }} placeholder={placeholder} />
      ) : (
        <input value={tribunal[key]} onChange={e => setTribunal(p => ({ ...p, [key]: e.target.value }))}
          style={{ width: "100%" }} placeholder={placeholder} />
      )}
    </Card>
  );

  return (
    <div className="slide">
      <SectionTitle icon="⚖️">Preparação para o Tribunal</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Card>
          <SectionTitle icon="1️⃣" color={T.muted}>Fase 1 — Suspeita Inicial</SectionTitle>
          <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>MEU SUSPEITO SECRETO</div>
          <input value={tribunal.suspect} onChange={e => setTribunal(p => ({ ...p, suspect: e.target.value }))}
            style={{ width: "100%", marginBottom: 8 }} placeholder="Quem eu acho que é o assassino..." />
          <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>FASE ATUAL DO TRIBUNAL</div>
          <input value={tribunal.phase} onChange={e => setTribunal(p => ({ ...p, phase: e.target.value }))}
            style={{ width: "100%" }} placeholder="Debate Livre / Nonstop / Acusação..." />
        </Card>

        <Card>
          <SectionTitle icon="3️⃣" color={T.yellow}>Fase 3 — Nonstop Debate</SectionTitle>
          <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>PISTA MAIS FORTE</div>
          <input value={tribunal.evidence} onChange={e => setTribunal(p => ({ ...p, evidence: e.target.value }))}
            style={{ width: "100%" }} placeholder="Qual pista apoia minha suspeita..." />
        </Card>

        <Card>
          <SectionTitle icon="4️⃣" color={T.yellow}>Fase 4 — Acusação Final</SectionTitle>
          <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>ACUSADO</div>
          <input value={tribunal.accusation} onChange={e => setTribunal(p => ({ ...p, accusation: e.target.value }))}
            style={{ width: "100%", marginBottom: 8 }} placeholder="Nome do acusado..." />
          <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>FASE 5 — MOTIVO DO VOTO</div>
          <input value={tribunal.votes} onChange={e => setTribunal(p => ({ ...p, votes: e.target.value }))}
            style={{ width: "100%" }} placeholder="☝ Culpado ou 👎 Inocente..." />
        </Card>

        <Card style={{ gridColumn: "1/-1" }}>
          <SectionTitle icon="2️⃣" color={T.muted}>Fase 2 — Notas do Debate Livre</SectionTitle>
          <textarea value={tribunal.notes} onChange={e => setTribunal(p => ({ ...p, notes: e.target.value }))}
            style={{ width: "100%", minHeight: 100, resize: "vertical" }}
            placeholder="Anotações durante os 15 minutos de debate livre..." />
        </Card>
      </div>

      <div style={{ padding: "12px 14px", background: T.s2, border: `1px solid ${T.bd}` }}>
        <div className="title" style={{ color: T.muted, fontSize: 12, letterSpacing: 2, marginBottom: 8 }}>REFERÊNCIA — BÔNUS MONOCOINS</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[["Acusação Final correta", 5], ["Destruiu 3+ Declarações", 3], ["Descobriu a Pista Decisiva", 4], ["Não perdeu nenhuma Bala", 2]].map(([l, v]) => (
            <div key={l} style={{ background: T.s3, padding: "6px 10px", display: "flex", gap: 8, alignItems: "center" }}>
              <span className="pixel" style={{ color: T.yellow, fontSize: 18 }}>+{v}</span>
              <span className="type" style={{ color: T.muted, fontSize: 10 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
