import LangBusinessWebWWWComponentNavbar from '@components/routes/lang/business/web/www/Navbar.tsx';
import LangBusinessWebWWWIslandFooter from "@islands/routes/[lang]/business/web/www/Footer.tsx";

export default function langBusinessWebWWWPrivacy() {
  return (
    <>
    <div className={"w-full w-full"}>
      <LangBusinessWebWWWComponentNavbar/>
      <div className={"w-full flex flex-col items-left justify-center  p-8 mt-16"}>
            <h5 className={"text-4xl font-semibold text-left"}>Privacy</h5>
      </div>        
    </div>
    <LangBusinessWebWWWIslandFooter/>
    </>
  )
}
