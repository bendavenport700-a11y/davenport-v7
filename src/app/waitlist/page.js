"use client";
import { useEffect, useState } from "react";
import DavenportApp from "../../components/DavenportApp";

export default function WaitlistPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  if (!ready) return null;
  return <DavenportApp initialPage="waitlist" />;
}
