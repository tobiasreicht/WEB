import React from "react";
import Button from "./components/button";
import Card from "./components/Card";
import List from "./components/List";
import Counter from "./components/Counter";
import Light from "./components/Light";
import Todo from "./components/todo";
import Person from "./components/Person";
import TodoCard from "./components/TodoCard";
import { demoTodos } from "./testdata";
import FilterTodo from "./components/FilterTodo";

export default function App() {
  return (
    <div className=" p-4 space-y-4">
      {/* <Button title="button1" onPress={()=> {
        alert('Button clicked‼️');
      }}/>
      <Button title="button2" onPress={()=> {
        alert('Button clicked‼️');
      }}/>

      <Card name="jan" title="Jan von Keckeis" bio="jan ist ein sehr zahmhafter mensch" />

      <List title="tolle liste" items={["kästchen", "noch mehr kästchen", "noch viel mehr kästchen😏"]}/>
      <Counter />
      <Light />
      <Todo /> 
      <Person  /> */}
      <FilterTodo initialTodos={demoTodos} />
    </div>
  );
}
