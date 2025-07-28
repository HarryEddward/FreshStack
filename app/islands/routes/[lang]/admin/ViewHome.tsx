import QrCode from "../../[global]/QrSvg.tsx";
import LangAdminNavbar from './Navbar.tsx';
import { IGET_langAdminPayload } from '@routes/[lang]/admin/_routes/_payload.ts';

export default function LangAdminViewHome({ data }: { data: IGET_langAdminPayload }) {
  if (data.error) {
    return <div>Error :(</div>;
  }

  const business = data.business?.["data"] || [];
  const businessLicense = data.businessLicense || [];

  return (
    <div className="flex flex-col h-screen w-full justify-end items-center">
      <div className="flex flex-col h-full w-full p-4 gap-y-4 overflow-y-scroll">
        <span className={"text-6xl font-dancing pl-3 pt-2"}>Home</span>

        <div className="flex flex-col p-4 mt-4 border-2">
          <span className={"text-4xl font-semibold"}>Testing Users:</span>

          <div className="flex w-full flex-col pt-4 gap-y-6 overflow-y-auto">
            {businessLicense.map((entry, idx) => (
              <div key={entry.businessId || idx} className="flex flex-row border-2 p-4 gap-y-4">
                

                <div className="flex flex-row flex-wrap gap-4">
                  {entry.licenses.map((license: Record<any, any>, index: number) => (
                    <div key={license.id || index} className="flex flex-col items-center border p-2">
                      <QrCode text={license.id || ""} />
                      <span className={`text-sm mt-2`}>{license.id}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-y-2 pl-2">
                  {business
                    .filter((biz) => biz.id === entry.businessId)
                    .map((biz, i) => (
                      <div key={i} className="flex flex-col p-2 mb-2 bg-gray-50 rounded pr-12">
                        <span className="text-xl font-bold py-3">Business ID: {entry.businessId}</span>
                        {Object.entries(biz).map(([key, value]) => (
                          <div key={key} className="flex flex-row gap-x-2">
                            <span className="font-bold">{key}:</span>
                            <span className="truncate max-w-md">
                              {value === null || value === undefined
                                ? "None"
                                : typeof value === "object"
                                ? <pre className="whitespace-pre-wrap break-words text-sm">{JSON.stringify(value, null, 2)}</pre>
                                : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LangAdminNavbar />
    </div>
  );
}
