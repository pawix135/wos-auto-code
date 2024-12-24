import { RedeemResult } from "./utils";

export const createElement = <K extends keyof HTMLElementTagNameMap>(type: K, id: string, classes: string[] = []) => {
  const element = document.createElement(type) as HTMLElementTagNameMap[K];
  element.id = id;
  element.classList.add(...classes);
  return element
}

export const redeemProgress = (container: HTMLElement, result: RedeemResult) => {
  const playerDiv = createElement('div', `player-${result.player!.id}`, ['player', result.success ? 'success' : 'failed']);
  const playerDisplayName = createElement('span', `player-${result.player!.id}-name`, ['player-name']);
  const playerImg = createElement('img', `player-${result.player!.id}-img`);
  playerDisplayName.textContent = result.player!.name;
  playerImg.src = result.player!.pfp;
  playerDiv.appendChild(playerImg);
  playerDiv.appendChild(playerDisplayName);
  container.appendChild(playerDiv);
}