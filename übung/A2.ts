import { log } from "console";

const numbers = [1, 2, 3, 4];

const doublednumbers = numbers.map(n => n*2);

console.log(doublednumbers);

const names: string[] = ["jan", "Luca", "Simon"];

const nameslenghts: number[] = names.map(n => n.length);

console.log(names);
console.log(nameslenghts);


const four = numbers.find(n => n === 4);
console.log(four)

const Luca = names.find(u => u === "Luca");
console.log(Luca);


const sum = numbers.reduce((acc, n) => acc + n, 0)
console.log(sum);
const max = numbers.reduce((acc, n) => acc > n ? acc : n, numbers[0]);
console.log(max);

const words = ["was", "geht", "abbbb"];

const sentence = words.reduce((acc, word) => acc + " " + word, "");
console.log(sentence);

const hasEven = numbers.some(n => n % 2 === 0);
console.log(hasEven); 

const Jan = names.some(u => u === "jan");
console.log(Jan);

const allEven = numbers.every(n => n % 2 === 0);
console.log(allEven); 




const numbersrandom = [10, 2, 33, 4];


numbersrandom.sort((a, b) => a - b);
console.log(numbersrandom);

console.log("------------------------------------------------------");
// aufgabe CHATGPT
// Aufgaben
// Durchschnittsnoten berechnen
// Verwende .map() + .reduce()
// Ergebnis: Array von Objekten { name, average }
// Finde den ersten Studenten mit Durchschnitt > 90
// Verwende .find()
// Überprüfe, ob alle Studenten aktiv sind
// Verwende .every()
// Überprüfe, ob mindestens ein Student eine Note < 50 hat
// Verwende .some()
// Liste der Studenten nach Durchschnitt sortieren (höchster zuerst)
// Verwende .sort()
// Liste der Namen der Studenten, deren Durchschnitt > 70 ist
// Verwende .filter() + .map()

//angabe chatgpt
type Student = {
  id: number;
  name: string;
  grades: number[]; // Noten von 0 bis 100
  active: boolean;
};

const students: Student[] = [
  { id: 1, name: "Anna", grades: [80, 90, 70], active: true },
  { id: 2, name: "Ben", grades: [60, 50, 40], active: false },
  { id: 3, name: "Chris", grades: [100, 90, 95], active: true },
  { id: 4, name: "Diana", grades: [70, 75, 80], active: true },
];

//

const average = students.map(s =>  {
  const sum = s.grades.reduce((acc, grade) => acc + grade, 0);
  const average = sum / s.grades.length;
  return { name: s.name, average };});

console.log(average)

const topstudent = average.find(s => s.average > 90);
console.log(topstudent);

const everyoneactive = students.every(s => s.active);
console.log(everyoneactive);

const isfailed = students.some(s => s.grades.some(g => g < 50));
console.log(isfailed);

//...average kopiert array damit original nicht zerstört wird
const sorted = [...average].sort((a, b) => b.average - a.average);
console.log(sorted);

const passingNames = average.filter(s => s.average > 70).map(s => s.name);
console.log(passingNames);
