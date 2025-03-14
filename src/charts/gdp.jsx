import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const GDPChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = [
      { year: 2015, gdp: 18.12 },
      { year: 2016, gdp: 18.62 },
      { year: 2017, gdp: 19.39 },
      { year: 2018, gdp: 20.49 },
      { year: 2019, gdp: 21.43 },
      { year: 2020, gdp: 19.51 },
      { year: 2021, gdp: 22.68 },
      { year: 2022, gdp: 24.80 },
      { year: 2023, gdp: 26.72 },
    ];

    const width = 600;
    const height = 350;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("max-width", "100%")
      .style("height", "auto")
      .style("overflow", "visible");

    const x = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.gdp)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.year))
      .attr("y", d => y(d.gdp))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.gdp))
      .attr("fill", "steelblue");

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(data.length).tickFormat(d3.format("d")));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(".::contentReference[oaicite:0]{index=0}
 
