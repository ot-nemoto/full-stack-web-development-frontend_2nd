import type { Severity } from "@/components/Alert";
import { useCallback, useState } from "react";

export function useAlert() {
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<Severity>("info");
  const [visible, setVisible] = useState(false);

  const showAlert = useCallback((msg: string, sev: Severity) => {
    setMessage(msg);
    setSeverity(sev);
    setVisible(true);
  }, []);

  return { message, severity, visible, showAlert };
}
