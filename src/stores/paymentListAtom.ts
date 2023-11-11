import { atom } from 'jotai';

import { PaymentRowData } from '@/types';

export const paymentListAtom = atom<PaymentRowData[]>([
  {
    id: 1,
    name: '1',
    category: 'ETC',
    payer: 'AAA',
    participants: ['AAA', 'BBB', 'AA'],
    date: '',
    totalAmount: 300,
  },
  {
    id: 2,
    name: '2',
    category: 'ETC',
    payer: 'BBB',
    participants: ['BBB', 'AA'],
    date: '',
    totalAmount: 20,
  },
  {
    id: 3,
    name: '3',
    category: 'ETC',
    payer: 'AAA',
    participants: ['AAA'],
    date: '',
    totalAmount: 1,
  },
]);
