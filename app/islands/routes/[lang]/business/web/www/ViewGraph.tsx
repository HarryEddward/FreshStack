import { useEffect, useRef } from "preact/hooks";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const LangBusinessWebWWWIslandViewGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Asegúrate de que Chart.js y el plugin están disponibles
    Chart.register(ChartDataLabels);

    const productos = ["CafeBuy (Business Suite) (IVA incl.)", "Average Business Suite (IVA incl.)", "Otro Competidor (POS)", "Otro Competidor (POS)", "Otro Competidor (POS)"];
    const costeInicial = [0, 0, 799, 399, 0];
    const costeMensual = [150, 302.5, 69, 14, 69];

    const coloresFondoInicial = costeInicial.map((_, i) =>
      i === 0 ? "#86efac" : "rgba(128, 128, 128, 0.3)"
    );
    const coloresFondoMensual = productos.map(producto =>
      producto.includes("Business Suite") ? "#bbf7d0" : "rgba(128, 128, 128, 0.3)"
    );

    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: productos,
        datasets: [
          {
            label: "Coste inicial (€)",
            data: costeInicial,
            backgroundColor: coloresFondoInicial,
            borderColor: coloresFondoInicial,
            borderWidth: 1,
          },
          {
            label: "Coste mensual (€)",
            data: costeMensual,
            backgroundColor: coloresFondoMensual,
            borderColor: coloresFondoMensual,
            borderWidth: 1,
          },
        ],
      },
      options: {
        // --- CAMBIOS CLAVE AQUÍ ---
        responsive: true,
        maintainAspectRatio: false, // Permite que el gráfico llene el contenedor sin mantener una relación de aspecto fija.
        // --- FIN DE CAMBIOS CLAVE ---
        plugins: {
          legend: {
            display: true,
            labels: { boxWidth: 20, padding: 15 },
          },
          title: {
            display: true,
            text: "",
            font: { size: 18 },
          },
          tooltip: {
            callbacks: {
              label: context => `${context.parsed.y}€`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            stacked: true,
          },
        },
      },
    });
    
    // Limpieza al desmontar el componente
    return () => {
      chart.destroy();
    };

  }, []);

  // --- ESTRUCTURA MODIFICADA ---
  // Envolvemos el canvas en un div. El div se encarga del tamaño y los estilos.
  return (
    <div className="relative w-full h-80 p-4 border rounded-lg shadow-md bg-white">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default LangBusinessWebWWWIslandViewGraph;