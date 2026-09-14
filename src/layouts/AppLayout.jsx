import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-col">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  )
}
