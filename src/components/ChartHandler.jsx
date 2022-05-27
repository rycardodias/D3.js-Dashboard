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
        case '2': {
          result = await currentByState('ca');

          result = {
            // death: result.death,
            positive: result.positiveIncrease,
            hospitalized: result.hospitalizedCurrently,
            InVentilation: result.inIcuCurrently,
            // positive: result.positive,
            // negative: result.negative
          }

          break;
        }
        default: result = []
      }

      if (result.length > 15) {
        await setdata(result.splice(0, 15))
      } else {
        await setdata(result)
      }

      await setloading(false)
    })()
  }, [])


  const chartList = [
    { id: '1', component: <BarChart data={data} xObjectName={'state'} yObjectName={'positive'} /> },
    { id: '2', component: <PieChart data={data} /> },
  ];

  return !loading && chartList.find(item => item.id === id).component

}
