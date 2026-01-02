"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const [session, setSession] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if we have a session stored or get it from auth
    const checkSession = async () => {
      try {
        // For now, we'll just show the login button since backend is disconnected
        setIsLoading(false)
      } catch (error) {
        console.warn("Failed to check session:", error)
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  if (isLoading) {
    return (
      <header className="fixed top-0 z-[100] w-full py-4 lg:py-6">
        <nav className="container flex items-center justify-between">
          <Link href="/">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold text-xl">NV</span>
            </div>
          </Link>
          <div className="h-10 w-20 animate-pulse rounded-full bg-gray-600"></div>
        </nav>
      </header>
    )
  }

  return (
    <header className="fixed top-0 z-[100] w-full py-4 lg:py-6">
      <nav className="container flex items-center justify-between">
        <Link href="/">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center hover:scale-105 transition-transform">
            <span className="text-white font-bold text-xl">NV</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{session.user?.name || session.user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/user/${session.id}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/startup/create">Create Pitch</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
    </header>
  )
}

const LoginButton = () => {
  const handleClick = () => {
    alert("Backend is currently disconnected. Login functionality is temporarily unavailable.")
  }

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      size="sm"
      className="h-9 rounded-full bg-pink-400 px-4 text-base text-black hover:bg-pink-500"
    >
      Login
    </Button>
  )
}

export default Navbar
