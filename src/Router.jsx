import { Routes, Route } from 'react-router-dom';
import { LinkHubPage } from './pages/LinkHubPage';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<LinkHubPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
        </Routes>
    )
}