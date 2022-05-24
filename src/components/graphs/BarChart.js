import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3';

export const BarChart = () => {

    const ref = useRef()

    useEffect(() => {
        const data = [
            { id: 'd1', value: '10', region: 'east' },
            { id: 'd2', value: '25', region: 'north' },
            { id: 'd3', value: '30', region: 'south' },
            { id: 'd4', value: '40', region: 'west' }
        ]

        // const margin = { top: 50, right: 30, bottom: 30, left: 30 }
        // const width = 100
        // const height = 100

        // const svgElement = d3.select(ref.current)

        // let x = d3.scaleTime.ordinal().rangeRoundBands([margin.left, width - margin.right], 0.1);
        // let y = d3.scaleTime.linear().range([height, margin.bottom]);

        // x.domain(data.map(function (d) { return d.region }));
        // y.domain([0, d3.max(data, function (d) { return d.value; })]);

        // let xAxis = d3.svg.axis().scale(x).orient('bottom');
        // let yAxis = d3.svg.axis().scale(y).orient('left');

        // svgElement.append('g')
        //     .attr('class', 'axis')
        //     .attr('transform', `translate(0, ${height})`)
        //     .call(xAxis);

        // svgElement.append('g')
        //     .attr('class', 'axis')
        //     .attr('transform', `translate(${margin.left}, 0)`)
        //     .call(yAxis);

        // svgElement.selectAll('rect')
        //     .data(data)
        //     .enter()
        //     .append('rect')
        //     .attr('class', 'bar')
        //     .attr('x', (d) => { return x(d.region); })
        //     .attr('width', x.rangeBand())
        //     .attr('y', () => { return y(margin.bottom); })
        //     .attr('height', 0)
        //     .transition()
        //     .delay(function (d, i) { return i * 20; })
        //     .duration(800)
        //     .attr('y', function (d) { return y(d.value); })
        //     .attr('height', (d) => { return height - y(d.value); })
        //     .bind();

    }, [])

    return (
        <div >
            <svg ref={ref} style={{ border: '1px solid black' }}/>
        </div>
    )
}
