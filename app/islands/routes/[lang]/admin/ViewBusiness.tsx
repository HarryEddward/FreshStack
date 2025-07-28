import LangAdminNavbar from './Navbar.tsx';
import useRPCWebsockets from '@islands/hooks/useRPCWebsockets.ts';
import useRPCWebsocketsRequestsList from '@islands/hooks/useRPCWebsocketsRequestsList.ts';

export default function LangAdminViewBusiness() {

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
      <div className="flex flex-col h-screen w-full justify-end items-center">
            
          <div className="flex flex-col h-full w-full p-4 gap-y-4">
            <span className={"text-6xl font-dancing pl-3 pt-2"}>Business</span>
            <span>
              {JSON.stringify(stateRequestSignal, null, 2)}
            </span>
          </div>
          <LangAdminNavbar/>
          
      </div>
    )
}
