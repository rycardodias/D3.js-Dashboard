import React from 'react'
import { Chart1 } from '../components/charts/Chart1'

export const ChartHandler = ({ id }) => {
  const chartList = [
    { id: '1', component: <Chart1 /> },
    { id: '2', component: "22" },
  ];

  return chartList.find(item => item.id === id).component

}
