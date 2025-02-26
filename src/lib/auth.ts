"use client"
import { useState, useEffect } from 'react'

interface User {
  username?: string
  // Add other user properties as needed
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  
  // Add actual authentication logic here
  return { user }
} 