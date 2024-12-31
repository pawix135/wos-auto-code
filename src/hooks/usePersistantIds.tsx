import { useCallback } from "react";

export const usePersistantIds = () => {

  const idsFromStorage = () => {
    try {
      const ids = localStorage.getItem('ids')
      if (!ids) return [];

      const idsArray = JSON.parse(ids) as string[];

      return idsArray ?? []
    } catch (error) {
      console.log('Error reading ids from local storage', error);
      return [];
    }
  }

  const persistIds = useCallback((ids: string[]) => {
    localStorage.setItem('ids', JSON.stringify(ids));
  }, [])

  return { idsFromStorage, persistIds } as const;
}