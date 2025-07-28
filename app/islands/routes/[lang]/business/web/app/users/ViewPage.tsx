import {
  LayoutDashboardIcon,
  BarChartIcon,
  SettingsIcon,
  UsersIcon,
  PlusSquareIcon,
  PlusIcon,
  TrashIcon,
  FileChartColumnIncreasingIcon,
  SendIcon
} from "npm:lucide-preact@^0.485.0";
import LangBusinessWebWWWIslandFooter from "@islands/routes/[lang]/business/web/www/Footer.tsx";
import { JSX } from "preact";
import LangBusinessWebWWWComponentNavbar from '@components/routes/lang/business/web/www/Navbar.tsx';
import Global_GenericSelect from '@islands/routes/[global]/GenericSelect.tsx';
import Global_ToggleSwitch from "../../../../../[global]/ToggleSwitch.tsx";
import { Tooltip } from '@islands/routes/[lang]/business/web/www/Tooltip.tsx';
import LangBusinessWebWWWIslandLineChart from '@islands/routes/[lang]/business/web/www/LineChart.tsx';
import LangBusinessWebWWWIslandHorizontalBarChart from '@islands/routes/[lang]/business/web/www/_examples/graphs/HorizontalBarChart.tsx';
import LangBusinessWebWWWIslandDoughnutChart from '@islands/routes/[lang]/business/web/www/DoughnutChart.tsx';
import LangBusinessWebWWWIslandRadarChart from '@islands/routes/[lang]/business/web/www/_examples/graphs/RadarChart.tsx';
import { useSignal } from '@preact/signals';


const options = [
  { label: "Waiter", value: "waiter" },
  { label: "Chef", value: "chef" },
  { label: "All", value: "all" },
];

const handleDarkModeToggle = (enabled: boolean) => {
    console.log("Dark mode:", enabled);
    // Aquí puedes activar dark mode, guardar en localStorage, etc.
  };

export default function LangBusinessWebAppUsersIslandViewPage({
  actualLang,
}: {
  actualLang: string;
}) {
  /**
   * A la hora de poder gestionar actulizaciónes (como CURD)
   * se manejara por un mismo array para poder luego aplicarse
   * de forma sostenida todas las nuevas actualizaciónes a realizarse.
   */
  
  

  const users = [
    "Adrian Martín",
    "Roberto Piriera",
    "Paula Izquierdo",
    "Laura Espionza",
    "Lucas Martorell",
    "Lucia Casandra",
    "Tomas Young"
  ]


  const optionsPanel = [
    "analisis",
    "create",
  ];
  const statePanel = useSignal<string>(optionsPanel[0]);

  function renderPanel(panel: string) {
    switch (panel) {
      case "create":
        return <ViewCreateEmployee />;
      case "analisis":
        return <ViewAnalisisEmployee />;
      default:
        return null;
    }
  }




  return (
    <div className={"w-full h-full overflow-x-hidden"}>
      <LangBusinessWebWWWComponentNavbar authenticated={true}/>
      <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center p-4 bg-gray-50 border-2">
        <div className="w-full h-[80vh] max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 rounded-xl shadow-lg p-4">
          <div className="w-full h-full p-8 flex flex-col justify-evenly items-start bg-white rounded-xl shadow gap-y-4">
            {
              users.length === 0 && (
                <span className={"text-5xl font-black text-gray-700"}>No hay empleados, disfruta tu día</span>
              )
            }
            
            <div className={"w-full h-[53vh] overflow-y-scroll overflow-x-hidden"}>
              {
                users.map((user) => (
                  <div className="w-full flex flex-row p-4 justify-evenly items-center bg-white">
                    <div className={"w-full flex flex-row justify-start items-center"}>{user.toString()}</div>
                    <div className={"w-full flex flex-row gap-x-4 justify-end items-center"}>
                      <Tooltip label="Activo/Desactivado">
                        <Global_ToggleSwitch
                          
                          checked={false}
                          onChange={handleDarkModeToggle}
                        />
                      </Tooltip>
                      <Global_GenericSelect
                        className="min-w-44"
                        options={options}
                        placeholder="Tipo de oficio"
                      />

                      <button
                      onClick={() => { statePanel.value = optionsPanel[0] }}
                      >
                        <Tooltip label="Analiticas">
                          <FileChartColumnIncreasingIcon />
                        </Tooltip>
                      </button>

                      

                      <Tooltip label="Eliminar">
                        <TrashIcon/>
                      </Tooltip>
                      
                    </div>
                  </div>

                ))
              }
            </div>
            
            <button
            onClick={() => { statePanel.value = optionsPanel[1] }}
            className="w-1/2 flex p-4 justify-center items-center border-2 rounded-md  border-dashed border-black"
            >
              <PlusIcon/>
            </button>
          </div>
          <div className=" p-4 flex flex-col justify-start items-center bg-white rounded-xl shadow overflow-y-scroll">
            {renderPanel(statePanel.value)}
          </div>
          
        </div>
      </div>
      <LangBusinessWebWWWIslandFooter />
    </div>
  );
}

function ViewAnalisisEmployee() {
  return (
     <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
      <LangBusinessWebWWWIslandLineChart />
      <LangBusinessWebWWWIslandHorizontalBarChart />
      <LangBusinessWebWWWIslandDoughnutChart />
      <LangBusinessWebWWWIslandDoughnutChart />
      <LangBusinessWebWWWIslandRadarChart />
      <LangBusinessWebWWWIslandLineChart />
    </div>
  )
}

function ViewCreateEmployee() {
  return (
    <div className={"w-full h-full flex flex-col justify-center items-center gap-y-4 bg-white"}>

      
      
      <input
        type="text"
        name="employee_name"
        placeholder="Nombre del empleado"
        className="w-1/2 border-2 border-gray-200 rounded-xl h-11 p-4 text-center placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
      />
      <div className={"w-1/2 flex flex-row justify-between items-center"}>
        
        <Global_GenericSelect
          className="min-w-44"
          options={options}
          placeholder="Tipo de oficio"
        />
        <Tooltip label="Activo/Desactivado">
          <Global_ToggleSwitch
            checked={true}
            onChange={handleDarkModeToggle}
          />
        </Tooltip>

      </div>
      <button className="group w-1/2 flex p-4 justify-center items-center border-2 rounded-md border-dashed border-black bg-white hover:bg-green-200 transition-colors duration-500 relative overflow-hidden">
        <PlusIcon/>
      </button>


      
    </div>
  )
}
