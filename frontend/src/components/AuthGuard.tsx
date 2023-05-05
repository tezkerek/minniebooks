import { ReactNode, useEffect, useState } from "react";
import { isAuthenticated } from "@/api/auth";

export default function AuthGuard({ children, alt }: AuthGuardProps) {
  const [auth, setAuth] = useState<boolean>(false)

  // isAuthenticated must not be called during SSR
  useEffect(() => setAuth(isAuthenticated()), [auth])

  return auth ? <>{children}</> : <>{alt}</>;
}

interface AuthGuardProps {
  children: ReactNode;
  alt?: ReactNode;
}
