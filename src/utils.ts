import { ParticipantData, Participants, Payment } from './types';

export function getInitialPaymentData() {
  return {
    id: new Date().getTime(),
    name: '',
    category: '',
    payer: '',
    participants: [''],
    date: '',
    totalAmount: 0,
  };
}

function getInitialParticipantData(): ParticipantData {
  return {
    totalAmountSpent: 0,
    details: [],
  };
}

export function calcPay(data: Payment[]): Participants {
  const participants: Participants = {};

  data.forEach((item) => {
    const numberOfParticipants = item.participants.length;
    const totalAmount = item.totalAmount;
    const paymentAmountPerPerson = totalAmount / numberOfParticipants;

    if (!Object.hasOwn(participants, item.payer)) {
      participants[item.payer] = getInitialParticipantData();
    }

    item.participants.forEach((p) => {
      if (!Object.hasOwn(participants, p)) {
        participants[p] = getInitialParticipantData();
      }
      participants[p].totalAmountSpent -= paymentAmountPerPerson;
      participants[p].details.push({ amount: paymentAmountPerPerson, payment: item });
    });

    participants[item.payer].totalAmountSpent += totalAmount;
    if (participants[item.payer].details.length) {
      participants[item.payer].details[participants[item.payer].details.length - 1].amount +=
        totalAmount;
    }
  });

  return participants;
}
