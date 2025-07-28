import { useEffect, useRef } from "preact/hooks";
import Chart from "chart.js/auto";

export default function LangBusinessWebWWWIslandLineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Ventas 2024',
          data: [65, 59, 80, 81, 56, 55],
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.2
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