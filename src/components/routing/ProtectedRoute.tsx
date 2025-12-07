import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { RootState } from "../../app/stores";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[]; // e.g. ["admin"], ["admin", "developer"]
};

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth.token || !auth.user) {
    return <Navigate to="/userLogin" replace />;
  }

  if (
    allowedRoles &&
    auth.user.role &&
    !allowedRoles.includes(auth.user.role)
  ) {
    // Logged in but not allowed for this route -> send to their dashboard
    if (auth.user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/user/dashboard" replace />;
  }

  return <>{children}</>;
};


