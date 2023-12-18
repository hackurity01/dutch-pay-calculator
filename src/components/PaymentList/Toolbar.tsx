import AddIcon from '@mui/icons-material/Add';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { Box, Button, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';
import { useSetAtom } from 'jotai';
import { useCallback, useState } from 'react';

import { paymentListAtom } from '@/stores/paymentListAtom';
import { getInitialPaymentData } from '@/utils/payment';

function Toolbar() {
  const setPaymentList = useSetAtom(paymentListAtom);
  const [open, setOpen] = useState(false);

  const deleteAllData = useCallback(() => {
    setPaymentList([]);
  }, [setPaymentList]);

  const addRow = useCallback(() => {
    const newData = getInitialPaymentData();
    setPaymentList((p) => [...p, newData]);
  }, [setPaymentList]);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} padding={2}>
      <Button
        variant="outlined"
        size="small"
        startIcon={<DeleteSweepOutlinedIcon />}
        color="error"
        onClick={openDialog}>
        모든 내역 삭제
      </Button>
      <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={addRow}>
        내역 추가
      </Button>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle>정말 모든 내역을 제거하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog} autoFocus>
            취소
          </Button>
          <Button onClick={deleteAllData} color="error">
            제거
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default Toolbar;
