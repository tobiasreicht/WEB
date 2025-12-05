import { useState, useEffect } from "react";
import Card from "./Card";

interface Person {
  id: number;
  name: string;
  title?: string;
  bio?: string;
}

export default function PersonList() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    const fetchPersons = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ja die daten sind vo ki
      const data: Person[] = [ 
        { id: 1, name: "Jan Müller", title: "Developer", bio: "Loves coding and coffee ☕" },
        { id: 2, name: "Anna Schmidt", title: "Designer", bio: "Passionate about UI/UX" },
        { id: 3, name: "Max Mustermann", title: "Product Manager", bio: "Organizes everything" },
        { id: 4, name: "Lisa Klein", title: "QA Engineer", bio: "Finds all the bugs 🐛" },
      ];

      setPersons(data);
      setLoading(false);
    };
 
    fetchPersons();
  }, []);

  return (
    <div className="max-w-md w-full flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-slate-900">Personenliste</h3>

      {loading ? (
        <p>Lade Personen...</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {persons.map((person) => (
            <li
              key={person.id}
              className="p-2 border rounded hover:bg-slate-100 cursor-pointer flex justify-between"
              onClick={() => setSelectedPerson(person)}
            >
              <span>{person.name}</span>
              <span>{person.title}</span>
            </li>
          ))}
        </ul>
      )}

      {selectedPerson && (
        <div className="mt-4">
          <Card
            name={selectedPerson.name}
            title={selectedPerson.title}
            bio={selectedPerson.bio}
          />
        </div>
      )}
    </div>
  );
}
