import { useAppStore } from "@/hooks/useAppStore";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { RedeemProgress } from "./redeem-progress";

interface Props {
}

export const ResultsPreview: React.FC<Props> = () => {

  const store = useAppStore();
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (areaRef.current) {
        const lastElement = areaRef.current.lastChild as HTMLElement;
        lastElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
    });

    if (areaRef.current) {
      observer.observe(areaRef.current, { childList: true });
    }

    return () => {
      if (areaRef.current) {
        observer.disconnect();
      }
    };
  }, [areaRef]);



  return (
    <div className="space-y-2">
      <RedeemProgress />
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
    </div>
  )
}