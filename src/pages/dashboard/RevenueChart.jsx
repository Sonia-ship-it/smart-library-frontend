import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {

  const revenueData = [500, 700, 800, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150];

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (USD)',
        data: revenueData,
        backgroundColor: '#D97706', // Primary Amber
        hoverBackgroundColor: '#451A03', // Deep Chocolate on hover
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#451A03',
        titleFont: { family: 'Outfit', size: 14 },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(69, 26, 3, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: 'rgba(69, 26, 3, 0.4)',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: 'rgba(69, 26, 3, 0.4)',
        }
      }
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
