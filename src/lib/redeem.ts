import { RedeemResult } from "@/types/redeem";
import { createSignedQueryString } from "./utils";

export const redeemCode = async (code: string, id: string): Promise<RedeemResult> => {
  const loginData = createSignedQueryString({
    time: Date.now(),
    fid: id,
  })
  const payloadData = createSignedQueryString({
    cdk: code,
    time: Date.now(),
    fid: id,
  })

  const result: RedeemResult = {
    player: null,
    success: false,
  }

  const loginResponse = await fetch('https://wos-giftcode-api.centurygame.com/api/player', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  });

  const loginJson = await loginResponse.json();

  if (loginJson.code === 1) {
    return result
  }

  result.player = {
    id: id,
    name: loginJson.data.nickname,
    pfp: loginJson.data.avatar_image
  }

  const redeemResponse = await fetch('https://wos-giftcode-api.centurygame.com/api/gift_code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payloadData)
  });

  const redeemJson = await redeemResponse.json();

  if (redeemJson.code !== 0) {
    return result;
  }

  result.success = true;
  return result

}