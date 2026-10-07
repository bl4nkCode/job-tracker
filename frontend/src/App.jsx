import { useEffect, useState } from 'react'
import api from './api/axios'

function App() {
  const [result, setResult] = useState('Checking API...')

  useEffect(() => {
    api
      .get('/ping')
      .then((res) => setResult(JSON.stringify(res.data)))
      .catch((err) => setResult('Failed: ' + err.message))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold text-blue-600">Job Tracker</h1>
        <p className="mt-2 text-gray-600">API says: {result}</p>
      </div>
    </div>
  )
}

export default App