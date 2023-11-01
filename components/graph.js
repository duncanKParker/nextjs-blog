import { useEffect } from 'react';
import { Chart, LineController, CategoryScale, LinearScale, LineElement, PointElement, Title } from 'chart.js';

// Register the controllers
Chart.register(LineController, CategoryScale, LinearScale, LineElement, PointElement, Title);

export default function Graph() {
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Expenses',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
          },
          y: {
            type: 'linear',
          },
        },
      },
    });
  }, []);

  return (
    <div style={{ width: '400px', height: '200px' }}>
      <canvas id="myChart" width="100" height="50"></canvas>
    </div>
  );
}
