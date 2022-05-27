import React, { useEffect, useState } from 'react'
import { BarChart } from '../components/charts/BarChart'
import { PieChart } from '../components/charts/PieChart'

import { currentStates, currentByState, historicalByStateDta } from '../utils/requestList'

export const ChartHandler = ({ id }) => {

  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    (async function callRequest() {
      await setloading(true)

      let result
      switch (id) {
        case '1': result = await currentStates(); break;
        // case '2': result = await currentByState('ca'); break;
        default: result = []
      }

      await setdata(result.splice(0, 15))

      await setloading(false)
    })()
  }, [])



  const chartList = [
    { id: '1', component: <BarChart data={data} xObjectName={'state'} yObjectName={'positive'} /> },
    { id: '2', component: <PieChart data={data} /> },
  ];

  return !loading && chartList.find(item => item.id === id).component

}
