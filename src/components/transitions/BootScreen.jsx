import { useState, useEffect } from "react";
import { T } from "../../constants/theme";

export function BootScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => setPhase(3), 1900);
    const t4 = setTimeout(() => setPhase(4), 3800);
    const t5 = setTimeout(() => onComplete(), 4300);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lines = [
    "INICIANDO SISTEMA DE GESTÃO DISCENTE",
    "HOPE'S PEAK ACADEMY — DIVISÃO DE TRIAGEM",
    "TURMA 67 — VERIFICAÇÃO DE IDENTIDADE",
    "CARREGANDO BANCO DE DADOS DE ESTUDANTES...",
    "ACESSO LIBERADO ▮",
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000, background: "#000",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      opacity: phase === 4 ? 0 : 1,
      transition: phase === 4 ? "opacity .5s ease" : "none",
    }}>
      {phase === 1 && (
        <div className="static-bg" style={{ position: "absolute", inset: 0, opacity: .8, background: "#0a0a0a" }} />
      )}
      {phase >= 2 && (
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, #001a0080 0%, transparent 70%)",
        }} />
      )}
      {phase >= 2 && (
        <div
          className={phase === 2 ? "crt-screen" : "screen-on"}
          style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            filter: phase === 2 ? "blur(4px) brightness(3)" : "brightness(1)",
            transition: "filter .6s ease",
          }}
        >
          <div style={{
            position: "absolute", left: 0, right: 0, height: 3,
            background: "rgba(180,255,180,.15)",
            top: 0, animation: "scanSweep 2s linear infinite",
          }} />
          {phase >= 3 && (
            <div style={{ textAlign: "center", position: "relative" }}>
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "inline-block", border: "2px solid #00ff4133", padding: "6px 24px", marginBottom: 8 }}>
                  <div className="title" style={{ fontSize: 42, color: "#00ff66", letterSpacing: 8, textShadow: "0 0 20px #00ff6680,0 0 40px #00ff6640" }}>
                    HOPE'S PEAK
                  </div>
                </div>
                <div className="pixel" style={{ color: "#00cc44", fontSize: 20, letterSpacing: 4, textShadow: "0 0 10px #00cc44" }}>
                  ACADEMY — SISTEMA INTERNO v2.67
                </div>
              </div>
              <div style={{ textAlign: "left", width: 380, maxWidth: "90vw" }}>
                {lines.map((ln, i) => (
                  <div key={i} className="pixel"
                    style={{
                      color: i === lines.length - 1 ? "#00ff66" : "#008822",
                      fontSize: 15, lineHeight: 1.9, letterSpacing: 1,
                      opacity: phase === 3 ? 1 : 0,
                      transition: `opacity .15s ease ${i * 0.18}s`,
                      textShadow: i === lines.length - 1 ? "0 0 10px #00ff66" : "none",
                    }}
                  >
                    {i === lines.length - 1 ? "" : "▸ "}{ln}
                  </div>
                ))}
              </div>
              <div className="pixel" style={{
                marginTop: 28, color: "#ff003355", fontSize: 13, letterSpacing: 2,
                animation: "flicker 1.2s infinite",
              }}>
                UpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUpUp
              </div>
            </div>
          )}
        </div>
      )}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(0,0,0,.7) 100%)",
      }} />
    </div>
  );
}
