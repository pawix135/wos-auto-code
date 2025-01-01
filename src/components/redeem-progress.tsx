import { useAppStore } from "@/hooks/useAppStore";
import { Progress } from "./ui/progress";
import { useMemo } from "react";
import { caclProgress } from "@/lib/utils";

export const RedeemProgress: React.FC = () => {

  const store = useAppStore();

  if (store.ids.length <= 0) {
    return null
  }

  const progress = useMemo(() => {
    return caclProgress(store.results.length ?? 0, store.ids.length ?? 0)
  }, [store.results, store.ids])

  return (
    <>
      <div className="flex justify-between">
        <span>1</span>
        <span>{store.ids.length}</span>
      </div>
      <Progress value={progress} />
    </>
  )
}