
// @routes/[lang]/business/web/app/users/_routes//_validation.ts

import { z } from "npm:zod@3.23.8";


export const GET_langBusinessWebAppUsersFormSchema = z.object({
});

export interface IGET_langBusinessWebAppUsersFormSchema {
  data?: z.infer<typeof GET_langBusinessWebAppUsersFormSchema>
};


export const POST_langBusinessWebAppUsersFormSchema = z.object({
});

export interface IPOST_langBusinessWebAppUsersFormSchema {
  data?: z.infer<typeof POST_langBusinessWebAppUsersFormSchema>
};



export const PUT_langBusinessWebAppUsersFormSchema = z.object({
});

export interface IPUT_langBusinessWebAppUsersFormSchema {
  data?: z.infer<typeof PUT_langBusinessWebAppUsersFormSchema>
};



export const DELETE_langBusinessWebAppUsersFormSchema = z.object({
});

export interface IDELETE_langBusinessWebAppUsersFormSchema {
  data?: z.infer<typeof DELETE_langBusinessWebAppUsersFormSchema>
};
