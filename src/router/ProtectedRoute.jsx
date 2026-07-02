import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ session, children }) {
  const location = useLocation()

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
