export default function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const dt = dateObj.getDate() + 1;
  return `${month.toString()}/${dt.toString()}/${year.toString()}`;
}
