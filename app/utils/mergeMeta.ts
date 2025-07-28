// utils/mergeMeta.ts
export type MetaComponent = {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  og?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
};

export function mergeMeta(...metas: MetaComponent[]): MetaComponent {
  // Combina los títulos, descripciones, etc., de todos los metas recibidos
  return {
    title: metas.map((m) => m.title).join(" | "), // Títulos combinados con "|"
    description: metas.map((m) => m.description).join(" "), // Descripciones combinadas
    keywords: metas.map((m) => m.keywords).filter(Boolean).join(", "), // Keywords (se eliminan valores falsos)
    canonical: metas.map((m) => m.canonical).filter(Boolean)[0] ?? "", // Únicamente el primer canonical que no sea vacío
    og: {
      title: metas.map((m) => m.og?.title ?? "").join(" | "), // Open Graph title
      description: metas.map((m) => m.og?.description ?? "").join(" "), // Open Graph description
      image: metas.map((m) => m.og?.image ?? "").join(" "), // Open Graph image
      url: metas.map((m) => m.og?.url ?? "").join(" "), // Open Graph URL
      type: metas.map((m) => m.og?.type ?? "").join(" "), // Open Graph type (e.g., "website", "article")
    },
  };
}
