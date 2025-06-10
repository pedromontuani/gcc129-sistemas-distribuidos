"use client"

import type React from "react"
import { useState, useEffect } from "react"
import "./App.css"

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newUser, setNewUser] = useState({ name: "", email: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/users`)
      const result: ApiResponse<User[]> = await response.json()

      if (result.success && result.data) {
        setUsers(result.data)
        setError(null)
      } else {
        setError(result.message || "Failed to fetch users")
      }
    } catch (err) {
      setError("Failed to connect to API")
      console.error("Error fetching users:", err)
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUser.name.trim() || !newUser.email.trim()) {
      setError("Name and email are required")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })

      const result: ApiResponse<User> = await response.json()

      if (result.success && result.data) {
        setUsers((prev) => [...prev, result.data!])
        setNewUser({ name: "", email: "" })
      } else {
        setError(result.message || "Failed to create user")
      }
    } catch (err) {
      setError("Failed to create user")
      console.error("Error creating user:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "DELETE",
      })

      const result: ApiResponse<null> = await response.json()

      if (result.success) {
        setUsers((prev) => prev.filter((user) => user.id !== id))
        setError(null)
      } else {
        setError(result.message || "Failed to delete user")
      }
    } catch (err) {
      setError("Failed to delete user")
      console.error("Error deleting user:", err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management System</h1>
        <p>Express.js + TypeScript API with React Frontend</p>
      </header>

      <main className="App-main">
        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        <section className="user-form">
          <h2>Add New User</h2>
          <form onSubmit={createUser}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Add User"}
            </button>
          </form>
        </section>

        <section className="users-list">
          <h2>Users ({users.length})</h2>
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="empty-state">No users found</div>
          ) : (
            <div className="users-grid">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <small>Created: {new Date(user.createdAt).toLocaleDateString()}</small>
                  </div>
                  <button className="delete-btn" onClick={() => deleteUser(user.id)} title="Delete user">
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="api-status">
          <button onClick={fetchUsers} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh Users"}
          </button>
        </section>
      </main>
    </div>
  )
}

export default App
