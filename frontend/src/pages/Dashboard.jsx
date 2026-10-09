import { useEffect, useState } from "react";
import { ArrowDownUp, BriefcaseBusiness, Plus, RefreshCw } from "lucide-react";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";
import FilterBar from "../components/FilterBar";
import StatsBar from "../components/StatsBar";
import { toast } from "sonner";

// Handles both [ ... ] and { data: [ ... ] } responses.
const unwrapList = (res) =>
  Array.isArray(res.data) ? res.data : res.data.data;

const unwrap = (res) => res.data?.data ?? res.data;

const COLUMNS = [
  {
    status: "applied",
    label: "Applied",
    dot: "bg-blue-500",
    countStyle: "bg-blue-50 text-blue-700",
  },
  {
    status: "interview",
    label: "Interview",
    dot: "bg-amber-400",
    countStyle: "bg-amber-50 text-amber-700",
  },
  {
    status: "offer",
    label: "Offer",
    dot: "bg-emerald-500",
    countStyle: "bg-emerald-50 text-emerald-700",
  },
  {
    status: "rejected",
    label: "Rejected",
    dot: "bg-rose-400",
    countStyle: "bg-rose-50 text-rose-700",
  },
];

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  // Filter settings.
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    Promise.all([api.get("/applications"), api.get("/companies")])
      .then(([appsRes, companiesRes]) => {
        setApplications(unwrapList(appsRes));
        setCompanies(unwrapList(companiesRes));
      })
      .catch(() => setError("Could not load your data"))
      .finally(() => setLoading(false));
  }, []);

  // Called by the form after a successful add or edit.
  const handleSaved = (saved) => {
    const exists = applications.some((a) => a.id === saved.id);

    setApplications((current) => {
      return exists
        ? current.map((a) => (a.id === saved.id ? saved : a))
        : [saved, ...current];
    });

    toast.success(
      exists
        ? "Application updated successfully"
        : "Application added successfully",
    );
  };

  const handleCompanyCreated = (company) => {
    setCompanies((current) => [...current, company]);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleStatusChange = async (application, newStatus) => {
    setError("");

    try {
      const res = await api.put(`/applications/${application.id}`, {
        company_id: application.company_id ?? application.company?.id,
        position: application.position,
        status: newStatus,
        applied_date: application.applied_date
          ? String(application.applied_date).slice(0, 10)
          : null,
        notes: application.notes ?? null,
      });

      handleSaved({
        ...application,
        ...unwrap(res),
        company: unwrap(res).company ?? application.company,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Could not update status");
    }
  };

  const handleDelete = async (application) => {
    const sure = window.confirm(
      `Delete "${application.position}" at ${
        application.company?.name ?? "this company"
      }?`,
    );

    if (!sure) return;

    setError("");

    try {
      await api.delete(`/applications/${application.id}`);

      setApplications((current) =>
        current.filter((a) => a.id !== application.id),
      );

      toast.success("Application deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete application");
    }
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    setDragOver(null);

    const id = e.dataTransfer.getData("text/plain");
    const application = applications.find((a) => String(a.id) === id);

    // Only call the server if the card actually changed column.
    if (application && application.status !== status) {
      handleStatusChange(application, status);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCompanyFilter("all");
    setSort("newest");
  };

  // Work out what to show from the full list and filter settings.
  const query = search.trim().toLowerCase();

  const visible = applications
    .filter((app) => {
      const matchesSearch =
        !query ||
        app.position.toLowerCase().includes(query) ||
        (app.company?.name ?? "").toLowerCase().includes(query);

      const matchesCompany =
        companyFilter === "all" ||
        String(app.company_id ?? app.company?.id) === companyFilter;

      return matchesSearch && matchesCompany;
    })
    .sort((a, b) => {
      const dateA = new Date(a.applied_date ?? 0).getTime();
      const dateB = new Date(b.applied_date ?? 0).getTime();

      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });

  const isFiltering = query !== "" || companyFilter !== "all";

  return (
    <div className="min-h-screen bg-[#f7f8fa] lg:flex">
      <Navbar />
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Page heading */}
          <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-400">
                <BriefcaseBusiness size={14} />
                <span>WORKSPACE</span>
                <span>/</span>
                <span className="text-gray-600">Applications</span>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-[28px]">
                My applications
              </h2>

              <p className="mt-1.5 text-sm text-gray-500">
                Keep your job search organized, one opportunity at a time.
              </p>

              {!loading && (
                <p className="mt-2 text-xs text-gray-400">
                  Showing {visible.length} of {applications.length}{" "}
                  {applications.length === 1 ? "application" : "applications"}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-offset-2 sm:self-auto"
            >
              <Plus size={17} strokeWidth={2} />
              Add application
            </button>
          </header>

          {/* Statistics */}
          {!loading && <StatsBar applications={applications} />}

          {/* Filters */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Application board
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <ArrowDownUp size={13} />
                <span>
                  {sort === "newest" ? "Newest first" : "Oldest first"}
                </span>
              </div>
            </div>

            <FilterBar
              companies={companies}
              search={search}
              onSearchChange={setSearch}
              companyFilter={companyFilter}
              onCompanyFilterChange={setCompanyFilter}
              sort={sort}
              onSortChange={setSort}
              isFiltering={isFiltering}
              onClear={clearFilters}
            />
          </div>

          {/* Error feedback */}
          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              <span className="min-w-0 flex-1">{error}</span>

              <button
                type="button"
                onClick={() => setError("")}
                className="shrink-0 text-rose-500 hover:text-rose-800"
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          )}

          {/* Board */}
          {loading ? (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white text-center">
              <RefreshCw size={22} className="animate-spin text-gray-400" />
              <p className="mt-3 text-sm font-medium text-gray-600">
                Loading your applications
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Getting your workspace ready...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto pb-3">
              <div className="grid min-w-[1000px] grid-cols-4 items-start gap-4">
                {COLUMNS.map((column) => {
                  const items = visible.filter(
                    (app) => app.status === column.status,
                  );

                  return (
                    <section
                      key={column.status}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(column.status);
                      }}
                      onDragLeave={(e) => {
                        // Ignore leaving onto a child element inside the column.
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setDragOver(null);
                        }
                      }}
                      onDrop={(e) => handleDrop(e, column.status)}
                      aria-label={`${column.label} applications`}
                      className={`min-h-64 rounded-lg border p-3 transition-colors duration-150 ${
                        dragOver === column.status
                          ? "border-blue-300 bg-blue-50/70 ring-2 ring-blue-100"
                          : "border-gray-200 bg-[#f1f3f6]"
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between gap-2 px-1 py-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${column.dot}`}
                          />

                          <h4 className="text-sm font-semibold text-gray-800">
                            {column.label}
                          </h4>
                        </div>

                        <span
                          className={`inline-flex min-w-6 items-center justify-center rounded px-1.5 py-0.5 text-xs font-semibold ${column.countStyle}`}
                        >
                          {items.length}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {items.map((app) => (
                          <ApplicationCard
                            key={app.id}
                            application={app}
                            onStatusChange={handleStatusChange}
                            onEdit={setEditing}
                            onDelete={handleDelete}
                          />
                        ))}

                        {items.length === 0 && (
                          <div className="flex min-h-32 flex-col items-center justify-center rounded-md border border-dashed border-gray-300 px-3 py-6 text-center">
                            <p className="text-xs font-medium text-gray-500">
                              {isFiltering
                                ? "No matching applications"
                                : "No applications yet"}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-gray-400">
                              {isFiltering
                                ? "Try changing your filters."
                                : "Applications in this stage will appear here."}
                            </p>
                          </div>
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          )}

          <footer className="mt-5 border-t border-gray-200 pt-4 text-xs text-gray-400">
            Keep moving forward. Every application is a step toward your next
            opportunity.
          </footer>
        </div>
      </main>

      {(showForm || editing) && (
        <ApplicationForm
          key={editing?.id ?? "new"}
          application={editing}
          companies={companies}
          onClose={closeForm}
          onSaved={handleSaved}
          onCompanyCreated={handleCompanyCreated}
        />
      )}
    </div>
  );
}
