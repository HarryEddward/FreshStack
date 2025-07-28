
// @routes/[lang]/business/web/app/_routes//_validation.ts

import { z } from "npm:zod@3.23.8";


export const GET_langBusinessWebAppFormSchema = z.object({
});

export interface IGET_langBusinessWebAppFormSchema {
  data?: z.infer<typeof GET_langBusinessWebAppFormSchema>
};


export const POST_langBusinessWebAppFormSchema = z.object({
});

export interface IPOST_langBusinessWebAppFormSchema {
  data?: z.infer<typeof POST_langBusinessWebAppFormSchema>
};



export const PUT_langBusinessWebAppFormSchema = z.object({
});

export interface IPUT_langBusinessWebAppFormSchema {
  data?: z.infer<typeof PUT_langBusinessWebAppFormSchema>
};



export const DELETE_langBusinessWebAppFormSchema = z.object({
});

export interface IDELETE_langBusinessWebAppFormSchema {
  data?: z.infer<typeof DELETE_langBusinessWebAppFormSchema>
};
