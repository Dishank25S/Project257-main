"use client"

import { useState } from 'react'

export default function AdminDebugPage() {
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')

  const testPassword = async () => {
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
      })
      
      const data = await response.json()
      setResult(`Status: ${response.status}, Valid: ${data.valid}, Environment: ${data.environment}`)
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Password Debug</h1>
      <div className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="border p-2 rounded"
        />
        <button
          onClick={testPassword}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Password
        </button>
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
