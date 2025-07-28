
// @routes/[lang]/[license]/_routes//_validation.ts

import { z } from "npm:zod@3.23.8";


export const GET_lang_licenseFormSchema = z.object({
});

export interface IGET_lang_licenseFormSchema {
  data?: z.infer<typeof GET_lang_licenseFormSchema>
};


export const POST_lang_licenseFormSchema = z.object({
});

export interface IPOST_lang_licenseFormSchema {
  data?: z.infer<typeof POST_lang_licenseFormSchema>
};



export const PUT_lang_licenseFormSchema = z.object({
});

export interface IPUT_lang_licenseFormSchema {
  data?: z.infer<typeof PUT_lang_licenseFormSchema>
};



export const DELETE_lang_licenseFormSchema = z.object({
});

export interface IDELETE_lang_licenseFormSchema {
  data?: z.infer<typeof DELETE_lang_licenseFormSchema>
};
