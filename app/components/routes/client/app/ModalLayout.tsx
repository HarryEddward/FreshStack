import { ComponentChildren } from 'preact/src/index.d.ts';

interface Props {
  children: ComponentChildren;
}

export default function ComponentClientAppModalLayout({ children }: Props) {
  return (
    <div className={"absolute flex w-screen h-screen bg-black/60 justify-center items-center z-[60] overflow-y-scroll"}>
        <div className="bg-white rounded-lg p-4 w-[95%] max-h-[70%]  overflow-x-hidden z-50">
            {children}
        </div>
    </div>
  )
}
