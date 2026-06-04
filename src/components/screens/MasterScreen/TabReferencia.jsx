import { T } from "../../../constants/theme";
import { Card, SectionTitle } from "../../ui";
import { useState } from "react";

const TABLES = [
  {
    id: "testes", icon: "🎲", title: "Números Alvo (NA)",
    rows: [
      ["Fácil",           "10", "Notar algo óbvio, mentira simples"],
      ["Médio",           "15", "Encontrar pista escondida"],
      ["Difícil",         "20", "Investigar cena apagada"],
      ["Supremo",         "25", "Dedução brilhante"],
      ["Quase Impossível","30", "Façanha lendária"],
    ],
    headers: ["Dificuldade", "NA", "Exemplo"],
  },
  {
    id: "resultados", icon: "📊", title: "Resultados de Teste",
    rows: [
      ["≥ NA + 5", "Sucesso Crítico — bônus narrativo"],
      ["≥ NA",     "Sucesso"],
      ["NA−1/2",   "Sucesso Parcial — com custo"],
      ["< NA−2",   "Falha"],
      ["1 natural","Falha Catastrófica"],
    ],
    headers: ["Total", "Efeito"],
  },
  {
    id: "cobertura", icon: "🩸", title: "Ações de Cobertura (máx 3)",
    rows: [
      ["Apagar Rastros",  "FUR NA 18", "Remove 1 Pista Física"],
      ["Pista Falsa",     "INT NA 20", "Adiciona 1 Pista Enganosa"],
      ["Forjar Álibi",    "PER NA 18", "Cria testemunho com NPC"],
      ["Esconder Arma",   "FUR NA 15", "Arma não aparece na investigação inicial"],
      ["Mover o Corpo",   "RES NA 15", "Corpo em local diferente do crime"],
    ],
    headers: ["Ação", "Teste", "Efeito"],
  },
  {
    id: "tribunal", icon: "⚖️", title: "Resultados do Tribunal",
    rows: [
      ["Maioria correta",  "Assassino executado. +3 Esperança"],
      ["Maioria errada",   "Inocente executado! −5 Esperança"],
      ["Empate",           "Monokuma escolhe aleatório"],
      ["Maioria 👎",       "Ninguém executado. −2 Esperança"],
    ],
    headers: ["Cenário", "Resultado"],
  },
  {
    id: "monocoins", icon: "🪙", title: "Bônus Monocoins (Tribunal)",
    rows: [
      ["Acusação Final correta",        "+5"],
      ["Destruiu 3+ Declarações",       "+3"],
      ["Mentiu por 2+ rodadas (assassino)", "+3"],
      ["Descobriu a Pista Decisiva",    "+4"],
      ["Não perdeu nenhuma Bala",       "+2"],
      ["Mudou o rumo com 1 argumento",  "+2"],
    ],
    headers: ["Conquista", "MC"],
  },
  {
    id: "investigacao", icon: "🔍", title: "Resultado da Investigação",
    rows: [
      ["Falha",           "Nenhuma pista ou pista falsa"],
      ["Sucesso Parcial", "1 pista menor (ambígua)"],
      ["Sucesso",         "1–2 pistas relevantes"],
      ["Sucesso Crítico", "2–3 pistas + pista oculta"],
    ],
    headers: ["Teste INT", "Pistas"],
  },
];

export function TabReferencia() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="slide">
      <SectionTitle icon="📖">Tabelas de Referência Rápida</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {TABLES.map(t => (
          <Card key={t.id} style={{ cursor: "pointer" }} onClick={() => setOpenId(openId === t.id ? null : t.id)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: openId === t.id ? 10 : 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                <span className="title" style={{ color: T.yellow, fontSize: 13, letterSpacing: 1 }}>{t.title}</span>
              </div>
              <span style={{ color: T.dim, fontSize: 14 }}>{openId === t.id ? "▲" : "▼"}</span>
            </div>
            {openId === t.id && (
              <div className="slide" style={{ overflowX: "auto" }}>
                <table>
                  <thead>
                    <tr>{t.headers.map(h => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {t.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="type" style={{ color: j === 0 ? T.white : T.muted, fontWeight: j === 0 ? 700 : 400, fontSize: 11 }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Dice Roller */}
      <Card style={{ marginTop: 12 }}>
        <DiceRoller />
      </Card>
    </div>
  );
}

function DiceRoller() {
  const [attr, setAttr] = useState(10);
  const [result, setResult] = useState(null);

  const roll = () => {
    const r = Math.floor(Math.random() * 20) + 1;
    setResult({ roll: r, total: r + attr });
  };

  return (
    <div>
      <SectionTitle icon="🎲">Rolagem Rápida</SectionTitle>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
        <div>
          <div className="type" style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>ATRIBUTO</div>
          <input type="number" min={1} max={20} value={attr} onChange={e => setAttr(+e.target.value)}
            style={{ width: 80, textAlign: "center" }} />
        </div>
        <button onClick={roll} style={{
          background: T.red, color: T.white, border: "none", padding: "9px 20px",
          fontFamily: "Courier Prime", fontSize: 12, letterSpacing: 1, cursor: "pointer",
        }}>ROLAR 1d20</button>
        {result && (
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div className="type" style={{ fontSize: 10, color: T.muted }}>DADO</div>
              <div className="pixel" style={{
                fontSize: 36, lineHeight: 1,
                color: result.roll === 20 ? T.yellow : result.roll === 1 ? T.red : T.white,
              }}>{result.roll}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="type" style={{ fontSize: 10, color: T.muted }}>TOTAL</div>
              <div className="pixel" style={{ fontSize: 36, lineHeight: 1, color: T.yellow }}>{result.total}</div>
            </div>
            {result.roll === 20 && <span style={{ color: T.yellow, fontSize: 12 }}>★ CRÍTICO!</span>}
            {result.roll === 1  && <span style={{ color: T.red,    fontSize: 12 }}>💀 CATASTRÓFICO!</span>}
          </div>
        )}
      </div>
    </div>
  );
}
