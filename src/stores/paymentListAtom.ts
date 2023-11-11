import { atom } from 'jotai';

import { Payment } from '../types';

export const paymentListAtom = atom<(Payment & { id: string })[]>([
  {
    id: '1',
    name: '1',
    category: 'Hello',
    payer: 'AAA',
    participants: ['AAA', 'BBB', 'AA'],
    date: '',
    totalAmount: 300,
  },
  {
    id: '2',
    name: '2',
    category: 'Hello',
    payer: 'BBB',
    participants: ['BBB', 'AA'],
    date: '',
    totalAmount: 20,
  },
  {
    id: '3',
    name: '3',
    category: 'Hello',
    payer: 'AAA',
    participants: ['AAA'],
    date: '',
    totalAmount: 1,
  },
]);
