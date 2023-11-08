import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowModel,
  GridValueSetterParams,
} from '@mui/x-data-grid';
import Tag from '../Tag';
import { useMemo, useState } from 'react';
import { Payment } from '../../types';
/*
export type Payment = {
  category: string;
  name: string;
  payer: string;
  participants: string[];
  date: string;
  totalAmount: string;
};
*/

function renderParticipant(params: GridRenderCellParams<any, string[]>) {
  return (
    <div className="flex flex-wrap gap-1">{params.value?.map((v) => <Tag key={v}>{v}</Tag>)}</div>
  );
}

const renderParticipantSelectorCell: GridColDef['renderCell'] = (params) => {
  return (
    <input
      type="text"
      value={params.value.join(', ')}
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

const rows = [
  {
    id: 1,
    category: 'Hello',
    payer: 'AAA',
    participants: ['AAA', 'BBB', 'AA'],
    date: '',
    totalAmount: 0,
  },
  { id: 2, category: 'Hello', payer: 'BBB', participants: ['BBB', 'AA'], date: '', totalAmount: 0 },
  { id: 3, category: 'Hello', payer: 'AAA', participants: ['AAA'], date: '', totalAmount: 0 },
];

function PaymentList() {
  const [paymentList, setPaymentList] = useState<(Payment & { id: string })[]>([
    {
      id: '1',
      name: '1',
      category: 'Hello',
      payer: 'AAA',
      participants: ['AAA', 'BBB', 'AA'],
      date: '',
      totalAmount: 0,
    },
    {
      id: '2',
      name: '2',
      category: 'Hello',
      payer: 'BBB',
      participants: ['BBB', 'AA'],
      date: '',
      totalAmount: 0,
    },
    {
      id: '3',
      name: '3',
      category: 'Hello',
      payer: 'AAA',
      participants: ['AAA'],
      date: '',
      totalAmount: 0,
    },
  ]);

  const processRowUpdate = (newRow: GridRowModel) => {
    console.log('newRow', newRow);
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

  console.log('allParticipants', allParticipants);
  console.log('paymentList', paymentList);

  return (
    <>
      <DataGrid
        rows={paymentList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{
          toolbar: () => <div>toolbar</div>,
          footer: () => <div>footer</div>,
        }}
      />
    </>
  );
}

export default PaymentList;
