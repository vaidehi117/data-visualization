import React from "react";
import "./App.css";
import JobLaborChart from "./charts/JobLaborChart";
import RemoteWorkChart from "./charts/RemoteWorkChart";
import InflationChart from "./charts/InflationChart"; // Importing the new InflationCostChart component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Labor Trends Over Time</h1>
        <ul>
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
        </ul>
        <div className="chart-container">
          <JobLaborChart />{" "}
          {/* Render the JobLaborChart component inside a separate div */}
        </div>

        <h1>Remote Work Adoption: Pre-COVID vs. Post-COVID</h1>
        <ul>
          <li>
            Pre-COVID Remote Work: Before the pandemic, remote work was a small
            percentage of the workforce, with most employees working in
            traditional office settings.
          </li>
          <li>
            Post-COVID Surge: The COVID-19 pandemic caused a rapid shift to
            remote work, with many companies adopting permanent or hybrid work
            models.
          </li>
          <li>
            Hybrid Work Growth: As restrictions eased, hybrid work became a
            popular option, allowing employees to split their time between home
            and office.
          </li>
          <li>
            Long-Term Trends: Post-pandemic, remote and hybrid work models
            continue to thrive, with many employees preferring the flexibility
            these models offer.
          </li>
        </ul>
        <div className="chart-container">
          <RemoteWorkChart /> {/* Render the RemoteWorkChart component here */}
        </div>

        <h1>Inflation & Cost of Living: A Sector Analysis</h1>
        <ul>
          <li>
            Rising Inflation Across Categories: Inflation has affected multiple
            sectors, including Housing, Food, Transport, and Healthcare, with
            each sector seeing significant price increases in recent years.
          </li>
          <li>
            Impact of COVID-19: The pandemic has caused disruptions, leading to
            spikes in costs across various sectors, particularly in 2020 and
            beyond.
          </li>
          <li>
            Long-Term Inflation Trends: While inflation has stabilized in some
            sectors, others continue to experience higher-than-normal growth,
            highlighting ongoing economic pressures.
          </li>
        </ul>
        <div className="chart-container">
          <InflationChart /> {/* Render the InflationCostChart component here */}
        </div>
      </header>
    </div>
  );
}

export default App;
