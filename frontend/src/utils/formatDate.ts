export const formatDate = (
  date: string,
  options: Record<string, string> = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
) => {
  return new Date(date).toLocaleDateString('ru-RU', options)
}
