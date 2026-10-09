import { useState } from 'react'
import api from '../api/axios'

// Handles both { data: {...} } and plain {...} responses
const unwrap = (res) => res.data?.data ?? res.data

export default function ApplicationForm({
  application, // present = edit mode, missing = add mode
  companies,
  onClose,
  onSaved,
  onCompanyCreated,
}) {
  const isEdit = Boolean(application)

  const [companyId, setCompanyId] = useState(
    application?.company_id ?? application?.company?.id ?? companies[0]?.id ?? 'new'
  )
  const [newCompanyName, setNewCompanyName] = useState('')
  const [position, setPosition] = useState(application?.position ?? '')
  const [status, setStatus] = useState(application?.status ?? 'applied')
  const [appliedDate, setAppliedDate] = useState(
    application?.applied_date ? String(application.applied_date).slice(0, 10) : ''
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md max-h-full overflow-y-auto"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {isEdit ? 'Edit application' : 'Add application'}
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <label className="block text-sm text-gray-700 mb-1">Company</label>
        <select
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        >
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
          <option value="new">+ New company</option>
        </select>

        {companyId === 'new' && (
          <>
            <label className="block text-sm text-gray-700 mb-1">
              New company name
            </label>
            <input
              type="text"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              required
            />
          </>
        )}

        <label className="block text-sm text-gray-700 mb-1">Position</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        />

        <label className="block text-sm text-gray-700 mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <label className="block text-sm text-gray-700 mb-1">
          Date applied
        </label>
        <input
          type="date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <label className="block text-sm text-gray-700 mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full border rounded p-2 mb-6"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}