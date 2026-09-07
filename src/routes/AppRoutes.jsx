import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminConsole, PageContentRoute } from '../App'

// 모든 관리자 진입점은 이 라우트 목록에서 관리합니다. 레이아웃은 URL이 바뀌어도 유지됩니다.
const adminPages = ['dashboard', 'products', 'orders', 'payments', 'shipping', 'inventory', 'members', 'claims', 'analytics', 'settings']

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="/admin" element={<AdminConsole />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      {adminPages.map((page) => <Route key={page} path={page} element={<PageContentRoute page={page} />} />)}
    </Route>
    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
  </Routes>
}