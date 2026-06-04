import { useState } from "react";
import { T } from "../../../constants/theme";
import {
  CHARS, LOCKED_MEMORIES, LOCK_CODES, CHAR_PROMPTS, PERSIST_KEYS,
} from "../../../constants/chars";
import { Card, SectionTitle, Btn } from "../../ui";
import { usePersist } from "../../../hooks/usePersist";
import { useViewport } from "../../../hooks/useViewport";

const BOND_BENEFITS = [
  "Nenhum",
  "+1 em PER c/ esta pessoa",
  "1 favor por sessão",
  "+2 em testes para proteger",
  "Confiança Plena — pode compartilhar Segredo",
  "Vínculo Supremo — habilidade co-desenvolvida",
];

// Build the default bonds list for a given character
// All start at 0 except the pre-defined ones in char.bonds (matched by name)
function buildDefaultBonds(char) {
  return CHARS
    .filter(c => c.id !== char.id)
    .map(c => {
      const predefined = (char.bonds || []).find(
        b => b.name === c.name || b.name === c.name.split(" (")[0]
      );
      return { id: c.id, name: c.name, lvl: predefined ? (predefined.lvl ?? 0) : 0 };
    });
}

export function TabFicha({ char, d, memoriesUnlocked }) {
  const { isMobile } = useViewport();

  // ── Bonds ────────────────────────────────────────────────────────
  const [bondsRaw, setBonds] = usePersist(
    PERSIST_KEYS.charBonds(char.id),
    buildDefaultBonds(char)
  );
  // Migrate from old number-array format and guard null
  const bonds = (() => {
    if (!Array.isArray(bondsRaw)) return buildDefaultBonds(char);
    if (bondsRaw.length === 0) return buildDefaultBonds(char);
    if (typeof bondsRaw[0] === "number") {
      // Legacy: array of numbers, map back to objects
      return CHARS.filter(c => c.id !== char.id).map((c, i) => ({
        id: c.id, name: c.name, lvl: bondsRaw[i] ?? 0,
      }));
    }
    // Ensure all entries have the current names (in case new chars were added)
    return CHARS.filter(c => c.id !== char.id).map(c => {
      const saved = bondsRaw.find(b => b.id === c.id);
      return saved ? { ...saved, name: c.name } : { id: c.id, name: c.name, lvl: 0 };
    });
  })();

  const setBondLvl = (charId, lvl) => {
    setBonds(prev => {
      const safe = Array.isArray(prev) ? prev : buildDefaultBonds(char);
      return safe.map(b => b.id === charId ? { ...b, lvl } : b);
    });
  };

  // ── Locked memory ─────────────────────────────────────────────────
  const LOCK_CODE    = LOCK_CODES[char.id] || String(char.id).padStart(2, "0");
  const lockedMem    = LOCKED_MEMORIES[char.id];
  const [lockedUnlocked, setLockedUnlocked] = usePersist(PERSIST_KEYS.charLocked(char.id), false);
  const [lockCode,  setLockCode]  = useState("");
  const [lockErr,   setLockErr]   = useState("");
  const [showLockInput, setShowLockInput] = useState(false);

  // ── Mastermind memories ────────────────────────────────────────────
  const [memoriesUnlockedLocal, setMemoriesUnlockedLocal] = usePersist(
    PERSIST_KEYS.charMemories(char.id), false
  );
  const [showMemUnlock, setShowMemUnlock] = useState(false);
  const [memCode, setMemCode] = useState("");
  const [memErr,  setMemErr]  = useState("");
  const effectiveMemoriesUnlocked = memoriesUnlocked || memoriesUnlockedLocal;

  // ── Image ──────────────────────────────────────────────────────────
  // Default: public/img/01.jpeg … 16.jpeg  (altere IMG_EXT se necessário)
  const IMG_EXT = "jpeg"; // ← altere para "jpg", "png" ou "webp" se preferir
  const defaultImgPath = `img/${String(char.id).padStart(2, "0")}.${IMG_EXT}`;
  const [charImage] = usePersist(
    PERSIST_KEYS.charImage(char.id),
    char.image || defaultImgPath
  );
  const [imgError,       setImgError]       = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  // effectiveImage is null when the file doesn't exist (404 → onError)
  const effectiveImage = imgError ? null : charImage;

  return (
    <div className="slide">
      {/* ── Top row: portrait / identity / attributes ─────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "190px 1fr 1fr",
        gap: 14, marginBottom: 14,
      }}>
        {/* Portrait */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            onClick={() => effectiveImage && setShowImageModal(true)}
            style={{
              background: T.s3,
              border: `1px solid ${effectiveImage ? T.bd2 : T.bd}`,
              borderStyle: effectiveImage ? "solid" : "dashed",
              width: "100%", aspectRatio: "3/4",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              cursor: effectiveImage ? "pointer" : "default",
              overflow: "hidden", position: "relative",
            }}
          >
            {effectiveImage ? (
              <>
                <img
                  src={effectiveImage}
                  alt={char.name}
                  onError={() => setImgError(true)}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(transparent,rgba(0,0,0,.7))",
                  padding: "20px 8px 6px", display: "flex", justifyContent: "center",
                }}>
                  <span className="type" style={{ color: "rgba(255,255,255,.7)", fontSize: 9, letterSpacing: 1 }}>
                    CLIQUE PARA AMPLIAR
                  </span>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: 12 }}>
                <div style={{ fontSize: 32, marginBottom: 8, opacity: .4 }}>🖼</div>
                <div className="type" style={{ color: T.dim, fontSize: 10, lineHeight: 1.5 }}>
                  {char.num} — sem imagem
                </div>
                <div className="type" style={{ color: T.dim, fontSize: 9, marginTop: 4 }}>
                  Coloque em public/img/{String(char.id).padStart(2,"0")}.{IMG_EXT}
                </div>
              </div>
            )}
          </div>
          {/* Prompt button */}
          {CHAR_PROMPTS[char.id] && (
            <button
              onClick={() => {
                navigator.clipboard?.writeText(CHAR_PROMPTS[char.id]);
                alert("Prompt de imagem copiado! Cole no gerador de imagens.");
              }}
              style={{
                background: T.s3, border: `1px solid ${T.bd}`, color: T.muted,
                padding: "5px 8px", fontSize: 10, cursor: "pointer", letterSpacing: .5,
                fontFamily: "Courier Prime",
              }}
            >
              📋 Copiar prompt de imagem
            </button>
          )}
        </div>

        {/* Identity */}
        <Card>
          <SectionTitle icon="🎭">Identidade</SectionTitle>
          <div style={{ background: T.s3, padding: "10px 12px", borderLeft: `3px solid ${T.bd2}`, marginBottom: 10 }}>
            <div className="type" style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>APARÊNCIA</div>
            <div className="type" style={{ color: T.white, fontSize: 12, lineHeight: 1.7 }}>{char.appear}</div>
          </div>
          <div style={{ background: T.s3, padding: "10px 12px", borderLeft: `3px solid ${T.yellow}` }}>
            <div className="type" style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>MOTIVAÇÃO</div>
            <div className="type" style={{ color: T.white, fontSize: 12, lineHeight: 1.7 }}>
              {char.isMastermind && effectiveMemoriesUnlocked
                ? (char.motivation.split("[REAL]")[1]?.trim() || char.motivation)
                : char.motivation.split("\n[REAL]")[0].replace("[APARENTE]", "").trim()}
            </div>
          </div>
        </Card>

        {/* Attributes */}
        <Card>
          <SectionTitle icon="⚡">Atributos</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {Object.entries(char.attrs).map(([k, v]) => (
              <div key={k} style={{ background: T.s3, padding: "8px 10px", textAlign: "center", border: `1px solid ${T.bd}` }}>
                <div className="type" style={{ color: T.muted, fontSize: 9, letterSpacing: 1 }}>{k}</div>
                <div className="pixel" style={{ color: T.yellow, fontSize: 28, lineHeight: 1 }}>{v}</div>
              </div>
            ))}
          </div>
          <SectionTitle icon="📐">Derivados</SectionTitle>
          <table>
            <tbody>
              {[
                ["PV Máximo",       d.pvMax,   "RES×3+10"],
                ["PS Máximo",       d.psMax,   "ESP×3+10"],
                ["Iniciativa",      d.init,    "INT+SOR"],
                ["Defesa Passiva",  d.def,     "RES÷2"],
                ["Lim. Monocoins",  d.coinsMax,"SOR×5"],
              ].map(([l, v, f]) => (
                <tr key={l}>
                  <td className="type" style={{ color: T.white, fontSize: 12 }}>{l}</td>
                  <td className="pixel" style={{ color: T.yellow, fontSize: 20, textAlign: "right" }}>{v}</td>
                  <td className="type" style={{ color: T.dim, fontSize: 10, textAlign: "right" }}>↳ {f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Ability + Weakness ───────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Card style={{ borderLeft: `3px solid ${T.yellow}` }}>
          <SectionTitle icon="✨" color={T.yellow}>Habilidade Especial</SectionTitle>
          <div className="title" style={{ color: T.yellow, fontSize: 15, letterSpacing: 2, marginBottom: 6 }}>
            {char.isMastermind && effectiveMemoriesUnlocked
              ? char.abilityReal.name
              : char.ability.name}
          </div>
          <div className="type" style={{ color: T.muted, fontSize: 12, lineHeight: 1.7 }}>
            {char.isMastermind && effectiveMemoriesUnlocked
              ? char.abilityReal.desc
              : char.ability.desc}
          </div>
        </Card>
        <Card style={{ borderLeft: `3px solid ${T.red}` }}>
          <SectionTitle icon="⚠️" color={T.red}>Fraqueza do Talento</SectionTitle>
          <div className="type" style={{ color: T.muted, fontSize: 12, lineHeight: 1.7 }}>{char.weakness}</div>
        </Card>
      </div>

      {/* ── Bonds ───────────────────────────────────────────────────── */}
      <Card style={{ marginBottom: 14 }}>
        <SectionTitle icon="💛">Laços de Amizade</SectionTitle>
        <div style={{ marginBottom: 10, padding: "8px 12px", background: T.s3, fontSize: 10, color: T.dim }}>
          <span className="type">
            Nível 0: Desconhecidos | 1: Conhecidos (+1 PER) | 2: Amigos (1 favor/sessão) |
            3: Próximos (+2 p/ proteger) | 4: Confiança Plena | 5: Vínculo Supremo
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Personagem</th>
              <th>Nível</th>
              <th>Benefício Atual</th>
              <th style={{ textAlign: "right" }}>Ajustar</th>
            </tr>
          </thead>
          <tbody>
            {bonds.map(b => {
              const lvl = b.lvl ?? 0;
              return (
                <tr key={b.id}>
                  <td>
                    <div className="type" style={{ color: T.white, fontWeight: 700, fontSize: 12 }}>{b.name}</div>
                    <div className="type" style={{ color: T.dim, fontSize: 9 }}>
                      {CHARS.find(c => c.id === b.id)?.talent}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                      {[0, 1, 2, 3, 4, 5].map(n => (
                        <div key={n}
                          title={`Nível ${n}: ${BOND_BENEFITS[n]}`}
                          onClick={() => setBondLvl(b.id, n)}
                          style={{
                            width: 14, height: 14, borderRadius: "50%",
                            background: n <= lvl ? T.yellow : T.s4,
                            border: `1px solid ${n <= lvl ? T.yellowD : T.bd}`,
                            cursor: "pointer", transition: "all .1s",
                            boxShadow: n === lvl ? `0 0 6px ${T.yellow}60` : "none",
                          }}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="type" style={{ color: T.muted, fontSize: 11 }}>
                    {BOND_BENEFITS[lvl]}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: 4, justifyContent: "flex-end", alignItems: "center" }}>
                      <button
                        onClick={() => setBondLvl(b.id, Math.max(0, lvl - 1))}
                        style={{ background: T.s4, border: "none", color: T.white, padding: "2px 8px", cursor: "pointer", fontSize: 14 }}
                      >−</button>
                      <span className="pixel" style={{ color: T.yellow, fontSize: 20, minWidth: 22, textAlign: "center" }}>{lvl}</span>
                      <button
                        onClick={() => setBondLvl(b.id, Math.min(5, lvl + 1))}
                        style={{ background: T.s4, border: "none", color: T.white, padding: "2px 8px", cursor: "pointer", fontSize: 14 }}
                      >+</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* ── Locked Memory ───────────────────────────────────────────── */}
      {lockedMem && (
        <div style={{ marginBottom: 16 }}>
          {!lockedUnlocked && !showLockInput && (
            <Btn
              onClick={() => setShowLockInput(true)}
              style={{ background: "#1a1430", color: "#9070c8", border: "1px solid #4a3080", fontSize: 11 }}
            >
              🧠 INSERIR CÓDIGO DE RECUPERAÇÃO DE MEMÓRIA
            </Btn>
          )}
          {!lockedUnlocked && showLockInput && (
            <Card style={{ border: "1px solid #4a3080", background: "#0e0d20" }}>
              <div className="type" style={{ fontSize: 10, color: "#7060a0", marginBottom: 6 }}>
                Código de recuperação de memória (fornecido pelo Mestre):
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="password" value={lockCode}
                  onChange={e => setLockCode(e.target.value)}
                  onKeyDown={e => {
                    if (e.key !== "Enter") return;
                    if (lockCode.trim() === LOCK_CODE) {
                      setLockedUnlocked(true); setShowLockInput(false); setLockErr("");
                    } else setLockErr("Código inválido. Aguarde o momento certo.");
                  }}
                  placeholder="Código do Mestre..." style={{ flex: 1, letterSpacing: 4 }}
                />
                <Btn
                  onClick={() => {
                    if (lockCode.trim() === LOCK_CODE) {
                      setLockedUnlocked(true); setShowLockInput(false); setLockErr("");
                    } else setLockErr("Código inválido. Aguarde o momento certo.");
                  }}
                  style={{ background: "#1a1430", color: "#9070c8", border: "1px solid #4a3080", fontSize: 11 }}
                >
                  DESBLOQUEAR
                </Btn>
              </div>
              {lockErr && <div className="type" style={{ color: T.red, fontSize: 11, marginTop: 6 }}>⚠ {lockErr}</div>}
            </Card>
          )}
          {lockedUnlocked && (
            <div className="slide" style={{
              background: "#0e0d20", border: "1px solid #5040a0",
              borderTop: "3px solid #9070e0", padding: "20px",
              boxShadow: "0 0 30px #6040a015",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 22 }}>🔓</span>
                <div>
                  <div className="type" style={{ color: "#7060b0", fontSize: 9, letterSpacing: 2, marginBottom: 2 }}>MEMÓRIA RECUPERADA</div>
                  <div className="title" style={{ color: "#c0a8ff", fontSize: 18, letterSpacing: 3 }}>{lockedMem.title}</div>
                </div>
              </div>
              <div style={{ background: "#120f22", border: "1px solid #3a2a60", borderLeft: "3px solid #8060d0", padding: "14px 16px" }}>
                <div className="type" style={{ color: "#d0c0f8", fontSize: 13, lineHeight: 1.9, whiteSpace: "pre-line" }}>
                  {lockedMem.content}
                </div>
              </div>
              <div className="type" style={{ color: T.dim, fontSize: 10, marginTop: 10, textAlign: "right" }}>
                Esta memória foi suprimida antes da sua entrada na Academy.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Mastermind — memory unlock ───────────────────────────────── */}
      {char.isMastermind && !effectiveMemoriesUnlocked && (
        <div className="pulse" style={{
          marginTop: 8, background: "#0a0a14",
          border: "1px solid #2a1a2e", borderTop: "2px solid #44224e", padding: "20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 28 }}>🔒</div>
            <div>
              <div className="title" style={{ color: "#a060c0", fontSize: 16, letterSpacing: 3 }}>MEMÓRIAS SUPRIMIDAS</div>
              <div className="type" style={{ color: T.dim, fontSize: 11 }}>
                Há algo bloqueado. O Mestre pode liberar acesso com o código correto.
              </div>
            </div>
          </div>
          {!showMemUnlock ? (
            <Btn
              onClick={() => setShowMemUnlock(true)}
              style={{ background: "#2a1040", color: "#c090e0", border: "1px solid #6030a0", fontSize: 12 }}
            >
              🧠 RECUPERAR MEMÓRIAS
            </Btn>
          ) : (
            <div>
              <div className="type" style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>
                Código de recuperação (fornecido pelo Mestre):
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="password" value={memCode}
                  onChange={e => setMemCode(e.target.value)}
                  onKeyDown={e => {
                    if (e.key !== "Enter") return;
                    if (memCode.trim().toLowerCase() === LOCK_CODE.toLowerCase()) {
                      setMemoriesUnlockedLocal(true); setShowMemUnlock(false); setMemErr("");
                    } else setMemErr("Código inválido. Consulte o Mestre.");
                  }}
                  placeholder="Código secreto..." style={{ flex: 1, letterSpacing: 3 }}
                />
                <Btn
                  onClick={() => {
                    if (memCode.trim().toLowerCase() === LOCK_CODE.toLowerCase()) {
                      setMemoriesUnlockedLocal(true); setShowMemUnlock(false); setMemErr("");
                    } else setMemErr("Código inválido. Consulte o Mestre.");
                  }}
                  style={{ background: "#2a1040", color: "#c090e0", border: "1px solid #6030a0", fontSize: 12 }}
                >ATIVAR</Btn>
              </div>
              {memErr && <div className="type" style={{ color: T.red, fontSize: 11, marginTop: 6 }}>⚠ {memErr}</div>}
            </div>
          )}
        </div>
      )}

      {/* ── Mastermind revealed content ─────────────────────────────── */}
      {char.isMastermind && effectiveMemoriesUnlocked && (
        <div className="slide" style={{ marginTop: 16 }}>
          <div style={{
            background: "#150520", border: "1px solid #8030b0",
            borderTop: "3px solid #c060e0", padding: "18px 20px", marginBottom: 14,
            boxShadow: "0 0 30px #8030b020",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 24 }}>★</span>
              <div>
                <div className="type" style={{ color: "#c060e0", fontSize: 9, letterSpacing: 2, marginBottom: 2 }}>
                  MEMÓRIAS RECUPERADAS — IDENTIDADE REAL
                </div>
                <div className="title" style={{ color: "#e090ff", fontSize: 22, letterSpacing: 3 }}>
                  SUPREMA ARQUITETA DE DESESPERO
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "#1a0a28", padding: "10px 12px", borderLeft: "2px solid #c060e0" }}>
                <div className="type" style={{ color: "#9050c0", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>TALENTO REAL</div>
                <div className="type" style={{ color: "#e090ff", fontSize: 12, lineHeight: 1.6, fontWeight: 700 }}>
                  Suprema Arquiteta de Desespero. Este é seu terceiro Killing Game projetado.
                  Seu talento de Orientadora é uma capa criada para infiltração.
                </div>
              </div>
              <div style={{ background: "#1a0a28", padding: "10px 12px", borderLeft: "2px solid #f0b030" }}>
                <div className="type" style={{ color: "#c08020", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>MOTIVAÇÃO REAL</div>
                <div className="type" style={{ color: "#f0e0a0", fontSize: 12, lineHeight: 1.6 }}>
                  Coletar evidências sobre a Turma 66 para chantagear a organização e se libertar.
                  Você está começando a questionar tudo.
                </div>
              </div>
              <div style={{ background: "#1a0a28", padding: "10px 12px", borderLeft: "2px solid #30a0c0", gridColumn: "1/-1" }}>
                <div className="type" style={{ color: "#2080a0", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>
                  HABILIDADE OCULTA — ARQUITETA DO CAOS
                </div>
                <div className="type" style={{ color: "#80d0f0", fontSize: 12, lineHeight: 1.7 }}>
                  {char.abilityReal?.desc}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image modal */}
      {showImageModal && effectiveImage && (
        <div
          style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 12000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setShowImageModal(false)}
        >
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "90vh", textAlign: "center" }}>
            <img src={effectiveImage} alt={char.name}
              onError={() => setShowImageModal(false)}
              style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain", border: `4px solid ${T.red}` }} />
            <div style={{ marginTop: 12 }}>
              <Btn onClick={() => setShowImageModal(false)}>FECHAR</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
