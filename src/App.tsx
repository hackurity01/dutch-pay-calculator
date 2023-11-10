import { Box, Container } from '@mui/material';

import PaymentList from './components/PaymentList';
import Result from './components/Result';

function App() {
  return (
    <Container maxWidth="xl">
      <Box>
        <PaymentList />
      </Box>
      <Box>
        <Result />
      </Box>
    </Container>
  );
}

export default App;
