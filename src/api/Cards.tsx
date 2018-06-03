import { CardType } from '../interfaces';

function fetchErrorCheck(r: any) {
  if (r.status >= 400 && r.status < 600) {
    throw new Error('Bad response from server');
  }
  return r.json();
}

export function FetchCards(review: boolean = false) {
  return fetch(`/api/v1/cards?review=${review}`).then(fetchErrorCheck);
}

export function FetchCard(id: number) {
  return fetch(`/api/v1/cards/${id}`).then(fetchErrorCheck);
}

export function FetchDeleteCard(id: number) {
  return fetch(`/api/v1/cards/${id}`, { method: 'delete' }).then(fetchErrorCheck);
}

function stringifyCard(card: CardType) {
  return JSON.stringify({ card: { front_text: card.frontText, back_text: card.backText, review: card.review } });
}

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export function FetchCreateCard(card: CardType) {
  return fetch(`/api/v1/cards`, {
    method: 'post',
    headers,
    body: stringifyCard(card)
  }).then(fetchErrorCheck);
}

export function FetchUpdateCard(card: CardType) {
  const { id } = card;
  return fetch(`/api/v1/cards/${id}`, {
    method: 'put',
    headers,
    body: stringifyCard(card)
  }).then(fetchErrorCheck);
}
