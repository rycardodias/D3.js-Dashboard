import React, { useEffect, useState } from 'react'
import { BarChart } from '../components/charts/BarChart'
import { PieChart } from '../components/charts/PieChart'
import { currentStates, currentByState, historicalByStateDta, dailyByState } from '../utils/requestList'
import { DensityPlot } from './charts/DensityPlot'
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
          data1 = {
            positive: data1.positiveIncrease,
            hospitalized: data1.hospitalizedCurrently,
            InVentilation: data1.inIcuCurrently,
          }
          data2 = await currentByState('ga');
          data2 = {
            positive: data2.positiveIncrease,
            hospitalized: data2.hospitalizedCurrently,
            InVentilation: data2.inIcuCurrently,
          }

          await setdata1(data1)
          await setdata2(data2)
          break;
        }
        case '4': {
          const data = [
            { date: '14-04-2018', value: 8140.71 },
            { date: '15-04-2018', value: 8338.42 },
            { date: '16-04-2018', value: 8371.15 },
            { date: '17-04-2018', value: 8285.96 },
            { date: '18-04-2018', value: 8197.8 },
            { date: '19-04-2018', value: 8298.69 },
            { date: '20-04-2018', value: 8880.23 },
            { date: '21-04-2018', value: 8997.57 },
            { date: '22-04-2018', value: 9001.64 },
            { date: '23-04-2018', value: 8958.55 }
          ]

          await setdata(data)
          break;
        }
        default: result = {}
      }

      await setloading(false)
    })()

    console.log('loading:' + id)
  }, [])

  const chartList = [
    { id: '1', component: <BarChart data={data} xObjectName={'state'} yObjectName={'positive'} /> },
    { id: '2', component: <PieChart data={data} /> },
    { id: '3', component: <PieChartAnimated data1={data1} data2={data2} /> },
    { id: '4', component: <DensityPlot data={data} /> },


  ];

  return !loading && chartList.find(item => item.id === id).component

}
