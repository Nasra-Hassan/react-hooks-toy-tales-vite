import { useEffect, useState } from "react";
import ToyContainer from "./ToyContainer";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // GET request
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  // POST request
  function addToy(newToy) {
    setToys([...toys, newToy]);
  }

  // DELETE request
  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedToys = toys.filter((toy) => toy.id !== id);
      setToys(updatedToys);
    });
  }

  // PATCH request
  function likeToy(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );

    setToys(updatedToys);
  }

  return (
    <div>
      <div id="toy-header">
        <img
          src="https://fontmeme.com/permalink/180719/67429e6afec53d21d64643101c43f029.png"
          alt="toy header"
        />
      </div>

      {showForm ? <ToyForm addToy={addToy} /> : null}

      <div className="buttonContainer">
        <button onClick={() => setShowForm(!showForm)}>
          Add a Toy
        </button>
      </div>

      <ToyContainer
        toys={toys}
        deleteToy={deleteToy}
        likeToy={likeToy}
      />
    </div>
  );
}

export default App;