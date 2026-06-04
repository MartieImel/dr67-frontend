import { T } from "../../../constants/theme";
import { PERSIST_KEYS } from "../../../constants/chars";
import { Card, SectionTitle } from "../../ui";
import { usePersist } from "../../../hooks/usePersist";

export function TabNotas({ char }) {
  const [notes, setNotes] = usePersist(PERSIST_KEYS.charNotes(char.id), "");

  return (
    <div className="slide">
      <Card>
        <SectionTitle icon="📝">Notas da Sessão</SectionTitle>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          style={{ width: "100%", minHeight: 340, resize: "vertical", fontSize: 13, lineHeight: 1.8 }}
          placeholder="Anotações livres sobre a sessão, teorias, pistas a investigar..."
        />
      </Card>
    </div>
  );
}
