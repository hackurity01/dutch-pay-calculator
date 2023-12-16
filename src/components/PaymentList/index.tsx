import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Box, Button, Stack, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

import Tag from '@/components/Tag';
import { SAMPLE_DATA } from '@/constants/sampleData';
import { paymentListAtom } from '@/stores/paymentListAtom';
import { PaymentCategory } from '@/types';
import { getInitialPaymentData } from '@/utils/payment';

const renderParticipant = (params: GridRenderCellParams<any, string[]>) => {
  return (
    <div className="flex flex-wrap gap-1">{params.value?.map((v) => <Tag key={v}>{v}</Tag>)}</div>
  );
};

const renderParticipantSelectorCell: GridColDef['renderCell'] = (params) => {
  return (
    <div className="MuiInputBase-root">
      <input
        type="text"
        className="MuiInputBase-input"
        value={params.value.join(',')}
        onChange={(e) => {
          const value = e.target.value.replace(/\s/g, '').split(',');
          const uniqueValue = [...new Set(value)];
          params.api.setEditCellValue({ ...params, value: uniqueValue });
        }}
      />
    </div>
  );
};

function PaymentList() {
  const [paymentList, setPaymentList] = useAtom(paymentListAtom);

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setPaymentList(paymentList.map((row) => (row.id === newRow.id ? (updatedRow as any) : row)));
    return newRow;
  };

  const addRow = () => {
    const newData = getInitialPaymentData();
    setPaymentList((p) => [...p, newData]);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setPaymentList(paymentList.filter((p) => p.id !== id));
  };

  const fillSampleData = () => {
    setPaymentList(SAMPLE_DATA);
  };

  const allParticipants = useMemo(() => {
    return paymentList
      .map((r) => [r.payer, ...r.participants])
      .reduce((pre, cur) => {
        const arr = [...pre];
        cur.forEach((item) => {
          if (!arr.includes(item)) {
            arr.push(item);
          }
        });
        return arr;
      }, []);
  }, [paymentList]);

  const columns: GridColDef[] = [
    {
      type: 'singleSelect',
      field: 'category',
      headerName: '카테고리',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      disableColumnMenu: true,

      valueOptions: [
        { value: 'ACCOMMODATION', label: PaymentCategory.ACCOMMODATION },
        { value: 'FOOD', label: PaymentCategory.FOOD },
        { value: 'TRANSPORTATION', label: PaymentCategory.TRANSPORTATION },
        { value: 'ACTIVITY', label: PaymentCategory.ACTIVITY },
        { value: 'ETC', label: PaymentCategory.ETC },
      ],
    },
    {
      field: 'name',
      headerName: '내용',
      flex: 150,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'payer',
      headerName: '결제자',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      disableColumnMenu: true,
    },
    {
      field: 'participants',
      headerName: '참여자',
      flex: 150,
      minWidth: 150,
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderParticipant,
      renderEditCell: renderParticipantSelectorCell,
    },
    {
      type: 'date',
      field: 'date',
      headerName: '날짜',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      disableColumnMenu: true,
    },
    {
      field: 'totalAmount',
      headerName: '총 결제 금액',
      width: 150,
      align: 'right',
      headerAlign: 'right',
      editable: true,
      disableColumnMenu: true,
      renderCell: (params) => {
        return params.value.toLocaleString('en-US');
      },
      valueSetter: (params) => {
        const totalAmount = parseInt(params.value!);
        return { ...params.row, totalAmount };
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '삭제',
      width: 100,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  console.log(paymentList);

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
          toolbar: () => (
            <Box sx={{ textAlign: 'right', p: 1, mr: 5 }}>
              <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={addRow}>
                내역 추가
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
          '& .MuiDataGrid-row': {
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
          '& .MuiDataGrid-virtualScroller': {
            height: '200px',
          },
        }}
      />
    </>
  );
}

export default PaymentList;
