import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import { useAtom } from 'jotai';

import NameTag from '@/components/NameTag';
import { paymentListAtom } from '@/stores/paymentListAtom';
import { PaymentCategory } from '@/types';
import { comma } from '@/utils/comma';

const renderPayer = (params: GridRenderCellParams<any, string>) => {
  const name = params.value ?? '';
  return <NameTag name={name} />;
};

const renderParticipant = (params: GridRenderCellParams<any, string[]>) => {
  return (
    <div className="flex flex-wrap gap-1">
      {params.value?.map((v) => <NameTag key={v} name={v} />)}
    </div>
  );
};

/* const renderParticipantSelectorCell: GridColDef['renderCell'] = (params) => {
  console.log('params.value', params.value);
  return (
    <div className="MuiInputBase-root">
      <input
        type="text"
        className="MuiInputBase-input"
        value={Array.isArray(params.value) ? params.value.join(',') : params.value}
        onChange={(e) => {
          const value = e.target.value.replace(/\s/g, '').split(',');
          const uniqueValue = [...new Set(value)];
          params.api.setEditCellValue({ ...params, value: uniqueValue });
        }}
      />
    </div>
  );
}; */

export function usePaymentColumns() {
  const [paymentList, setPaymentList] = useAtom(paymentListAtom);

  const handleDeleteClick = (id: GridRowId) => () => {
    setPaymentList(paymentList.filter((p) => p.id !== id));
  };

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
      width: 120,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      disableColumnMenu: true,
      renderCell: renderPayer,
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
      valueSetter: (params) => {
        const participants =
          typeof params.value === 'string'
            ? params.value.split(',').map((v) => v.trim())
            : params.value;

        return {
          ...params.row,
          participants,
        };
      },
      // renderEditCell: renderParticipantSelectorCell,
    },
    {
      type: 'date',
      field: 'date',
      headerName: '날짜',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      disableColumnMenu: true,
    },
    {
      field: 'totalAmount',
      headerName: '총 결제 금액',
      width: 120,
      align: 'right',
      headerAlign: 'right',
      editable: true,
      disableColumnMenu: true,
      renderCell: (params) => {
        return comma(params.value);
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
      width: 60,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteForeverOutlinedIcon color="error" />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return columns;
}
