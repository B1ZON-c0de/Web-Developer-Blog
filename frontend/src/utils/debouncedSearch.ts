export const debouncedSearch = (
  callback: ({
    search,
    page,
  }: {
    search: string
    page?: number
  }) => void,
  delay: number,
) => {
  let timeout: ReturnType<typeof setTimeout>
  return ({
    search,
    page,
  }: {
    search: string
    page?: number
  }) => {
    clearTimeout(timeout)
    timeout = setTimeout(
      () => callback({ search, page }),
      delay,
    )
  }
}
