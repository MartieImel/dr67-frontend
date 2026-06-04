import { useState, useEffect } from "react";
import { injectStyles }               from "./lib/styles";
import { loadServerState }            from "./lib/server";
import { BootScreen }                 from "./components/transitions/BootScreen";
import { CharTransitionScreen, MasterTransitionScreen } from "./components/transitions/index";
import { LoginScreen }                from "./components/screens/LoginScreen";
import { RulesScreen }                from "./components/screens/RulesScreen";
import { CharacterScreen }            from "./components/screens/CharacterScreen/index";
import { MasterScreen }               from "./components/screens/MasterScreen/index";

// Inject global styles once at module load time
injectStyles();

// View names
const V = { BOOT: "boot", LOGIN: "login", RULES: "rules", CHAR_TRANS: "char_trans", CHAR: "char", MASTER_TRANS: "master_trans", MASTER: "master" };

export default function App() {
  const [view, setView]       = useState(V.BOOT);
  const [charTarget, setCharTarget] = useState(null); // char pending transition
  const [activeChar, setActiveChar] = useState(null); // char currently shown

  // Pre-fetch server state during boot
  useEffect(() => { loadServerState(); }, []);

  const handleLogin = (type, data) => {
    if (type === "rules")     { setView(V.RULES); return; }
    if (type === "character") { setCharTarget(data); setView(V.CHAR_TRANS); return; }
    if (type === "master")    { setView(V.MASTER_TRANS); return; }
  };

  return (
    <>
      {/* Persistent CRT scanline overlay */}
      <div className="scanline-overlay" />

      {/* ── Boot ── */}
      {view === V.BOOT && (
        <BootScreen onComplete={() => setView(V.LOGIN)} />
      )}

      {/* ── Login ── */}
      {view === V.LOGIN && (
        <LoginScreen onLogin={handleLogin} />
      )}

      {/* ── Rules (no transition) ── */}
      {view === V.RULES && (
        <RulesScreen onBack={() => setView(V.LOGIN)} />
      )}

      {/* ── Character transition ── */}
      {view === V.CHAR_TRANS && charTarget && (
        <CharTransitionScreen
          char={charTarget}
          onComplete={() => { setActiveChar(charTarget); setView(V.CHAR); }}
        />
      )}

      {/* ── Character screen ── */}
      {view === V.CHAR && activeChar && (
        <CharacterScreen
          char={activeChar}
          onBack={() => { setActiveChar(null); setView(V.LOGIN); }}
        />
      )}

      {/* ── Master transition ── */}
      {view === V.MASTER_TRANS && (
        <MasterTransitionScreen onComplete={() => setView(V.MASTER)} />
      )}

      {/* ── Master screen ── */}
      {view === V.MASTER && (
        <MasterScreen onBack={() => setView(V.LOGIN)} />
      )}
    </>
  );
}
