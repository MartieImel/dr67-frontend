import { useState, useRef } from "react";
import { T } from "../../../constants/theme";
import { CHARS, PERSIST_KEYS } from "../../../constants/chars";
import { derive } from "../../../lib/utils";
import { Card, SectionTitle, Btn } from "../../ui";
import { SERVER_CACHE, writeServerState, loadServerState } from "../../../lib/server";

// ── Helpers ──────────────────────────────────────────────────────────
function safeArr(v) { return Array.isArray(v) ? v : []; }
function safeObj(v, def = {}) { return (v && typeof v === "object" && !Array.isArray(v)) ? v : def; }

// Build a snapshot of all important state from the server cache
function buildSnapshot() {
  const snap = {
    version: "1.0",
    exportDate: new Date().toISOString(),
    global: safeObj(SERVER_CACHE[PERSIST_KEYS.global], { hope: 25, despair: 0, round: 1 }),
    charStatuses: safeObj(SERVER_CACHE[PERSIST_KEYS.charStatuses], {}),
    crimes: safeArr(SERVER_CACHE[PERSIST_KEYS.crimes]),
    monokumaUsed: safeArr(SERVER_CACHE[PERSIST_KEYS.monokumaUsed]),
    characters: CHARS.map(c => {
      const d = derive(c.attrs);
      return {
        id: c.id,
        num: c.num,
        name: c.name,
        status: safeObj(SERVER_CACHE[PERSIST_KEYS.charStatus(c.id)], { pv: d.pvMax, ps: d.psMax, coins: 0 }),
        charStatus: SERVER_CACHE[PERSIST_KEYS.charStatus(c.id) + "_alive"] ?? "vivo",
        bonds: safeArr(SERVER_CACHE[PERSIST_KEYS.charBonds(c.id)]),
        clues: safeArr(SERVER_CACHE[PERSIST_KEYS.charClues(c.id)]),
        tribunal: safeObj(SERVER_CACHE[PERSIST_KEYS.charTribunal(c.id)], {}),
        notes: SERVER_CACHE[PERSIST_KEYS.charNotes(c.id)] ?? "",
        memoriesUnlocked: SERVER_CACHE[PERSIST_KEYS.charMemories(c.id)] ?? false,
        lockedMemoryUnlocked: SERVER_CACHE[PERSIST_KEYS.charLocked(c.id)] ?? false,
      };
    }),
  };
  return snap;
}

// Re-hydrate a snapshot back into the server cache and persist all keys
async function applySnapshot(snap) {
  if (!snap || snap.version !== "1.0") throw new Error("Formato de snapshot inválido ou versão incompatível.");

  const writes = [];

  // Global
  if (snap.global)       writes.push(writeServerState(PERSIST_KEYS.global, snap.global));
  if (snap.charStatuses) writes.push(writeServerState(PERSIST_KEYS.charStatuses, snap.charStatuses));
  if (snap.crimes)       writes.push(writeServerState(PERSIST_KEYS.crimes, snap.crimes));
  if (snap.monokumaUsed) writes.push(writeServerState(PERSIST_KEYS.monokumaUsed, snap.monokumaUsed));

  // Per-character
  for (const cs of (snap.characters || [])) {
    const c = CHARS.find(x => x.id === cs.id);
    if (!c) continue;
    const d = derive(c.attrs);
    const safeStatus = {
      pv:    Math.min(cs.status?.pv    ?? d.pvMax,    d.pvMax),
      ps:    Math.min(cs.status?.ps    ?? d.psMax,    d.psMax),
      coins: Math.min(cs.status?.coins ?? 0,          d.coinsMax),
    };
    writes.push(writeServerState(PERSIST_KEYS.charStatus(c.id),             safeStatus));
    writes.push(writeServerState(PERSIST_KEYS.charStatus(c.id) + "_alive",  cs.charStatus ?? "vivo"));
    writes.push(writeServerState(PERSIST_KEYS.charBonds(c.id),              cs.bonds    ?? []));
    writes.push(writeServerState(PERSIST_KEYS.charClues(c.id),              cs.clues    ?? []));
    writes.push(writeServerState(PERSIST_KEYS.charTribunal(c.id),           cs.tribunal ?? {}));
    writes.push(writeServerState(PERSIST_KEYS.charNotes(c.id),              cs.notes    ?? ""));
    writes.push(writeServerState(PERSIST_KEYS.charMemories(c.id),           cs.memoriesUnlocked    ?? false));
    writes.push(writeServerState(PERSIST_KEYS.charLocked(c.id),             cs.lockedMemoryUnlocked ?? false));
  }

  await Promise.all(writes);
  // Reload so the cache is fresh
  await loadServerState();
}

// ── Component ─────────────────────────────────────────────────────────
export function TabExportar() {
  const [status, setStatus] = useState(null);   // { type: "ok"|"err", msg }
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  const handleExport = () => {
    try {
      const snap = buildSnapshot();
      const json = JSON.stringify(snap, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      const date = new Date().toISOString().slice(0,10);
      a.href     = url;
      a.download = `danganronpa-turma67-${date}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus({ type: "ok", msg: `Exportação concluída! Arquivo: danganronpa-turma67-${date}.json` });
    } catch (e) {
      setStatus({ type: "err", msg: `Erro ao exportar: ${e.message}` });
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const snap = JSON.parse(ev.target.result);
        setPreview(snap);
        setStatus(null);
      } catch {
        setStatus({ type: "err", msg: "Arquivo inválido — não é um JSON válido." });
        setPreview(null);
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!preview) return;
    const confirmMsg =
      "⚠ ATENÇÃO: Importar irá SOBRESCREVER todos os dados atuais (PV, PS, Pistas, Laços, etc.).\n\nDeseja continuar?";
    if (!window.confirm(confirmMsg)) return;
    try {
      setStatus({ type: "ok", msg: "Importando dados..." });
      await applySnapshot(preview);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      setStatus({ type: "ok", msg: "✅ Dados importados com sucesso! Recarregue a página para ver todas as atualizações." });
    } catch (e) {
      setStatus({ type: "err", msg: `Erro ao importar: ${e.message}` });
    }
  };

  return (
    <div className="slide" style={{ minHeight: "60vh" }}>
      <SectionTitle icon="💾">Exportar / Importar Dados da Campanha</SectionTitle>

      <div style={{
        background: "#0a0808", border: `1px solid ${T.yellow}40`,
        borderLeft: `3px solid ${T.yellow}`, padding: "10px 14px", marginBottom: 20,
      }}>
        <div className="type" style={{ color: T.muted, fontSize: 11, lineHeight: 1.7 }}>
          O arquivo exportado contém um snapshot completo de todos os dados da campanha.<br />
          Use isso para fazer backup antes de uma sessão, ou para transferir entre dispositivos.
        </div>
      </div>

      {/* Status message */}
      {status && (
        <div className="slide" style={{
          background: status.type === "ok" ? "#0a1a0a" : "#1a0808",
          border: `1px solid ${status.type === "ok" ? T.greenL : T.red}`,
          padding: "10px 14px", marginBottom: 16,
        }}>
          <div className="type" style={{ color: status.type === "ok" ? T.greenL : T.red, fontSize: 12 }}>
            {status.msg}
          </div>
        </div>
      )}

      {/* EXPORT section */}
      <Card style={{ marginBottom: 16, borderLeft: `3px solid ${T.greenL}` }}>
        <SectionTitle icon="📤" color={T.greenL}>Exportar</SectionTitle>
        <div className="type" style={{ color: T.muted, fontSize: 12, lineHeight: 1.7, marginBottom: 14 }}>
          Cria um arquivo <code style={{ color: T.yellow, background: T.s4, padding: "1px 5px" }}>.json</code> com
          o estado atual de todos os 16 personagens. Inclui:
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[
            ["❤️  PV atual de cada personagem",      "🎲 Iniciativa e derivados"],
            ["🧠  PS atual de cada personagem",       "🔗 Laços de amizade (todos os níveis)"],
            ["🪙  Monocoins de cada personagem",      "🔍 Pistas coletadas por cada personagem"],
            ["☀️  Esperança global",                  "📋 Notas do tribunal"],
            ["💀  Desesperança global",               "🔒 Status de memórias desbloqueadas"],
            ["📅  Rodada atual",                      "🔪 Casos e crimes do Mestre"],
          ].map(([a, b], i) => (
            <div key={i} style={{ display: "flex", gap: 8 }}>
              <div className="type" style={{ color: T.muted, fontSize: 11 }}>{a}</div>
            </div>
          ))}
        </div>
        <Btn variant="yellow" onClick={handleExport} style={{ fontSize: 12 }}>
          📤 EXPORTAR ESTADO ATUAL
        </Btn>
      </Card>

      {/* IMPORT section */}
      <Card style={{ borderLeft: `3px solid ${T.red}` }}>
        <SectionTitle icon="📥" color={T.red}>Importar</SectionTitle>
        <div style={{
          background: "#150808", border: `1px solid ${T.red}40`,
          padding: "8px 12px", marginBottom: 14,
        }}>
          <div className="type" style={{ color: T.red, fontSize: 11 }}>
            ⚠ Importar sobrescreve TODOS os dados atuais. Esta ação não pode ser desfeita.<br />
            Faça um backup exportando primeiro se necessário.
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 6 }}>
            SELECIONAR ARQUIVO DE BACKUP (.json)
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            style={{
              background: T.s3, border: `1px solid ${T.bd}`,
              color: T.muted, padding: "6px 10px",
              fontFamily: "Courier Prime", fontSize: 12,
              width: "100%", cursor: "pointer",
            }}
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="slide" style={{
            background: T.s3, border: `1px solid ${T.bd}`,
            padding: "12px 14px", marginBottom: 14,
          }}>
            <div className="type" style={{ color: T.yellow, fontSize: 11, fontWeight: 700, marginBottom: 10 }}>
              📋 PREVIEW DO ARQUIVO
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <div style={{ background: T.s4, padding: "8px 10px" }}>
                <div className="type" style={{ fontSize: 9, color: T.muted, marginBottom: 2 }}>DATA DE EXPORTAÇÃO</div>
                <div className="type" style={{ fontSize: 11, color: T.white }}>
                  {preview.exportDate ? new Date(preview.exportDate).toLocaleString("pt-BR") : "—"}
                </div>
              </div>
              <div style={{ background: T.s4, padding: "8px 10px" }}>
                <div className="type" style={{ fontSize: 9, color: T.muted, marginBottom: 2 }}>PERSONAGENS</div>
                <div className="pixel" style={{ fontSize: 20, color: T.yellow }}>
                  {preview.characters?.length ?? 0}
                </div>
              </div>
              <div style={{ background: T.s4, padding: "8px 10px" }}>
                <div className="type" style={{ fontSize: 9, color: T.muted, marginBottom: 2 }}>VERSÃO</div>
                <div className="type" style={{ fontSize: 11, color: T.white }}>v{preview.version ?? "?"}</div>
              </div>
              <div style={{ background: T.s4, padding: "8px 10px" }}>
                <div className="type" style={{ fontSize: 9, color: T.muted, marginBottom: 2 }}>ESPERANÇA</div>
                <div className="pixel" style={{ fontSize: 20, color: T.greenL }}>
                  {preview.global?.hope ?? 0}
                </div>
              </div>
              <div style={{ background: T.s4, padding: "8px 10px" }}>
                <div className="type" style={{ fontSize: 9, color: T.muted, marginBottom: 2 }}>DESESPERANÇA</div>
                <div className="pixel" style={{ fontSize: 20, color: T.red }}>
                  {preview.global?.despair ?? 0}
                </div>
              </div>
              <div style={{ background: T.s4, padding: "8px 10px" }}>
                <div className="type" style={{ fontSize: 9, color: T.muted, marginBottom: 2 }}>CASOS</div>
                <div className="pixel" style={{ fontSize: 20, color: T.muted }}>
                  {preview.crimes?.length ?? 0}
                </div>
              </div>
            </div>

            {/* Per-char preview */}
            <div style={{ marginTop: 12, maxHeight: 220, overflowY: "auto" }}>
              <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 6 }}>PERSONAGENS NO ARQUIVO:</div>
              <table>
                <thead>
                  <tr>
                    <th>#</th><th>Nome</th><th>PV</th><th>PS</th><th>🪙</th><th>Status</th><th>Pistas</th><th>Mem?</th>
                  </tr>
                </thead>
                <tbody>
                  {(preview.characters || []).map(cs => (
                    <tr key={cs.id}>
                      <td><span className="pixel" style={{ color: T.red, fontSize: 14 }}>{cs.num}</span></td>
                      <td className="type" style={{ fontSize: 11, color: T.white }}>{cs.name}</td>
                      <td className="pixel" style={{ color: T.greenL, fontSize: 14 }}>
                        {cs.status?.pv ?? "—"}
                      </td>
                      <td className="pixel" style={{ color: T.blue, fontSize: 14 }}>
                        {cs.status?.ps ?? "—"}
                      </td>
                      <td className="pixel" style={{ color: T.yellow, fontSize: 14 }}>
                        {cs.status?.coins ?? 0}
                      </td>
                      <td className="type" style={{ fontSize: 10, color: T.muted }}>
                        {cs.charStatus || "vivo"}
                      </td>
                      <td className="pixel" style={{ color: T.muted, fontSize: 14 }}>
                        {cs.clues?.length ?? 0}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {cs.memoriesUnlocked ? "✅" : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <Btn
            variant="danger"
            onClick={handleImport}
            disabled={!preview}
            style={{ fontSize: 12 }}
          >
            📥 IMPORTAR E SOBRESCREVER
          </Btn>
          {preview && (
            <Btn variant="dark" onClick={() => { setPreview(null); if (fileRef.current) fileRef.current.value = ""; }}>
              CANCELAR
            </Btn>
          )}
        </div>
      </Card>
    </div>
  );
}
