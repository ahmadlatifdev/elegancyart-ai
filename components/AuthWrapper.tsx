import { useEffect, useState } from "react";
import { validateEmail } from "./utils/auth";

type Props = {
  children: React.ReactNode;
};

export default function AuthWrapper({ children }: Props) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("admin_email");
    if (email && validateEmail(email)) {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) return null;

  return <>{children}</>;
}
