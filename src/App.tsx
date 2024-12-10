import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Account from './pages/Account';
import Cabins from './pages/Cabins';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';
import { GlobalStyles } from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
