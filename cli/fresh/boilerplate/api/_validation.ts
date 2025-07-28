export const _validation: string = `
// <%= componentPathRouter %>/_validation.ts

import { z } from "npm:zod@3.23.8";


export const GET_<%= componentName %>FormSchema = z.object({
});

export interface IGET_<%= componentName %>FormSchema {
  data?: z.infer<typeof GET_<%= componentName %>FormSchema>
};


export const POST_<%= componentName %>FormSchema = z.object({
});

export interface IPOST_<%= componentName %>FormSchema {
  data?: z.infer<typeof POST_<%= componentName %>FormSchema>
};



export const PUT_<%= componentName %>FormSchema = z.object({
});

export interface IPUT_<%= componentName %>FormSchema {
  data?: z.infer<typeof PUT_<%= componentName %>FormSchema>
};



export const DELETE_<%= componentName %>FormSchema = z.object({
});

export interface IDELETE_<%= componentName %>FormSchema {
  data?: z.infer<typeof DELETE_<%= componentName %>FormSchema>
};
`;