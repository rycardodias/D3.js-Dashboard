import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'

export const PieChart = ({ xObjectName, yObjectName }) => {
  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current)
    var data = { a: 50, b: 20, c: 30, d: 8, e: 12 }

    var svgwidth = svgElement._groups[0][0].clientWidth
    var svgheight = svgElement._groups[0][0].clientHeight

    var color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    const pie = d3.pie()
      .value(function (d) { return d[1] })
    const data_ready = pie(Object.entries(data))

    var margin = svgwidth / 10,
      width = svgwidth,
      height = svgheight,
      radius = Math.min(width, height) / 2 - margin


    svgElement
      // .style('border', '1px solid black')
      .append("g")
      // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      .attr("transform", `translate(${width/2}, ${height/2})`);

    svgElement
      .selectAll('whats')
      .data(data_ready)
      .join('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', function (d) { return (color(d.data[1])) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)


  }, [])

  return (
    <svg
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
