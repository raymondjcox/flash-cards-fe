import { CardType } from '../interfaces';

function fetchErrorCheck(r: any) {
  if (r.status >= 400 && r.status < 600) {
    throw new Error('Bad response from server');
  }
  return r.json();
}

export function FetchCards() {
  return fetch('/api/v1/cards')
    .then((r) => fetchErrorCheck(r));
}

export function FetchDeleteCard(card: CardType) {
  return fetch(`/api/v1/cards/${card.id}`, { method: 'delete' })
    .then((r) => fetchErrorCheck(r));
}

export function FetchCreateCard(card: CardType) {
  return fetch(`/api/v1/cards`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ card: { front_text: card.frontText, back_text: card.backText } })
  }).then((r) => fetchErrorCheck(r));
}
