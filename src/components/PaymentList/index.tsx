import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridRowModel } from '@mui/x-data-grid';
import { useAtom, useSetAtom } from 'jotai';

import { SAMPLE_DATA } from '@/constants/sampleData';
import { resultDialogAtom } from '@/stores/dialogAtoms/result';
import { paymentListAtom } from '@/stores/paymentListAtom';

import Toolbar from './Toolbar';
import { usePaymentColumns } from './usePaymentColumns';

function PaymentList() {
  const [paymentList, setPaymentList] = useAtom(paymentListAtom);
  const setResultDialogOpen = useSetAtom(resultDialogAtom);

  const columns = usePaymentColumns();

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setPaymentList(paymentList.map((row) => (row.id === newRow.id ? (updatedRow as any) : row)));
    return newRow;
  };

  const fillSampleData = () => {
    setPaymentList(SAMPLE_DATA);
  };

  console.log('paymentList', paymentList);

  return (
    <>
      <DataGrid
        columns={columns}
        rows={paymentList}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        isRowSelectable={() => false}
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[50]}
        slots={{
          toolbar: () => <Toolbar />,
          footer: () => (
            <Box sx={{ textAlign: 'right', p: 2, borderTop: '2px solid #e5e7eb' }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<CalculateOutlinedIcon />}
                onClick={() => setResultDialogOpen(true)}
                disabled={!paymentList.length}>
                정산하기
              </Button>
            </Box>
          ),
          noRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              <Typography mb={1}>결제 내역이 없습니다.</Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ListAltIcon />}
                onClick={fillSampleData}>
                샘플 내역 채우기
              </Button>
            </Stack>
          ),
        }}
        sx={{
          '&': {
            border: 'none',
            '.MuiDataGrid-row': {
              maxHeight: 'none!important',
              '.MuiDataGrid-cell': {
                padding: 0.5,
                minHeight: '48px!important',
                maxHeight: 'none!important',
                '.MuiInputBase-root': {
                  height: '100%',
                },

                '.MuiInputBase-input': {
                  padding: 0,
                  outline: 'none',
                },

                '.MuiSelect-select': {
                  textAlign: 'center',
                },
                '& fieldset': { border: 'none' },
              },
            },
            '.MuiDataGrid-virtualScroller': {
              minHeight: '200px',
            },
          },
        }}
      />
    </>
  );
}

export default PaymentList;
