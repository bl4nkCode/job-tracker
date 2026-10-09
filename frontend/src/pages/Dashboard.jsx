import { useEffect, useState } from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import ApplicationCard from '../components/ApplicationCard'
import ApplicationForm from '../components/ApplicationForm'
import FilterBar from '../components/FilterBar'

// Handles both [ ... ] and { data: [ ... ] } responses
const unwrapList = (res) => (Array.isArray(res.data) ? res.data : res.data.data)
const unwrap = (res) => res.data?.data ?? res.data

// Full class names written out so Tailwind can detect them
const COLUMNS = [
  { status: 'applied', label: 'Applied', border: 'border-blue-500' },
  { status: 'interview', label: 'Interview', border: 'border-yellow-500' },
  { status: 'offer', label: 'Offer', border: 'border-green-500' },
  { status: 'rejected', label: 'Rejected', border: 'border-red-500' },
]

export default function Dashboard() {
  const [applications, setApplications] = useState([])
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  // Filter settings
  const [search, setSearch] = useState('')
  const [companyFilter, setCompanyFilter] = useState('all')
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    Promise.all([api.get('/applications'), api.get('/companies')])
      .then(([appsRes, companiesRes]) => {
        setApplications(unwrapList(appsRes))
        setCompanies(unwrapList(companiesRes))
      })
      .catch(() => setError('Could not load your data'))
      .finally(() => setLoading(false))
  }, [])

  // Called by the form after a successful add OR edit
  const handleSaved = (saved) => {
    setApplications((current) => {
      const exists = current.some((a) => a.id === saved.id)
      return exists
        ? current.map((a) => (a.id === saved.id ? saved : a))
        : [saved, ...current]
    })
  }

  const handleCompanyCreated = (company) => {
    setCompanies((current) => [...current, company])
  }

  const closeForm = () => {
    setShowForm(false)
    setEditing(null)
  }

  const handleStatusChange = async (application, newStatus) => {
    setError('')
    try {
      const res = await api.put(`/applications/${application.id}`, {
        company_id: application.company_id ?? application.company?.id,
        position: application.position,
        status: newStatus,
        applied_date: application.applied_date
          ? String(application.applied_date).slice(0, 10)
          : null,
        notes: application.notes ?? null,
      })
      handleSaved({
        ...application,
        ...unwrap(res),
        company: unwrap(res).company ?? application.company,
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update status')
    }
  }

  const handleDelete = async (application) => {
    const sure = window.confirm(
      `Delete "${application.position}" at ${application.company?.name ?? 'this company'}?`
    )
    if (!sure) return

    setError('')
    try {
      await api.delete(`/applications/${application.id}`)
      setApplications((current) =>
        current.filter((a) => a.id !== application.id)
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete application')
    }
  }

  const clearFilters = () => {
    setSearch('')
    setCompanyFilter('all')
    setSort('newest')
  }

  // Work out what to show from the full list + the filter settings
  const query = search.trim().toLowerCase()

  const visible = applications
    .filter((app) => {
      const matchesSearch =
        !query ||
        app.position.toLowerCase().includes(query) ||
        (app.company?.name ?? '').toLowerCase().includes(query)

      const matchesCompany =
        companyFilter === 'all' ||
        String(app.company_id ?? app.company?.id) === companyFilter

      return matchesSearch && matchesCompany
    })
    .sort((a, b) => {
      // Applications without a date count as oldest
      const dateA = new Date(a.applied_date ?? 0).getTime()
      const dateB = new Date(b.applied_date ?? 0).getTime()
      return sort === 'newest' ? dateB - dateA : dateA - dateB
    })

  const isFiltering = query !== '' || companyFilter !== 'all'

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              My applications
            </h2>
            {!loading && (
              <p className="text-sm text-gray-500">
                Showing {visible.length} of {applications.length}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add application
          </button>
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

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {COLUMNS.map((column) => {
              const items = visible.filter(
                (app) => app.status === column.status
              )

              return (
                <section
                  key={column.status}
                  className={`bg-gray-50 rounded p-3 border-t-4 ${column.border}`}
                >
                  <h3 className="font-semibold text-gray-700 mb-3">
                    {column.label}{' '}
                    <span className="text-gray-400 text-sm">
                      ({items.length})
                    </span>
                  </h3>

                  <div className="space-y-2">
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
                      <p className="text-sm text-gray-400">
                        {isFiltering ? 'No matches' : 'Nothing here yet'}
                      </p>
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        )}
      </main>

      {(showForm || editing) && (
        <ApplicationForm
          key={editing?.id ?? 'new'}
          application={editing}
          companies={companies}
          onClose={closeForm}
          onSaved={handleSaved}
          onCompanyCreated={handleCompanyCreated}
        />
      )}
    </div>
  )
}