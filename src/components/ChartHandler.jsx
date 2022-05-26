import React, { useEffect, useState } from 'react'
import { BarChart } from '../components/charts/BarChart'
import { currentStates } from '../utils/requestList'

export const ChartHandler = ({ id }) => {

  const [statesTotals, setstatesTotals] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    (async function callRequest() {
      await setloading(true)

      const result = await currentStates()
      await setstatesTotals(result)

      await setloading(false)
    })()
  }, [])


  const chartList = [
    { id: '1', component: <BarChart data={statesTotals} xObjectName={'state'} yObjectName={'positive'} /> },
    { id: '2', component: "22" },
  ];

  return !loading && chartList.find(item => item.id === id).component

}
