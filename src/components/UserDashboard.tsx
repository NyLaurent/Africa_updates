"use client"

import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from "lucide-react"

export default function DashboardLayout() {
  const username = "JohnDoe"
  const today = format(new Date(), "MM/dd/yyyy")

  const socialLinks = [
    { icon: <Facebook className="h-6 w-6" />, href: "https://facebook.com" },
    { icon: <Twitter className="h-6 w-6" />, href: "https://twitter.com" },
    { icon: <Instagram className="h-6 w-6" />, href: "https://instagram.com" },
    { icon: <Linkedin className="h-6 w-6" />, href: "https://linkedin.com" },
    { icon: <Youtube className="h-6 w-6" />, href: "https://youtube.com" },
    { icon: <Github className="h-6 w-6" />, href: "https://github.com" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <div className="grid grid-cols-[1fr,auto,auto] gap-8 items-start p-6">
        <div className="">
          
          <Image
            src="/myad.webp"
            alt="Advertisement"
            width={800}
            height={100}
            className=""
          />
        </div>
        <div className="text-right space-y-2">
          <div className="text-base">Username: {username}</div>
          <div className="text-base">Date: {today}</div>
        </div>
        <div className="flex gap-4 items-start">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[300px,1fr,400px] gap-8 p-6">
        {/* Left Sidebar */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Welcome: {username}</h2>
            <nav className="space-y-4">
              <Link href="/profile" className="block text-lg hover:text-primary transition-colors">
                My Profile
              </Link>
              <Link href="/followers" className="block text-lg hover:text-primary transition-colors">
                Followers
              </Link>
              <Link href="/following" className="block text-lg hover:text-primary transition-colors">
                Following
              </Link>
              <Link href="/push-wall" className="block text-lg hover:text-primary transition-colors">
                Push wall
              </Link>
              <Link href="/forum" className="block text-lg hover:text-primary transition-colors">
                Go to Forum
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Admin only</h3>
            <nav className="space-y-4">
              <Link href="/admin/email" className="block text-lg hover:text-primary transition-colors">
                Admin Email
              </Link>
              <Link href="/admin/panel" className="block text-lg hover:text-primary transition-colors">
                Admin Panel
              </Link>
            </nav>
            <p className="text-sm text-muted-foreground">
              *Admin can see + other admins with permission from main admin
            </p>
          </div>
        </div>

        {/* Middle Content */}
        <div className="space-y-4 pt-16">
          <nav className="space-y-6">
            <Link href="/inbox" className="block text-lg hover:text-primary transition-colors">
              Message [Inbox]
            </Link>
            <Link href="/history" className="block text-lg hover:text-primary transition-colors">
              Post history
            </Link>
            <Link href="/new-post" className="block text-lg hover:text-primary transition-colors">
              Post a new story
            </Link>
            <Link href="/safari" className="block text-lg hover:text-primary transition-colors">
              My Safari
            </Link>
            <Link href="/email-all" className="block text-lg hover:text-primary transition-colors">
              Send Email to all
            </Link>
          </nav>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Advertisement</h3>
            <Image
              src="/myad.webp"
              alt="Advertisement"
              width={400}
              height={300}
              className="rounded-lg w-full"
            />
          </div>

          <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Push</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="News thumbnail"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-lg mb-2">Breaking News</h4>
                  <p className="text-muted-foreground">Latest updates on the current events...</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="News thumbnail"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-lg mb-2">Tech Update</h4>
                  <p className="text-muted-foreground">New features released for our platform...</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">WhatsApp</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="WhatsApp news"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-lg mb-2">Community Update</h4>
                  <p className="text-muted-foreground">Join our WhatsApp group for daily updates...</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="WhatsApp news"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-lg mb-2">Support Channel</h4>
                  <p className="text-muted-foreground">Get instant help via our WhatsApp support...</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Most Popular</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Popular content"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-lg mb-2">Top Story</h4>
                  <p className="text-muted-foreground">Most read article of the week...</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Popular content"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-lg mb-2">Featured Post</h4>
                  <p className="text-muted-foreground">Editors pick of the day...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

