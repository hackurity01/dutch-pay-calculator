import { useAtomValue } from 'jotai';

import { paymentListAtom } from '../../stores/paymentListAtom';
import { calcPay } from '../../utils';

function Result() {
  const paymentList = useAtomValue(paymentListAtom);

  console.log(calcPay(paymentList));
  return <>sdf</>;
}

export default Result;
