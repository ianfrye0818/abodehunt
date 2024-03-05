'use server';

export async function handleContactFormSubmit(
  previousState: { message: string },
  formdata: FormData
) {
  console.log(formdata);
  return { message: 'Message sent!' };
}
