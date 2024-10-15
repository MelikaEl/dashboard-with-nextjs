'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
  });

  const CreateInvoice = FormSchema.omit({ id: true, date: true });
 

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
    
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];//This line of code creates a date string in the format "YYYY-MM-DD" representing the current date. Let's break it down: 1. new Date() creates a new Date object representing the current date and time.2. .toISOString() converts the Date object to a string in ISO 8601 format. This format looks like: "YYYY-MM-DDTHH:mm:ss.sssZ" (e.g., "2023-04-15T12:30:45.678Z"). .split('T')[0] splits the ISO string at the 'T' character (which separates the date from the time in the ISO format) and takes the first part (index 0) of the resulting array. This effectively removes the time portion and keeps only the date part.The result is a string containing just the date in "YYYY-MM-DD" format, such as "2023-04-15".
   
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
   
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
    // Test it out:
    // console.log(rawFormData);
    // console.log(typeof rawFormData.amount);
}
      




// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}