import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'

export const Chart1 = () => {
  const data = [
    { id: 'banana', quantity: 10 },
    { id: 'pessego', quantity: 15 }
  ]


  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current)

    const xScale = d3.scaleBand().domain([data.map(item => item.id)]).rangeRound([0, 100]).padding(0.1)

    const yScale = d3.scaleLinear().domain([0, 15]).range([25, 0]);

    svgElement
      .style('border', '1px solid black')

    svgElement
      .selectAll('div')
      .data(data).enter()
      .append('rect')
      .attr('fill', '#d38f1a')
      .attr('width', xScale.bandwidth())
      .attr('height', (data) => (25 - yScale(data.quantity)))
      .attr('x', data => xScale(data.id))
      .attr('y', data => yScale(data.quantity))


  }, [])

  return (
    <svg
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
