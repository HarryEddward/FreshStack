
// @routes/[lang]/admin/_routes//_validation.ts

import { z } from "npm:zod@3.23.8";


export const GET_langAdminFormSchema = z.object({
});

export interface IGET_langAdminFormSchema {
  data?: z.infer<typeof GET_langAdminFormSchema>
};


export const POST_langAdminFormSchema = z.object({
});

export interface IPOST_langAdminFormSchema {
  data?: z.infer<typeof POST_langAdminFormSchema>
};



export const PUT_langAdminFormSchema = z.object({
});

export interface IPUT_langAdminFormSchema {
  data?: z.infer<typeof PUT_langAdminFormSchema>
};



export const DELETE_langAdminFormSchema = z.object({
});

export interface IDELETE_langAdminFormSchema {
  data?: z.infer<typeof DELETE_langAdminFormSchema>
};
