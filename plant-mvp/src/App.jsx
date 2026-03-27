import { useState } from "react";
import plantsData from "./plants.json";
import "./App.css";

const optionGroups = [
  {
    key: "sunlight",
    title: "Sunlight Level",
    description: "Choose how much natural light your space gets.",
    options: [
      { value: "low", label: "Low", hint: "Mostly shade or indirect light" },
      { value: "medium", label: "Medium", hint: "A few hours of sun" },
      { value: "high", label: "High", hint: "Bright sun for much of the day" },
    ],
  },
  {
    key: "climate",
    title: "Climate",
    description: "Pick the temperature range that best fits your space.",
    options: [
      { value: "cold", label: "Cold", hint: "Cool rooms or colder regions" },
      { value: "warm", label: "Warm", hint: "Comfortable indoor temperatures" },
      { value: "hot", label: "Hot", hint: "Very warm rooms or hot climates" },
    ],
  },
  {
    key: "maintenance",
    title: "Maintenance",
    description: "How much care do you want to give each week?",
    options: [
      { value: "low", label: "Low", hint: "Minimal upkeep" },
      { value: "medium", label: "Medium", hint: "Some regular care" },
      { value: "high", label: "High", hint: "Frequent attention is okay" },
    ],
  },
];

const normalize = (value) => (value || "").toString().trim().toLowerCase();

const inferClimate = (plant) => {
  const explicitClimate = normalize(plant.climate);
  if (explicitClimate) return explicitClimate;

  const temp = normalize(plant.temperatureRange);
  const values = temp.match(/\d+/g)?.map(Number) || [];
  const avgTemp =
    values.length > 0
      ? values.reduce((sum, value) => sum + value, 0) / values.length
      : null;

  if (temp.includes("cold") || (avgTemp !== null && avgTemp < 60)) return "cold";
  if (temp.includes("hot") || (avgTemp !== null && avgTemp >= 80)) return "hot";
  return "warm";
};

const getMaintenance = (plant) => normalize(plant.maintenance || plant.time);
const getSunlight = (plant) => normalize(plant.light);

function App() {
  const [selections, setSelections] = useState({
    sunlight: "",
    climate: "",
    maintenance: "",
  });
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (group, value) => {
    setSelections((current) => ({
      ...current,
      [group]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);

    const scoredPlants = plantsData
      .map((plant) => {
        let score = 0;

        if (getSunlight(plant).includes(selections.sunlight)) score += 1;
        if (inferClimate(plant) === selections.climate) score += 1;
        if (getMaintenance(plant) === selections.maintenance) score += 1;

        return { ...plant, score };
      })
      .filter((plant) => plant.score > 0)
      .sort((a, b) => b.score - a.score);

    const exactMatches = scoredPlants.filter((plant) => plant.score === 3);
    const fallbackMatches = scoredPlants.slice(0, 3);

    setResults(exactMatches.length > 0 ? exactMatches.slice(0, 3) : fallbackMatches);
  };

  const isFormComplete =
    selections.sunlight && selections.climate && selections.maintenance;

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Plantir</p>
        <div className="hero-content">
          <h1>Find the right plant for your lifestyle.</h1>
          <p className="hero-copy">
            Match plants to your sunlight, climate, and maintenance preference so
            beginners can grow successfully with less waste and less guesswork.
          </p>
        </div>
      </section>

      <form className="selection-layout" onSubmit={handleSubmit}>
        {optionGroups.map((group) => (
          <fieldset key={group.key} className="selection-card">
            <legend>{group.title}</legend>
            <p className="card-description">{group.description}</p>

            <div className="option-list">
              {group.options.map((option) => (
                <label
                  key={option.value}
                  className={`option-row ${
                    selections[group.key] === option.value ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={group.key}
                    value={option.value}
                    checked={selections[group.key] === option.value}
                    onChange={() => handleChange(group.key, option.value)}
                  />
                  <span className="option-copy">
                    <span className="option-label">{option.label}</span>
                    <span className="option-hint">{option.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <div className="actions">
          <button type="submit" className="primary-button" disabled={!isFormComplete}>
            Find My Plant Match
          </button>
        </div>
      </form>

      <section className="results-section">
        <div className="results-header">
          <h2>Recommended Plants</h2>
          <p>
            {hasSearched
              ? "These picks best match the environment and care level you selected."
              : "Choose one option in each box to see your personalized recommendations."}
          </p>
        </div>

        {hasSearched && results.length === 0 && (
          <div className="empty-state">
            No plants matched yet. Try adjusting one of your selections.
          </div>
        )}

        <div className="results-grid">
          {results.map((plant) => (
            <article key={plant.name} className="plant-card">
              <img
                src={plant.image}
                alt={plant.name}
                className="plant-image"
              />

              <div className="plant-content">
                <div className="plant-badge">
                  {plant.score === 3 ? "Best Match" : "Good Match"}
                </div>

                <h3>{plant.name}</h3>

                <div className="plant-meta">
                  <p><strong>Sunlight:</strong> {plant.light}</p>
                  <p><strong>Climate:</strong> {plant.climate || inferClimate(plant)}</p>
                  <p><strong>Maintenance:</strong> {plant.maintenance || plant.time}</p>
                  <p><strong>Temperature:</strong> {plant.temperatureRange}</p>
                </div>

                <p className="care-text">{plant.care}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
