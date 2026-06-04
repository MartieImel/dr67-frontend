import { useState } from "react";
import { T, CLUE_COLORS, CLUE_LABELS } from "../../../constants/theme";
import { PERSIST_KEYS } from "../../../constants/chars";
import { Card, SectionTitle, Btn, Badge } from "../../ui";
import { usePersist } from "../../../hooks/usePersist";

export function TabPistas({ char }) {
  const [cluesRaw, setClues] = usePersist(PERSIST_KEYS.charClues(char.id), []);
  // Guard: server may return null before first save
  const clues = Array.isArray(cluesRaw) ? cluesRaw : [];

  const [showAddClue, setShowAddClue] = useState(false);
  const [newClue, setNewClue] = useState({
    name: "", type: "fisica", force: "⭐", desc: "", status: "disponivel",
  });

  const saveClue = () => {
    if (!newClue.name.trim()) return;
    setClues(prev => {
      const safe = Array.isArray(prev) ? prev : [];
      return [...safe, { ...newClue, id: Date.now() }];
    });
    setNewClue({ name: "", type: "fisica", force: "⭐", desc: "", status: "disponivel" });
    setShowAddClue(false);
  };

  const removeClue = (id) =>
    setClues(prev => (Array.isArray(prev) ? prev : []).filter(c => c.id !== id));

  const updateClue = (id, field, value) =>
    setClues(prev =>
      (Array.isArray(prev) ? prev : []).map(c => (c.id === id ? { ...c, [field]: value } : c))
    );

  const typeColor  = (t) => CLUE_COLORS[t]  || T.bd2;
  const typeLabel  = (t) => CLUE_LABELS[t]  || t;

  return (
    <div className="slide" style={{ minHeight: "60vh" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <SectionTitle icon="🔍">Balas de Verdade — Pistas Coletadas</SectionTitle>
        <Btn onClick={() => setShowAddClue(s => !s)} variant="yellow" style={{ fontSize: 11 }}>
          {showAddClue ? "✕ CANCELAR" : "+ ADICIONAR PISTA"}
        </Btn>
      </div>

      {/* Add form */}
      {showAddClue && (
        <Card style={{ marginBottom: 16, border: `1px solid ${T.yellow}` }}>
          <SectionTitle icon="➕" color={T.yellow}>Nova Pista</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div>
              <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>NOME DA PISTA *</div>
              <input
                value={newClue.name}
                onChange={e => setNewClue(p => ({ ...p, name: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && saveClue()}
                style={{ width: "100%" }}
                placeholder="Ex: Faca sem sangue"
                autoFocus
              />
            </div>
            <div>
              <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>TIPO</div>
              <select value={newClue.type} onChange={e => setNewClue(p => ({ ...p, type: e.target.value }))} style={{ width: "100%" }}>
                {Object.entries(CLUE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>FORÇA</div>
              <select value={newClue.force} onChange={e => setNewClue(p => ({ ...p, force: e.target.value }))} style={{ width: "100%" }}>
                {["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐"].map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>STATUS</div>
              <select value={newClue.status} onChange={e => setNewClue(p => ({ ...p, status: e.target.value }))} style={{ width: "100%" }}>
                <option value="disponivel">🟢 Disponível</option>
                <option value="usada">🔵 Usada</option>
                <option value="descartada">⚫ Descartada</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>DESCRIÇÃO / O QUE ESTA PISTA PROVA</div>
            <textarea
              value={newClue.desc}
              onChange={e => setNewClue(p => ({ ...p, desc: e.target.value }))}
              style={{ width: "100%", minHeight: 60, resize: "vertical" }}
              placeholder="Descreva o que esta pista significa ou prova..."
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="yellow" onClick={saveClue}>SALVAR PISTA</Btn>
            <Btn variant="dark" onClick={() => setShowAddClue(false)}>CANCELAR</Btn>
          </div>
        </Card>
      )}

      {/* Summary bar */}
      {clues.length > 0 && (
        <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          {Object.entries(CLUE_LABELS).map(([type, label]) => {
            const count = clues.filter(c => c.type === type).length;
            if (!count) return null;
            return (
              <div key={type} style={{
                background: typeColor(type) + "22",
                border: `1px solid ${typeColor(type)}44`,
                padding: "3px 10px", display: "flex", gap: 6, alignItems: "center",
              }}>
                <span className="type" style={{ color: typeColor(type), fontSize: 10 }}>{label}</span>
                <span className="pixel" style={{ color: typeColor(type), fontSize: 16 }}>{count}</span>
              </div>
            );
          })}
          <div style={{ background: T.s3, border: `1px solid ${T.bd}`, padding: "3px 10px" }}>
            <span className="type" style={{ color: T.muted, fontSize: 10 }}>
              TOTAL: <span style={{ color: T.white, fontWeight: 700 }}>{clues.length}</span>
            </span>
          </div>
        </div>
      )}

      {/* Empty state */}
      {clues.length === 0 && !showAddClue && (
        <div style={{ textAlign: "center", padding: "40px 20px", background: T.s1, border: `1px dashed ${T.bd}` }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
          <div className="type" style={{ fontSize: 12, color: T.muted }}>Nenhuma pista coletada ainda.</div>
          <div className="type" style={{ fontSize: 11, marginTop: 4, color: T.dim }}>
            Investigue cenas de crime para encontrar Balas de Verdade.
          </div>
        </div>
      )}

      {/* Clue list */}
      {clues.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {clues.map((c) => (
            <Card
              key={c.id}
              style={{
                borderLeft: `3px solid ${typeColor(c.type)}`,
                opacity: c.status === "descartada" ? 0.5 : 1,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: c.desc ? 8 : 0 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span className="pixel" style={{ color: T.yellow, fontSize: 20 }}>{c.force}</span>
                  <span className="type" style={{ color: T.white, fontWeight: 700, fontSize: 13 }}>{c.name}</span>
                  <Badge bg={typeColor(c.type) + "22"} color={typeColor(c.type)}>
                    {typeLabel(c.type)}
                  </Badge>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <select
                    value={c.status}
                    onChange={e => updateClue(c.id, "status", e.target.value)}
                    style={{ fontSize: 10, padding: "2px 6px" }}
                  >
                    <option value="disponivel">🟢 Disponível</option>
                    <option value="usada">🔵 Usada</option>
                    <option value="descartada">⚫ Descartada</option>
                  </select>
                  <button
                    onClick={() => removeClue(c.id)}
                    style={{ background: "none", border: "none", color: T.dim, fontSize: 16, cursor: "pointer", lineHeight: 1 }}
                    title="Remover pista"
                  >✕</button>
                </div>
              </div>
              {c.desc && (
                <div
                  className="type"
                  style={{
                    color: T.muted, fontSize: 12, lineHeight: 1.6,
                    background: T.s3, padding: "8px 10px",
                    borderLeft: `2px solid ${typeColor(c.type)}44`,
                  }}
                >
                  {c.desc}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
