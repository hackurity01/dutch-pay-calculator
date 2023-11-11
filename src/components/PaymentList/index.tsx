import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Select, SelectChangeEvent } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridRowModel,
  useGridApiContext,
} from '@mui/x-data-grid';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

import Tag from '@/components/Tag';
import { paymentListAtom } from '@/stores/paymentListAtom';
import { PaymentCategory } from '@/types';
import { getInitialPaymentData } from '@/utils';

function SelectEditInputCell(props: GridRenderCellParams) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event: SelectChangeEvent) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{
        height: 1,
        width: '100%',
        outline: 'none',
        '& select': { textAlign: 'center' },
        '& fieldset': { border: 'none' },
      }}
      native
      autoFocus>
      <option value="ACCOMMODATION">{PaymentCategory.ACCOMMODATION}</option>
      <option value="FOOD">{PaymentCategory.FOOD}</option>
      <option value="TRANSPORTATION">{PaymentCategory.TRANSPORTATION}</option>
      <option value="ACTIVITY">{PaymentCategory.ACTIVITY}</option>
      <option value="ETC">{PaymentCategory.ETC}</option>
    </Select>
  );
}

const renderSelectEditInputCell: GridColDef['renderCell'] = (params) => {
  return <SelectEditInputCell {...params} />;
};

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

  const handleDeleteClick = (id: GridRowId) => () => {
    setPaymentList(paymentList.filter((p) => p.id !== id));
  };

  const columns: GridColDef[] = [
    {
      field: 'category',
      headerName: '카테고리',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      type: 'singleSelect',
      editable: true,
      disableColumnMenu: true,
      renderEditCell: renderSelectEditInputCell,
      renderCell: (params) => {
        return PaymentCategory[params.value as keyof typeof PaymentCategory];
      },
    },
    {
      field: 'name',
      headerName: '내용',
      width: 150,
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
      width: 150,
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderParticipant,
      renderEditCell: renderParticipantSelectorCell,
    },
    {
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
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[50]}
        slots={{
          toolbar: () => (
            <Box sx={{ textAlign: 'right', p: 1 }}>
              <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={addRow}>
                내역 추가
              </Button>
            </Box>
          ),
          // footer: () => <div>footer</div>,
        }}
        sx={{
          '& .MuiDataGrid-row': {
            maxHeight: 'none!important',
            '.MuiDataGrid-cell': {
              padding: 0.5,
              minHeight: '48px!important',
              maxHeight: 'none!important',

              '.MuiInputBase-input': {
                padding: 0,
                outline: 'none',
              },
            },
          },
        }}
      />
    </>
  );
}

export default PaymentList;
