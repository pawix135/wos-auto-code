import { useAppStore } from "@/hooks/useAppStore";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface Props {
}

export const ResultsPreview: React.FC<Props> = () => {

  const store = useAppStore();
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (areaRef.current) {
      if (areaRef.current.children.length) {
        const lastElement = areaRef.current.lastChild as HTMLElement

        lastElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        })
      }
    }
  }, [store.results])

  return (
    <ScrollArea className="h-[300px]" >
      <div className="grid grid-cols-3 gap-4 grid-flow-row" ref={areaRef}>
        {store.results.map((result, index) => {
          return (
            <div key={`result-${index}`} className="w-full relative">
              <span className={cn("absolute left-0 bottom-0 w-full text-[9px] md:text-sm", {
                "bg-green-500": result.success,
                "bg-red-500": !result.success,
              })}>{result.player!.name}</span>
              <img src={result.player!.pfp} alt={result.player!.name} className="w-full" />
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}