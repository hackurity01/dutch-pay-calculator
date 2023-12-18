import { Chip } from '@mui/material';

import { getTextColor, strToColor } from '@/utils/color';

function NameTag({ name }: { name: string }) {
  return (
    <Chip
      label={name}
      sx={{
        backgroundColor: strToColor(name),
        color: getTextColor(strToColor(name)),
        py: '1px',
        px: '8px',
        height: 'auto',
        borderRadius: 2,
        '.MuiChip-label': {
          px: 0,
        },
      }}
    />
  );
}

export default NameTag;
