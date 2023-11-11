import { calcPay } from './utils';

describe('calcPay', () => {
  test('결제 정보에 따라 참여자들의 금액 계산', () => {
    const mockData = [
      {
        category: '🛏️',
        name: 'name1',
        payer: 'p1',
        participants: ['p1', 'p2'],
        date: 'August 29, 2023',
        totalAmount: 2,
      },
      {
        category: '🛏️',
        name: 'name2',
        payer: 'p2',
        participants: ['p2', 'p3'],
        date: 'August 29, 2023',
        totalAmount: 6,
      },
    ];

    const participants = calcPay(mockData);
    expect(participants.p1.totalAmountSpent).toBe(1);
    expect(participants.p2.totalAmountSpent).toBe(2);
    expect(participants.p3.totalAmountSpent).toBe(-3);
  });
  test('결제 정보에 따라 참여자들의 금액 계산', () => {
    const mockData = [
      {
        category: '🛏️',
        name: 'name1',
        payer: 'p1',
        participants: ['p1', 'p1'],
        date: 'August 29, 2023',
        totalAmount: 2,
      },
    ];

    const participants = calcPay(mockData);
    expect(participants.p1.totalAmountSpent).toBe(0);
  });
});
