import { CardType } from '../interfaces';

function fetchErrorCheck(r: any) {
  if (r.status >= 400 && r.status < 600) {
    throw new Error('Bad response from server');
  }
  return r.json();
}

export function FetchCards(random: boolean = false) {
  return fetch(`/api/v1/cards?random=${random}`).then(fetchErrorCheck);
}

export function FetchCard(id: number) {
  return fetch(`/api/v1/cards/${id}`).then(fetchErrorCheck);
}

export function FetchDeleteCard(id: number) {
  return fetch(`/api/v1/cards/${id}`, { method: 'delete' }).then(fetchErrorCheck);
}

export function FetchCreateCard(card: CardType) {
  return fetch(`/api/v1/cards`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ card: { front_text: card.frontText, back_text: card.backText } })
  }).then(fetchErrorCheck);
}

export function FetchUpdateCard(card: CardType) {
  const { id } = card;
  return fetch(`/api/v1/cards/${id}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ card: { front_text: card.frontText, back_text: card.backText } })
  }).then(fetchErrorCheck);
}
