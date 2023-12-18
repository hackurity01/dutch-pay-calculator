import {
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';

import ResultRow from '@/components/ResultDialog/ResultRow';
import { resultDialogAtom } from '@/stores/dialogAtoms/result';
import { paymentListAtom } from '@/stores/paymentListAtom';
import { calcPay } from '@/utils/payment';

const columns: ({ field: string; headerName: string } & TableCellProps)[] = [
  { field: 'name', headerName: '이름' },
  { field: 'paymentAmount', headerName: '총 결제 금액', align: 'right' },
  { field: 'detail', headerName: '상세보기' },
];

function ResultDialog() {
  const [open, setOpen] = useAtom(resultDialogAtom);

  const cloaseDialog = () => {
    setOpen(false);
  };

  const paymentList = useAtomValue(paymentListAtom);

  const resultAsMap = calcPay(paymentList);
  const resultAsList = Object.entries(resultAsMap)
    .map(([key, value]) => ({ name: key, ...value }))
    .filter((item) => item.name && item.totalAmountSpent);

  return (
    <Dialog onClose={cloaseDialog} open={open}>
      <DialogTitle>정산 결과</DialogTitle>
      <Table aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            {columns.map(({ field, headerName, ...options }) => (
              <TableCell key={field} {...options}>
                {headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {resultAsList.map((result, index) => (
            <ResultRow key={index} {...result} />
          ))}
        </TableBody>
      </Table>
    </Dialog>
  );
}

export default ResultDialog;
