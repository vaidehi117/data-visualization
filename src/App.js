import React from "react";
import "./App.css";
import JobLaborChart from "./charts/JobLaborChart";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Labor Trends Over Time</h1>
        <p>
          <li>
            Steady Growth Before 2020: Employment steadily increased from 2015
            to 2019, reaching a peak of 157.5 million in 2019.
          </li>
          <li>
            Significant Drop in 2020: Due to the COVID-19 pandemic, employment
            fell sharply in 2020, dropping to 147.8 million, reflecting job
            losses across multiple industries.
          </li>
          <li>
            Strong Recovery Post-Pandemic: Employment rebounded in 2021, rising
            to 152.5 million, indicating economic recovery and job market
            resilience.
          </li>
          <li>
            New Highs in 2022-2024: By 2022, employment surpassed pre-pandemic
            levels, reaching 158.2 million, and continued to grow slightly in
            2023 and 2024, stabilizing around 161.3 million.
          </li>
          <li>
            Slower Growth in Recent Years: While employment remains at its
            highest in 2023 and 2024, the growth rate has slowed compared to the
            sharp rebound in 2021-2022. This could indicate a maturing labor
            market or economic stabilization.
          </li>
        </p>
        <div className="chart-container">
          <JobLaborChart />{" "}
          {/* Render the chart component inside a separate div */}
        </div>
      </header>
    </div>
  );
}

export default App;
