import { CalendarDays, Pencil, Trash2 } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_STYLES = {
  applied: "border-blue-200 bg-blue-50 text-blue-700",
  interview: "border-amber-200 bg-amber-50 text-amber-700",
  offer: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rejected: "border-rose-200 bg-rose-50 text-rose-700",
};

export default function ApplicationCard({
  application,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", String(application.id));
    e.dataTransfer.effectAllowed = "move";
  };

  const status = STATUS_OPTIONS.find(
    (option) => option.value === application.status,
  );

  const appliedDate = application.applied_date
    ? String(application.applied_date).slice(0, 10)
    : null;

  return (
    <article
      draggable
      onDragStart={handleDragStart}
      className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-150 hover:border-gray-300 hover:shadow-md active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="break-words text-sm font-semibold leading-5 text-gray-900">
            {application.position}
          </h4>

          <p className="mt-1 truncate text-sm text-gray-500">
            {application.company?.name ?? "No company"}
          </p>
        </div>

        <span
          className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
            application.status === "applied"
              ? "bg-blue-500"
              : application.status === "interview"
                ? "bg-amber-500"
                : application.status === "offer"
                  ? "bg-emerald-500"
                  : "bg-rose-500"
          }`}
          aria-label={status?.label ?? application.status}
          title={status?.label ?? application.status}
        />
      </div>

      {appliedDate && (
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays size={14} strokeWidth={1.8} />
          <span>Applied {appliedDate}</span>
        </div>
      )}

      <div className="mt-4 border-t border-gray-100 pt-3">
        <label
          htmlFor={`status-${application.id}`}
          className="mb-1.5 block text-xs font-medium text-gray-500"
        >
          Application status
        </label>

        <select
          id={`status-${application.id}`}
          value={application.status}
          onChange={(e) => onStatusChange(application, e.target.value)}
          className={`w-full rounded-md border px-2.5 py-2 text-xs font-medium outline-none transition-colors focus:ring-2 focus:ring-blue-100 ${
            STATUS_STYLES[application.status] ??
            "border-gray-200 bg-gray-50 text-gray-700"
          }`}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onEdit(application)}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <Pencil size={13} strokeWidth={1.8} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(application)}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 size={13} strokeWidth={1.8} />
          Delete
        </button>
      </div>
    </article>
  );
}