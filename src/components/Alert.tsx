export type Severity = "info" | "warning" | "error" | "success";

interface AlertProps {
  severity: Severity;
  children: React.ReactNode;
  visible?: boolean;
}

export default function Alert({
  severity,
  children,
  visible = false,
}: AlertProps) {
  if (!visible) {
    return null;
  }

  const baseClass = "p-4 mb-4 text-sm rounded-lg";
  const severityClass = {
    info: "bg-blue-100 text-blue-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
  };

  return (
    <div className={`${baseClass} ${severityClass[severity]}`}>{children}</div>
  );
}
