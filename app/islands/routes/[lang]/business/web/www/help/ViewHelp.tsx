import { useState } from 'preact/hooks';
import { HelpCircleIcon, ChevronDownIcon } from 'npm:lucide-preact@^0.485.0';

export default function LangBusinessWebWWWIslandViewHelp() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Qué es CafeBuy Suite?",
      answer:
        "CafeBuy Suite es una plataforma integral diseñada para cafeterías, restaurantes y negocios de hostelería, que ofrece herramientas para automatizar operaciones, gestionar inventarios y escalar tu negocio con facilidad.",
    },
    {
      question: "¿Cómo puedo contactar al soporte técnico?",
      answer:
        "Puedes contactar a nuestro equipo de soporte técnico enviando un correo a <a href='mailto:technicalsupport@cafebuy.com' class='text-blue-600 hover:underline'>technicalsupport@cafebuy.com</a>. Estamos disponibles para ayudarte con cualquier problema técnico.",
    },
    {
      question: "¿Ofrecen planes personalizados para mi negocio?",
      answer:
        "Sí, ofrecemos soluciones personalizadas adaptadas a las necesidades de tu cafetería o restaurante. Contacta a nuestro equipo de ventas en <a href='mailto:sales@cafebuy.com' class='text-blue-600 hover:underline'>sales@cafebuy.com</a> para más detalles.",
    },
    {
      question: "¿Cómo funciona la facturación en CafeBuy?",
      answer:
        "Nuestro equipo de facturación gestiona tus pagos de forma transparente. Puedes consultar detalles o resolver dudas enviando un correo a <a href='mailto:billing@cafebuy.com' class='text-blue-600 hover:underline'>billing@cafebuy.com</a>.",
    },
    {
      question: "¿Está CafeBuy disponible en mi región?",
      answer:
        "CafeBuy opera a nivel global. Para confirmar la disponibilidad en tu región, contacta a nuestro equipo en <a href='mailto:customerservice@cafebuy.com' class='text-blue-600 hover:underline'>customerservice@cafebuy.com</a>.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <HelpCircleIcon className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">
                {faq.question}
              </span>
            </div>
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`px-6 pb-5 text-gray-600 text-sm leading-relaxed ${
              openIndex === index ? 'block' : 'hidden'
            }`}
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />
        </div>
      ))}
    </div>
  );
}
