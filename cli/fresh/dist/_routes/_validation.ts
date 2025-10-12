
// @router/[lang]/hello/_validation.ts

import { z } from "npm:zod@3.23.8";


export const GET_langBusinessFormSchema = z.object({
});

export interface IGET_langBusinessFormSchema {
  data?: z.infer<typeof GET_langBusinessFormSchema>
};


export const POST_langBusinessFormSchema = z.object({
});

export interface IPOST_langBusinessFormSchema {
  data?: z.infer<typeof POST_langBusinessFormSchema>
};



export const PUT_langBusinessFormSchema = z.object({
});

export interface IPUT_langBusinessFormSchema {
  data?: z.infer<typeof PUT_langBusinessFormSchema>
};



export const DELETE_langBusinessFormSchema = z.object({
});

export interface IDELETE_langBusinessFormSchema {
  data?: z.infer<typeof DELETE_langBusinessFormSchema>
};
