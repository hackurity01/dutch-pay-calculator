import { ParticipantData, Participants, Payment } from './types';

export function calcPay(data: Payment[]): Participants {
  const participants: Participants = {};

  data.forEach((item) => {
    const numberOfParticipants = item.participants.length;
    const totalAmount = item.totalAmount;
    const payPerPerson = totalAmount / numberOfParticipants;

    if (!Object.hasOwn(participants, item.payer)) {
      participants[item.payer] = getInitialParticipantData();
    }

    item.participants.forEach((p) => {
      if (!Object.hasOwn(participants, p)) participants[p] = getInitialParticipantData();
      participants[p].totalAmountSpent += payPerPerson;
      participants[p].details.push({ amount: payPerPerson, payment: item });
    });

    participants[item.payer].totalAmountSpent -= totalAmount;
    participants[item.payer].details[participants[item.payer].details.length - 1].amount -=
      totalAmount;
  });

  return participants;
}

function getInitialParticipantData(): ParticipantData {
  return {
    totalAmountSpent: 0,
    details: [],
  };
}
