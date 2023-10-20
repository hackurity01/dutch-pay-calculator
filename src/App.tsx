import { Container, Box } from '@mui/material';
import PaymentList from './components/PaymentList';

function App() {
  return (
    <Container maxWidth="xl">
      <Box>
        <PaymentList />
      </Box>
    </Container>
  );
}

export default App;
