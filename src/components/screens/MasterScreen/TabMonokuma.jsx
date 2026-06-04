import { T } from "../../../constants/theme";
import { PERSIST_KEYS } from "../../../constants/chars";
import { Card, SectionTitle, Btn } from "../../ui";
import { usePersist } from "../../../hooks/usePersist";

const MOTIVOS = [
  { d: 1, nome: "Segredo Revelado",    desc: "Monokuma vai expor o segredo de alguém publicamente. Para impedir, alguém precisa matar antes." },
  { d: 2, nome: "Memória Apagada",     desc: "Quer recuperar sua memória bloqueada? Monokuma devolve apenas para quem cometer um assassinato." },
  { d: 3, nome: "Chantagem",           desc: "Fotos/vídeos comprometedores serão enviados a familiares em 48h se ninguém agir." },
  { d: 4, nome: "Dívida de Esperança", desc: "Se ninguém matar nas próximas 72 horas, Monokuma executa um estudante aleatório." },
  { d: 5, nome: "Recompensa",          desc: "O assassino que cometer o crime perfeito ganha um item lendário ou acesso especial." },
  { d: 6, nome: "Ameaça Direta",       desc: "Alguém recebe mensagem: 'Mate X até amanhã ou eu te mato.'" },
  { d: 7, nome: "Rivalidade",          desc: "Dois estudantes têm objetivos mutualmente exclusivos — apenas um pode alcançar o seu." },
  { d: 8, nome: "Motivo do Mestre",    desc: "Personalizado — crie um motivo específico para o arco atual da campanha." },
];

const ANUNCIOS = [
  "Ding dong ding dong! Bom dia, leitõezinhos! Hora de verificar se todos ainda respiram. Upupupu!",
  "ATENÇÃO: O período de Free Time chegou ao fim. Espero que alguém tenha aproveitado bem o tempo. Alguns de vocês talvez não tenham muito mais.",
  "A investigação começa AGORA! Vocês têm tempo limitado antes que as pistas esfriem. Tick tock, tick tock~",
  "Está na hora do Tribunal de Classe! Quem será executado hoje? A tensão é deliciosa! Upupupu!",
  "Um novo motivo foi entregue. Leiam com atenção. O desespero é tão mais eficiente quando vocês têm escolha.",
];

// Safe coercion helpers — server may return null for any key
const safeArr = (v)      => Array.isArray(v) ? v : [];
const safeGst = (v)      => (v && typeof v === "object" && !Array.isArray(v))
  ? v
  : { hope: 25, despair: 0, round: 1, activeMotivo: null };

export function TabMonokuma() {
  const [usedRaw,      setUsed]        = usePersist(PERSIST_KEYS.monokumaUsed, []);
  const [diceResult,   setDiceResult]  = usePersist("monokuma_dice", null);
  const [globalRaw,    setGlobalState] = usePersist(PERSIST_KEYS.global, { hope: 25, despair: 0, round: 1, activeMotivo: null });
  const [activeAnuncio,setActiveAnuncio] = usePersist("monokuma_anuncio", null);

  // Always safe to use
  const used = safeArr(usedRaw);
  const gst  = safeGst(globalRaw);

  const rollMotivo = () => {
    const r = Math.floor(Math.random() * 8) + 1;
    setDiceResult(r);
    setGlobalState(g => ({ ...safeGst(g), activeMotivo: r }));
  };

  const toggleUsed = (d) =>
    setUsed(prev => {
      const p = safeArr(prev);
      return p.includes(d) ? p.filter(x => x !== d) : [...p, d];
    });

  const adjHope    = (n) => setGlobalState(g => { const s = safeGst(g); return { ...s, hope:    Math.max(0, Math.min(100, s.hope    + n)) }; });
  const adjDespair = (n) => setGlobalState(g => { const s = safeGst(g); return { ...s, despair: Math.max(0, Math.min(100, s.despair + n)) }; });
  const adjRound   = (n) => setGlobalState(g => { const s = safeGst(g); return { ...s, round:   Math.max(1, s.round + n) }; });

  return (
    <div className="slide" style={{ minHeight: "60vh" }}>

      {/* ── GLOBAL STATE ──────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
        <Card>
          <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 6 }}>☀️ ESPERANÇA GLOBAL</div>
          <div className="pixel" style={{ fontSize: 36, color: T.greenL, lineHeight: 1 }}>{gst.hope ?? 25}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
            <Btn variant="dark"   onClick={() => adjHope(-5)} style={{ padding: "4px 10px" }}>−5</Btn>
            <Btn variant="dark"   onClick={() => adjHope(-1)} style={{ padding: "4px 10px" }}>−1</Btn>
            <Btn                  onClick={() => adjHope(+1)} style={{ padding: "4px 10px" }}>+1</Btn>
            <Btn                  onClick={() => adjHope(+5)} style={{ padding: "4px 10px" }}>+5</Btn>
          </div>
          <div style={{ marginTop: 8, background: T.s4, height: 6, borderRadius: 1 }}>
            <div style={{ height: "100%", width: `${gst.hope ?? 25}%`, background: T.greenL, transition: "width .3s" }} />
          </div>
          {(gst.hope ?? 25) >= 50 && (
            <div className="type" style={{ color: T.greenL, fontSize: 10, marginTop: 6 }}>
              ✅ VITÓRIA COLETIVA possível (≥ 50)
            </div>
          )}
        </Card>

        <Card>
          <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 6 }}>💀 DESESPERANÇA GLOBAL</div>
          <div className="pixel" style={{ fontSize: 36, color: T.red, lineHeight: 1 }}>{gst.despair ?? 0}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
            <Btn variant="dark"   onClick={() => adjDespair(-5)} style={{ padding: "4px 10px" }}>−5</Btn>
            <Btn variant="dark"   onClick={() => adjDespair(-1)} style={{ padding: "4px 10px" }}>−1</Btn>
            <Btn variant="danger" onClick={() => adjDespair(+1)} style={{ padding: "4px 10px" }}>+1</Btn>
            <Btn variant="danger" onClick={() => adjDespair(+5)} style={{ padding: "4px 10px" }}>+5</Btn>
          </div>
          <div style={{ marginTop: 8, background: T.s4, height: 6, borderRadius: 1 }}>
            <div style={{ height: "100%", width: `${gst.despair ?? 0}%`, background: T.red, transition: "width .3s" }} />
          </div>
          {(gst.despair ?? 0) >= 50 && (
            <div className="type" style={{ color: T.red, fontSize: 10, marginTop: 6 }}>
              ⚠ DERROTA COLETIVA iminente (≥ 50)
            </div>
          )}
        </Card>

        <Card>
          <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 6 }}>📅 RODADA ATUAL</div>
          <div className="pixel" style={{ fontSize: 36, color: T.yellow, lineHeight: 1 }}>R{gst.round ?? 1}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <Btn variant="dark"   onClick={() => adjRound(-1)} style={{ padding: "4px 10px" }}>−</Btn>
            <Btn variant="yellow" onClick={() => adjRound(+1)} style={{ padding: "4px 10px" }}>AVANÇAR →</Btn>
          </div>
          <div className="type" style={{ color: T.dim, fontSize: 10, marginTop: 8 }}>
            Vitória: ☀️≥50 ou segredo descoberto<br />
            Derrota: 💀≥50 ou 1 sobrevivente
          </div>
        </Card>
      </div>

      {/* ── MOTIVOS ────────────────────────────────────────────────── */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <SectionTitle icon="🎲">Rolagem de Motivo (d8)</SectionTitle>
          <div style={{ display: "flex", gap: 8 }}>
            {diceResult && (
              <Btn variant="dark" onClick={() => { setDiceResult(null); setGlobalState(g => ({ ...safeGst(g), activeMotivo: null })); }}
                style={{ fontSize: 10 }}>
                ✕ Limpar
              </Btn>
            )}
            <Btn onClick={rollMotivo}>🎲 ROLAR MOTIVO</Btn>
          </div>
        </div>

        {diceResult && (
          <div className="slide" style={{ marginBottom: 14, background: "#150810", border: `1px solid ${T.red}`, padding: "12px 16px", textAlign: "center" }}>
            <div className="pixel" style={{ fontSize: 56, color: T.red, lineHeight: 1 }}>{diceResult}</div>
            <div className="title" style={{ color: T.white, fontSize: 20, marginTop: 4, letterSpacing: 2 }}>
              {MOTIVOS.find(m => m.d === diceResult)?.nome}
            </div>
            <div className="type" style={{ color: T.muted, fontSize: 12, marginTop: 6, maxWidth: 400, margin: "6px auto 0" }}>
              {MOTIVOS.find(m => m.d === diceResult)?.desc}
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {MOTIVOS.map(m => {
            const isActive = diceResult === m.d || gst.activeMotivo === m.d;
            const isUsed   = used.includes(m.d);
            return (
              <div key={m.d}
                style={{
                  background:  isActive ? "#1a0808" : isUsed ? T.s3 : T.s2,
                  border:      `1px solid ${isActive ? T.red : T.bd}`,
                  borderLeft:  `3px solid ${isActive ? T.red : isUsed ? T.dim : T.bd2}`,
                  padding:     "10px 14px",
                  cursor:      "pointer",
                  opacity:     isUsed ? 0.5 : 1,
                  transition:  "all .15s",
                }}
                onClick={() => toggleUsed(m.d)}
                title="Clique para marcar/desmarcar como usado"
              >
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span className="pixel" style={{ color: T.red, fontSize: 20, flexShrink: 0, minWidth: 22 }}>{m.d}</span>
                  <div style={{ flex: 1 }}>
                    <div className="type" style={{ color: isActive ? T.white : T.muted, fontWeight: 700, fontSize: 12, marginBottom: 2 }}>
                      {m.nome}
                    </div>
                    <div className="type" style={{ color: T.dim, fontSize: 11, lineHeight: 1.6 }}>{m.desc}</div>
                  </div>
                  {isUsed   && <span className="type" style={{ marginLeft: "auto", color: T.dim,    fontSize: 10, flexShrink: 0 }}>✓ usado</span>}
                  {isActive && <span className="type" style={{ marginLeft: "auto", color: T.yellow, fontSize: 10, flexShrink: 0 }}>◀ ATIVO</span>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="type" style={{ color: T.dim, fontSize: 10, marginTop: 10 }}>
          Clique em um motivo para marcar como já utilizado na campanha.
        </div>
      </Card>

      {/* ── ANÚNCIOS ───────────────────────────────────────────────── */}
      <Card>
        <SectionTitle icon="📢">Anúncios de Monokuma</SectionTitle>
        <div className="type" style={{ color: T.dim, fontSize: 10, marginBottom: 10 }}>
          Clique para selecionar e ler em voz alta para os jogadores.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ANUNCIOS.map((a, i) => (
            <div key={i}
              onClick={() => setActiveAnuncio(activeAnuncio === i ? null : i)}
              style={{
                background:  activeAnuncio === i ? "#1a0808" : T.s3,
                border:      `1px solid ${activeAnuncio === i ? T.red : T.bd}`,
                borderLeft:  `3px solid ${activeAnuncio === i ? T.red : T.bd2}`,
                padding:     "10px 14px",
                cursor:      "pointer",
                transition:  "all .15s",
              }}
            >
              <div className="type" style={{ color: activeAnuncio === i ? T.white : T.muted, fontSize: 12, lineHeight: 1.7 }}>
                "{a}"
              </div>
              {activeAnuncio === i && (
                <div style={{ marginTop: 8, color: T.yellow, fontSize: 10, fontFamily: "Courier Prime" }}>
                  ▶ Leia em voz alta com a voz de Monokuma. Clique novamente para desmarcar.
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
