import { useAppStore } from "@/hooks/useAppStore";
import { Progress } from "./ui/progress";
import { useMemo } from "react";
import { caclProgress } from "@/lib/utils";

export const RedeemProgress: React.FC = () => {

  const store = useAppStore();

  const progress = useMemo(() => {
    return caclProgress(store.results.length ?? 0, store.ids.length ?? 0)
  }, [store.results, store.ids])

  if (store.ids.length <= 0) {
    return null
  }
  return (
    <>
      <div className="flex justify-between">
        <span>{store.results.length ?? 0}</span>
        <span>{store.ids.length}</span>
      </div>
      <Progress value={progress} />
    </>
  )
}