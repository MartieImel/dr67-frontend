import { useState, useRef } from "react";
import { T, ROLE_BADGE } from "../../constants/theme";
import { CHARS, MASTER_PASSWORD } from "../../constants/chars";
import { Btn, Badge } from "../ui";

const IMG_EXT = "jpg"; // ← mesma extensão definida em TabFicha.jsx

function CharCardImg({ charId, num, name }) {
  const [err, setErr] = useState(false);
  const src = `img/${String(charId).padStart(2, "0")}.${IMG_EXT}`;
  return (
    <div style={{
      width: "100%", height: 130, marginBottom: 8,
      background: T.s3, border: `1px solid ${T.bd}`,
      overflow: "hidden", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {!err ? (
        <img
          src={src} alt={name}
          onError={() => setErr(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div className="pixel" style={{ fontSize: 36, color: T.dim }}>{num}</div>
      )}
    </div>
  );
}

export function LoginScreen({ onLogin }) {
  const [selected, setSelected] = useState(null);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const inputRef = useRef();

  const select = (id) => {
    setSelected(id);
    setErr("");
    setPw("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const attempt = () => {
    const inp = pw.trim().toLowerCase();
    if (selected === "master") {
      if (inp === MASTER_PASSWORD) { onLogin("master", null); }
      else setErr("Senha do Mestre incorreta. Upupu...");
    } else {
      const c = CHARS.find(x => x.id === selected);
      if (c && inp === c.pw) { onLogin("character", c); }
      else setErr("Senha incorreta. Tente novamente.");
    }
    setPw("");
  };

  const sel = selected && selected !== "master" ? CHARS.find(x => x.id === selected) : null;
  const rb = ROLE_BADGE.player;

  return (
    <div className="fade" style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 20px" }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ borderBottom: `2px solid ${T.red}`, paddingBottom: 4, marginBottom: 2 }}>
          <span className="title flicker" style={{ fontSize: 48, color: T.white, letterSpacing: 6 }}>DANGANRONPA</span>
        </div>
        <span className="title" style={{ fontSize: 18, color: T.red, letterSpacing: 4 }}>O JULGAMENTO SUPREMO</span>
        <br />
        <span className="type" style={{ fontSize: 11, color: T.muted, letterSpacing: 1 }}>— TURMA 67 —</span>
        <div style={{ marginTop: 12 }}>
          <span className="pixel" style={{ color: T.muted, fontSize: 14, fontStyle: "italic" }}>
            "Bem-vindos à Hope's Peak Academy. Aqui, vocês viverão, amarão, odiarão... e talvez matem uns aos outros. Upupupu!"
          </span>
        </div>
      </div>

      {/* QUICK ACCESS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <Btn variant="ghost" onClick={() => onLogin("rules", null)}>📖 Regras do Sistema</Btn>
        <Btn variant="danger" onClick={() => select("master")}>🔐 Acesso Mestre</Btn>
      </div>

      {/* CHARACTER GRID */}
      <div style={{ width: "100%", maxWidth: 860, marginBottom: 24 }}>
        <p className="type" style={{ textAlign: "center", color: T.muted, fontSize: 11, marginBottom: 14, letterSpacing: 1 }}>
          SELECIONE SEU PERSONAGEM PARA ACESSAR A FICHA
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 8 }}>
          {CHARS.map(c => {
            const isSelected = selected === c.id;
            return (
              <div key={c.id} onClick={() => select(c.id)} className="slide"
                style={{
                  background: isSelected ? T.s3 : T.s1,
                  border: `1px solid ${isSelected ? T.red : T.bd}`,
                  borderLeft: `3px solid ${isSelected ? T.red : T.bd2}`,
                  padding: "10px 12px", cursor: "pointer", transition: "all .2s",
                  boxShadow: isSelected ? `0 0 14px ${T.red}30` : "none",
                }}
              >
                <CharCardImg charId={c.id} num={c.num} name={c.name} />
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                  <span className="pixel" style={{ color: T.red, fontSize: 20, lineHeight: 1 }}>{c.num}</span>
                  <Badge bg={rb.bg} color={rb.text}>{rb.label}</Badge>
                </div>
                <div className="type" style={{ color: T.white, fontSize: 13, fontWeight: 700, marginBottom: 2, lineHeight: 1.3 }}>{c.name}</div>
                <div className="type" style={{ color: T.muted, fontSize: 10, lineHeight: 1.4 }}>{c.talent}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PASSWORD MODAL */}
      {selected && (
        <div className="slide" style={{
          background: T.s2, border: `1px solid ${T.red}`, borderTop: `3px solid ${T.red}`,
          padding: "22px 28px", width: "100%", maxWidth: 400,
          boxShadow: `0 8px 40px ${T.red}20`,
        }}>
          {selected === "master" ? (
            <>
              <div className="title" style={{ color: T.red, fontSize: 20, letterSpacing: 3, marginBottom: 4 }}>🔐 ACESSO MESTRE</div>
              <div className="type" style={{ color: T.muted, fontSize: 11, marginBottom: 16 }}>Documento Confidencial — Uso Exclusivo do Mestre</div>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span className="pixel" style={{ color: T.red, fontSize: 24 }}>{sel?.num}</span>
              <div>
                <div className="type" style={{ color: T.white, fontWeight: 700, fontSize: 14 }}>{sel?.name}</div>
                <div className="type" style={{ color: T.muted, fontSize: 10 }}>{sel?.talent}</div>
              </div>
            </div>
          )}
          <input
            ref={inputRef}
            type="password"
            placeholder="Digite a senha..."
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && attempt()}
            style={{ width: "100%", marginBottom: 10, fontSize: 14, letterSpacing: 2 }}
          />
          {err && <div className="type" style={{ color: T.red, fontSize: 11, marginBottom: 8 }}>⚠ {err}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={attempt}>ENTRAR</Btn>
            <Btn variant="dark" onClick={() => { setSelected(null); setErr(""); setPw(""); }}>CANCELAR</Btn>
          </div>
        </div>
      )}
    </div>
  );
}
