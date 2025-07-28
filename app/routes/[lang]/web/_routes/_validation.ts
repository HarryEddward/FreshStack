
// @routes/[lang]/web/_routes//_validation.ts

import { z } from "npm:zod@3.23.8";


export const GET_langWebFormSchema = z.object({
});

export interface IGET_langWebFormSchema {
  data?: z.infer<typeof GET_langWebFormSchema>
};


export const POST_langWebFormSchema = z.object({
});

export interface IPOST_langWebFormSchema {
  data?: z.infer<typeof POST_langWebFormSchema>
};



export const PUT_langWebFormSchema = z.object({
});

export interface IPUT_langWebFormSchema {
  data?: z.infer<typeof PUT_langWebFormSchema>
};



export const DELETE_langWebFormSchema = z.object({
});

export interface IDELETE_langWebFormSchema {
  data?: z.infer<typeof DELETE_langWebFormSchema>
};
