import { Box, Paper } from '@mui/material';

import PaymentList from './components/PaymentList';
import ResultDialog from './components/ResultDialog';

function App() {
  return (
    <Paper elevation={3} sx={{ borderRadius: 3 }}>
      <Box height="calc(100vh - 100px)">
        <PaymentList />
        <ResultDialog />
      </Box>
    </Paper>
  );
}

export default App;
