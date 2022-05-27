import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'

export const BarChart = ({ data, xObjectName, yObjectName }) => {

  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current)

    var svgwidth = svgElement._groups[0][0].clientWidth
    var svgheight = svgElement._groups[0][0].clientHeight

    var margin = { top: 0, right: 0, bottom: 50, left: 0 },
      width = svgwidth - margin.left - margin.right,
      height = svgheight - margin.top - margin.bottom;


    svgElement
      // .style('border', '1px solid black')
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand().range([0, width])
      .domain(data.map(function (d) { return d[xObjectName]; })).padding(0.1);

    svgElement.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const maxYDomain = Math.max(...data.map(item => item[yObjectName]))

    // Y axis
    var y = d3.scaleLinear().domain([0, maxYDomain]).range([height, 0]);

    svgElement.append("g").call(d3.axisLeft(y));



    const color = d3.scaleOrdinal()
      .range(d3.schemeSet2);
    // Bars
    svgElement.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d[xObjectName]); })
      .attr("y", function (d) { return y(d[yObjectName]); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d[yObjectName]); })
      .attr("fill", function (d) { return color(d[yObjectName]); })

  }, [])

  return (
    <svg
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
