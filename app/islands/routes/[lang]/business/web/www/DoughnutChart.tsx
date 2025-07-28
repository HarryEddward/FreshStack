import { useEffect, useRef } from "preact/hooks";
import Chart from "chart.js/auto";

export default function LangBusinessWebWWWIslandDoughnutChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Móvil', 'Escritorio', 'Tableta'],
        datasets: [{
          label: 'Tráfico Web',
          data: [300, 150, 50],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
    return () => chart.destroy();
  }, []);

  return (
    <div className="relative h-80 w-full rounded-lg shadow-md bg-white">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}