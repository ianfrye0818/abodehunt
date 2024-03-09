// 'use server';
// import axios from 'axios';

// const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

// async function getMessages(userId: string) {
//   try {
//     const response = await axios.get(`${apiDomain}/messages?userId=${userId}`);
//     return response;
//   } catch (error) {
//     console.error(`[getMessages] ${error}`);
//   }
// }

// async function deleteMessage(messageId: string) {
//   try {
//     await axios.delete(`${apiDomain}/messages/${messageId}`);
//     return { message: 'Message deleted' };
//   } catch (error) {
//     console.error(`[deleteMessage] ${error}`);
//     return { message: 'An error occurred' };
//   }
// }

// async function updateMessage(messageId: string, read: boolean) {
//   try {
//     await axios.put(`${apiDomain}/messages/${messageId}`, { read: !read });
//     return { message: 'Message updated' };
//   } catch (error) {
//     console.error(`[markReadMessage] ${error}`);
//     return { message: 'An error occurred' };
//   }
// }

// export { getMessages, deleteMessage, updateMessage };
