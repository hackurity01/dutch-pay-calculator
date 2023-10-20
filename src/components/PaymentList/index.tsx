import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import ParticipantSelector from '../ParticipantSelector';
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

function renderPrticipant(params: GridRenderCellParams<any, number>) {
  return <div>asdfasdf</div>;
}

const renderPrticipantSelectorCell: GridColDef['renderCell'] = (params) => {
  return <ParticipantSelector {...params} />;
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
    renderCell: renderPrticipant,
    renderEditCell: renderPrticipantSelectorCell,
  },
  { field: 'date', headerName: '날짜', width: 150 },
  { field: 'totalAmount', headerName: '총 결제 금액', width: 150 },
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

const allParticipants = rows
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

console.log('allParticipants', allParticipants);

function PaymentList() {
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
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
