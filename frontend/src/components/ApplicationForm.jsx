import { useState } from 'react'
import { BriefcaseBusiness, CalendarDays, FileText, X } from 'lucide-react'
import api from '../api/axios'

// Handles both { data: {...} } and plain {...} responses
const unwrap = (res) => res.data?.data ?? res.data

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'

const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700'

export default function ApplicationForm({
  application, // present = edit mode, missing = add mode
  companies,
  onClose,
  onSaved,
  onCompanyCreated,
}) {
  const isEdit = Boolean(application)

  const [companyId, setCompanyId] = useState(
    application?.company_id ??
      application?.company?.id ??
      companies[0]?.id ??
      'new'
  )
  const [newCompanyName, setNewCompanyName] = useState('')
  const [position, setPosition] = useState(application?.position ?? '')
  const [status, setStatus] = useState(application?.status ?? 'applied')
  const [appliedDate, setAppliedDate] = useState(
    application?.applied_date
      ? String(application.applied_date).slice(0, 10)
      : ''
  )
  const [notes, setNotes] = useState(application?.notes ?? '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      let company

      if (companyId === 'new') {
        const res = await api.post('/companies', { name: newCompanyName })
        company = unwrap(res)
        onCompanyCreated(company)
      } else {
        company = companies.find((c) => String(c.id) === String(companyId))
      }

      const payload = {
        company_id: company.id,
        position,
        status,
        applied_date: appliedDate || null,
        notes: notes || null,
      }

      // Edit = PUT to the existing record, Add = POST a new one
      const res = isEdit
        ? await api.put(`/applications/${application.id}`, payload)
        : await api.post('/applications', payload)

      const saved = unwrap(res)
      onSaved({ ...saved, company: saved.company ?? company })
      onClose()
    } catch (err) {
      const errors = err.response?.data?.errors
      setError(
        errors
          ? Object.values(errors)[0][0]
          : err.response?.data?.message || 'Could not save application'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/40 p-4 backdrop-blur-[3px] sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !saving) onClose()
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-gray-950/10"
      >
        {/* Modal header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-5 sm:px-7">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BriefcaseBusiness size={19} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                {isEdit ? 'Edit application' : 'Add an application'}
              </h2>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                {isEdit
                  ? 'Update the details of this job opportunity.'
                  : 'Keep your job search organized by recording a new opportunity.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close form"
            className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form fields */}
        <div className="max-h-[calc(100dvh-230px)] space-y-5 overflow-y-auto px-5 py-6 sm:px-7">
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
            >
              <span className="mt-0.5 font-semibold">!</span>
              <p>{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="application-company" className={labelClass}>
              Company <span className="text-red-500">*</span>
            </label>
            <select
              id="application-company"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className={inputClass}
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
              <option value="new">+ Add a new company</option>
            </select>
          </div>

          {companyId === 'new' && (
            <div>
              <label htmlFor="application-new-company" className={labelClass}>
                New company name <span className="text-red-500">*</span>
              </label>
              <input
                id="application-new-company"
                type="text"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                placeholder="e.g. Acme Inc."
                className={inputClass}
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="application-position" className={labelClass}>
              Job title <span className="text-red-500">*</span>
            </label>
            <input
              id="application-position"
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g. Junior Software Developer"
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="application-status" className={labelClass}>
                Status
              </label>
              <select
                id="application-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label htmlFor="application-date" className={labelClass}>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-gray-400" />
                  Date applied
                </span>
              </label>
              <input
                id="application-date"
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="application-notes" className={labelClass}>
              <span className="inline-flex items-center gap-1.5">
                <FileText size={14} className="text-gray-400" />
                Notes
                <span className="font-normal text-gray-400">(optional)</span>
              </span>
            </label>
            <textarea
              id="application-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add details about the role, interview, or follow-up..."
              className={`${inputClass} min-h-24 resize-y`}
            />
          </div>
        </div>

        {/* Form footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-gray-100 bg-gray-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {saving
              ? 'Saving...'
              : isEdit
                ? 'Save changes'
                : 'Add application'}
          </button>
        </div>
      </form>
    </div>
  )
}