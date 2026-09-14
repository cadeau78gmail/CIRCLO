import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import OtpVerification from './pages/OtpVerification'
import PreferenceSetup from './pages/PreferenceSetup'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Categories from './pages/Categories'
import ItemDetails from './pages/ItemDetails'
import PostItem from './pages/PostItem'
import MyReloop from './pages/MyReloop'
import Saved from './pages/Saved'
import Exchange from './pages/Exchange'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Impact from './pages/Impact'
import Recycling from './pages/Recycling'
import Settings from './pages/Settings'
import Help from './pages/Help'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<OtpVerification />} />
      <Route path="/preferences" element={<PreferenceSetup />} />

      <Route path="/app" element={<AppLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="categories" element={<Categories />} />
        <Route path="item/:id" element={<ItemDetails />} />
        <Route path="post" element={<PostItem />} />
        <Route path="my-reloop" element={<MyReloop />} />
        <Route path="saved" element={<Saved />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="impact" element={<Impact />} />
        <Route path="recycling" element={<Recycling />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminDashboard />} />
        <Route path="listings" element={<AdminDashboard />} />
        <Route path="categories" element={<AdminDashboard />} />
        <Route path="reports" element={<AdminDashboard />} />
        <Route path="transactions" element={<AdminDashboard />} />
        <Route path="impact" element={<AdminDashboard />} />
        <Route path="settings" element={<AdminDashboard />} />
      </Route>
    </Routes>
  )
}
