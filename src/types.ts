export type Payment = {
  category: string;
  name: string;
  payer: string;
  participants: string[];
  date: string;
  totalAmount: number;
};

export type Participants = { [key: string]: ParticipantData };

export type ParticipantData = {
  totalAmountSpent: number;
  details: Detail[];
};

export type Detail = {
  payment: Payment;
  amount: number;
};
