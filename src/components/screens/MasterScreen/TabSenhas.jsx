import { useState } from "react";
import { T } from "../../../constants/theme";
import { CHARS, LOCK_CODES, MASTER_PASSWORD, MEMORY_UNLOCK_CODE } from "../../../constants/chars";
import { Card, SectionTitle } from "../../ui";

export function TabSenhas() {
  const [revealed, setRevealed] = useState({});
  const toggle = (key) => setRevealed(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="slide" style={{ minHeight: "60vh" }}>
      <SectionTitle icon="🔑">Senhas e Códigos de Acesso</SectionTitle>

      <div style={{
        background: "#0a0808", border: `1px solid ${T.red}40`,
        borderLeft: `3px solid ${T.red}`, padding: "10px 14px", marginBottom: 20,
      }}>
        <div className="type" style={{ color: T.red, fontSize: 11, lineHeight: 1.7 }}>
          ⚠ DOCUMENTO CONFIDENCIAL — Uso exclusivo do Mestre.<br />
          Não compartilhe estas informações com os jogadores antes do momento narrativo correto.
        </div>
      </div>

      {/* Master passwords */}
      <Card style={{ marginBottom: 16, borderLeft: `3px solid ${T.red}` }}>
        <SectionTitle icon="🐻" color={T.red}>Acesso do Mestre</SectionTitle>
        <table>
          <thead><tr><th>Tipo</th><th>Código</th><th>Ação</th></tr></thead>
          <tbody>
            <tr>
              <td className="type" style={{ color: T.white, fontWeight: 700 }}>Senha do Mestre (Painel)</td>
              <td>
                <span className="pixel" style={{ fontSize: 18, color: T.red, letterSpacing: 4 }}>
                  {revealed["master"] ? MASTER_PASSWORD : "••••••••"}
                </span>
              </td>
              <td>
                <button onClick={() => toggle("master")}
                  style={{ background: T.s4, border: "none", color: T.muted, padding: "3px 10px", cursor: "pointer", fontFamily: "Courier Prime", fontSize: 11 }}>
                  {revealed["master"] ? "🙈 Ocultar" : "👁 Revelar"}
                </button>
              </td>
            </tr>
            <tr>
              <td className="type" style={{ color: T.white, fontWeight: 700 }}>Código Global de Memórias</td>
              <td>
                <span className="pixel" style={{ fontSize: 18, color: "#9070c8", letterSpacing: 4 }}>
                  {revealed["memglobal"] ? MEMORY_UNLOCK_CODE : "••••••••"}
                </span>
              </td>
              <td>
                <button onClick={() => toggle("memglobal")}
                  style={{ background: T.s4, border: "none", color: T.muted, padding: "3px 10px", cursor: "pointer", fontFamily: "Courier Prime", fontSize: 11 }}>
                  {revealed["memglobal"] ? "🙈 Ocultar" : "👁 Revelar"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* Per-character passwords */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle icon="🎭">Senhas dos Personagens</SectionTitle>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Personagem</th>
              <th>Talento</th>
              <th>Senha de Acesso</th>
              <th>Código de Memória</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {CHARS.map(c => (
              <tr key={c.id}>
                <td><span className="pixel" style={{ color: T.red, fontSize: 18 }}>{c.num}</span></td>
                <td>
                  <div className="type" style={{ color: T.white, fontWeight: 700, fontSize: 12 }}>{c.name}</div>
                  {c.isMastermind && (
                    <div className="type" style={{ color: "#c060e0", fontSize: 9, letterSpacing: 1 }}>★ MASTERMIND</div>
                  )}
                </td>
                <td className="type" style={{ color: T.dim, fontSize: 10 }}>{c.talent}</td>
                <td>
                  <span className="pixel" style={{ fontSize: 18, color: T.yellow, letterSpacing: 3 }}>
                    {revealed[`pw_${c.id}`] ? c.pw : "•".repeat(c.pw.length)}
                  </span>
                </td>
                <td>
                  <span className="pixel" style={{ fontSize: 16, color: "#9070c8", letterSpacing: 3 }}>
                    {revealed[`lk_${c.id}`] ? LOCK_CODES[c.id] : "•".repeat((LOCK_CODES[c.id] || "").length)}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => toggle(`pw_${c.id}`)}
                      style={{ background: T.s3, border: `1px solid ${T.bd}`, color: T.muted, padding: "2px 8px", cursor: "pointer", fontFamily: "Courier Prime", fontSize: 10 }}>
                      {revealed[`pw_${c.id}`] ? "🙈" : "👁"} Senha
                    </button>
                    <button onClick={() => toggle(`lk_${c.id}`)}
                      style={{ background: T.s3, border: "1px solid #3a2a60", color: "#9070c8", padding: "2px 8px", cursor: "pointer", fontFamily: "Courier Prime", fontSize: 10 }}>
                      {revealed[`lk_${c.id}`] ? "🙈" : "🧠"} Memória
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Reveal all / hide all */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => {
            const all = {};
            all["master"] = true; all["memglobal"] = true;
            CHARS.forEach(c => { all[`pw_${c.id}`] = true; all[`lk_${c.id}`] = true; });
            setRevealed(all);
          }}
          style={{ background: T.s3, border: `1px solid ${T.bd}`, color: T.muted, padding: "8px 16px", cursor: "pointer", fontFamily: "Courier Prime", fontSize: 11 }}>
          👁 Revelar Todos
        </button>
        <button
          onClick={() => setRevealed({})}
          style={{ background: T.s3, border: `1px solid ${T.bd}`, color: T.dim, padding: "8px 16px", cursor: "pointer", fontFamily: "Courier Prime", fontSize: 11 }}>
          🙈 Ocultar Todos
        </button>
      </div>
    </div>
  );
}
