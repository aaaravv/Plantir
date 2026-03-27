import { useState } from "react";
import plantsData from "./plants.json";
import "./ManagePlants.css";

function ManagePlants() {
  const [myPlants, setMyPlants] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  // Filter available plants from plants.json
  const availablePlants = plantsData.filter((plant) =>
    plant.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleAddPlant = (plant) => {
    const newPlant = {
      id: Date.now(),
      ...plant,
    };
    setMyPlants((prev) => [...prev, newPlant]);
    setShowAddForm(false);
    setFilterQuery("");
  };

  const handleDeletePlant = (id) => {
    setMyPlants((prev) => prev.filter((plant) => plant.id !== id));
  };

  return (
    <section className="manage-section">
      <div className="manage-header">
        <h1>Love Your Plants</h1>
        <p>Build a collection of plants you want to care for.</p>
      </div>

      {myPlants.length === 0 && !showAddForm && (
        <div className="empty-state-container">
          <div className="empty-state">
            <h2>No plants yet</h2>
            <p>Start building your plant collection by adding your first plant.</p>
            <button
              className="primary-button"
              onClick={() => setShowAddForm(true)}
            >
              + Add Your First Plant
            </button>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="add-form-container">
          <div className="add-form-header">
            <h2>Select a Plant</h2>
            <button
              className="close-btn"
              onClick={() => {
                setShowAddForm(false);
                setFilterQuery("");
              }}
            >
              ✕
            </button>
          </div>

          <input
            type="text"
            placeholder="Search for a plant..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="search-input"
            autoFocus
          />

          <div className="plant-options-grid">
            {availablePlants.length === 0 ? (
              <p className="no-results">
                No plants found. Try a different search term.
              </p>
            ) : (
              availablePlants.map((plant) => (
                <button
                  key={plant.name}
                  className="plant-option"
                  onClick={() => handleAddPlant(plant)}
                >
                  {plant.image && (
                    <img src={plant.image} alt={plant.name} />
                  )}
                  <h3>{plant.name}</h3>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {myPlants.length > 0 && (
        <div className="my-plants-section">
          <div className="my-plants-header">
            <h2>Your Plants ({myPlants.length})</h2>
            {!showAddForm && (
              <button
                className="primary-button add-button"
                onClick={() => setShowAddForm(true)}
              >
                + Add Another Plant
              </button>
            )}
          </div>

          <div className="my-plants-grid">
            {myPlants.map((plant) => (
              <div key={plant.id} className="my-plant-card">
                {plant.image && (
                  <div className="plant-card-image">
                    <img src={plant.image} alt={plant.name} />
                  </div>
                )}

                <div className="plant-card-content">
                  <h3>{plant.name}</h3>

                  <div className="plant-details">
                    <p>
                      <strong>Sunlight:</strong> {plant.light || "—"}
                    </p>
                    <p>
                      <strong>Climate:</strong> {plant.climate || "—"}
                    </p>
                    <p>
                      <strong>Maintenance:</strong>{" "}
                      {plant.maintenance || plant.time || "—"}
                    </p>
                    <p>
                      <strong>Temperature:</strong>{" "}
                      {plant.temperatureRange || "—"}
                    </p>
                  </div>

                  <div className="care-info">
                    <p className="care-text">{plant.care || "No care info"}</p>
                  </div>

                  <div className="water-section">
                    <p className="water-info">
                      <strong>Water:</strong> {plant.waterAmount} • {plant.waterFrequency}
                    </p>
                  </div>

                  <button
                    className="btn-delete"
                    onClick={() => handleDeletePlant(plant.id)}
                  >
                    Remove from Collection
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ManagePlants;
