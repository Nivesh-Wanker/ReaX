import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <div>Loading…</div>;
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}
