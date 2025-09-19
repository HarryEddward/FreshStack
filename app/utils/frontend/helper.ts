function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timer: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
