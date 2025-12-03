import React from "react";
import Button from "./components/button";
import Card from "./components/Card";
import List from "./components/List";

export default function App() {
  return (
    <div className="w-full h-full p-4 space-y-4">
      <Button title="button1" />
      <Button title="button2" />

      <Card name="jan" title="Jan von Keckeis" bio="jan ist ein sehr zahmhafter mensch" />

      <List title="tolle liste" items={["kästchen", "noch mehr kästchen", "noch viel mehr kästchen😏"]}/>
    </div>
  );
}
