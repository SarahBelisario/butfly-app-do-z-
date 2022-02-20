import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Legend)

export function DonutChart() {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: [80, 20],
            backgroundColor: ['#30e6ac', 'rgba(0, 0, 0, 0)'],
            borderWidth: 0,
            borderRadius: 20,
          },
          { data: [], weight: 0.4 },
          {
            data: [30, 70],
            backgroundColor: ['#6200ff', 'rgba(0, 0, 0, 0)'],
            borderWidth: 0,
            borderRadius: 20,
          },
        ],
      }}
      options={{
        cutout: '80%',
      }}
    />
  )
}
