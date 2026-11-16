
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import Chatbot from '../components/Chatbot'

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-col">
        <Outlet />
      </main>

      <MobileNav />
      <Chatbot />
    </div>
  )
}
