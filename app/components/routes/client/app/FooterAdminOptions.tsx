import clsx from 'clsx';

interface Props {
  className?: string;
}

export default function FooterAdminOptions({ className }: Props) {
  return (
    <div className={clsx("flex w-full flex-col items-center gap-y-6", className)}>
        <details class="group overflow-hidden transition-all duration-500">
            <summary class="cursor-pointer">Opciones</summary>
            <div class="max-h-0 group-open:max-h-40 transition-all duration-500 flex flex-col gap-y-2">
                <a
                type={"button"}
                className={"mt-4 text-black border-black text-2xl px-8 py-4 font-dancing border-2 rounded-lg bg-green-300 hover:bg-green-400"}
                href="/es/client/app/login"
                >Login</a>
            </div>
        </details>
    </div>
  )
}
