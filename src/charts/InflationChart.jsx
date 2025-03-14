import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const InflationChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load the CSV file
    d3.csv("/data/inflamationData.csv").then((csvData) => {
      // Process the data and convert numeric values from strings to numbers
      const processedData = csvData.map(d => {
        const yearData = {};
        // Store the inflation data for each category as numbers
        Object.keys(d).forEach(key => {
          if (key !== "category") {
            yearData[key] = +d[key]; // Convert string to number
          }
        });
        return { category: d.category, ...yearData };
      });
      setData(processedData);
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return; // Wait until data is loaded

    const width = 800;
    const height = 500;
    const marginTop = 20;
    const marginRight = 40;
    const marginBottom = 40;
    const marginLeft = 60;

    const categories = data.map(d => d.category);
    const years = Object.keys(data[0]).filter(key => key !== "category");

    const x = d3.scaleBand()
      .domain(years)
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(years, year => d[year]))])
      .nice()
      .range([height - marginBottom, marginTop]);

    const color = d3.scaleOrdinal()
      .domain(categories)
      .range(d3.schemeCategory10);

    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    const zoom = d3.zoom()
      .scaleExtent([1, 5])
      .translateExtent([[marginLeft, marginTop], [width - marginRight, height - marginBottom]])
      .on("zoom", zoomed);

    svg.call(zoom);

    svg.selectAll(".bar")
      .data(data.flatMap(d => years.map(year => ({ category: d.category, year, value: d[year] }))))
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.year))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.category))
      .append("title")
      .text(d => `${d.category} - ${d.year}: ${d.value}%`);

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove());

    function zoomed(event) {
      const transform = event.transform;
      const newX = transform.rescaleX(x);

      // Update the bars' x positions and widths based on the zoom level
      svg.selectAll(".bar")
        .attr("x", d => newX(d.year)) // Rescale the x position
        .attr("width", newX.bandwidth()); // Rescale the width of the bars

      // Update the x-axis based on the new rescaled x scale
      svg.select(".x-axis").call(d3.axisBottom(newX));
    }

  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default InflationChart;
