
// @routes/[lang]/client/app/private/services/transaction/_routes//_validation.ts

import { z } from "npm:zod@3.23.8";


export const GET_langClientAppTransactionFormSchema = z.object({
});

export interface IGET_langClientAppTransactionFormSchema {
  data?: z.infer<typeof GET_langClientAppTransactionFormSchema>
};


export const POST_langClientAppTransactionFormSchema = z.object({
});

export interface IPOST_langClientAppTransactionFormSchema {
  data?: z.infer<typeof POST_langClientAppTransactionFormSchema>
};



export const PUT_langClientAppTransactionFormSchema = z.object({
});

export interface IPUT_langClientAppTransactionFormSchema {
  data?: z.infer<typeof PUT_langClientAppTransactionFormSchema>
};



export const DELETE_langClientAppTransactionFormSchema = z.object({
});

export interface IDELETE_langClientAppTransactionFormSchema {
  data?: z.infer<typeof DELETE_langClientAppTransactionFormSchema>
};
