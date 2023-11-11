import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';

import { ParticipantData } from '@/types';

import ResultDetailDialog from './ResultDetailDialog';

function ResultRow({ name, totalAmountSpent, details }: { name: string } & ParticipantData) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="right">{totalAmountSpent}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            <ManageSearchIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <ResultDetailDialog open={open} onClose={() => setOpen(false)} details={details} />
    </>
  );
}

export default ResultRow;
