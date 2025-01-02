import { usePersistantIds } from "@/hooks/usePersistantIds";
import { converTextToIds } from "@/lib/utils";
import type { AppStore } from "@/types/context/store";
import { RedeemResult } from "@/types/redeem";
import { createContext, useCallback, useMemo, useState } from "react";

export const AppStoreContext = createContext<AppStore | null>(null);


interface Props extends React.PropsWithChildren {
}

export const AppStoreProvider: React.FC<Props> = ({ children }) => {

  const [ids, setStateIds] = useState<string[]>([]);
  const [results, setResults] = useState<RedeemResult[]>([]);
  const { idsFromStorage, persistIds } = usePersistantIds();


  const setIds = (rawIds: string) => {
    if (!rawIds || rawIds.length === 0) {
      return;
    }
    const _ids = converTextToIds(rawIds);
    setStateIds(_ids);
  }

  const saveIds = useCallback(() => {
    if (ids.length === 0) {
      return
    }
    persistIds(ids);
  }, [ids])

  const loadIds = useCallback(() => {
    const _ids = idsFromStorage();
    setStateIds(_ids);
    return _ids;
  }, [])

  const pushResult = (result: RedeemResult) => {
    setResults(prev => [...prev, result]);
  }

  const clearResults = () => {
    setResults([]);
  }

  const store: AppStore = useMemo(() => {
    return {
      ids,
      setIds,
      loadIds,
      saveIds,
      results,
      pushResult,
      clearResults,
    }
  }, [ids, results])


  return <AppStoreContext.Provider value={store}>
    {children}
  </AppStoreContext.Provider>
}
