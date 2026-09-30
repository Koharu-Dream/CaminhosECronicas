import { useState } from "react";
import BackButton from "../components/BackButton";
import NPCCard from "../components/NPCCard";
import NPCForm from "../components/NPCForm";
import initialNpcs from "../data/npcs.json";

export default function NPCs() {
  const [npcs, setNpcs] = useState(initialNpcs);

  function handleAdd(newNpc) {
    setNpcs([...npcs, { ...newNpc, id: Date.now() }]);
  }

  function handleRemove(id) {
    setNpcs(npcs.filter((npc) => npc.id !== id));
  }

  return (
    <main className="container">
      <BackButton href="/" />
      <h1>NPCs</h1>

      <NPCForm onAdd={handleAdd} />

      <h2>Lista de NPCs ({npcs.length})</h2>
      {npcs.length === 0 && <p>Nenhum NPC por aqui. Adicione o primeiro!</p>}

      <section className="cardList">
        {npcs.map((npc) => (
          <NPCCard
            key={npc.id}
            name={npc.name}
            race={npc.race}
            occupation={npc.occupation}
            location={npc.location}
            personality={npc.personality}
            notes={npc.notes}
            onRemove={() => handleRemove(npc.id)}
          />
        ))}
      </section>
    </main>
  );
}