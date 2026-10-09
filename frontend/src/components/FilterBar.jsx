import { Search, SlidersHorizontal, X } from "lucide-react";

export default function FilterBar({
  companies,
  search,
  onSearchChange,
  companyFilter,
  onCompanyFilterChange,
  sort,
  onSortChange,
  isFiltering,
  onClear,
}) {
  const controlClass =
    "h-10 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-colors hover:border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-50";

  return (
    <section className="mb-5 rounded-lg border border-gray-200 bg-white p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            size={17}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by position or company"
            aria-label="Search applications"
            className={`${controlClass} w-full pl-9`}
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={companyFilter}
            onChange={(e) => onCompanyFilterChange(e.target.value)}
            aria-label="Filter by company"
            className={`${controlClass} w-full sm:w-44`}
          >
            <option value="all">All companies</option>
            {companies.map((company) => (
              <option key={company.id} value={String(company.id)}>
                {company.name}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort applications"
            className={`${controlClass} w-full sm:w-40`}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        {isFiltering && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <SlidersHorizontal size={15} />
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}