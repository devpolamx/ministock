import { BrowserRouter as Router } from 'react-router-dom';
import AuthInitializer from './components/AuthInitializer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <AuthInitializer />
      <AppRoutes />
    </Router>
  );
}

export default App;
