import {
  LayoutDashboardIcon,
  BarChartIcon,
  SettingsIcon,
  UsersIcon,
  DownloadIcon,
} from "npm:lucide-preact@^0.485.0";
import LangBusinessWebWWWIslandFooter from "@islands/routes/[lang]/business/web/www/Footer.tsx";
import { JSX } from "preact";
import LangBusinessWebWWWComponentNavbar from '@components/routes/lang/business/web/www/Navbar.tsx';
import LangBusinessWebWWWIslandViewGraph from '@islands/routes/[lang]/business/web/www/ViewGraph.tsx';
import LangBusinessWebWWWIslandLineChart from '@islands/routes/[lang]/business/web/www/LineChart.tsx';
import LangBusinessWebWWWIslandDoughnutChart from '@islands/routes/[lang]/business/web/www/DoughnutChart.tsx';
import LangBusinessWebWWWIslandRadarChart from '@islands/routes/[lang]/business/web/www/_examples/graphs/RadarChart.tsx';
import LangBusinessWebWWWIslandHorizontalBarChart from '@islands/routes/[lang]/business/web/www/_examples/graphs/HorizontalBarChart.tsx';

export default function LangBusinessWebAppAnaliticsIslandViewPage({
  actualLang,
}: {
  actualLang: string;
}) {
  const pdfsGeneratorsIA = [
    { name: "Reposición Mensual" },
    { name: "Reposición Total" },
    { name: "Ventas" },
    { name: "Ingresos" },
    { name: "Reporte Diario" },
    { name: "Top Productos" },
    { name: "Comparativa Anual" },
  ];

  return (
    <div className="w-full h-full overflow-x-hidden bg-white">
      <LangBusinessWebWWWComponentNavbar authenticated={true} />
      
      <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center p-6 gap-y-8">

        {/* ANÁLISIS GENERAL (Secundario pero relevante) */}
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Análisis General</h2>
          <p className="text-gray-600 mb-4">Visualización de datos generales del negocio.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <LangBusinessWebWWWIslandLineChart />
            <LangBusinessWebWWWIslandHorizontalBarChart />
            <LangBusinessWebWWWIslandDoughnutChart />
            <LangBusinessWebWWWIslandDoughnutChart />
            <LangBusinessWebWWWIslandRadarChart />
            <LangBusinessWebWWWIslandLineChart />
          </div>
        </div>

        {/* GENERADOR DE PDF IA (Bloque primario) */}
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-black mb-4">📄 Generador de PDFs con IA</h2>
          <p className="text-black mb-6">Automatización inteligente de reportes importantes del negocio.</p>

          <div className="w-full overflow-x-auto">
            <div className="flex flex-nowrap gap-6 pb-2">
              {pdfsGeneratorsIA.map((pdf, index) => (
                <div
                  key={index}
                  className="min-w-[220px] max-w-[220px] h-[300px] p-4 border-2 flex flex-col bg-white shadow-xl rounded-lg justify-between hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="text-sm font-bold uppercase tracking-wide text-black border-b border-dashed border-gray-300 pb-2">
                    Documento IA
                  </div>

                  <div className="flex-1 flex items-center justify-center text-center px-2">
                    <span className="text-2xl text-black font-dancing">{pdf.name}</span>
                  </div>

                  <div className="mt-4">
                    <button
                      className="w-full py-2 px-3 text-sm bg-red-200 border-2 border-black text-black rounded-lg font-semibold hover:bg-red-300 transition flex flex-row gap-x-3 items-center justify-center"
                    >
                      <DownloadIcon />
                      <span>Generar PDF</span>
                      
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <LangBusinessWebWWWIslandFooter />
    </div>

  );
}