// @routes/[lang]/client/_validation.ts

import { z } from "npm:zod@3.23.8";

export const POST_langClientApp_formSchema = z.object({
  terms: z.literal("accepted"),
  ticket: z.literal("requested").optional(),
  ticket_email: z.string().optional(),
}).superRefine((data, ctx) => {
  const emailSchema = z.string()
    .min(1, { message: "Este campo es obligatorio." })
    .email("Este correo no es válido.");

  if (data.ticket === "requested") {
    const result = emailSchema.safeParse(data.ticket_email);
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue({
          code: issue.code,
          message: issue.message,
          path: ["ticket_email"],
        });
      }
    }
  }
});

export interface IPOST_langClientApp_formSchema {
  data?: z.infer<typeof POST_langClientApp_formSchema>
};