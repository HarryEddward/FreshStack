import { useEffect, useRef } from "preact/hooks";
import Chart from "chart.js/auto";

export default function LangBusinessWebWWWIslandHorizontalBarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'bar', // Sigue siendo 'bar', pero cambiamos el eje
      data: {
        labels: ['Puntuación de Clientes', 'Calidad del Producto', 'Soporte Técnico', 'Tiempo de Entrega'],
        datasets: [{
          label: 'Satisfacción (de 1 a 10)',
          data: [9.2, 8.5, 7.8, 9.5],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y', // <-- La clave para un gráfico horizontal
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false } // A menudo se oculta en este tipo de gráfico
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