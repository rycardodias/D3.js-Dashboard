import React, { useState, useEffect, useRef } from 'react'
import { currentStates } from '../utils/requestList';
import { BarChart } from './graphs/BarChart';

export const Graphics = () => {

    const [data, setdata] = useState([])

    async function getInitialData() {
        const result = await currentStates()
        setdata(result)
    }

    // useEffect(() => {
    //     getInitialData()
    // }, []);


    return (
        <div>
            Graphics
            <BarChart />
            {/* {
                d3.select(document.body)
                    .append('svg')
                    .attr({ width: 1000, height: 250 })
                    .append('g')
            } */}
        </div>

    )
}
