import { PropsWithChildren, useContext, useEffect } from "react";
import { LoginContext } from "../pages/RootLayout";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const loginCtx = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginCtx.isLogged) {
      navigate("/login", { replace: true });
    }
  }, [loginCtx, navigate]);

  return children;
}
