
import 'react';

import { useState } from 'preact/hooks';
import { Switch } from "npm:@headlessui/react";

export default function ClientTicketProcesor() {
  // Estado para el switch (opcional, si lo necesitas)
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
        <label htmlFor="ticket-toggle">¿Quieres el ticket?</label>
      
    </div>
  );
}