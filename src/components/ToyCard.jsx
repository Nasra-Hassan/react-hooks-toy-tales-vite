function ToyCard({ toy, deleteToy, likeToy }) {

  function handleLike() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes + 1,
      }),
    })
      .then((r) => r.json())
      .then((updatedToy) => likeToy(updatedToy));
  }

  return (
    <div className="card" data-testid="toy-card">
      <img src={toy.image} alt={toy.name} className="toy-avatar" />

      <h2>{toy.name}</h2>

      <p>{toy.likes} Likes </p>

      <button onClick={handleLike}>
        Like {"<3"}
      </button>

      <button onClick={() => deleteToy(toy.id)}>
  Donate to GoodWill
</button>
    </div>
  );
}

export default ToyCard;