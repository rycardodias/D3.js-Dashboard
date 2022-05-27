import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'

export const DensityPlot = ({ data }) => {
  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current)

    var svgwidth = svgElement._groups[0][0].clientWidth
    var svgheight = svgElement._groups[0][0].clientHeight

    var margin = { top: 0, right: 0, bottom: 30, left: 55 },
      width = svgwidth - margin.left - margin.right,
      height = svgheight - margin.top - margin.bottom;

    // append the svg object to the div called 'my_dataviz'
    const svg = svgElement
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      // .domain(d3.extent(data, function (d) { return d.date; }))
      .range([0, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([8000, 9200])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d,i) { return i * 50 })
        .y(function (d) { return y(d.value) })
      )
    // Add the points
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d, i) { return i * 50 })
      .attr("cy", function (d) { return y(d.value) })
      .attr("r", 10)
      .attr("fill", "#69b3a2")

  }, [])

  return (
    <svg
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
