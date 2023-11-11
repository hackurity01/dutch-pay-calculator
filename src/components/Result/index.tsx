import { Table, TableBody, TableCell, TableCellProps, TableHead, TableRow } from '@mui/material';
import { useAtomValue } from 'jotai';

import { paymentListAtom } from '@/stores/paymentListAtom';
import { calcPay } from '@/utils';

import ResultRow from './ResultRow';

const columns: ({ field: string; headerName: string } & TableCellProps)[] = [
  { field: 'name', headerName: '이름' },
  { field: 'paymentAmount', headerName: '총 결제 금액', align: 'right' },
  { field: 'detail', headerName: '상세보기' },
];

function Result() {
  const paymentList = useAtomValue(paymentListAtom);

  const resultAsMap = calcPay(paymentList);
  const resultAsList = Object.entries(resultAsMap).map(([key, value]) => ({ name: key, ...value }));

  return (
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
  );
}

export default Result;
