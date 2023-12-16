import { atom } from 'jotai';

import { PaymentRowData } from '@/types';

export const paymentListAtom = atom<PaymentRowData[]>([]);
