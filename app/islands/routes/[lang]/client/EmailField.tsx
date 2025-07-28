import { useSignal } from "@preact/signals";

interface Props {
  placeholder?: string;
}

export default function ClientEmailField({ placeholder }: Props) {
  const textTicketEmail = useSignal<string>("");

  return (
    <input
    type="email"
    name="ticket_email"
    value={textTicketEmail.value}
    onInput={(e) => (textTicketEmail.value = e.currentTarget.value)}
    placeholder={placeholder || "Email (Per l'enví del ticket)"}
    id=""
    className={"w-full py-4 rounded-lg border-2 pl-3"}
    />
    
    
  )
}
