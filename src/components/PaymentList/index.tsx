import { DataGrid, GridColDef, GridRenderCellParams, GridRowModel } from '@mui/x-data-grid';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

import { paymentListAtom } from '../../stores/paymentListAtom';
import Tag from '../Tag';

function renderParticipant(params: GridRenderCellParams<any, string[]>) {
  return (
    <div className="flex flex-wrap gap-1">{params.value?.map((v) => <Tag key={v}>{v}</Tag>)}</div>
  );
}

const renderParticipantSelectorCell: GridColDef['renderCell'] = (params) => {
  return (
    <input
      type="text"
      value={params.value.join(',')}
      onChange={(e) => {
        const value = e.target.value;
        params.api.setEditCellValue({ ...params, value: value.replace(/\s/g, '').split(',') });
      }}
    />
  );
};

const columns: GridColDef[] = [
  { field: 'category', headerName: '카테고리', width: 150, type: 'singleSelect' },
  { field: 'name', headerName: '내용', width: 150, editable: true },
  { field: 'payer', headerName: '결제자', width: 150 },
  {
    field: 'participants',
    headerName: '참여자',
    width: 150,
    editable: true,
    renderCell: renderParticipant,
    renderEditCell: renderParticipantSelectorCell,
  },
  { field: 'date', headerName: '날짜', width: 150, editable: true },
  {
    field: 'totalAmount',
    headerName: '총 결제 금액',
    width: 150,
    align: 'right',
    headerAlign: 'right',
    editable: true,
    renderCell: (params) => {
      return params.value.toLocaleString('en-US');
    },
    valueSetter: (params) => {
      const totalAmount = parseInt(params.value!);
      return { ...params.row, totalAmount };
    },
  },
];

function PaymentList() {
  const [paymentList, setPaymentList] = useAtom(paymentListAtom);

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setPaymentList(paymentList.map((row) => (row.id === newRow.id ? (updatedRow as any) : row)));
    return newRow;
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
        checkboxSelection
        disableRowSelectionOnClick
        // slots={{
        //   toolbar: () => <div>toolbar</div>,
        //   footer: () => <div>footer</div>,
        // }}
      />
    </>
  );
}

export default PaymentList;
