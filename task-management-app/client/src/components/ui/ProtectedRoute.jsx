import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { authReady, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!authReady) {
    return <div className="center" style={{ minHeight: "100vh" }}>Loading workspace...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;