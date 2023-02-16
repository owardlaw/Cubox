import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => index), // Use array index as x values
    datasets: [
      {
        label: "Solves",
        data: data, // Use array elements as y values
        fill: false,
        borderColor: "rgba(255,255,255,1)",
      },
    ],
  };

  const legend = {
    display: false,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // set color of x ticks
        },
      },
      y: {
        ticks: {
          color: 'white', // set color of y ticks
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} legend={legend} />;
};

export default LineChart;
