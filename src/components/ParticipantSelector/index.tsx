import { useAutocomplete } from '@mui/material';
import { GridRenderEditCellParams } from '@mui/x-data-grid';
import { InputWrapper, Listbox, StyledTag } from './index.styled';
import Tag from '../Tag';
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
];

interface FilmOptionType {
  title: string;
  year: number;
}

// TODO: 임시 컴포넌트 (참가자 필드가 자동완성 될 수 있도록 하는 컴포넌트)
function ParticipantSelector(props?: GridRenderEditCellParams) {
  const { id, value, field, hasFocus } = props;

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    // value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [top100Films[1]],
    multiple: true,
    options: top100Films,
    // getOptionLabel: (option) => option.title,
  });

  // const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newValue = event.target.value; // The new value entered by the user
  //   apiRef.current.setEditCellValue({ id, field, value: newValue });
  // };

  return (
    <div>
      <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
        {value.map((option: FilmOptionType, index: number) => (
          <Tag key={option.title}>{option.title}</Tag>
        ))}
        <input {...(getInputProps() as any)} />
      </InputWrapper>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof top100Films).map((option, index) => (
            <li {...(getOptionProps({ option, index }) as any)}>
              <span>{option.label}</span>
              {/* <CheckIcon fontSize="small" /> */}
              <div>asdf</div>
            </li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}

export default ParticipantSelector;
