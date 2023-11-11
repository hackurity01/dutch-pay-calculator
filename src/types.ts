export enum PaymentCategory {
  ACCOMMODATION = '🛌 숙박비',
  FOOD = '🍖 식비',
  TRANSPORTATION = '🚗 교통비',
  ACTIVITY = '🕹️ 활동비',
  ETC = '기타',
}

export type Payment = {
  category: keyof typeof PaymentCategory;
  name: string;
  payer: string;
  participants: string[];
  date: string;
  totalAmount: number;
};

export type PaymentRowData = Payment & { id: string | number };

export type Participants = { [key: string]: ParticipantData };

export type ParticipantData = {
  totalAmountSpent: number;
  details: Detail[];
};

export type Detail = {
  payment: Payment;
  amount: number;
};
