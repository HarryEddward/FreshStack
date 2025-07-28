import LangBusinessAppComponentNavbar from "@components/routes/lang/business/web/app/Navbar.tsx";

export default function Index() {
  return (
    <div className="w-full h-screen p-4">
      <LangBusinessAppComponentNavbar/>
      <div className={"w-full h-full flex flex-col items-center justify-evenly border-2"}>
        <div className={"text-5xl font-dancing "}>
          Employee App
        </div>

        <button className={"flex w-full border-2"}>
          <a href="/en/business/app/employee" className={"w-full h-full flex items-center justify-center"}>
            Enter
          </a>
        </button>
      </div>
    </div>
    
  )
}
