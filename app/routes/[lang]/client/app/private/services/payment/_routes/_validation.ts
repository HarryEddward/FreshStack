
// @routes/[lang]/client/app/private/services/payment/_routes//_validation.ts

import { z } from "npm:zod@3.23.8";


export const GET_langClientAppPaymentFormSchema = z.object({
});

export interface IGET_langClientAppPaymentFormSchema {
  data?: z.infer<typeof GET_langClientAppPaymentFormSchema>
};


export const POST_langClientAppPaymentFormSchema = z.object({
  card_number: z
    .string()
    .regex(/^\d{16}$/, 'El número de tarjeta debe tener 16 dígitos')
    .refine(
      (value) => {
        // Validación básica de Luhn
        let sum = 0;
        let isEven = false;
        for (let i = value.length - 1; i >= 0; i--) {
          let digit = parseInt(value[i]);
          if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
          }
          sum += digit;
          isEven = !isEven;
        }
        return sum % 10 === 0;
      },
      { message: 'Número de tarjeta inválido' }
    ),
  
  cvc: z
    .string()
    .regex(/^\d{3,4}$/, 'El CVC debe tener 3 o 4 dígitos'),
  
  expiry_date: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Formato de fecha debe ser MM/AA')
    .refine(
      (value) => {
        const [month, year] = value.split('/').map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Últimos 2 dígitos
        const currentMonth = currentDate.getMonth() + 1; // Meses de 1-12
        
        // Validar si la fecha no está en el pasado
        if (year < currentYear) return false;
        if (year === currentYear && month < currentMonth) return false;
        return true;
      },
      { message: 'La fecha de expiración no es válida o está vencida' }
    ),
});

export interface IPOST_langClientAppPaymentFormSchema {
  data?: z.infer<typeof POST_langClientAppPaymentFormSchema>
};



export const PUT_langClientAppPaymentFormSchema = z.object({
});

export interface IPUT_langClientAppPaymentFormSchema {
  data?: z.infer<typeof PUT_langClientAppPaymentFormSchema>
};



export const DELETE_langClientAppPaymentFormSchema = z.object({
});

export interface IDELETE_langClientAppPaymentFormSchema {
  data?: z.infer<typeof DELETE_langClientAppPaymentFormSchema>
};
