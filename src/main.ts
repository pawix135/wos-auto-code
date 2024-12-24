import './styles/global.css'
import './styles/ui.css'
import { redeemProgress } from './ui'
import { converTextToIds, getValue, handleRedeem, RedeemResult } from './utils'

const codeInput = document.getElementById('code')! as HTMLInputElement
const idsTextArea = document.getElementById('ids')! as HTMLTextAreaElement
const redeemeButton = document.getElementById('redeem_button')! as HTMLButtonElement
const redeemProgressContainer = document.getElementById('redeemed_ids')! as HTMLElement

redeemeButton.addEventListener('click', async () => {
  const code = getValue(codeInput)

  if (!code || !code.trim() || code.length < 1) {
    console.log('Invalid code')
    return;
  }

  const ids = getValue(idsTextArea)
  if (!ids || !ids.trim() || ids.length < 1) {
    console.log('Invalid ids')
    return;
  }

  const idsArray = converTextToIds(ids);

  if (idsArray.length < 1) {
    console.log('Invalid ids format')
    return;
  }

  const results: RedeemResult[] = [];

  for (let index = 0; index < idsArray.length; index++) {
    const id = idsArray[index];
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      const result = await handleRedeem(code, id);
      results.push(result);
      if (result.player) {
        redeemProgress(redeemProgressContainer, result);
      }
    } catch (error) {
    }
  }

  alert('Redeem finished')
});