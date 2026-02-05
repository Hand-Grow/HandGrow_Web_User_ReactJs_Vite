import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/theme/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/auth/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
          />
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
