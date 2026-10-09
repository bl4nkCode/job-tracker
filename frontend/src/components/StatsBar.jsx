const STATUSES = [
  {
    status: "applied",
    label: "Applied",
    color: "bg-blue-500",
    legendColor: "bg-blue-500",
  },
  {
    status: "interview",
    label: "Interview",
    color: "bg-amber-400",
    legendColor: "bg-amber-400",
  },
  {
    status: "offer",
    label: "Offer",
    color: "bg-emerald-500",
    legendColor: "bg-emerald-500",
  },
  {
    status: "rejected",
    label: "Rejected",
    color: "bg-rose-400",
    legendColor: "bg-rose-400",
  },
];

export default function StatsBar({ applications }) {
  const total = applications.length;

  const count = (status) =>
    applications.filter((app) => app.status === status).length;

  const applied = count("applied");
  const interview = count("interview");
  const offer = count("offer");

  const responded = total - applied;
  const responseRate =
    total > 0 ? Math.round((responded / total) * 100) : 0;

  const cards = [
    {
      label: "Total applications",
      value: total,
      detail: "All tracked applications",
    },
    {
      label: "In progress",
      value: applied + interview,
      detail: "Applied or interviewing",
    },
    {
      label: "Offers received",
      value: offer,
      detail: "Successful applications",
    },
    {
      label: "Response rate",
      value: `${responseRate}%`,
      detail: "Applications beyond applied",
    },
  ];

  return (
    <section aria-label="Application statistics" className="mb-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <article
            key={card.label}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-gray-500">
                {card.label}
              </p>

              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  index === 0
                    ? "bg-gray-400"
                    : index === 1
                      ? "bg-blue-500"
                      : index === 2
                        ? "bg-emerald-500"
                        : "bg-violet-400"
                }`}
              />
            </div>

            <p className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">
              {card.value}
            </p>

            <p className="mt-1 text-xs text-gray-400">{card.detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-gray-800">
            Application breakdown
          </h3>

          <span className="text-xs text-gray-400">
            {total} {total === 1 ? "application" : "applications"}
          </span>
        </div>

        <div
          className="flex h-2 overflow-hidden rounded-full bg-gray-100"
          role="img"
          aria-label={STATUSES.map(
            (status) => `${status.label}: ${count(status.status)}`,
          ).join(", ")}
        >
          {total > 0 &&
            STATUSES.map((status) => {
              const percentage = (count(status.status) / total) * 100;

              return (
                <div
                  key={status.status}
                  className={`${status.color} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              );
            })}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {STATUSES.map((status) => (
            <div
              key={status.status}
              className="flex items-center gap-2 text-xs text-gray-500"
            >
              <span
                className={`h-2 w-2 rounded-full ${status.legendColor}`}
              />
              <span>{status.label}</span>
              <span className="font-medium text-gray-700">
                {count(status.status)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}