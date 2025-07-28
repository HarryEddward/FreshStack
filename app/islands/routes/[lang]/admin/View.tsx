import { useEffect, useRef } from "preact/hooks";
import Router from 'preact-router';

import Global_QrSvg from "@islands/routes/[global]/QrSvg.tsx";
import LangAdminViewHome from "./ViewHome.tsx";
import LangAdminViewBusiness from "./ViewBusiness.tsx";
import useRPCWebsocketsRequestsList from '@islands/hooks/useRPCWebsocketsRequestsList.ts';
import useRPCWebsockets from '@islands/hooks/useRPCWebsockets.ts';
import { Props, PropsData } from "@routes/[lang]/admin/index.tsx";
import { PageProps } from "$fresh/server.ts";

export default function LangAdminView({ data }: { data: PropsData }) {

  const { makeRequest, stateRequestSignal } = useRPCWebsockets('business.request.waiter.call');
  

    useRPCWebsocketsRequestsList([
      () => makeRequest({
          "where": {
              "country_of_incorporation": "Spain",
              "legal_form": "SL"
          },
          "include": {
              "compliance": true,
              "commercial_relationship": true,
              "supporting_documents": true,
              "phones": true
          },
          "orderBy": {
              "legal_name": "asc"
          }
      }),
    ])
  return (
    <Router>
      {/*<div path="/home" default>
        <LangAdminNavbar/>
        <Global_QrSvg text="2ad0106a-7fd1-492e-8510-74d12b06f656"/>
      </div>*/}
      <LangAdminViewHome data={data} path="/ca-mall/admin/home" default/>
      <LangAdminViewBusiness path="/ca-mall/admin/business"/>
    </Router>
  );
}
