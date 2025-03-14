import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const JobLaborChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 350;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("max-width", "100%")
      .style("height", "auto")
      .style("overflow", "visible");

    d3.csv("/data/jobData.csv").then(data => {
      data.forEach(d => {
        d.Year = +d.Year;
        d.Employed = +d.Employed;
      });

      data = data.filter(d => d.Year >= 2015);

      const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Year))
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Employed)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const line = d3.line()
        .x(d => x(d.Year))
        .y(d => y(d.Employed));

      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Adding x-axis
      svg.append("g")
        .selectAll(".x-axis")
        .data([data])
        .enter()
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

      // Adding y-axis
      svg.append("g")
        .selectAll(".y-axis")
        .data([data])
        .enter()
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      const tooltip = svg.append("g")
        .style("display", "none");

      tooltip.append("rect")
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("width", 80)
        .attr("height", 40);

      tooltip.append("text")
        .attr("x", 10)
        .attr("y", 20)
        .style("font-size", "12px");

      svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "transparent")
        .on("mousemove", function (event) {
          const [mx] = d3.pointer(event);
          const xValue = x.invert(mx);
          const i = d3.bisector(d => d.Year).center(data, xValue);
          const d = data[i];
          if (d) {
            tooltip.style("display", "block")
              .attr("transform", `translate(${x(d.Year)},${y(d.Employed) - 20})`);
            tooltip.select("text").text(`${d.Year}: ${d.Employed}`);
          }
        })
        .on("mouseleave", () => tooltip.style("display", "none"));
    });
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default JobLaborChart;
