
// Получить данные из localStorage по ключу с типизацией и значением по умолчанию
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored) as T;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
    }
  }
  return defaultValue;
}

// Записать данные в localStorage по ключу
export function setToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}