import { useEffect, useRef } from "preact/hooks";
import Chart from "chart.js/auto";

export default function LangBusinessWebWWWIslandRadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'radar',
      data: {
        labels: ['Marketing', 'Ventas', 'Soporte', 'Desarrollo', 'Diseño'],
        datasets: [{
          label: 'Equipo A',
          data: [8, 6, 9, 7, 8],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
        }, {
          label: 'Equipo B',
          data: [5, 8, 5, 9, 6],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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