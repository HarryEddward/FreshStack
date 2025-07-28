
// @routes/[lang]/app/_routes/_validation.ts

import { z } from "npm:zod@3.23.8";


export const GET_langAppFormSchema = z.object({
});

export interface IGET_langAppFormSchema {
  data?: z.infer<typeof GET_langAppFormSchema>
};


export const POST_langAppFormSchema = z.object({
});

export interface IPOST_langAppFormSchema {
  data?: z.infer<typeof POST_langAppFormSchema>
};



export const PUT_langAppFormSchema = z.object({
});

export interface IPUT_langAppFormSchema {
  data?: z.infer<typeof PUT_langAppFormSchema>
};



export const DELETE_langAppFormSchema = z.object({
});

export interface IDELETE_langAppFormSchema {
  data?: z.infer<typeof DELETE_langAppFormSchema>
};
