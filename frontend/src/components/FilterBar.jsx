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
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search position or company..."
        className="border rounded p-2 text-sm w-64 bg-white"
      />

      <select
        value={companyFilter}
        onChange={(e) => onCompanyFilterChange(e.target.value)}
        className="border rounded p-2 text-sm bg-white"
      >
        <option value="all">All companies</option>
        {companies.map((c) => (
          <option key={c.id} value={String(c.id)}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="border rounded p-2 text-sm bg-white"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>

      {isFiltering && (
        <button
          onClick={onClear}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}