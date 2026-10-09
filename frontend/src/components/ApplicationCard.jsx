export default function ApplicationCard({
  application,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white p-3 rounded shadow-sm border border-gray-200">
      <p className="font-semibold text-gray-800">{application.position}</p>
      <p className="text-sm text-gray-600">
        {application.company?.name ?? 'No company'}
      </p>
      {application.applied_date && (
        <p className="text-xs text-gray-400 mt-1">
          Applied: {String(application.applied_date).slice(0, 10)}
        </p>
      )}

      <select
        value={application.status}
        onChange={(e) => onStatusChange(application, e.target.value)}
        className="w-full border rounded p-1 mt-3 text-sm"
      >
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>

      <div className="flex gap-3 mt-2 text-sm">
        <button
          onClick={() => onEdit(application)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(application)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  )
}