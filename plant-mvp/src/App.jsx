import { useState } from "react";
import plantsData from "./plants.json";

function App() {
  const [zipcode, setZipcode] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter by sunlight and time
    const filtered = plantsData.filter(
      (plant) =>
        plant.light.toLowerCase().includes(sunlight.toLowerCase()) &&
        plant.time.toLowerCase() === time.toLowerCase()
    );

    // Optionally pick top 3
    setResults(filtered.slice(0, 3));
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Plant Suggestion MVP</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-2">ZIP Code:</label>
        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <label className="block mb-2">Sunlight Level:</label>
        <select
          value={sunlight}
          onChange={(e) => setSunlight(e.target.value)}
          className="border p-2 mb-4 w-full"
        >
          <option value="">Select</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label className="block mb-2">Time You Can Spend Per Week:</label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 mb-4 w-full"
        >
          <option value="">Select</option>
          <option value="low">Low (5–10 min)</option>
          <option value="medium">Medium (10–30 min)</option>
          <option value="high">High (30+ min)</option>
        </select>

        <button className="bg-green-500 text-white px-4 py-2">Find Plants</button>
      </form>

      <div>
        {results.length === 0 && <p>No plants match your criteria.</p>}
        {results.map((plant) => (
          <div key={plant.name} className="border p-4 mb-4 rounded flex gap-4">
            <img src={plant.image} alt={plant.name} className="w-24 h-24 object-cover rounded"/>
            <div>
              <h2 className="font-bold">{plant.name}</h2>
              <p><strong>Light:</strong> {plant.light}</p>
              <p><strong>Time:</strong> {plant.time}</p>
              <p><strong>Temperature:</strong> {plant.temperatureRange}</p>
              <p><strong>Care:</strong> {plant.care}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;