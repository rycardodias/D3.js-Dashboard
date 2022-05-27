import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'

export const PieChartAnimated = ({ data1, data2 }) => {
  const ref = useRef()

  // const data1 = { a: 9, b: 20, c: 30, d: 8, e: 12 }
  // const data2 = { a: 6, b: 16, c: 20, d: 14, e: 19, f: 12 }

  const [first, setfirst] = useState(true)

  useEffect(() => {


    const svgElement = d3.select(ref.current)


    var svgwidth = svgElement._groups[0][0].clientWidth
    var svgheight = svgElement._groups[0][0].clientHeight


    // set the dimensions and margins of the graph
    const width = svgwidth,
      height = svgheight,
      margin = svgwidth * 0.01;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    const svg = svgElement
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // set the color scale
    const color = d3.scaleOrdinal()
      .range(d3.schemeSet2);

    // A function that create / update the plot for a given variable:
    function update(data) {

      // Compute the position of each group on the pie:
      const pie = d3.pie()
        .value(function (d) { return d[1]; })
        .sort(function (a, b) { return d3.ascending(a.key, b.key); }) // This make sure that group order remains the same in the pie chart
      const data_ready = pie(Object.entries(data))

      // map to data
      const u = svg.selectAll("path")
        .data(data_ready)

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      u
        .join('path')
        .transition()
        .duration(1000)
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr('fill', function (d) { return (color(d.data[0])) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)


    }
    const interval = setInterval(async () => {
      await setfirst(!first)
      // Initialize the plot with the first dataset
      first ? await update(data1) : await update(data2)

    }, 3000);
    return () => clearInterval(interval);

  }, [first])

  return (
    <svg
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
