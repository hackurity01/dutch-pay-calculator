import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Box, IconButton, Stack, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';

import NameTag from '@/components/NameTag';
import { ParticipantData } from '@/types';
import { comma } from '@/utils/comma';

import ResultDetailDialog from './ResultDetailDialog';

function ResultRow({ name, totalAmountSpent, details }: { name: string } & ParticipantData) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          <NameTag name={name} />
        </TableCell>
        <TableCell align="right">{comma(totalAmountSpent)}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            <ManageSearchIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <ResultDetailDialog
        name={name}
        open={open}
        onClose={() => setOpen(false)}
        details={details}
      />
    </>
  );
}

export default ResultRow;
