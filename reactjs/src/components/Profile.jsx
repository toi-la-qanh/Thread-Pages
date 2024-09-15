import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { token } = useAuth();
  return (
    <>
    <div className="text-6xl font-bold text-slate-600">User Profile</div>
  </>
  )
}
export default Profile