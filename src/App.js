import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  Legend,
} from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getDailyStockPerformance = async (symbol) => {
    const response = await axios.get(
      `https://localhost:7168/api/stock/performance/daily/?symbol=${symbol}`
    );

    setData(response.data.stockPerformance);
    setLabels([response.data.inputSymbol, response.data.benchmarkSymbol]);
  };

  return (
    <div className="App">
      <LineChart
        width={1000}
        height={400}
        data={data}
        margin={{ top: 50, right: 20, left: 100, bottom: 5 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Legend
          formatter={(value, entry, index) => (
            <span className="text-color-class">{labels[index]}</span>
          )}
        />
        <Line type="monotone" dataKey="inputPerformance" stroke="#ff7300" />
        <Line type="monotone" dataKey="benchmarkPerformance" stroke="#387908" />
        <XAxis dataKey="priceDate" />
        <YAxis
          tickFormatter={(tick) => {
            return `${tick}%`;
          }}
        />
      </LineChart>
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={() => getDailyStockPerformance(inputValue)}>
        Get daily performance
      </button>
    </div>
  );
}

export default App;
