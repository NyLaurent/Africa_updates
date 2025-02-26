"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Settings,
  Users,
  MessageSquare,
  BookOpen,
  History,
  Send,
  ExternalLink,
  Grid2X2,
  Moon,
  Sun,
  Home,
  Bookmark,
} from "lucide-react"
import { useUser } from "@/lib/auth"
import MessagesButton from "@/app/(main)/MessagesButton"
import NotificationsButton from "@/app/(main)/NotificationsButton"
import { User } from "lucia"

export default function AdminPage({userInfo}: {userInfo: User}) {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handlePublisherSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      router.push('/publisher-registration')
    }
  }

  const handleAdvertiserSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      router.push('/advertiser-registration')
    }
  }

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
      <div className="container mx-auto space-y-9 px-4 py-8">
        <div className="flex justify-between items-center px-12 mt-10">
          <header className="border-b-2 border-primary w-fit text-3xl font-bold py-6">
            <h1>
              Welcome: <span className="text-primary">{userInfo.username || 'Laulan'}</span>
            </h1>
          </header>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Box */}
          <Card className="bg-card dark:text-white text-black border-border hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4 pt-6">
            {userInfo.role === "ADMIN" && (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
                  >
                    <Link href="/admin-panel">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
                  >
                    <Link href="/admin-email">
                      <Mail className="w-4 h-4 mr-2" />
                      Admin Email
                    </Link>
                  </Button>
                </>
              )}
              <Button
                asChild
                variant="outline"
                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
              >
                <Link href={`/users/${userInfo?.username}`}>
                  <Users className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
              >
                <Link href={`/users/${userInfo?.username}/followers`}>
                  <Users className="w-4 h-4 mr-2" />
                  Followers
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
              >
                <Link href={`/users/${userInfo?.username}/following`}>
                  <Users className="w-4 h-4 mr-2" />
                  Following
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
              >
                <Link href="/stories">
                  <Grid2X2 className="w-4 h-4 mr-2" />
                  Push wall
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
              >
                <Link href="/forum">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Go to Forum
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Right Box */}
          <Card className="bg-card dark:text-white text-black border-border hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4 pt-6">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
              >
                <Link href="/messages">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message[Inbox]
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
              >
                <Link href="/my-posts">
                  <History className="w-4 h-4 mr-2" />
                  Post history
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
              >
                <Link href="/posts/create">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Post a new story
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
              >
                <Link href="/safari">
                  <BookOpen className="w-4 h-4 mr-2" />
                  My Safari
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
              >
                <Link href="/email-all">
                  <Send className="w-4 h-4 mr-2" />
                  Send Email to all
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Publisher and Advertiser Section */}
        <div className="space-y-6 mt-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Publisher</h2>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="publishCheckbox"
                className="h-4 w-4 rounded border-gray-300"
                onChange={handlePublisherSelect}
              />
              <label htmlFor="publishCheckbox" className="text-sm">
                Select if you want to Publish on website, our Corporate Media Hub, or Push wall.
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Advertiser</h2>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="advertiseCheckbox"
                className="h-4 w-4 rounded border-gray-300"
                onChange={handleAdvertiserSelect}
              />
              <label htmlFor="advertiseCheckbox" className="text-sm">
                Select if you want to advertise on website
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

