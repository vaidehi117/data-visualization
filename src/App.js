import React from "react";
import "./App.css";
import JobLaborChart from "./charts/JobLaborChart"; 
import StockPriceChart from "./charts/stock";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Labor Trends Over Time</h1>
        <div className="chart-container">
          <JobLaborChart /> {/* Render the chart component inside a separate div */}
        </div>
        <div>
          <StockPriceChart /> {/* Render the chart component inside a separate div */}
        </div>
      </header>
    </div>
  );
}

export default App;
