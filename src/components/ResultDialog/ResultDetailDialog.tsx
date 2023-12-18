import {
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { Detail } from '@/types';
import { formatDate } from '@/utils/date';

type ResultDetailDialogProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  details: Detail[];
};

function ResultDetailDialog({ title, open, onClose, details }: ResultDetailDialogProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <Table size="small" aria-label="purchases" sx={{ width: 'auto', ml: 'auto' }}>
        <TableHead>
          <TableRow>
            <TableCell>결제 내용</TableCell>
            <TableCell>날짜</TableCell>
            <TableCell align="right">분할 금액</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map(({ amount, payment }, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {payment.name}
              </TableCell>
              <TableCell>{formatDate(payment.date, 'yyyy.MM.dd.')}</TableCell>
              <TableCell align="right">{amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Dialog>
  );
}

export default ResultDetailDialog;
