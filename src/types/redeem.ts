export interface RedeemResult {
  player: {
    name: string;
    id: string;
    pfp: string;
  } | null;
  success: boolean;
}