import { useState } from "react";
import { T } from "../../../constants/theme";
import { PERSIST_KEYS } from "../../../constants/chars";
import { Card, SectionTitle, Btn } from "../../ui";
import { usePersist } from "../../../hooks/usePersist";

const EMPTY_CRIME = {
  title: "", victim: "", suspect: "", method: "",
  cover: "", clues: "", notes: "",
};

export function TabCrimes() {
  const [crimesRaw, setCrimes] = usePersist(PERSIST_KEYS.crimes, []);
  // Guard: server may return null before first save
  const crimes = Array.isArray(crimesRaw) ? crimesRaw : [];

  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState(EMPTY_CRIME);
  const [openId, setOpenId] = useState(null);

  const save = () => {
    if (!draft.title.trim()) return;
    setCrimes(prev => {
      const safe = Array.isArray(prev) ? prev : [];
      return [...safe, { ...draft, id: Date.now() }];
    });
    setDraft(EMPTY_CRIME);
    setShowAdd(false);
  };

  const remove = (id) => {
    if (window.confirm("Remover este caso?"))
      setCrimes(prev => (Array.isArray(prev) ? prev : []).filter(c => c.id !== id));
  };

  const update = (id, field, value) =>
    setCrimes(prev =>
      (Array.isArray(prev) ? prev : []).map(c => (c.id === id ? { ...c, [field]: value } : c))
    );

  const FIELD_DEFS = [
    { label: "VÍTIMA",              key: "victim",  ph: "Nome da vítima",             multi: false },
    { label: "SUSPEITO(S)",         key: "suspect", ph: "Suspeito(s) identificado(s)", multi: false },
    { label: "MÉTODO",              key: "method",  ph: "Como o crime foi cometido",   multi: false },
    { label: "COBERTURA DO ASSASSINO", key: "cover", ph: "Álibi, pistas falsas, rastros apagados...", multi: true  },
    { label: "PISTAS PLANTADAS",    key: "clues",   ph: "Quais pistas e onde...",       multi: true  },
    { label: "NOTAS DO MESTRE",     key: "notes",   ph: "Observações adicionais...",    multi: true  },
  ];

  return (
    <div className="slide" style={{ minHeight: "60vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <SectionTitle icon="🔪">Casos & Crimes</SectionTitle>
        <Btn variant="danger" onClick={() => setShowAdd(s => !s)} style={{ fontSize: 11 }}>
          {showAdd ? "✕ CANCELAR" : "+ NOVO CASO"}
        </Btn>
      </div>

      {/* Add form */}
      {showAdd && (
        <Card style={{ marginBottom: 16, border: `1px solid ${T.red}` }}>
          <SectionTitle icon="➕" color={T.red}>Novo Caso</SectionTitle>
          <div style={{ marginBottom: 10 }}>
            <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>TÍTULO DO CASO *</div>
            <input
              value={draft.title}
              onChange={e => setDraft(p => ({ ...p, title: e.target.value }))}
              style={{ width: "100%" }}
              placeholder="Ex: Caso #1 — O Corpo no Corredor"
              autoFocus
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {FIELD_DEFS.map(({ label, key, ph, multi }) => (
              <div key={key} style={{ gridColumn: multi ? "1/-1" : "auto" }}>
                <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>{label}</div>
                {multi ? (
                  <textarea
                    value={draft[key]}
                    onChange={e => setDraft(p => ({ ...p, [key]: e.target.value }))}
                    style={{ width: "100%", minHeight: 60, resize: "vertical" }}
                    placeholder={ph}
                  />
                ) : (
                  <input
                    value={draft[key]}
                    onChange={e => setDraft(p => ({ ...p, [key]: e.target.value }))}
                    style={{ width: "100%" }}
                    placeholder={ph}
                  />
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <Btn variant="danger" onClick={save}>CRIAR CASO</Btn>
            <Btn variant="dark" onClick={() => { setShowAdd(false); setDraft(EMPTY_CRIME); }}>CANCELAR</Btn>
          </div>
        </Card>
      )}

      {/* Empty state */}
      {crimes.length === 0 && !showAdd && (
        <div style={{ textAlign: "center", padding: "40px 20px", background: T.s1, border: `1px dashed ${T.bd}` }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔪</div>
          <div className="type" style={{ fontSize: 12, color: T.muted }}>Nenhum caso criado ainda.</div>
          <div className="type" style={{ fontSize: 11, marginTop: 4, color: T.dim }}>
            Adicione um caso para rastrear planejamento de assassinatos.
          </div>
        </div>
      )}

      {/* Crime list */}
      {crimes.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {crimes.map(crime => (
            <Card key={crime.id} style={{ borderLeft: `3px solid ${T.red}` }}>
              {/* Crime header — click to expand */}
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                onClick={() => setOpenId(openId === crime.id ? null : crime.id)}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 16 }}>🔪</span>
                  <span className="type" style={{ color: T.white, fontWeight: 700, fontSize: 13 }}>
                    {crime.title}
                  </span>
                  {crime.victim && (
                    <span className="type" style={{ color: T.dim, fontSize: 11 }}>
                      Vítima: {crime.victim}
                    </span>
                  )}
                  {crime.suspect && (
                    <span className="type" style={{ color: T.muted, fontSize: 11 }}>
                      Suspeito: {crime.suspect}
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: T.dim, fontSize: 12 }}>{openId === crime.id ? "▲ fechar" : "▼ expandir"}</span>
                  <button
                    onClick={e => { e.stopPropagation(); remove(crime.id); }}
                    style={{ background: "none", border: "none", color: T.dim, fontSize: 16, cursor: "pointer" }}
                    title="Remover caso"
                  >✕</button>
                </div>
              </div>

              {/* Expanded edit fields */}
              {openId === crime.id && (
                <div
                  className="slide"
                  style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
                    paddingTop: 14, marginTop: 10,
                    borderTop: `1px solid ${T.bd}`,
                  }}
                >
                  {FIELD_DEFS.map(({ label, key, ph, multi }) => (
                    <div key={key} style={{ gridColumn: multi ? "1/-1" : "auto" }}>
                      <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>{label}</div>
                      {multi ? (
                        <textarea
                          value={crime[key] || ""}
                          onChange={e => update(crime.id, key, e.target.value)}
                          style={{ width: "100%", minHeight: 60, resize: "vertical" }}
                          placeholder={ph}
                        />
                      ) : (
                        <input
                          value={crime[key] || ""}
                          onChange={e => update(crime.id, key, e.target.value)}
                          style={{ width: "100%" }}
                          placeholder={ph}
                        />
                      )}
                    </div>
                  ))}
                  <div style={{ gridColumn: "1/-1" }}>
                    <div className="type" style={{ fontSize: 10, color: T.dim, marginTop: 4 }}>
                      💾 Alterações são salvas automaticamente ao digitar.
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
