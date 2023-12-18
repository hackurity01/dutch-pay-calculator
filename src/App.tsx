import { Box, Container, Paper } from '@mui/material';

import PaymentList from './components/PaymentList';
import ResultDialog from './components/ResultDialog';

function App() {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <Box height="calc(100vh - 60px)">
          <PaymentList />
          <ResultDialog />
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
