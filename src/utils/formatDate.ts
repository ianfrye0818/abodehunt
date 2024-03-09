//convert isotime string to readable date mm/dd/yyyy
export function formatDate(isoTime: string) {
  const date = new Date(isoTime);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
