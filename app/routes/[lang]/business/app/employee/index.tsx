import LangBusinessAppComponentNavbar from "@components/routes/lang/business/web/app/Navbar.tsx";
import LangBusinessAppComponentNavigationBar from "../../../../../islands/routes/[lang]/business/app/NavigationBar.tsx";
import LangBusinessAppIslandNavigationBar from "@islands/routes/[lang]/business/app/NavigationBar.tsx";

export default function Index() {
  return (
    <div className="w-full h-screen p-4">
      <div className={"w-full h-full flex flex-col items-center justify-evenly border-2"}>
        <div className={"text-5xl font-dancing "}>
          Hi
        </div>
      </div>
      <LangBusinessAppIslandNavigationBar/>
    </div>
    
  )
}
