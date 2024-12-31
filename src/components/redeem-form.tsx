import { useAppStore } from "@/hooks/useAppStore"
import { Input } from "./ui/input"
import { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Info } from 'lucide-react'
import { Button } from "./ui/button";
import { cn, converTextToIds } from "@/lib/utils";
import { redeemCode } from "@/lib/redeem";
import { toast } from "sonner";

export const RedeemForm = () => {

  const [code, setCode] = useState<string>("");
  const [rawIds, setRawIds] = useState<string>("");
  const [isRedeeming, setIsRedeeming] = useState<boolean | null>(null);

  const store = useAppStore();

  const handleRedeem = async () => {
    store.clearResults();
    setIsRedeeming(true);
    const _ids = converTextToIds(rawIds);
    console.log('Redeeming:', code, _ids);
    for (let index = 0; index < _ids.length; index++) {
      const id = _ids[index];
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const result = await redeemCode(code, id);
        if (result.player) {
          if (result.player.name === "Bridget") {
            toast.info("BRIDGETTTTTTT")
          }
          store.pushResult(result);
        } else {
          toast.error(`Redeem failed, invalid player: ${id}`);
        }
      } catch (error) {
        toast.error('Something went wrong while redeeming code:');
      }
    }
    setIsRedeeming(false);
  }

  const handleSaveIds = () => {
    store.setIds(rawIds);
    toast.success(`Ids saved!`);
  }

  const handleLoadIds = () => {
    const _ids = store.loadIds();
    if (_ids.length === 0) {
      toast.error('No ids found :(');
      return;
    }
    toast.success(`Ids loaded!`);
    setRawIds(_ids.join('\n'));
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="code">Ender Gift Code</Label>
        <Input id="code" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="code" className="flex">Enter player ids <Popover>
          <PopoverTrigger className="ml-2"><Info size={16} /></PopoverTrigger>
          <PopoverContent side="top" collisionPadding={10}>
            <p>Ids separated by new line</p>
            <p>
              <strong>Example:</strong>
              <br />
              123456789
              <br />
              234567890
              <br />
              345678901
            </p>
          </PopoverContent>
        </Popover></Label>
        <Textarea value={rawIds} onChange={(e) => setRawIds(e.target.value)}></Textarea>
      </div>
      <div className="flex flex-row space-x-2">
        <Button className="w-full" onClick={handleSaveIds}>Remember ids</Button>
        <Button className="w-full" onClick={handleLoadIds}>Load ids</Button>
      </div>
      <Button className={
        cn("w-full", {
          "bg-green-500": !isRedeeming,
          "bg-red-500": isRedeeming
        })
      } variant={"outline"} onClick={handleRedeem} disabled={isRedeeming === true}>
        {isRedeeming === null && "Redeem code"}
        {isRedeeming === true && "Redeeming..."}
        {isRedeeming === false && "Redeemed"}
      </Button>
    </div>
  )
}