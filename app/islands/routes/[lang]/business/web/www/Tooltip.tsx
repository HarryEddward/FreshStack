import { createPortal } from 'preact/compat';
import { useLayoutEffect, useRef, useState } from 'preact/hooks';
import clsx from 'clsx';
import type { JSX } from 'preact';

interface TooltipProps {
  children: preact.ComponentChildren;
  label: string;
  className?: string;
}

const MARGIN = 10; // Un poco más de margen para que "respire"

export function Tooltip({ children, label, className }: TooltipProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null); // Ref para el propio tooltip

  const [visible, setVisible] = useState(false);
  // El estado ahora será un objeto de estilo para controlar la opacidad y evitar parpadeos
  const [style, setStyle] = useState<JSX.CSSProperties>({
    opacity: 0, // Empezamos con opacidad 0
    position: 'fixed',
    zIndex: 9999,
    width: 'max-content',
    maxWidth: '220px',
  });

  useLayoutEffect(() => {
    if (!visible) {
      // Si se oculta, lo reseteamos para la proxima vez
      setStyle(prevStyle => ({ ...prevStyle, opacity: 0 }));
      return;
    }

    // Nos aseguramos de que ambos elementos estén en el DOM para medirlos
    const triggerEl = triggerRef.current;
    const tooltipEl = tooltipRef.current;
    if (!triggerEl || !tooltipEl) return;

    // 1. Medimos ambos rectángulos
    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect(); // ¡Medimos el tooltip real!

    const viewportWidth = globalThis.window.innerWidth;

    // 2. Lógica de posicionamiento VERTICAL (Arriba por defecto)
    let top;
    // ¿Hay espacio arriba?
    if (triggerRect.top >= tooltipRect.height + MARGIN) {
      top = triggerRect.top - tooltipRect.height - MARGIN; // Posiciónalo arriba
    } else {
      // Si no, ponlo abajo
      top = triggerRect.bottom + MARGIN;
    }

    // 3. Lógica de posicionamiento HORIZONTAL (con el ancho real)
    // Centrado ideal
    let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);

    // Corregimos desbordamiento derecho
    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - MARGIN;
    }

    // Corregimos desbordamiento izquierdo
    if (left < 0) {
      left = MARGIN;
    }

    // 4. Actualizamos el estilo final, ahora con opacidad 1 para mostrarlo
    setStyle(prevStyle => ({
      ...prevStyle,
      top: `${top}px`,
      left: `${left}px`,
      opacity: 1, // ¡Hazlo visible!
    }));

  }, [visible, label]); // Se ejecuta cuando cambia la visibilidad o el texto

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={clsx("inline-block", className)}
      >
        {children}
      </div>

      {/* El portal se renderiza cuando `visible` es true.
        La primera vez, se renderiza con opacidad 0. useLayoutEffect lo mide
        y lo reposiciona inmediatamente antes de que sea visible.
      */}
      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            style={style}
            className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl shadow-xl transition-opacity duration-150"
          >
            {label}
          </div>,
          document.body
        )}
    </>
  );
}