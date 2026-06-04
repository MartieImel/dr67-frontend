import { T } from "../../constants/theme";

export const Divider = ({ color = T.bd2, my = 12 }) => (
  <div style={{ borderTop: `1px solid ${color}`, margin: `${my}px 0` }} />
);

export const Badge = ({ children, bg = T.redD, color = T.white, style = {} }) => (
  <span
    className="type"
    style={{
      background: bg, color,
      fontSize: 9, letterSpacing: 1.5,
      textTransform: "uppercase",
      padding: "2px 7px", borderRadius: 1,
      ...style,
    }}
  >
    {children}
  </span>
);

export const Btn = ({ children, onClick, variant = "solid", style = {}, disabled = false }) => {
  const vs = {
    solid:  { background: T.red,  color: T.white, border: "none", padding: "9px 20px", fontWeight: 700, letterSpacing: 1 },
    ghost:  { background: "transparent", color: T.red, border: `1px solid ${T.red}`, padding: "8px 18px", letterSpacing: 1 },
    yellow: { background: T.yellow, color: "#080808", border: "none", padding: "9px 20px", fontWeight: 700, letterSpacing: 1 },
    dark:   { background: T.s3, color: T.muted, border: `1px solid ${T.bd}`, padding: "7px 16px", letterSpacing: 1 },
    danger: { background: "#500a14", color: "#ff6680", border: `1px solid #800020`, padding: "8px 18px", letterSpacing: 1 },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...vs[variant],
        fontSize: 12, borderRadius: 1,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export const StatBar = ({ label, cur, max, color, onPlus, onMinus }) => {
  const pct = Math.max(0, Math.min(100, (cur / max) * 100));
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span className="type" style={{ fontSize: 10, color: T.muted, letterSpacing: 1, textTransform: "uppercase" }}>
          {label}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {onMinus && (
            <button onClick={onMinus} style={{ background: T.s4, border: "none", color: T.white, width: 20, height: 20, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: 1 }}>−</button>
          )}
          <span className="pixel" style={{ color, fontSize: 22, lineHeight: 1 }}>
            {cur}<span style={{ color: T.muted, fontSize: 14 }}>/{max}</span>
          </span>
          {onPlus && (
            <button onClick={onPlus} style={{ background: T.s4, border: "none", color: T.white, width: 20, height: 20, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: 1 }}>+</button>
          )}
        </div>
      </div>
      <div style={{ background: T.s4, height: 6, borderRadius: 1, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, transition: "width .4s ease", borderRadius: 1 }} />
      </div>
    </div>
  );
};

export const Card = ({ children, style = {} }) => (
  <div style={{ background: T.s2, border: `1px solid ${T.bd}`, borderRadius: 2, padding: "14px 16px", ...style }}>
    {children}
  </div>
);

export const SectionTitle = ({ children, icon = "", color = T.red }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
    {icon && <span style={{ fontSize: 16 }}>{icon}</span>}
    <span className="title" style={{ color, fontSize: 14, letterSpacing: 2 }}>{children}</span>
    <div style={{ flex: 1, borderTop: `1px solid ${T.bd}`, marginLeft: 6 }} />
  </div>
);
