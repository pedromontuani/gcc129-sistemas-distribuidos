import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Types
interface User {
  id: number
  name: string
  email: string
  createdAt: Date
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

// In-memory data store (replace with database in production)
const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    createdAt: new Date("2024-01-02"),
  },
]

// Routes
app.get("/health", (req, res) => {
  const response: ApiResponse<{ status: string; timestamp: string }> = {
    success: true,
    data: {
      status: "OK",
      timestamp: new Date().toISOString(),
    },
  }
  res.json(response)
})

app.get("/api/users", (req, res) => {
  const response: ApiResponse<User[]> = {
    success: true,
    data: users,
  }
  res.json(response)
})

app.get("/api/users/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const user = users.find((u) => u.id === id)

  if (!user) {
    const response: ApiResponse<null> = {
      success: false,
      message: "User not found",
    }
    return res.status(404).json(response)
  }

  const response: ApiResponse<User> = {
    success: true,
    data: user,
  }
  res.json(response)
})

app.post("/api/users", (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Name and email are required",
    }
    return res.status(400).json(response)
  }

  const newUser: User = {
    id: Math.max(...users.map((u) => u.id)) + 1,
    name,
    email,
    createdAt: new Date(),
  }

  users.push(newUser)

  const response: ApiResponse<User> = {
    success: true,
    data: newUser,
    message: "User created successfully",
  }
  res.status(201).json(response)
})

app.delete("/api/users/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      message: "User not found",
    }
    return res.status(404).json(response)
  }

  users.splice(userIndex, 1)

  const response: ApiResponse<null> = {
    success: true,
    message: "User deleted successfully",
  }
  res.json(response)
})

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  const response: ApiResponse<null> = {
    success: false,
    message: "Internal server error",
  }
  res.status(500).json(response)
})

// 404 handler
app.use("*", (req, res) => {
  const response: ApiResponse<null> = {
    success: false,
    message: "Route not found",
  }
  res.status(404).json(response)
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
})
