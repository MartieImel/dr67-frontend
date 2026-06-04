import { useState, useEffect } from "react";
import { T } from "../../constants/theme";

// ── Character file loading transition ──────────────────────────────
export function CharTransitionScreen({ char, onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 700);
    const t3 = setTimeout(() => setPhase(3), 1700);
    const t4 = setTimeout(() => onComplete(), 2100);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000, background: "#04040e",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: phase === 3 ? 0 : 1,
      transition: phase === 3 ? "opacity .4s ease" : "none",
      overflow: "hidden",
    }}>
      <div className="static-bg" style={{ position: "absolute", inset: 0, opacity: .04 }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.015) 3px,rgba(255,255,255,.015) 4px)",
      }} />
      <div style={{
        position: "absolute", left: 0, right: 0, height: 2,
        background: "rgba(196,30,58,.4)", top: 0,
        animation: "scanSweep 1s linear infinite",
      }} />

      <div style={{ textAlign: "center", position: "relative" }}>
        <div className="type" style={{
          color: "#c41e3a80", fontSize: 10, letterSpacing: 4,
          marginBottom: 16, opacity: phase >= 1 ? 1 : 0, transition: "opacity .3s",
        }}>
          ▸ ACESSO AUTORIZADO — FICHA DO ESTUDANTE ◂
        </div>
        <div className="pixel" style={{
          fontSize: 120, lineHeight: 1, color: T.white,
          textShadow: `0 0 30px ${T.red}80,0 0 60px ${T.red}40`,
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(40px)",
          transition: "all .45s cubic-bezier(.22,1,.36,1)",
          letterSpacing: 8,
        }}>
          {char.num}
        </div>
        <div style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(20px)",
          transition: "all .4s ease .1s",
          marginTop: 8,
        }}>
          <div className="title" style={{ fontSize: 32, color: T.white, letterSpacing: 4, textShadow: "0 0 20px rgba(255,255,255,.2)" }}>
            {char.name}
          </div>
          <div className="type" style={{ color: T.muted, fontSize: 11, marginTop: 4, letterSpacing: 1 }}>
            {char.talent}
          </div>
        </div>
        {phase >= 2 && (
          <div style={{
            marginTop: 24, width: 280, height: 2, background: T.s4,
            borderRadius: 1, overflow: "hidden", margin: "24px auto 0",
          }}>
            <div style={{
              height: "100%", background: T.red, width: "100%",
              animation: "typewriter .9s linear forwards",
              transformOrigin: "left",
            }} />
          </div>
        )}
      </div>

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,.8) 100%)",
      }} />
    </div>
  );
}

// ── Master panel transition ─────────────────────────────────────────
export function MasterTransitionScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 150);
    const t2 = setTimeout(() => setPhase(2), 600);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => onComplete(), 2200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000, background: "#08000f",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: phase === 3 ? 0 : 1, transition: phase === 3 ? "opacity .4s" : "none",
      overflow: "hidden",
    }}>
      <div className="static-bg" style={{ position: "absolute", inset: 0, opacity: .06 }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.015) 3px,rgba(255,255,255,.015) 4px)",
      }} />

      <div style={{ textAlign: "center", position: "relative" }}>
        <div className="type" style={{
          color: "#c41e3a80", fontSize: 10, letterSpacing: 4, marginBottom: 20,
          opacity: phase >= 1 ? 1 : 0, transition: "opacity .3s",
        }}>
          ▸ ACESSO RESTRITO — NÍVEL MESTRE ◂
        </div>
        <div className="pixel" style={{
          fontSize: 70, color: "#c41e3a", lineHeight: 1, letterSpacing: 4,
          textShadow: "0 0 30px #c41e3a80",
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "scale(1)" : "scale(.7)",
          transition: "all .5s cubic-bezier(.22,1,.36,1)",
        }}>
          ⚠ CLASSIFICADO
        </div>
        {phase >= 2 && (
          <div style={{ marginTop: 12, opacity: 1, animation: "slideUp .4s ease" }}>
            <div className="title" style={{ fontSize: 28, color: T.white, letterSpacing: 4 }}>PAINEL DO MESTRE</div>
            <div className="type" style={{ color: T.muted, fontSize: 11, marginTop: 4 }}>TURMA 67 — INFORMAÇÕES CONFIDENCIAIS</div>
          </div>
        )}
        {phase >= 2 && (
          <div style={{
            marginTop: 20, width: 240, height: 2, background: "#2a0a14",
            overflow: "hidden", margin: "20px auto 0",
          }}>
            <div style={{ height: "100%", background: T.red, width: "100%", animation: "typewriter .8s linear forwards" }} />
          </div>
        )}
      </div>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,.85) 100%)",
      }} />
    </div>
  );
}
