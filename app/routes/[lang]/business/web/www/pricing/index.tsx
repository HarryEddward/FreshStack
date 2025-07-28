import LangBusinessWebWWWComponentNavbar from '@components/routes/lang/business/web/www/Navbar.tsx';
import LangBusinessWebWWWComponentPlans from "@components/routes/lang/business/web/www/Plans.tsx";
import LangBusinessWebWWWIslandFooter from "@islands/routes/[lang]/business/web/www/Footer.tsx";

export default function langBusinessWebWWWPricing() {
  return (
    <>
    <div className={"w-full w-full"}>
      <LangBusinessWebWWWComponentNavbar/>
      
      <div className="text-center mb-16 mt-24">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          No pierdas mas tiempo en tonterias.
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Tus empleados rinden menos y pierdes dinero.
        </p>
      </div>
      <LangBusinessWebWWWComponentPlans/>
    </div>
    <LangBusinessWebWWWIslandFooter/>
    </>
  )
}
