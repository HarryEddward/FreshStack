
// @routes/api/v1/public/business/ws/_routes//_validation.ts

import { z } from "npm:zod@3.23.8";




export const GET_apiV1PublicBusinessWsFormSchema = z.object({
});

const valueSchema = z.union([z.any(), z.any()]);
const recordStringNumber = z.record(valueSchema);

// JSONWebsocketsStructure
export const JSONWebsocketsStructureFormSchema = z.object({
    v: z.number(),
    method: z.string(),
    meta: recordStringNumber.default({}),
    data: recordStringNumber.default({}),
});

export interface IGET_apiV1PublicBusinessWsFormSchema {
  data?: z.infer<typeof GET_apiV1PublicBusinessWsFormSchema>
};


export const POST_apiV1PublicBusinessWsFormSchema = z.object({
});

export interface IPOST_apiV1PublicBusinessWsFormSchema {
  data?: z.infer<typeof POST_apiV1PublicBusinessWsFormSchema>
};



export const PUT_apiV1PublicBusinessWsFormSchema = z.object({
});

export interface IPUT_apiV1PublicBusinessWsFormSchema {
  data?: z.infer<typeof PUT_apiV1PublicBusinessWsFormSchema>
};



export const DELETE_apiV1PublicBusinessWsFormSchema = z.object({
});

export interface IDELETE_apiV1PublicBusinessWsFormSchema {
  data?: z.infer<typeof DELETE_apiV1PublicBusinessWsFormSchema>
};
