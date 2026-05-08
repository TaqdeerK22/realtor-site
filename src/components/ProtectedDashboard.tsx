"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin === "true") {
      setAllowed(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!allowed) {
    return <p style={{ padding: "40px" }}>Checking login...</p>;
  }

  return <>{children}</>;
}
