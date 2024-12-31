import { RedeemResult } from "../redeem";

export interface AppStore {
  ids: string[];
  setIds: (ids: string) => void;
  saveIds: () => void;
  loadIds: () => string[];
  pushResult: (result: RedeemResult) => void;
  results: RedeemResult[];
  clearResults: () => void;
}