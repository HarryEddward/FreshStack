import React from 'react'
import { Link } from "npm:preact-router@^4.1.2";
import { Building2, Building2Icon, HouseIcon } from 'npm:lucide-preact@^0.485.0';

export default function LangAdminNavbar() {
  return (
    <nav className={" fixed bottom-0 left-0 flex flex-row justify-evenly w-full p-4 border-t-2 bg-white"}>
      <Link activeClassName="active" href="/ca-mall/admin/home">
        <HouseIcon/>
      </Link>
      <Link activeClassName="active" href="/ca-mall/admin/business">
        <Building2Icon/>
      </Link>
    </nav>
  )
}
