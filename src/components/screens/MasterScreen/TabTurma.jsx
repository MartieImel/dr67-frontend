import { useState } from "react";
import { T, ROLE_BADGE, STATUS_COLOR } from "../../../constants/theme";
import { CHARS } from "../../../constants/chars";
import { derive } from "../../../lib/utils";
import { Badge } from "../../ui";

const IMG_EXT = "jpeg";

function RowThumb({ char }) {
  const [err, setErr] = useState(false);
  const src = `img/${String(char.id).padStart(2, "0")}.${IMG_EXT}`;
  return (
    <div style={{ width: 32, height: 40, overflow: "hidden", background: T.s4, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", verticalAlign: "middle" }}>
      {!err
        ? <img src={src} alt={char.name} onError={() => setErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : <span className="pixel" style={{ color: T.red, fontSize: 12 }}>{char.num}</span>
      }
    </div>
  );
}

export function TabTurma({ charStatuses, setCharStatuses, onSelectChar }) {
  return (
    <div className="slide">
      <table>
        <thead>
          <tr>
            <th>#</th><th>Nome & Talento</th><th>Tipo</th>
            <th>PV Max</th><th>PS Max</th><th>Init</th>
            <th>Status</th><th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {CHARS.map(c => {
            const d2 = derive(c.attrs);
            const st = charStatuses[c.id] || "vivo";
            const sc = STATUS_COLOR[st];
            const rb = ROLE_BADGE.player;
            return (
              <tr key={c.id} style={{ cursor: "pointer" }} onClick={() => onSelectChar(c)}>
                <td>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <RowThumb char={c} />
                    <span className="pixel" style={{ color: T.red, fontSize: 18 }}>{c.num}</span>
                  </div>
                </td>
                <td>
                  <div className="type" style={{ color: T.white, fontWeight: 700, fontSize: 12 }}>{c.name}</div>
                  <div className="type" style={{ color: T.dim, fontSize: 10 }}>{c.talent}</div>
                </td>
                <td><Badge bg={rb.bg} color={rb.text}>{rb.label}</Badge></td>
                <td className="pixel" style={{ color: T.greenL, fontSize: 18 }}>{d2.pvMax}</td>
                <td className="pixel" style={{ color: T.blue,   fontSize: 18 }}>{d2.psMax}</td>
                <td className="pixel" style={{ color: T.yellow, fontSize: 18 }}>{d2.init}</td>
                <td>
                  <span style={{ color: sc, fontSize: 12, fontFamily: "Courier Prime" }}>
                    ● {st.charAt(0).toUpperCase() + st.slice(1)}
                  </span>
                </td>
                <td onClick={e => e.stopPropagation()}>
                  <select value={st} onChange={e => setCharStatuses(p => ({ ...p, [c.id]: e.target.value }))}
                    style={{ fontSize: 10, padding: "3px 6px", width: "auto" }}>
                    <option value="vivo">🟢 Vivo</option>
                    <option value="ferido">🟡 Ferido</option>
                    <option value="morto">💀 Morto</option>
                    <option value="executado">⚡ Executado</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: 10, fontSize: 10, color: T.dim, fontFamily: "Courier Prime" }}>
        💡 Clique em qualquer linha para ver detalhes completos do personagem
      </div>
    </div>
  );
}
