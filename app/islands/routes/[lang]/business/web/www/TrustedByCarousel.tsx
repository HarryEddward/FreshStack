const logos = [
  { name: "Google", src: "/img/business/web/www/logos/suppliers/google.png" },
  { name: "Stripe", src: "/img/business/web/www/logos/suppliers/stripe.png" },
  { name: "Visa", src: "/img/business/web/www/logos/suppliers/visa.png" },
  { name: "Mastercard", src: "/img/business/web/www/logos/suppliers/mastercard.png" },
];

export default function LangBusinessWebWWWIslandTrustedByCarousel() {
  const duplicatedLogos = [...logos, ...logos, ...logos]; // para loop visual

  return (
    <section class="bg-gray-100 py-6 overflow-hidden rounded-lg">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-center text-gray-600 uppercase text-sm mb-4 font-semibold tracking-wide">
          Usamos tecnología de confianza
        </h2>
        <div class="relative w-full overflow-hidden">
          <div class="animate-scroll-infinite flex gap-12 whitespace-nowrap">
            {duplicatedLogos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.name}
                class="h-10 w-auto inline-block grayscale opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
