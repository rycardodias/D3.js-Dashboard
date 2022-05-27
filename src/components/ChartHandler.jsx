import React, { useEffect, useState } from 'react'
import { BarChart } from '../components/charts/BarChart'
import { PieChart } from '../components/charts/PieChart'
import { currentStates, currentByState, historicalByStateDta } from '../utils/requestList'
import { PieChartAnimated } from './charts/PieChartAnimated'

export const ChartHandler = ({ id }) => {

  const [data, setdata] = useState([])
  const [data1, setdata1] = useState([])
  const [data2, setdata2] = useState([])

  const [loading, setloading] = useState(true)

  useEffect(() => {
    (async function callRequest() {
      await setloading(true)

      let result, data1, data2

      switch (id) {
        case '1': {
          result = await currentStates();
          await setdata(result.splice(0, 15))
          break;
        }
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
          await setdata(result)
          break;
        }
        case '3': {
          data1 = await currentByState('ca');
          data2 = await currentByState('ga');

          await setdata1(data1)
          await setdata2(data2)
          break;
        }
        default: result = {}
      }

      await setloading(false)
    })()
  }, [])

  const chartList = [
    { id: '1', component: <BarChart data={data} xObjectName={'state'} yObjectName={'positive'} /> },
    { id: '2', component: <PieChart data={data} /> },
    { id: '3', component: <PieChartAnimated data1={data1} data2={data2} /> },


  ];

  return !loading && chartList.find(item => item.id === id).component

}
