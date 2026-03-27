import { useState } from "react";
import plantsData from "./plants.json";
import "./ManagePlants.css";

function ManagePlants() {
  const [myPlants, setMyPlants] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");
  const [waterInfo, setWaterInfo] = useState({
    amount: "",
    frequency: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Filter available plants from plants.json
  const availablePlants = plantsData.filter((plant) =>
    plant.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleSelectPlant = (plant) => {
    setSelectedPlant(plant);
    setWaterInfo({ amount: "", frequency: "" });
  };

  const handleAddPlant = (e) => {
    e.preventDefault();
    if (selectedPlant && waterInfo.amount && waterInfo.frequency) {
      const newPlant = {
        id: Date.now(),
        ...selectedPlant,
        waterAmount: waterInfo.amount,
        waterFrequency: waterInfo.frequency,
      };
      setMyPlants((prev) => [...prev, newPlant]);
      setSelectedPlant(null);
      setShowAddForm(false);
      setFilterQuery("");
      setWaterInfo({ amount: "", frequency: "" });
    }
  };

  const handleDeletePlant = (id) => {
    setMyPlants((prev) => prev.filter((plant) => plant.id !== id));
  };

  const handleEditWater = (id) => {
    setEditingId(id);
  };

  const handleSaveWaterEdit = (id, newAmount, newFrequency) => {
    setMyPlants((prev) =>
      prev.map((plant) =>
        plant.id === id
          ? { ...plant, waterAmount: newAmount, waterFrequency: newFrequency }
          : plant
      )
    );
    setEditingId(null);
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

      {showAddForm && !selectedPlant && (
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
                  onClick={() => handleSelectPlant(plant)}
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

      {showAddForm && selectedPlant && (
        <div className="water-form-container">
          <div className="form-header">
            <h2>Add Water Tracking for {selectedPlant.name}</h2>
            <button
              className="close-btn"
              onClick={() => {
                setSelectedPlant(null);
                setWaterInfo({ amount: "", frequency: "" });
              }}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleAddPlant}>
            <div className="water-form-group">
              <label htmlFor="amount">Water Amount*</label>
              <select
                id="amount"
                value={waterInfo.amount}
                onChange={(e) =>
                  setWaterInfo((prev) => ({ ...prev, amount: e.target.value }))
                }
                required
              >
                <option value="">Select amount...</option>
                <option value="small">Small (220ml / 8oz)</option>
                <option value="medium">Medium (500ml / 16oz)</option>
                <option value="large">Large (1L / 32oz)</option>
                <option value="soak">Soak pot completely</option>
              </select>
            </div>

            <div className="water-form-group">
              <label htmlFor="frequency">Water Frequency*</label>
              <select
                id="frequency"
                value={waterInfo.frequency}
                onChange={(e) =>
                  setWaterInfo((prev) => ({
                    ...prev,
                    frequency: e.target.value,
                  }))
                }
                required
              >
                <option value="">Select frequency...</option>
                <option value="daily">Daily</option>
                <option value="every 2 days">Every 2 days</option>
                <option value="every 3 days">Every 3 days</option>
                <option value="weekly">Weekly</option>
                <option value="every 2 weeks">Every 2 weeks</option>
                <option value="monthly">Monthly</option>
                <option value="as needed">As needed</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                Add {selectedPlant.name}
              </button>
            </div>
          </form>
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
                    {editingId === plant.id ? (
                      <form
                        className="water-edit-form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.target);
                          handleSaveWaterEdit(
                            plant.id,
                            formData.get("amount"),
                            formData.get("frequency")
                          );
                        }}
                      >
                        <select
                          name="amount"
                          defaultValue={plant.waterAmount}
                          required
                        >
                          <option value="">Water amount...</option>
                          <option value="small">Small (220ml / 8oz)</option>
                          <option value="medium">Medium (500ml / 16oz)</option>
                          <option value="large">Large (1L / 32oz)</option>
                          <option value="soak">Soak pot completely</option>
                        </select>
                        <select
                          name="frequency"
                          defaultValue={plant.waterFrequency}
                          required
                        >
                          <option value="">Frequency...</option>
                          <option value="daily">Daily</option>
                          <option value="every 2 days">Every 2 days</option>
                          <option value="every 3 days">Every 3 days</option>
                          <option value="weekly">Weekly</option>
                          <option value="every 2 weeks">
                            Every 2 weeks
                          </option>
                          <option value="monthly">Monthly</option>
                          <option value="as needed">As needed</option>
                        </select>
                        <button type="submit" className="btn-save">
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn-cancel"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <div className="water-display">
                        <p className="water-info">
                          <strong>Water:</strong> {plant.waterAmount} •{" "}
                          {plant.waterFrequency}
                        </p>
                        <button
                          className="btn-edit-water"
                          onClick={() => handleEditWater(plant.id)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
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
